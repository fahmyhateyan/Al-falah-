import re,sys,os,io,base64,hashlib,subprocess,urllib.parse
from bs4 import BeautifulSoup
from PIL import Image
SITE='https://abdallahandassociatesdental.com'
dom,out=sys.argv[1:3]
cache='site/assets'
def fetch(url):
    url=urllib.parse.urljoin(SITE+'/',url)
    f=os.path.join(cache,hashlib.md5(url.encode()).hexdigest())
    if not os.path.exists(f):
        r=subprocess.run(['curl','-sSLf','-o',f,url])
        if r.returncode: return None,url
    return open(f,'rb').read(),url
seen={}
def datauri(url,maxw=1100):
    if url.startswith('data:') or not url.strip(): return url
    if url in seen: return seen[url]
    b,full=fetch(url)
    if b is None: seen[url]=full; return full
    ext=full.split('?')[0].rsplit('.',1)[-1].lower()
    if ext in('jpg','jpeg','png','webp'):
        im=Image.open(io.BytesIO(b))
        alpha=im.mode in('RGBA','LA','P') and ext=='png'
        if alpha:
            im=im.convert('RGBA')
            if im.getchannel('A').getextrema()[0]==255: alpha=False
        if im.width>maxw: im=im.resize((maxw,round(im.height*maxw/im.width)),Image.LANCZOS)
        buf=io.BytesIO()
        if alpha: im.save(buf,'PNG',optimize=True); mt='image/png'
        else: im.convert('RGB').save(buf,'JPEG',quality=70,optimize=True,progressive=True); mt='image/jpeg'
        b=buf.getvalue()
    else:
        mt={'svg':'image/svg+xml','gif':'image/gif','ico':'image/x-icon','woff2':'font/woff2','woff':'font/woff','ttf':'font/ttf'}.get(ext,'application/octet-stream')
    u=f'data:{mt};base64,'+base64.b64encode(b).decode()
    seen[url]=u; return u
def css_urls(css,base):
    def rep(m):
        u=m.group(2).strip()
        if u.startswith(('data:','#')) or not u: return m.group(0)
        full=urllib.parse.urljoin(base,u)
        if 'fonts.g' in full: return f'url("{full}")'
        return f'url("{datauri(full)}")'
    return re.sub(r'url\((["\']?)([^)"\']*)\1\)',rep,css)
soup=BeautifulSoup(open(dom).read(),'html.parser')
for t in soup.find_all(['script','noscript','iframe','link'],recursive=True):
    if t.name=='link' and 'stylesheet' in (t.get('rel') or []) : continue
    t.decompose()
styles=[]
for t in soup.find_all(['style','link']):
    if t.name=='link':
        b,full=fetch(t['href'])
        if 'fonts.googleapis' in full: styles.append(f'<link rel="stylesheet" href="{full}">')
        else: styles.append('<style>'+css_urls(b.decode('utf8','replace'),full)+'</style>')
    else: styles.append('<style>'+css_urls(t.string or '',SITE+'/')+'</style>')
    t.decompose()
body=soup.body
for t in body.find_all(attrs={'data-page':True}): del t['data-page']
for v in body.find_all('video'):
    img=soup.new_tag('img',src=v.get('poster',''),alt=''); img['class']=v.get('class',[]); v.replace_with(img)
for t in body.find_all(string=re.compile('Your experience on this site will be improved')):
    p=t.parent
    while p and p.parent and len(p.parent.get_text(strip=True))<200: p=p.parent
    p.decompose(); break
for t in body.find_all(src=True): t['src']=datauri(t['src'])
for t in body.find_all(srcset=True): del t['srcset']
for t in body.find_all(style=True):
    if 'url(' in t['style']: t['style']=css_urls(t['style'],SITE+'/')
for a in body.find_all('a',href=True):
    if a['href'].startswith('/'): a['href']=SITE+a['href']
    a['target']='_blank'
js='''<script>
document.querySelectorAll('.cs_before_after_media').forEach(function(m){
  var w=m.querySelector('.cs_before_after_before_wrap'),d=m.querySelector('.cs_before_after_divider'),on=false;
  function set(x){var r=m.getBoundingClientRect(),p=Math.max(0,Math.min(100,(x-r.left)/r.width*100));w.style.clipPath='inset(0 '+(100-p)+'% 0 0)';d.style.left=p+'%';}
  m.style.touchAction='pan-y';m.style.cursor='ew-resize';
  m.addEventListener('pointerdown',function(e){on=true;m.setPointerCapture(e.pointerId);set(e.clientX);});
  m.addEventListener('pointermove',function(e){if(on)set(e.clientX);});
  m.addEventListener('pointerup',function(){on=false;});m.addEventListener('pointercancel',function(){on=false;});
});
</script>'''
note='<div style="background:#0b1c26;color:#e9f6f8;font:500 13px/1.5 Poppins,system-ui,sans-serif;text-align:center;padding:10px max(16px,env(safe-area-inset-right,0px)) 10px max(16px,env(safe-area-inset-left,0px))">Homepage preview with proposed changes: new <b style="color:#2cc5d2">Real Results</b> section, and "Take a Virtual Tour" renamed to <b style="color:#2cc5d2">Our Clinic</b> and moved below it. Drag the sliders to compare before and after.</div>'
hdr=body.find('header')
hdr.insert(0,BeautifulSoup(note,'html.parser'))
note=''
for w in body.select('.swiper-wrapper'): w['style']=''
html=('<title>Abdallah Homepage Preview</title>\n<meta name="viewport" content="width=device-width, initial-scale=1">\n'+''.join(styles)
      +'<style>body{background:#fff}.swiper{overflow-x:auto!important;scroll-snap-type:x mandatory;scrollbar-width:thin}.swiper-wrapper{align-items:flex-start!important;transform:none!important;height:auto!important}.cs_about_6_card{height:auto!important}.swiper-slide{height:auto!important;scroll-snap-align:start}.swiper-pagination{display:none!important}</style>\n'+note+body.decode_contents()+js)
open(out,'w').write(html)
print(len(html)/1e6,'MB')

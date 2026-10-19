import re,html,json,sys
src,cases_path,out=sys.argv[1:4]
raw=open(src).read()
m=re.search(r'data-page="(.*?)"',raw)
d=json.loads(html.unescape(m.group(1)))
secs=d['props']['page_data']['en']
cases={c['title']:c for c in json.load(open(cases_path))}
picks=["Dental Bridges 3","Implant Overdenture","Dental Bridges 1","Veneers","Dental Bridges 2","Dental Implants"]
about=next(s for s in secs if s['type']=='About')
about['data']['section_title']='Our <span>Clinic</span>'
about['data']['eyebrow_text']='Take a Look Inside'
results={"data":{"layout":"1","section_subtitle":"Real Results","section_title":"Real Smiles, <span>Real Transformations</span>",
  "item_list":[cases[p] for p in picks]},
  "icon":"lucide:images","type":"BeforeAfter","title":"BeforeAfter",
  "advanced":{"classes":"cs_home_compact","padding":{"top":{"lg":"70","md":"40"},"bottom":{"lg":"40","md":"20"}},"backgroundColor":None,"backgroundImage":None,"is_section_dark":False},
  "sectionId":"before-after-home-results"}
secs.insert(secs.index(about),results)
newattr='data-page="'+html.escape(json.dumps(d,separators=(',',':')),quote=True)+'"'
open(out,'w').write(raw[:m.start()]+newattr+raw[m.end():])

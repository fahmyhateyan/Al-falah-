# Homepage changes: Real Results + Our Clinic

`homepage-preview.html` is a self-contained snapshot of the live homepage
(abdallahandassociatesdental.com) with these changes applied, rendered by the
site's own code.

## Changes

1. **New "Real Results" section** directly under the hero
   - Section type: `BeforeAfter`, layout `1` (the slider grid used on /before-after)
   - Eyebrow: `Real Results`
   - Title: `Real Smiles, <span>Real Transformations</span>`
   - Cases (from the Real Cases page, picked as the most dramatic full-smile changes):
     1. Dental Bridges 3
     2. Implant Overdenture
     3. Dental Bridges 1
     4. Veneers
     5. Dental Bridges 2
     6. Dental Implants
   - Padding: top 70 / 40, bottom 40 / 20 (lg / md)
2. **"Take a Virtual Tour" section (type `About`)** now sits below the new section
   - Title: `Our <span>Clinic</span>` (was `Take a <span>Virtual</span> Tour`)
   - Eyebrow: `Take a Look Inside` (was `Our Clinic`, to avoid repeating the title)

All other sections are unchanged.

## Applying on the live site

In the page builder for the home page: add a Before/After section (layout 1)
between Hero and About with the six cases above, then edit the About section's
title and eyebrow.

## Regenerating

`tools/modify.py` applies the changes to the page's `data-page` JSON;
`tools/snapshot.py` turns the rendered page into the standalone preview.

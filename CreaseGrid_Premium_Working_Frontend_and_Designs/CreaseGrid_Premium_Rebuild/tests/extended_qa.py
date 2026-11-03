from pathlib import Path
from playwright.sync_api import sync_playwright
import base64,json,sys
root=Path(__file__).resolve().parents[1]
css=(root/'styles.css').read_text();js=(root/'app.js').read_text()
for im in (root/'assets').glob('*'):
 if im.suffix in ['.webp','.jpg','.png']:
  js=js.replace('assets/'+im.name,'data:image/'+('jpeg' if im.suffix=='.jpg' else im.suffix[1:])+';base64,'+base64.b64encode(im.read_bytes()).decode())
html='<html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>'+css+'</style></head><body><div id="app"></div><div id="toast"></div><script>'+js+'</script></body></html>'
checks=[];problems=[]
def check(name,got,expected):
 success=expected in got
 checks.append((name,success,got[:120]))
 if not success:problems.append((name,got,expected))
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=b.new_page(viewport={'width':1280,'height':900})
 page.set_content(html)
 def goto(path):page.evaluate('(r)=>location.hash="#"+r',path)
 for name,tool,expected in [
 ('run rate','run-rate','8.06'),('required rate','required-run-rate','9.55'),('net run rate','net-run-rate','+0.83'),
 ('batting average','batting-average','39.68'),('batting strike rate','batting-strike-rate','158.14'),
 ('bowling average','bowling-average','24.44'),('bowling economy','bowling-economy','9.50'),
 ('bowling strike rate','bowling-strike-rate','18.86'),('over converter','overs-converter','106'),
 ('target','target','177'),('projected score','projected-score','154'),('partnership','partnership','102')]:
  goto('/tools/'+tool)
  actual=page.locator('#tool-result .answer').inner_text()
  check(name,actual,expected)
 goto('/tools/overs-converter');page.locator('input[name=overs]').fill('17.6');page.locator('form[data-form=tool] button[type=submit]').click()
 check('invalid overs rejected',page.locator('#tool-result .explain').inner_text(),'17.4')
 goto('/tools/bowling-average');page.locator('input[name=wickets]').fill('0');page.locator('form[data-form=tool] button[type=submit]').click()
 check('zero wickets N/A',page.locator('#tool-result .answer').inner_text(),'N/A')
 # Score edge: 6 legal balls, wides / no-balls do not increment the over
 goto('/organizer/scoring')
 for _ in range(6):page.locator('[data-score="1"]').click()
 check('6 legal balls = 1.0 overs',page.locator('.score-over').inner_text(),'1.0')
 page.locator('[data-score="Wd"]').click();page.locator('[data-score="Nb"]').click()
 check('2 illegal balls do not increment over',page.locator('.score-over').inner_text(),'1.0')
 check('8 runs with extras',page.locator('.score-runs').inner_text(),'8/0')
 # organizer new tournament / teams prevents phantom fixtures and scoring
 goto('/organizer');page.locator('[data-action="create-tournament"]').first.click();page.locator('#new-name').fill('Test Cup 2027');page.locator('input[name="overs"]').fill('10');page.locator('form[data-form="create-tournament"] button[type=submit]').click()
 check('new tournament name',page.locator('main').inner_text(),'Test Cup 2027')
 check('no undefined teams',str('undefined' in page.locator('.dash-page').inner_text()),'False')
 goto('/organizer/scoring');check('score blocked without teams',page.locator('main').inner_text(),'Register teams first')
 goto('/organizer');
 for name in ['North Cricket Club','South Cricket Club']:
  page.locator('[data-action="add-team"]').first.click();page.locator('#team-name').fill(name);page.locator('form[data-form="add-team"] button[type=submit]').click()
 goto('/organizer/scoring');check('scoring enabled after 2 teams',page.locator('main').inner_text(),'Record a delivery')
 # viewport audits (no overflow)
 routes=['/','/news','/news/t20-reset','/matches','/matches/india-south-africa','/tournaments','/player','/tools','/qualification','/local','/organizer','/organizer/scoring','/admin','/my-cricket','/stats','/compare']
 for w in [320,375,390,768,1024,1440]:
  p2=b.new_page(viewport={'width':w,'height':900})
  p2.set_content(html)
  for route in routes:
   p2.evaluate('(r)=>location.hash="#"+r',route)
   d=p2.evaluate('document.documentElement.scrollWidth-window.innerWidth')
   if d>2:problems.append(('overflow',w,route,d))
  p2.close()
 page.close();b.close()
output={'checks':len(checks),'passed':sum(x[1] for x in checks),'viewports':[320,375,390,768,1024,1440],'failures':problems,'check_results':checks}
(root/'tests'/'EXTENDED_RESULTS.json').write_text(json.dumps(output,indent=2))
print('EXTENDED CHECKS',len(checks),'PASS',sum(x[1] for x in checks),'FAIL',len(problems))
for err in problems:print('FAIL',err)
if problems:sys.exit(1)

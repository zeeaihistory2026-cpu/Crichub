from playwright.sync_api import sync_playwright
from pathlib import Path
import base64,json,sys
root=Path(__file__).resolve().parents[1]
css=(root/'styles.css').read_text()
js=(root/'app.js').read_text()
for image in (root/'assets').glob('*'):
 if image.suffix in ('.webp','.png','.jpg'):
  uri='data:image/'+('jpeg' if image.suffix=='.jpg' else image.suffix.lstrip('.'))+';base64,'+base64.b64encode(image.read_bytes()).decode('ascii')
  js=js.replace('assets/'+image.name,uri)
html=f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>{css}</style></head><body><a class="skip-link" href="#main-content">Skip</a><div id="app"></div><div id="toast" role="status"></div><script>{js}</script></body></html>'''
routes=[('home','/'),('news','/news'),('article','/news/pakistan-squad'),('match','/matches/pakistan-new-zealand'),('match-list','/matches'),('india-match','/matches/india-south-africa'),('aus-match','/matches/australia-england'),('tournaments','/tournaments'),('player','/player'),('tools','/tools'),('qualification','/qualification'),('local','/local'),('organizer','/organizer'),('scoring','/organizer/scoring'),('admin','/admin'),('my-cricket','/my-cricket'),('stats','/stats'),('compare','/compare'),('search','/search')]
for tool in ['run-rate','required-run-rate','net-run-rate','batting-average','batting-strike-rate','bowling-average','bowling-economy','bowling-strike-rate','overs-converter','target','projected-score','partnership']:
 routes.append(('tool-'+tool,'/tools/'+tool))
results=[];failures=[]
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-gpu','--disable-dev-shm-usage'])
 for kind,w,h in [('desktop',1440,900),('mobile',390,844)]:
  page=browser.new_page(viewport={'width':w,'height':h},device_scale_factor=1)
  errs=[];page.on('pageerror',lambda e:errs.append(str(e)))
  page.set_content(html,wait_until='load',timeout=15000)
  for i,(name,route) in enumerate(routes):
   page.evaluate('(r)=>location.hash="#"+r',route)
   page.wait_for_timeout(22)
   if page.locator('main').count()==0:failures.append((kind,name,'missing main'))
   if page.locator('main').count():
    txt=page.locator('main').inner_text(timeout=5000)
    if len(txt)<100:failures.append((kind,name,'short page '+str(len(txt))))
   metrics=page.evaluate('''() => ({width:document.documentElement.scrollWidth,inner:innerWidth,header:!!document.querySelector('header'),title:document.title})''')
   if metrics['width']>metrics['inner']+2:failures.append((kind,name,'overflow '+str(metrics['width']-metrics['inner'])))
   path=root/'screens'/kind/(f'{i+1:02d}_{name}.png')
   page.screenshot(path=str(path),full_page=True,timeout=15000,animations='disabled')
   results.append({'type':kind,'page':name,'path':str(path.relative_to(root)),'overflow':metrics['width']-metrics['inner'],'chars':len(txt) if page.locator('main').count() else 0})
  if errs:failures +=[(kind,'pageerror',err) for err in errs]
  page.close()
 # separate interaction tests
 page=browser.new_page(viewport={'width':1280,'height':900})
 page.set_content(html,wait_until='load')
 def goto(r):page.evaluate('(r)=>location.hash="#"+r',r);page.wait_for_timeout(30)
 try:
  goto('/');page.get_by_role('link',name='More news').first.click();page.wait_for_timeout(50)
  assert page.evaluate('location.hash')=='#/news','Home more news navigation'
  page.locator('.article-list .article-row a').first.click();page.wait_for_timeout(50)
  assert '/news/' in page.evaluate('location.hash'),'Article nav'
  goto('/tools/run-rate');page.locator('input[name=runs]').fill('120');page.locator('input[name=overs]').fill('15.0');page.get_by_role('button',name='Calculate',exact=True).click()
  assert '8.00' in page.locator('#tool-result .answer').inner_text(),'Run rate calculation'
  goto('/tools/required-run-rate');page.locator('input[name=target]').fill('177');page.locator('input[name=runs]').fill('142');page.locator('input[name=overs]').fill('16.2');page.locator('input[name=limit]').fill('20.0');page.get_by_role('button',name='Calculate',exact=True).click()
  assert '9.55' in page.locator('#tool-result .answer').inner_text(),'Required run rate'
  goto('/qualification');page.locator('input[name=aRuns]').fill('180');page.get_by_role('button',name='Calculate scenario').click()
  assert '180' in page.locator('.lab-outcome').inner_text(),'Scenario update'
  goto('/organizer/scoring');page.locator('[data-score="4"]').click();page.locator('[data-score="Wd"]').click();page.locator('[data-score="1"]').click()
  assert page.locator('.score-runs').inner_text().startswith('6/'),'Scoring runs'
  assert '0.2' in page.locator('.score-over').inner_text(),'Wide should not count as legal ball'
  page.locator('[data-action=undo-ball]').click()
  assert page.locator('.score-runs').inner_text().startswith('5/'),'Undo ball'
  goto('/organizer');page.locator('[data-action="add-team"]').first.click();page.locator('#team-name').fill('Test Club');page.locator('form[data-form=add-team] button[type=submit]').click()
  assert 'Test Club' in page.locator('.dash-page').inner_text(),'Add team'
  goto('/player');page.locator('[data-action=follow-player]').click();goto('/my-cricket');assert 'Babar Azam' in page.locator('.dash-page').inner_text(),'Follow player'
  goto('/admin');page.locator('[data-action=publish-article]').first.click();page.locator('#article-title').fill('Original Test News');page.locator('#article-summary').fill('Testing the local newsroom workflow.');page.locator('form[data-form=publish-article] button[type=submit]').click();assert 'Original Test News' in page.locator('main').inner_text(),'Publish demo article'
  print('INTERACTION TESTS PASSED')
 except Exception as err:
  failures.append(('interaction',str(err)))
 page.close();browser.close()
(root/'tests'/'RESULTS.json').write_text(json.dumps({'routes_tested':len(routes),'screens':len(results),'failures':failures,'screens_data':results},indent=2))
print('SCREENS',len(results),'ROUTES',len(routes),'FAILURES',len(failures))
for f in failures[:25]:print('FAIL',f)
if failures:sys.exit(1)

from pathlib import Path
from PIL import Image,ImageOps,ImageDraw,ImageFont
import ast,re,json,html,zipfile
root=Path(__file__).resolve().parent
src=(root/'tests'/'render_and_smoke.py').read_text()
initial=ast.literal_eval(re.search(r'routes=(\[.*?\])\nfor tool',src,re.S).group(1))
tools=ast.literal_eval(re.search(r'for tool in (\[.*?\]):',src,re.S).group(1))
routes=initial+ [('tool-'+t,'/tools/'+t) for t in tools]
labels={
'home':'Homepage','news':'News & Analysis','article':'News Article','match':'Match Centre','match-list':'All Matches','india-match':'India vs South Africa','aus-match':'Australia vs England','tournaments':'Tournament Centre','player':'Player Profile','tools':'Tools Directory','qualification':'Qualification Lab','local':'Local Cricket','organizer':'Organizer Dashboard','scoring':'Phone-First Scoring','admin':'Admin Dashboard','my-cricket':'User Dashboard','stats':'Stats & Records','compare':'Player Comparison','search':'Global Search'}
items=[]
for i,(name,route) in enumerate(routes):
 base=f'{i+1:02d}_{name}.png'
 for size in ('desktop','mobile'):
  assert (root/'screens'/size/base).exists(),base
 items.append({'name':labels.get(name,name.replace('tool-','').replace('-',' ').title()),'route':route,'size':'desktop','file':'screens/desktop/'+base,'category':'Calculator' if name.startswith('tool-') else 'Dashboard' if name in ('organizer','admin','my-cricket') else 'Core Page'}) if False else None
 items.append({'name':labels.get(name,name.replace('tool-','').replace('-',' ').title()),'route':route,'desktop':'screens/desktop/'+base,'mobile':'screens/mobile/'+base,'category':'Calculator' if name.startswith('tool-') else 'Dashboard' if name in ('organizer','admin','my-cricket') else 'Core Page'})
# preview contact sheet
W,H=455,320
preview=Image.new('RGB',(W*3+36,H*3+36),'#eef3fc'); d=ImageDraw.Draw(preview)
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',18)
key=['home','news','article','match','tournaments','player','tools','qualification','organizer']
for i,k in enumerate(key):
 entry=next(x for x in items if x['route']==next(rt for name,rt in routes if name==k))
 photo=Image.open(root/entry['desktop']).convert('RGB');photo=photo.crop((0,0,photo.width,min(photo.height,1030)))
 thumb=ImageOps.fit(photo,(W-14,H-42),method=Image.Resampling.LANCZOS,centering=(.5,0))
 x=(i%3)*W+8+4*(i%3);y=(i//3)*H+8+4*(i//3)
 d.rounded_rectangle((x-3,y-3,x+W-5,y+H-5),radius=12,fill='white',outline='#d0dff0',width=2)
 d.text((x+8,y+6),f'{i+1:02d}  {labels[k]}',font=font,fill='#173d73')
 preview.paste(thumb,(x+5,y+33))
preview.save(root/'PREVIEW_9_KEY_PAGES.jpg',quality=91,optimize=True)
# mobile 3 sheet
mobile=Image.new('RGB',(1030,740),'#eef3fc');dm=ImageDraw.Draw(mobile)
for i,n in enumerate(['home','news','scoring']):
 ent=next(x for x in items if x['route']==next(rt for name,rt in routes if name==n))
 im=Image.open(root/ent['mobile']).convert('RGB');im=im.crop((0,0,im.width,min(900,im.height)));im.thumbnail((312,658))
 x=16+i*344;y=56
 dm.rounded_rectangle((x-6,y-6,x+im.width+6,y+im.height+6),radius=14,fill='white',outline='#d0dff0',width=2)
 dm.text((x,14),f'{labels[n]} - Mobile',font=font,fill='#173d73')
 mobile.paste(im,(x,y))
mobile.save(root/'PREVIEW_MOBILE.jpg',quality=90,optimize=True)
# gallery
jsdata=json.dumps(items,ensure_ascii=False)
gallery='''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CreaseGrid — Design Gallery</title><style>
:root{--ink:#101c3c;--muted:#64738f;--blue:#1158ed;--line:#dde7f5}*{box-sizing:border-box}body{margin:0;font-family:Inter,ui-sans-serif,Arial,sans-serif;color:var(--ink);background:#f4f7fd}header{background:#fff;border-bottom:1px solid var(--line);padding:20px max(22px,calc((100vw - 1320px)/2))}header a{font-weight:850;color:var(--blue);text-decoration:none}.wrap{max-width:1320px;padding:24px;margin:auto}.hero{background:linear-gradient(100deg,#102b67,#1b62d7);padding:28px;border-radius:18px;color:white;margin-bottom:17px}.hero h1{margin:0 0 7px}.hero p{color:#d9e7ff;margin:0;font-size:13px}.buttons{display:flex;gap:8px;flex-wrap:wrap}.buttons a,.buttons button{border:1px solid #cfdbef;background:#fff;color:#214176;border-radius:9px;padding:11px 14px;font-weight:750;text-decoration:none;cursor:pointer}.buttons button.active{background:var(--blue);color:#fff;border-color:var(--blue)}.controls{display:flex;gap:9px;align-items:center;justify-content:space-between;flex-wrap:wrap;margin:16px 0}.controls input{border:1px solid #c9d6e9;border-radius:10px;padding:11px 14px;min-width:240px}.gallery{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.item{background:#fff;border:1px solid var(--line);border-radius:14px;padding:12px;box-shadow:0 7px 22px #17366a0c;min-width:0}.item img{display:block;width:100%;height:230px;object-fit:cover;object-position:top;border-radius:10px;border:1px solid #e8edf5;cursor:zoom-in}.item h3{font-size:15px;line-height:1.3;margin:10px 0 4px}.item p{font-size:11px;color:var(--muted);margin:0 0 10px}.item a{font-size:12px;font-weight:800;color:var(--blue)}dialog{width:min(1130px,95vw);max-height:92vh;border:0;border-radius:14px;box-shadow:0 20px 90px #071a41b3;padding:16px}dialog::backdrop{background:#07162dcc}dialog img{max-width:100%;height:auto;display:block;margin:auto}.dlg-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}footer{font-size:12px;color:var(--muted);padding:35px 0}@media(max-width:950px){.gallery{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:560px){.gallery{grid-template-columns:1fr}.controls input{width:100%}.item img{height:280px}}
</style></head><body><header><a href="index.html#/">● CreaseGrid</a> <span style="float:right;color:#637c9f;font-size:12px">31 routes · 62 responsive screenshots</span></header><div class="wrap"><div class="hero"><h1>Premium Screen Design Gallery</h1><p>Review the real desktop/mobile renders and open the corresponding working frontend route. All cricket data is illustrative.</p></div><div class="buttons"><a href="index.html#/">Open Working Prototype</a><a href="reference/approved_nine_screen_design_direction.png" target="_blank">Approved Design Reference</a><a href="docs/FULL_MASTER_PRD.md">Product Requirements</a></div><div class="controls"><div class="buttons" id="filter"><button data-filter="All" class="active">All</button><button data-filter="Core Page">Core Pages</button><button data-filter="Dashboard">Dashboards</button><button data-filter="Calculator">Calculators</button></div><div class="buttons" id="size"><button data-size="desktop" class="active">Desktop</button><button data-size="mobile">Mobile</button></div><input id="q" aria-label="Search screen names" placeholder="Search screen titles..."></div><div class="gallery" id="gallery"></div><footer>CreaseGrid V1 interactive design handoff · Standalone sample content · Not a fully deployed product</footer></div><dialog id="preview"><div class="dlg-head"><b id="previewtitle"></b><button onclick="document.querySelector('dialog').close()">Close</button></div><img id="previewimg" alt="Selected design screenshot"></dialog><script>
const data=__ITEMS__;let device='desktop',filter='All';const g=document.getElementById('gallery');function paint(){const q=document.getElementById('q').value.toLowerCase();g.innerHTML='';data.filter(x=>(filter==='All'||x.category===filter)&&x.name.toLowerCase().includes(q)).forEach(x=>{const card=document.createElement('article');card.className='item';const img=document.createElement('img');img.src=x[device];img.alt=x.name+' '+device+' screenshot';img.loading='lazy';img.addEventListener('click',()=>{document.getElementById('previewtitle').textContent=x.name+' — '+device;document.getElementById('previewimg').src=x[device];document.getElementById('preview').showModal()});const title=document.createElement('h3');title.textContent=x.name;const desc=document.createElement('p');desc.textContent=x.category+' · '+device;const link=document.createElement('a');link.href='index.html#'+x.route;link.textContent='Open working screen →';card.append(img,title,desc,link);g.append(card)})}document.querySelectorAll('[data-size]').forEach(b=>b.onclick=()=>{device=b.dataset.size;document.querySelectorAll('[data-size]').forEach(x=>x.classList.toggle('active',x===b));paint()});document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));paint()});document.getElementById('q').oninput=paint;paint();
</script></body></html>'''.replace('__ITEMS__',jsdata)
(root/'OPEN_DESIGN_GALLERY.html').write_text(gallery,encoding='utf-8')
start='''<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta charset="utf-8"><title>CreaseGrid — Start Here</title><style>body{font-family:Inter,Arial,sans-serif;color:#102447;margin:0;background:#f3f7ff}.wrap{max-width:980px;margin:70px auto;padding:20px}.hero{background:linear-gradient(105deg,#0e2d6c,#1a69e7);border-radius:18px;color:white;padding:38px}.hero h1{font-size:40px;margin:0 0 12px}.hero p{color:#dce8ff;line-height:1.7}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px;margin-top:20px}.card{padding:24px;background:white;border:1px solid #dbe4f5;border-radius:15px}.card h2{margin:0 0 10px}.card p{font-size:13px;color:#586d8e;line-height:1.65}.btn{display:inline-block;background:#125cec;padding:13px 17px;border-radius:9px;color:white;text-decoration:none;font-weight:750}.note{padding:18px;background:#eaf1ff;border-radius:11px;margin-top:20px;font-size:13px;color:#375578}@media(max-width:600px){.grid{grid-template-columns:1fr}.hero h1{font-size:29px}.wrap{margin:20px auto}}</style></head><body><div class="wrap"><div class="hero"><h1>CreaseGrid — Premium Rebuild</h1><p>From nine approved visual concepts to responsive browser layouts, working cricket calculators, sample news, a Qualification Lab and a local tournament scoring demo.</p></div><div class="grid"><div class="card"><h2>01 · Working Website</h2><p>Open the interactive source prototype; use the links, calculators, news filters and organizer tools.</p><a class="btn" href="index.html#/">Launch Frontend</a></div><div class="card"><h2>02 · Design Screens</h2><p>Explore all 31 routes in desktop and mobile mode, with 62 browser captures and individual preview links.</p><a class="btn" href="OPEN_DESIGN_GALLERY.html">Browse Screens</a></div></div><div class="note"><b>Recommended:</b> For reliable saved demo state, run <code>python -m http.server 8000</code> in this folder and open <code>http://localhost:8000</code>. The prototype is not a deployed, authenticated or real-time cricket website. Read <a href="README.md">README.md</a> and <a href="AGENTS.md">AGENTS.md</a> before beginning production work in Codex.</div></div></body></html>'''
(root/'START_HERE.html').write_text(start,encoding='utf-8')
(root/'docs'/'SCREEN_ROUTE_LIST.json').write_text(json.dumps(items,indent=2,ensure_ascii=False))
# final archive excluding build scripts and temporary logs
zip_path=root.parent/'CreaseGrid_Premium_Working_Frontend_and_Designs.zip'
with zipfile.ZipFile(zip_path,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=8) as z:
 for path in root.rglob('*'):
  if path.is_file() and path.suffix not in ['.log','.pid']:
   z.write(path,arcname='CreaseGrid_Premium_Rebuild/'+str(path.relative_to(root)))
with zipfile.ZipFile(zip_path) as z:
 assert z.testzip() is None
 print('ZIP',zip_path,'entries',len(z.namelist()),'size MB',round(zip_path.stat().st_size/1e6,2))
print('GALLERY ITEMS',len(items))

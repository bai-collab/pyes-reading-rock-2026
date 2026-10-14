(()=>{
  const $=id=>document.getElementById(id),NS='http://www.w3.org/2000/svg',L=window.ReadingLayout;
  const make=(tag,text,cls)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;};
  const button=(text,fn)=>{const e=make('button',text,'action');e.type='button';e.addEventListener('click',fn);return e;};
  const graph=window.GRAPH_DATA;
  if(!graph?.nodes?.length||!L){$('status').textContent='圖譜資料未載入';$('detail-body').append(make('p','請確認完整網頁檔案。此頁不會在直接開檔時呼叫API。'));return;}
  const all=new Map(graph.nodes.map(n=>[n.id,n])),parent=id=>graph.edges.find(e=>e.type==='CONTAINS'&&e.target===id)?.source;
  const labels=['理念與目標','資源與環境','教學與實施','學生與成效','專業與社群','結語／展望'],numbers=['壹','貳','參','肆','伍','終'];
  let doc='minhe',selected=doc,expanded=null,scene={nodes:[],edges:[]},focus=null,theme='auto',term='',compare=false,gesture=null,suppressClickUntil=0;
  let camera={x:0,y:0,s:1},relatedMap=new Map();const positions=new Map(),elements=new Map(),paths=[];
  // 頁面截圖：伺服器版用 ./pages/ 與 ./pdf/；單檔版由 build 注入 PAGE_BASE，PDF_BASE=null 時改用 Google Drive。
  const PAGE_BASE='PAGE_BASE' in window?window.PAGE_BASE:'./pages/',PDF_BASE='PDF_BASE' in window?window.PDF_BASE:'./pdf/';
  const pageSrc=(d,p)=>`${PAGE_BASE}${d}-${String(p).padStart(2,'0')}.jpg`;
  const narrow=()=>matchMedia('(max-width:700px)').matches;
  const color=i=>getComputedStyle(document.documentElement).getPropertyValue(`--c${i??0}`).trim();
  // 節編號：章群序號＋節序（第六群「終」只有一節，不加序號）；子節再加（一）（二）。
  function sectionCode(n){const s=graph.sections.find(s=>s.id===subsectionParent(n.id));if(!s)return '';const base=s.ch===6?numbers[5]:`${numbers[s.ch-1]}-${s.no}`;if(n.type!=='Subsection')return base;const m=/^（([一二三四五六七八九十]+)）/.exec(n.title);return m?`${base}-(${m[1]})`:base;}
  const subsectionParent=id=>all.get(id)?.type==='Subsection'?parent(id):id;
  const anchor=()=>{const n=all.get(selected);return n?.type==='Subsection'?parent(n.id):n?.type==='Section'?n.id:null;};
  const chapterIndex=id=>{const s=graph.sections.find(s=>s.id===id);return s?s.ch-1:0;};
  function chapterFor(id){const n=all.get(id);if(n?.type==='Chapter')return id;const s=graph.sections.find(s=>s.id===subsectionParent(id));return s?`${s.doc}-ch${s.ch}`:null;}
  function computeRelated(){relatedMap=new Map();const n=all.get(selected);if(!n||!['Section','Subsection'].includes(n.type))return;const self=anchor();for(const r of L.related(graph,n,theme))if(r.id!==self)relatedMap.set(r.id,r.themes);}
  function panel(name,open){const el=$(name);el.classList.toggle('collapsed',!open);const b=$(name+'-toggle');b.textContent=open?'−':'＋';b.setAttribute('aria-expanded',String(open));b.setAttribute('aria-label',(open?'收合':'展開')+(name==='legend'?'章節圖例':'內容面板'));if(open&&narrow())panel(name==='legend'?'detail':'legend',false);}
  $('legend-toggle').onclick=()=>panel('legend',$('legend').classList.contains('collapsed'));
  $('detail-toggle').onclick=()=>panel('detail',$('detail').classList.contains('collapsed'));
  if(innerWidth<=1100){panel('legend',false);panel('detail',false);}
  function applyCamera(){ $('board').style.transform=`translate(${camera.x}px,${camera.y}px) scale(${camera.s})`;$('zoom-value').textContent=Math.round(camera.s*100)+'%';}
  function safeViewport(){const header=$('topbar').getBoundingClientRect(),w=innerWidth,h=innerHeight;let left=24,right=24;
    if(w>1100){left=$('legend').getBoundingClientRect().width+40;right=$('detail').getBoundingClientRect().width+40;}
    return {x:left,y:header.bottom+24,w:Math.max(160,w-left-right),h:Math.max(160,h-header.bottom-(narrow()?150:80))};
  }
  function fit(nodes=scene.nodes){const b=L.bounds(nodes),v=safeViewport(),scale=Math.min(v.w/(b.w+100),v.h/(b.h+100),1.2);camera={s:Math.max(.08,scale),x:v.x+v.w/2-(b.x+b.w/2)*scale,y:v.y+v.h/2-(b.y+b.h/2)*scale};applyCamera();}
  function relevant(n){if(!focus)return true;if(n.id===doc)return true;if(focus.kind==='chapter')return n.chapter===focus.id;if(focus.kind==='section')return n.id===focus.id||n.id===chapterFor(focus.id)||parent(n.id)===focus.id||relatedMap.has(n.id);return true;}
  function focusView(){fit(scene.nodes.filter(relevant));}
  function updateWires(){for(const [p,e] of paths){const a=scene.nodes.find(n=>n.id===e.source),b=scene.nodes.find(n=>n.id===e.target);if(!a||!b)continue;const start=L.endpoint(a,b),end=L.endpoint(b,a);
    if(e.kind==='theme'){const k=e.crossChapter?.55:.82,cx=(start.x+end.x)/2*k,cy=(start.y+end.y)/2*k;p.setAttribute('d',`M ${start.x} ${start.y} Q ${cx} ${cy} ${end.x} ${end.y}`);}
    else p.setAttribute('d',`M ${start.x} ${start.y} L ${end.x} ${end.y}`);
    p.dataset.endX=String(end.x);p.dataset.endY=String(end.y);}}
  function updatePosition(n){const el=elements.get(n.id);el.style.left=n.x+'px';el.style.top=n.y+'px';el.dataset.worldX=String(n.x);el.dataset.worldY=String(n.y);}
  const matches=n=>JSON.stringify([n.title,n.points,n.examples,n.tags,n.subsections]).toLocaleLowerCase().includes(term);
  function emphasis(){
    const an=anchor();
    scene.nodes.forEach(n=>{const el=elements.get(n.id);el.classList.toggle('dim',!relevant(n));el.classList.toggle('hot',n.id===selected||focus?.id===n.id);el.classList.toggle('related',relatedMap.has(n.id));el.classList.toggle('search-hit',Boolean(term)&&matches(n));});
    paths.forEach(([p,e])=>{const a=scene.nodes.find(n=>n.id===e.source),b=scene.nodes.find(n=>n.id===e.target);
      if(e.kind==='theme'&&an){const on=(e.source===an&&relatedMap.has(e.target))||(e.target===an&&relatedMap.has(e.source));p.classList.toggle('hot',on);p.classList.toggle('dim',!on);return;}
      p.classList.toggle('dim',Boolean(focus)&&(!relevant(a)||!relevant(b)));p.classList.toggle('hot',Boolean(focus)&&e.kind!=='theme'&&relevant(a)&&relevant(b));});
    $('reset').disabled=!focus&&!expanded;document.querySelectorAll('#chapter-list button').forEach(b=>b.setAttribute('aria-pressed',String(focus?.id===b.dataset.chapter)));
  }
  // ---- 原文頁檢視器 ----
  let viewing=null;
  function pdfHref(d,p){return PDF_BASE?`${PDF_BASE}${d.id}.pdf#page=${p}`:d.url;}
  function openPage(docId,p,list){const d=graph.documents.find(x=>x.id===docId);if(!d)return;viewing={d,p,list:list?.length?list:[p]};showPage();const dlg=$('viewer');if(!dlg.open)dlg.showModal();}
  function showPage(){const {d,p,list}=viewing,i=list.indexOf(p);const img=$('viewer-img');img.classList.remove('failed');img.alt=`${d.school}方案 PDF 第${p}頁截圖`;img.src=pageSrc(d.id,p);
    $('viewer-title').textContent=`${d.school.replace(/^.*?(\S{2}國小)$/,'$1')}｜PDF 第${p}頁${d.offset?`（印刷頁 ${p-d.offset}）`:''}`;
    $('viewer-count').textContent=list.length>1?`本節頁面 ${i+1}／${list.length}`:'本節頁面 1／1';
    $('viewer-prev').disabled=p<=1;$('viewer-next').disabled=p>=d.pages;
    const a=$('viewer-pdf');a.href=pdfHref(d,p);a.textContent=PDF_BASE?`開啟 PDF 第 ${p} 頁`:`在 Google Drive 開啟（請翻到第 ${p} 頁）`;
    $('viewer-drive').href=d.url;$('viewer-drive').hidden=!PDF_BASE;$('viewer-error').hidden=true;}
  $('viewer-img').addEventListener('error',()=>{$('viewer-img').classList.add('failed');$('viewer-error').hidden=false;});
  $('viewer-img').addEventListener('click',()=>$('viewer-img').classList.toggle('zoomed'));
  $('viewer-prev').onclick=()=>{viewing.p=Math.max(1,viewing.p-1);showPage();};
  $('viewer-next').onclick=()=>{viewing.p=Math.min(viewing.d.pages,viewing.p+1);showPage();};
  $('viewer-close').onclick=()=>$('viewer').close();
  $('viewer').addEventListener('keydown',e=>{if(e.key==='ArrowLeft'&&!$('viewer-prev').disabled)$('viewer-prev').click();if(e.key==='ArrowRight'&&!$('viewer-next').disabled)$('viewer-next').click();});
  $('viewer').addEventListener('click',e=>{if(e.target===$('viewer'))$('viewer').close();});
  function source(n,out){const d=graph.documents.find(d=>d.id===(n.doc||n.id));if(!d)return;const p=n.p||[];
    if(!p.length){const a=make('a',`開啟${d.school}原方案`,'source');a.href=d.url;a.target='_blank';a.rel='noopener noreferrer';out.append(a);return;}
    const box=make('div',undefined,'pages');box.append(make('p',`原文頁面（點縮圖放大）｜PDF ${p.join('、')}頁${d.offset?'／印刷 '+p.map(x=>x-d.offset).join('、')+'頁':''}`,'pages-label'));
    const row=make('div',undefined,'thumb-row');
    p.forEach(x=>{const b=make('button',undefined,'thumb');b.type='button';b.setAttribute('aria-label',`放大檢視 PDF 第${x}頁截圖`);const img=make('img');img.loading='lazy';img.alt='';img.src=pageSrc(d.id,x);img.addEventListener('error',()=>b.classList.add('failed'));b.append(img,make('span',`第${x}頁`));b.addEventListener('click',()=>openPage(d.id,x,p));row.append(b);});
    box.append(row);const a=make('a',PDF_BASE?`開啟 PDF 第 ${p[0]} 頁`:`Google Drive 原檔（第 ${p[0]} 頁）`,'source');a.href=pdfHref(d,p[0]);a.target='_blank';a.rel='noopener noreferrer';box.append(a);out.append(box);}
  function details(){
    const out=$('detail-body');out.replaceChildren();
    if(compare){out.append(make('h3','兩校如何連起閱讀與行動'),make('p','以下為整理者跨文件比較；不是原方案共同提出的主張。','note'));graph.comparisons.forEach(c=>{out.append(make('h4',c.theme),make('p','民和｜'+c.minhe),make('p','龍山｜'+c.longshan));c.refs.forEach(id=>out.append(button((id.startsWith('minhe')?'民和｜':'龍山｜')+all.get(id).title,()=>choose(id))));});return;}
    const n=all.get(selected)||all.get(doc),type={Document:'學校方案核心',Chapter:'原文章群',Section:'原文章節',Subsection:'原文子節'};
    out.append(make('p',type[n.type]||'來源內容','badge'),make('h3',n.type==='Document'?graph.documents.find(d=>d.id===doc).title:['Section','Subsection'].includes(n.type)?sectionCode(n)+'｜'+n.title:n.title));
    if(n.type==='Document'){
      out.append(make('p',n.summary),make('p','這張圖以學校為核心，向外接六個章群，再展開每節的重點與原文範例卡。點章群聚焦整組，點節卡看完整內容、相關節與原文頁面截圖；有子節的卡可再往外展開。'));
      out.append(make('p','實線是原文章節包含；虛線弧線連接「共有同一整理者主題」的兩節，可跨章，不能解讀成因果。','note'));source(n,out);
    }else if(n.type==='Chapter'){
      const sections=graph.sections.filter(s=>s.doc===doc&&`${doc}-ch${s.ch}`===n.id);out.append(make('p',`${sections.length}節；點卡或以下節名看重點、範例與來源。`));sections.forEach(s=>out.append(button(s.title,()=>choose(s.id))));source(n,out);
    }else{
      out.append(make('h4','本節重點（整理摘要）'));const ul=make('ul');(n.points||[]).forEach(p=>ul.append(make('li',p)));out.append(ul,make('h4','原文範例（摘要）'));(n.examples||[]).forEach(t=>out.append(make('p',t,'example')));source(n,out);
      if(relatedMap.size){out.append(make('h4',`相關節（${relatedMap.size}）｜共有主題`));const list=make('div',undefined,'related-list');
        [...relatedMap].sort((a,b)=>b[1].length-a[1].length).forEach(([id,themes])=>{const r=all.get(id),b=button('',()=>choose(id));b.style.setProperty('--node-color',color(chapterIndex(id)));b.append(make('span',`${numbers[chapterIndex(id)]}｜${r.title}`,'related-title'),make('span',themes.join('、'),'related-themes'));list.append(b);});
        out.append(list,make('p','相關＝共有同一個整理者主題標籤，不代表因果或先後。','note'));}
      else if(n.tags?.length)out.append(make('p','目前的主題篩選下，沒有其他節共有主題。','note'));
      if(n.subsections?.length){out.append(button(expanded===n.id?'收合子節卡':'展開子節卡（'+n.subsections.length+'）',()=>{expanded=expanded===n.id?null:n.id;render();focusView();}));out.append(make('h4','本節所有子節'));graph.nodes.filter(s=>s.type==='Subsection'&&parent(s.id)===n.id).forEach(s=>{const card=make('div',undefined,'subsection');card.append(button(s.title,()=>choose(s.id)),make('p','重點：'+s.points[0]),make('p','範例：'+s.examples[0],'example'));source(s,card);out.append(card);});}
      if(n.type==='Subsection')out.append(button('回到所屬節',()=>choose(parent(n.id))));
      if(n.tags?.length){out.append(make('h4','只看某一主題的虛線'));const tags=make('div',undefined,'tag-row');n.tags.forEach(t=>tags.append(button(t,()=>{theme=t;$('theme').value=t;render();})));if(theme!=='auto')tags.append(button('顯示全部主題',()=>{theme='auto';$('theme').value='auto';render();}));out.append(tags);}
    }
    out.append(make('p',graph.evidenceNotice,'note'));
  }
  function render(){
    computeRelated();
    scene=L.layout(graph,doc,expanded);scene.nodes.forEach(n=>{const p=positions.get(n.id);if(p){n.x=p.x;n.y=p.y;}});scene.edges.push(...L.links(graph,scene.nodes,theme));elements.clear();paths.length=0;$('nodes').replaceChildren();$('wires').replaceChildren();
    const chapters=scene.nodes.filter(n=>n.type==='Chapter');$('chapter-list').replaceChildren();chapters.forEach((n,i)=>{const b=button('',()=>choose(n.id));b.dataset.chapter=n.id;b.style.setProperty('--node-color',color(i));b.append(make('span',numbers[i],'chapter-dot'),make('span',labels[i],'chapter-short'),make('span',`${graph.sections.filter(s=>s.doc===doc&&`${doc}-ch${s.ch}`===n.id).length}節`,'chapter-count'));b.title=n.title;$('chapter-list').append(b);});
    for(const n of scene.nodes){const el=make('button');el.type='button';el.className='node '+({Document:'hub',Chapter:'chapter',Section:'card',Subsection:'card subcard'}[n.type]||'card');el.dataset.nodeid=n.id;el.dataset.type=n.type;el.setAttribute('aria-label',n.type==='Document'?'學校核心：'+n.title:n.type==='Chapter'?'章群：'+n.title:'內容卡 '+sectionCode(n)+'：'+n.title);el.style.setProperty('--node-color',color(n.color));
      if(n.type==='Document'){el.append(make('span','核心','overline'),make('span',doc==='minhe'?'民和國小':'龍山國小','node-title'),make('span',doc==='minhe'?'閱萬年 · 展藝創永續':'樂讀 · 深學 · 共好','node-sub'));}
      else if(n.type==='Chapter'){const i=chapters.findIndex(c=>c.id===n.id);el.append(make('span',numbers[i],'chapter-no'),make('span',labels[i],'node-title'),make('span',`${graph.sections.filter(s=>s.doc===doc&&`${doc}-ch${s.ch}`===n.id).length}節 · 點選聚焦`,'node-sub'));}
      else{const top=make('span',undefined,'node-type');const tag=make('span',undefined,'node-tag');tag.append(make('b',sectionCode(n),'node-code'),make('span',n.type==='Subsection'?'子節':'節'));top.append(tag,make('span','PDF '+n.p.join('、')+'頁'));el.append(top,make('span',n.title.replace(/^[一二三四五六]、/,''),'node-title'));for(const [label,text] of [['重點',n.points?.[0]],['範例',n.examples?.[0]]]){const row=make('span',undefined,'node-row');row.append(make('b',label),make('span',text||'原節未另提供'));el.append(row);}
        if(relatedMap.has(n.id))el.append(make('span','相關：'+relatedMap.get(n.id).join('、'),'related-chip'));}
      el.title=n.title;el.addEventListener('click',e=>{if(e.detail===0||performance.now()>suppressClickUntil)choose(n.id);});$('nodes').append(el);elements.set(n.id,el);updatePosition(n);
    }
    for(const e of scene.edges){const path=document.createElementNS(NS,'path');path.classList.add('wire',e.kind==='theme'?'theme':e.source===doc?'trunk':'branch');path.style.setProperty('--node-color',color(e.color));path.dataset.source=e.source;path.dataset.target=e.target;path.dataset.kind=e.kind;if(e.theme)path.dataset.theme=e.theme;const title=document.createElementNS(NS,'title');title.textContent=e.kind==='theme'?`同主題：${e.theme}（整理者分類）`:'包含：原文階層';path.append(title);$('wires').append(path);paths.push([path,e]);}
    updateWires();emphasis();details();const themeCount=scene.edges.filter(e=>e.kind==='theme').length;$('counts').textContent=`兩份資料共35節、51子節；目前畫出${scene.nodes.length}個節點、${themeCount}條同主題虛線。完整重點／範例在內容面板。`;$('status').textContent=(doc==='minhe'?'民和':'龍山')+'｜核心 → 六個章群 → 重點與範例卡'+(relatedMap.size?`｜相關節 ${relatedMap.size}`:'');
  }
  function choose(id){const n=all.get(id);if(!n)return;const targetDoc=n.type==='Document'?n.id:n.doc;if(targetDoc&&doc!==targetDoc){doc=targetDoc;$('document').value=doc;expanded=null;}
    selected=id;compare=false;$('search-results').hidden=true;
    if(n.type==='Document'){focus=null;expanded=null;}else if(n.type==='Chapter'){focus={kind:'chapter',id};}else{if(n.type==='Subsection')expanded=parent(id);focus={kind:'section',id:subsectionParent(id)};}
    render();panel('detail',true);$('detail').scrollTop=0;focusView();
  }
  function reset(){selected=doc;focus=null;expanded=null;compare=false;term='';$('search').value='';$('search-results').hidden=true;render();fit();}
  $('fit').onclick=()=>fit();$('reset').onclick=reset;
  function zoom(factor,x=innerWidth/2,y=innerHeight/2){const s=Math.min(3,Math.max(.08,camera.s*factor)),wx=(x-camera.x)/camera.s,wy=(y-camera.y)/camera.s;camera={s,x:x-wx*s,y:y-wy*s};applyCamera();}
  $('zoom-in').onclick=()=>zoom(1.18);$('zoom-out').onclick=()=>zoom(1/1.18);
  $('stage').addEventListener('wheel',e=>{e.preventDefault();zoom(Math.exp(-e.deltaY*.0013),e.clientX,e.clientY);},{passive:false});
  $('stage').addEventListener('pointerdown',e=>{if(e.button!==0||gesture)return;const id=e.target.closest('[data-nodeid]')?.dataset.nodeid,node=scene.nodes.find(n=>n.id===id);gesture={pointer:e.pointerId,startX:e.clientX,startY:e.clientY,x:e.clientX,y:e.clientY,node,moved:false};$('stage').setPointerCapture(e.pointerId);});
  $('stage').addEventListener('pointermove',e=>{if(!gesture||e.pointerId!==gesture.pointer)return;const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;gesture.x=e.clientX;gesture.y=e.clientY;if(Math.hypot(e.clientX-gesture.startX,e.clientY-gesture.startY)>5)gesture.moved=true;if(!gesture.moved)return;
    $('stage').classList.add('dragging');if(gesture.node){const n=gesture.node;n.x+=dx/camera.s;n.y+=dy/camera.s;positions.set(n.id,{x:n.x,y:n.y});elements.get(n.id).classList.add('dragging');updatePosition(n);updateWires();}else{camera.x+=dx;camera.y+=dy;applyCamera();}
  });
  function endGesture(e){if(!gesture||e.pointerId!==gesture.pointer)return;const chosen=gesture.node?.id,click=!gesture.moved&&e.type==='pointerup';suppressClickUntil=performance.now()+180;if(gesture.node)elements.get(gesture.node.id)?.classList.remove('dragging');if($('stage').hasPointerCapture(e.pointerId))$('stage').releasePointerCapture(e.pointerId);gesture=null;$('stage').classList.remove('dragging');if(click&&chosen)choose(chosen);}
  $('stage').addEventListener('pointerup',endGesture);$('stage').addEventListener('pointercancel',endGesture);
  $('document').onchange=e=>{doc=e.target.value;theme='auto';$('theme').value=theme;reset();};
  graph.nodes.filter(n=>n.type==='Theme').forEach(n=>{const option=make('option',n.title);option.value=n.title;$('theme').append(option);});
  $('theme').onchange=e=>{theme=e.target.value;render();};
  $('search').addEventListener('input',e=>{term=e.target.value.trim().toLocaleLowerCase();const out=$('search-results');out.replaceChildren();out.hidden=!term;if(term){const found=graph.nodes.filter(n=>['Section','Subsection'].includes(n.type)&&matches(n));out.append(make('p',`${found.length}個節／子節符合搜尋`));found.forEach(n=>out.append(button((n.doc==='minhe'?'民和｜':'龍山｜')+n.title,()=>choose(n.id))));if(!found.length)out.append(make('p','沒有符合的內容；請換個關鍵字或清除搜尋。'));}emphasis();});
  $('search').addEventListener('keydown',e=>{if(e.key==='Escape'){$('search-results').hidden=true;}if(e.key==='Enter'){const first=graph.nodes.find(n=>['Section','Subsection'].includes(n.type)&&matches(n));if(term&&first)choose(first.id);}});
  $('theme-toggle').onclick=()=>{const dark=document.documentElement.dataset.theme!=='dark';document.documentElement.dataset.theme=dark?'dark':'light';$('theme-toggle').textContent=dark?'淺色':'深色';scene.nodes.forEach(n=>elements.get(n.id).style.setProperty('--node-color',color(n.color)));paths.forEach(([p,e])=>p.style.setProperty('--node-color',color(e.color)));document.querySelectorAll('#chapter-list button').forEach((el,i)=>el.style.setProperty('--node-color',color(i)));};
  $('compare').onclick=()=>{compare=!compare;details();panel('detail',true);$('detail').scrollTop=0;};
  $('download').onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(graph,null,2)],{type:'application/json'})),a=make('a');a.href=url;a.download='reading-knowledge-graph.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
  addEventListener('resize',()=>{if(narrow()){panel('legend',false);panel('detail',false);}focusView();});
  render();requestAnimationFrame(()=>fit());
})();

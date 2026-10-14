(()=>{
  const $=id=>document.getElementById(id),NS='http://www.w3.org/2000/svg',L=window.ReadingLayout;
  const make=(tag,text,cls)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;};
  const button=(text,fn)=>{const e=make('button',text,'action');e.type='button';e.addEventListener('click',fn);return e;};
  const graph=window.GRAPH_DATA;
  if(!graph?.nodes?.length||!L){$('status').textContent='圖譜資料未載入';$('detail-body').append(make('p','請確認完整網頁檔案。此頁不會呼叫API。'));return;}
  const all=new Map(graph.nodes.map(n=>[n.id,n])),parent=id=>graph.edges.find(e=>e.type==='CONTAINS'&&e.target===id)?.source;
  const docMeta=id=>graph.documents.find(d=>d.id===id);
  let doc=graph.documents[0].id,selected=doc,expanded=null,scene={nodes:[],edges:[]},focus=null,theme='auto',term='',gaps=false,gesture=null,suppressClickUntil=0;
  let camera={x:0,y:0,s:1},relatedMap=new Map();const positions=new Map(),elements=new Map(),paths=[];
  const narrow=()=>matchMedia('(max-width:700px)').matches;
  const color=i=>getComputedStyle(document.documentElement).getPropertyValue(`--c${i??0}`).trim();
  // 卡片編號：申報書用「章群序號-節序」（只有一節的章只寫章號），子項加 -(序)；課程總圖用「主軸號｜年級」。
  const GRADES=['一年級','二年級','三年級','四年級','五年級','六年級'];
  function sectionCode(n){const s=graph.sections.find(s=>s.id===subsectionParent(n.id));if(!s)return '';const d=docMeta(s.doc),g=d.groupNumbers[s.ch-1];
    const base=(s.doc==='curriculum'||s.doc==='history')?`${g}｜${GRADES[s.no-1]}`:(graph.sections.filter(x=>x.doc===s.doc&&x.ch===s.ch).length===1?g:`${g}-${s.no}`);
    if(n.type!=='Subsection')return base;const m=/-sub(\d+)$/.exec(n.id);return m?`${base}-(${m[1]})`:base;}
  const subsectionParent=id=>all.get(id)?.type==='Subsection'?parent(id):id;
  const anchor=()=>{const n=all.get(selected);return n?.type==='Subsection'?parent(n.id):n?.type==='Section'?n.id:null;};
  const groupIndex=id=>{const s=graph.sections.find(s=>s.id===subsectionParent(id));return s?s.ch-1:0;};
  const sectionsOf=(d,chId)=>graph.sections.filter(s=>s.doc===d&&`${d}-ch${s.ch}`===chId);
  function chapterFor(id){const n=all.get(id);if(n?.type==='Chapter')return id;const s=graph.sections.find(s=>s.id===subsectionParent(id));return s?`${s.doc}-ch${s.ch}`:null;}
  function computeRelated(){relatedMap=new Map();const n=all.get(selected);if(!n||!['Section','Subsection'].includes(n.type))return;const self=anchor();for(const r of L.related(graph,n,theme))if(r.id!==self)relatedMap.set(r.id,r.themes);}
  function panel(name,open){const el=$(name);el.classList.toggle('collapsed',!open);const b=$(name+'-toggle');b.textContent=open?'−':'＋';b.setAttribute('aria-expanded',String(open));b.setAttribute('aria-label',(open?'收合':'展開')+(name==='legend'?'圖例':'內容面板'));if(open&&narrow())panel(name==='legend'?'detail':'legend',false);}
  $('legend-toggle').onclick=()=>panel('legend',$('legend').classList.contains('collapsed'));
  $('detail-toggle').onclick=()=>panel('detail',$('detail').classList.contains('collapsed'));
  if(innerWidth<=1100){panel('legend',false);panel('detail',false);}
  function applyCamera(){$('board').style.transform=`translate(${camera.x}px,${camera.y}px) scale(${camera.s})`;$('zoom-value').textContent=Math.round(camera.s*100)+'%';}
  function safeViewport(){const header=$('topbar').getBoundingClientRect(),w=innerWidth,h=innerHeight;let left=24,right=24;
    if(w>1100){left=$('legend').getBoundingClientRect().width+40;right=$('detail').getBoundingClientRect().width+40;}
    return {x:left,y:header.bottom+24,w:Math.max(160,w-left-right),h:Math.max(160,h-header.bottom-(narrow()?150:80))};}
  function fit(nodes=scene.nodes){const b=L.bounds(nodes),v=safeViewport(),scale=Math.min(v.w/(b.w+100),v.h/(b.h+100),1.2);camera={s:Math.max(.08,scale),x:v.x+v.w/2-(b.x+b.w/2)*scale,y:v.y+v.h/2-(b.y+b.h/2)*scale};applyCamera();}
  function relevant(n){if(!focus)return true;if(n.id===doc)return true;if(focus.kind==='chapter')return n.chapter===focus.id;if(focus.kind==='section')return n.id===focus.id||n.id===chapterFor(focus.id)||parent(n.id)===focus.id||relatedMap.has(n.id);return true;}
  function focusView(){fit(scene.nodes.filter(relevant));}
  function updateWires(){for(const [p,e] of paths){const a=scene.nodes.find(n=>n.id===e.source),b=scene.nodes.find(n=>n.id===e.target);if(!a||!b)continue;const start=L.endpoint(a,b),end=L.endpoint(b,a);
    if(e.kind==='theme'){const k=e.crossChapter?.55:.82,cx=(start.x+end.x)/2*k,cy=(start.y+end.y)/2*k;p.setAttribute('d',`M ${start.x} ${start.y} Q ${cx} ${cy} ${end.x} ${end.y}`);}
    else p.setAttribute('d',`M ${start.x} ${start.y} L ${end.x} ${end.y}`);
    p.dataset.endX=String(end.x);p.dataset.endY=String(end.y);}}
  function updatePosition(n){const el=elements.get(n.id);el.style.left=n.x+'px';el.style.top=n.y+'px';el.dataset.worldX=String(n.x);el.dataset.worldY=String(n.y);}
  const matches=n=>JSON.stringify([n.title,n.points,n.examples,n.tags,n.subsections,n.discussion,n.missing,n.raw]).toLocaleLowerCase().includes(term);
  function emphasis(){
    const an=anchor();
    scene.nodes.forEach(n=>{const el=elements.get(n.id);el.classList.toggle('dim',!relevant(n));el.classList.toggle('hot',n.id===selected||focus?.id===n.id);el.classList.toggle('related',relatedMap.has(n.id));el.classList.toggle('search-hit',Boolean(term)&&matches(n));});
    paths.forEach(([p,e])=>{const a=scene.nodes.find(n=>n.id===e.source),b=scene.nodes.find(n=>n.id===e.target);
      if(e.kind==='theme'&&an){const on=(e.source===an&&relatedMap.has(e.target))||(e.target===an&&relatedMap.has(e.source));p.classList.toggle('hot',on);p.classList.toggle('dim',!on);return;}
      p.classList.toggle('dim',Boolean(focus)&&(!relevant(a)||!relevant(b)));p.classList.toggle('hot',Boolean(focus)&&e.kind!=='theme'&&relevant(a)&&relevant(b));});
    $('reset').disabled=!focus&&!expanded;document.querySelectorAll('#chapter-list button').forEach(b=>b.setAttribute('aria-pressed',String(focus?.id===b.dataset.chapter)));
  }
  function source(n,out){const d=docMeta(n.doc||n.id);if(!d)return;const a=make('a',`開啟原文件：${d.short}（Google 文件${n.loc&&n.type!=='Document'?`，請找「${n.loc.replace(/^申報書 /,'')}」`:''}）`,'source');a.href=n.sourceUrl||d.url;a.target='_blank';a.rel='noopener noreferrer';out.append(a);}
  function flagList(out,title,items,cls){if(!items?.length)return;out.append(make('h4',title,cls+'-head'));const ul=make('ul',undefined,cls+'-list');items.forEach(t=>ul.append(make('li',t)));out.append(ul);}
  function gapsView(out){
    out.append(make('h3','待補與討論中清單'),make('p','依原文空白、【校方補件】或意義不明整理成「待補」；格內或括號內的教師筆記整理成「討論中」。點標題可跳到該卡。','note'));
    for(const d of graph.documents){out.append(make('h4',d.short));const dn=all.get(d.id);flagList(out,'整份文件待補',dn.gaps,'missing');
      for(const s of graph.sections.filter(s=>s.doc===d.id&&(s.missing.length||s.discussion.length))){const box=make('div',undefined,'gap-item');box.append(button(s.title,()=>choose(s.id)));
        if(s.missing.length)box.append(make('p','待補：'+s.missing.join('；'),'gap-missing'));if(s.discussion.length)box.append(make('p','討論中：'+s.discussion.join('；'),'gap-discussion'));out.append(box);}}
  }
  function details(){
    const out=$('detail-body');out.replaceChildren();
    if(gaps){gapsView(out);return;}
    const n=all.get(selected)||all.get(doc),d=docMeta(doc),type={Document:'文件核心',Chapter:'群組',Section:'內容卡',Subsection:'子項'};
    out.append(make('p',type[n.type]||'來源內容','badge'),make('h3',n.type==='Document'?d.title:['Section','Subsection'].includes(n.type)?sectionCode(n)+'｜'+n.title.replace(/^[一二三四五六]年級｜/,'').replace(/^\d-\d /,''):n.title));
    if(n.type==='Document'){
      out.append(make('p',n.summary),...(n.groupNote?[make('p',n.groupNote,'raw')]:[]),make('p',n.limits,'note'),make('p','點群組可聚焦整組；點內容卡可看重點、原文、討論中與待補，並亮起有共同主題的其他卡。','note'));flagList(out,'整份文件待補',n.gaps,'missing');source(n,out);if(n.originalUrl){const a=make('a',`開啟${n.originalShort||'原始版本'}`,'source');a.href=n.originalUrl;a.target='_blank';a.rel='noopener noreferrer';out.append(a);}
    }else if(n.type==='Chapter'){
      const ss=sectionsOf(doc,n.id),gi=Number(n.id.split('-ch')[1])-1;if(d.groupOriginal&&d.groupOriginal[gi]!==d.groupLabels[gi])out.append(make('p',`主軸名稱已定案；原文件名稱「${d.groupOriginal[gi]}」`,'raw'));out.append(make('p',n.title,'raw'),make('p',`${ss.length}張卡；點卡或以下名稱查看內容。`));ss.forEach(s=>out.append(button(s.title,()=>choose(s.id))));source(n,out);
    }else{
      out.append(make('h4','重點（整理）'));const ul=make('ul');(n.points||[]).forEach(p=>ul.append(make('li',p)));out.append(ul,make('h4','原文內容'));(n.examples||[]).forEach(t=>out.append(make('p',t,'example')));
      if(n.raw)out.append(make('p','原文格內容：'+n.raw,'raw'));
      flagList(out,'討論中（教師筆記，未定案）',n.discussion,'discussion');flagList(out,'待補（之後補上）',n.missing,'missing');
      if(n.crossRefs?.length){out.append(make('h4','跨文件對照'));n.crossRefs.forEach(r=>{const box=make('div',undefined,'xref');box.append(make('b',r.label),make('p',r.text));if(r.ref&&all.get(r.ref))box.append(button('前往：'+all.get(r.ref).title,()=>choose(r.ref)));out.append(box);});}
      if(n.results?.length){out.append(make('h4','成果與證據'));for(const kind of ['照片','撰寫稿','補件']){const rs=n.results.filter(r=>r.kind===kind);if(!rs.length)continue;const box=make('div',undefined,'results');box.append(make('b',kind==='補件'?'補件檢核表':kind));const row=make('p',undefined,'result-links');rs.forEach(r=>{const a=make('a',r.label,'result-link');a.href=r.url;a.target='_blank';a.rel='noopener noreferrer';row.append(a);});box.append(row);out.append(box);}}
      source(n,out);
      if(relatedMap.size){out.append(make('h4',`相關卡（${relatedMap.size}）｜共有主題`));const list=make('div',undefined,'related-list');
        [...relatedMap].sort((a,b)=>b[1].length-a[1].length).forEach(([id,themes])=>{const r=all.get(id),b=button('',()=>choose(id));b.style.setProperty('--node-color',color(groupIndex(id)));b.append(make('span',`${d.groupNumbers[groupIndex(id)]}｜${r.title}`,'related-title'),make('span',themes.join('、'),'related-themes'));list.append(b);});
        out.append(list,make('p','相關＝共有同一個整理者主題標籤，不代表因果或先後。','note'));}
      if(n.subsections?.length){out.append(button(expanded===n.id?'收合子項卡':'展開子項卡（'+n.subsections.length+'）',()=>{expanded=expanded===n.id?null:n.id;render();focusView();}));out.append(make('h4','本節子項'));graph.nodes.filter(s=>s.type==='Subsection'&&parent(s.id)===n.id).forEach(s=>{const card=make('div',undefined,'subsection');card.append(button(s.title,()=>choose(s.id)),make('p','重點：'+s.points[0]),make('p','範例：'+s.examples[0],'example'));out.append(card);});}
      if(n.type==='Subsection')out.append(button('回到所屬節',()=>choose(parent(n.id))));
      if(n.tags?.length){out.append(make('h4','只看某一主題的虛線'));const tags=make('div',undefined,'tag-row');n.tags.forEach(t=>tags.append(button(t,()=>{theme=t;$('theme').value=t;render();})));if(theme!=='auto')tags.append(button('顯示全部主題',()=>{theme='auto';$('theme').value='auto';render();}));out.append(tags);}
    }
    out.append(make('p',graph.evidenceNotice,'note'));
  }
  function render(){
    computeRelated();const d=docMeta(doc);
    scene=L.layout(graph,doc,expanded);scene.nodes.forEach(n=>{const p=positions.get(n.id);if(p){n.x=p.x;n.y=p.y;}});scene.edges.push(...L.links(graph,scene.nodes,theme,anchor()));elements.clear();paths.length=0;$('nodes').replaceChildren();$('wires').replaceChildren();
    const chapters=scene.nodes.filter(n=>n.type==='Chapter');$('chapter-list').replaceChildren();chapters.forEach((n,i)=>{const b=button('',()=>choose(n.id));b.dataset.chapter=n.id;b.style.setProperty('--node-color',color(i));b.append(make('span',d.groupNumbers[i],'chapter-dot'),make('span',d.groupLabels[i],'chapter-short'),make('span',`${sectionsOf(doc,n.id).length}張`,'chapter-count'));b.title=n.title;$('chapter-list').append(b);});
    for(const n of scene.nodes){const el=make('button');el.type='button';el.className='node '+({Document:'hub',Chapter:'chapter',Section:'card',Subsection:'card subcard'}[n.type]||'card');el.dataset.nodeid=n.id;el.dataset.type=n.type;el.setAttribute('aria-label',n.type==='Document'?'核心：'+n.title:n.type==='Chapter'?'群組：'+n.title:'內容卡 '+sectionCode(n)+'：'+n.title);el.style.setProperty('--node-color',color(n.color));
      if(n.type==='Document'){el.append(make('span','核心','overline'),make('span',d.hubTitle,'node-title'),make('span',d.hubSub,'node-sub'));}
      else if(n.type==='Chapter'){const i=chapters.findIndex(c=>c.id===n.id);el.append(make('span',d.groupNumbers[i],'chapter-no'),make('span',d.groupLabels[i],'node-title'),make('span',`${sectionsOf(doc,n.id).length}張 · 點選聚焦`,'node-sub'));}
      else{const top=make('span',undefined,'node-type');const tag=make('span',undefined,'node-tag');tag.append(make('b',sectionCode(n),'node-code'));if(n.type==='Subsection')tag.append(make('span','子項'));top.append(tag);const flags=make('span',undefined,'flags');if(n.discussion?.length)flags.append(make('i','討論中','flag-discussion'));if(n.missing?.length)flags.append(make('i','待補','flag-missing'));top.append(flags);el.append(top,make('span',n.title.replace(/^[一二三四五六]年級｜/,'').replace(/^\d-\d /,''),'node-title'));
        for(const [label,text] of [['重點',n.points?.[0]],['原文',n.examples?.[0]]]){const row=make('span',undefined,'node-row');row.append(make('b',label),make('span',text||'原文未另提供'));el.append(row);}
        if(relatedMap.has(n.id))el.append(make('span','相關：'+relatedMap.get(n.id).join('、'),'related-chip'));}
      el.title=n.title;el.addEventListener('click',e=>{if(e.detail===0||performance.now()>suppressClickUntil)choose(n.id);});$('nodes').append(el);elements.set(n.id,el);updatePosition(n);
    }
    for(const e of scene.edges){const path=document.createElementNS(NS,'path');path.classList.add('wire',e.kind==='theme'?'theme':e.source===doc?'trunk':'branch');path.style.setProperty('--node-color',color(e.color));path.dataset.source=e.source;path.dataset.target=e.target;path.dataset.kind=e.kind;if(e.theme)path.dataset.theme=e.theme;const title=document.createElementNS(NS,'title');title.textContent=e.kind==='theme'?`同主題：${e.theme}（整理者分類）`:'包含：原文結構';path.append(title);$('wires').append(path);paths.push([path,e]);}
    updateWires();emphasis();details();
    const ss=graph.sections.filter(s=>s.doc===doc),themeCount=scene.edges.filter(e=>e.kind==='theme').length;
    $('counts').textContent=`${d.short}：${ss.length}張內容卡，${ss.filter(s=>s.discussion.length).length}張有「討論中」、${ss.filter(s=>s.missing.length).length}張有「待補」；目前${themeCount}條同主題虛線。`;
    $('status').textContent=d.short+'｜核心 → '+d.groupLabels.length+'個群組 → 內容卡'+(relatedMap.size?`｜相關卡 ${relatedMap.size}`:'');
    document.title=`北園國小｜${d.short}｜放射知識結構圖`;
  }
  function choose(id){const n=all.get(id);if(!n)return;const targetDoc=n.type==='Document'?n.id:n.doc;if(targetDoc&&doc!==targetDoc){doc=targetDoc;$('document').value=doc;expanded=null;positions.clear();refreshThemes();}
    selected=id;gaps=false;$('search-results').hidden=true;
    if(n.type==='Document'){focus=null;expanded=null;}else if(n.type==='Chapter'){focus={kind:'chapter',id};}else{if(n.type==='Subsection')expanded=parent(id);focus={kind:'section',id:subsectionParent(id)};}
    render();panel('detail',true);$('detail').scrollTop=0;focusView();
  }
  function reset(){selected=doc;focus=null;expanded=null;gaps=false;term='';$('search').value='';$('search-results').hidden=true;render();fit();}
  $('fit').onclick=()=>fit();$('reset').onclick=reset;
  function zoom(factor,x=innerWidth/2,y=innerHeight/2){const s=Math.min(3,Math.max(.08,camera.s*factor)),wx=(x-camera.x)/camera.s,wy=(y-camera.y)/camera.s;camera={s,x:x-wx*s,y:y-wy*s};applyCamera();}
  $('zoom-in').onclick=()=>zoom(1.18);$('zoom-out').onclick=()=>zoom(1/1.18);
  $('stage').addEventListener('wheel',e=>{e.preventDefault();zoom(Math.exp(-e.deltaY*.0013),e.clientX,e.clientY);},{passive:false});
  $('stage').addEventListener('pointerdown',e=>{if(e.button!==0||gesture)return;const id=e.target.closest('[data-nodeid]')?.dataset.nodeid,node=scene.nodes.find(n=>n.id===id);gesture={pointer:e.pointerId,startX:e.clientX,startY:e.clientY,x:e.clientX,y:e.clientY,node,moved:false};$('stage').setPointerCapture(e.pointerId);});
  $('stage').addEventListener('pointermove',e=>{if(!gesture||e.pointerId!==gesture.pointer)return;const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;gesture.x=e.clientX;gesture.y=e.clientY;if(Math.hypot(e.clientX-gesture.startX,e.clientY-gesture.startY)>5)gesture.moved=true;if(!gesture.moved)return;
    $('stage').classList.add('dragging');if(gesture.node){const n=gesture.node;n.x+=dx/camera.s;n.y+=dy/camera.s;positions.set(n.id,{x:n.x,y:n.y});elements.get(n.id).classList.add('dragging');updatePosition(n);updateWires();}else{camera.x+=dx;camera.y+=dy;applyCamera();}});
  function endGesture(e){if(!gesture||e.pointerId!==gesture.pointer)return;const chosen=gesture.node?.id,click=!gesture.moved&&e.type==='pointerup';suppressClickUntil=performance.now()+180;if(gesture.node)elements.get(gesture.node.id)?.classList.remove('dragging');if($('stage').hasPointerCapture(e.pointerId))$('stage').releasePointerCapture(e.pointerId);gesture=null;$('stage').classList.remove('dragging');if(click&&chosen)choose(chosen);}
  $('stage').addEventListener('pointerup',endGesture);$('stage').addEventListener('pointercancel',endGesture);
  graph.documents.forEach(d=>{const o=make('option',d.short);o.value=d.id;$('document').append(o);});
  function refreshThemes(){const sel=$('theme');[...sel.querySelectorAll('option.theme-opt')].forEach(o=>o.remove());const ts=[...new Set(graph.sections.filter(s=>s.doc===doc).flatMap(s=>[...s.tags,...(s.subsections||[]).flatMap(t=>t.tags||[])]))].sort();ts.forEach(t=>{const o=make('option',t,'theme-opt');o.value=t;sel.append(o);});theme='auto';sel.value='auto';}
  $('document').onchange=e=>{doc=e.target.value;positions.clear();refreshThemes();reset();};
  $('theme').onchange=e=>{theme=e.target.value;render();};
  $('search').addEventListener('input',e=>{term=e.target.value.trim().toLocaleLowerCase();const out=$('search-results');out.replaceChildren();out.hidden=!term;if(term){const found=graph.nodes.filter(n=>['Section','Subsection'].includes(n.type)&&matches(n));out.append(make('p',`${found.length}張卡符合搜尋`));found.forEach(n=>out.append(button(docMeta(n.doc).short+'｜'+n.title,()=>choose(n.id))));if(!found.length)out.append(make('p','沒有符合的內容；請換個關鍵字或清除搜尋。'));}emphasis();});
  $('search').addEventListener('keydown',e=>{if(e.key==='Escape'){$('search-results').hidden=true;}if(e.key==='Enter'){const first=graph.nodes.find(n=>['Section','Subsection'].includes(n.type)&&matches(n));if(term&&first)choose(first.id);}});
  $('theme-toggle').onclick=()=>{const dark=document.documentElement.dataset.theme!=='dark';document.documentElement.dataset.theme=dark?'dark':'light';$('theme-toggle').textContent=dark?'淺色':'深色';scene.nodes.forEach(n=>elements.get(n.id).style.setProperty('--node-color',color(n.color)));paths.forEach(([p,e])=>p.style.setProperty('--node-color',color(e.color)));document.querySelectorAll('#chapter-list button').forEach((el,i)=>el.style.setProperty('--node-color',color(i)));};
  $('gaps').onclick=()=>{gaps=!gaps;details();panel('detail',true);$('detail').scrollTop=0;};
  $('download').onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(graph,null,2)],{type:'application/json'})),a=make('a');a.href=url;a.download='beiyuan-reading-map.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
  addEventListener('resize',()=>{if(narrow()){panel('legend',false);panel('detail',false);}focusView();});
  refreshThemes();render();requestAnimationFrame(()=>fit());
})();

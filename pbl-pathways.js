const grades = [
  {
    id:'g1', label:'一年級', progress:'發現', role:'小小發現家', color:'#4a86cf', soft:'#e9f2ff', angle:222,
    branches:[
      {id:'g1-beetle', label:'生命觀察線', book:'《假裝我是獨角仙》', task:'獨角仙復育／校園生命觀察', sheet:'學習單：如果我是獨角仙', themes:['life-observe']},
      {id:'g1-route', label:'上學生活線', book:'《1、2、3，上學去！》', task:'上學路線圖／移景描寫', sheet:'學習單：我的上學路', themes:['place-route']}
    ]
  },
  {
    id:'g2', label:'二年級', progress:'記錄', role:'生活記錄家', color:'#7c8d36', soft:'#f1f4df', angle:154,
    branches:[
      {id:'g2-park', label:'社區記憶線', book:'《全世界最特別的公園》', task:'北社尾公園尋根／社區文物', sheet:'學習單：我眼中的北社尾公園', themes:['park-memory']},
      {id:'g2-seed', label:'食農起點線', book:'《種子探險家》', task:'食農・種子探究', sheet:'學習單：一顆種子的旅行', themes:['eco-cycle']}
    ]
  },
  {
    id:'g3', label:'三年級', progress:'調查', role:'社區調查員', color:'#3f8f90', soft:'#e7f6f4', angle:98,
    branches:[
      {id:'g3-walk', label:'社區調查線', book:'《社區散步去》', task:'社區散步調查／路線流程圖', sheet:'學習單：社區散步記', themes:['place-route']},
      {id:'g3-herb', label:'植物探究線', book:'《香草植物栽培筆記》', task:'香草 × 蚊蟲探究', sheet:'學習單：我的香草觀察記', themes:['life-observe']}
    ]
  },
  {
    id:'g4', label:'四年級', progress:'詮釋', role:'在地說書人', color:'#7e6fb3', soft:'#f0ecfb', angle:38,
    branches:[
      {id:'g4-history', label:'地方記憶線', book:'《大人的小學時代》', task:'耆老訪談／地方記憶', sheet:'學習單：阿公阿嬤的小學時代', themes:['park-memory','interview-civic']},
      {id:'g4-water', label:'稻米環境線', book:'《水水三腳埤》', task:'嘉南大圳／水 × 稻米探究', sheet:'學習單：跟著一滴水去旅行', themes:['eco-cycle']}
    ]
  },
  {
    id:'g5', label:'五年級', progress:'分析', role:'永續設計師', color:'#d38c30', soft:'#fff2df', angle:-20,
    branches:[
      {id:'g5-mayor', label:'公共問題線', book:'《如果我是市長》', task:'小市長選舉／校園政策提案', sheet:'學習單：如何讓我們的學校更好？', themes:['interview-civic','civic-choice']},
      {id:'g5-fact', label:'資訊判斷線', book:'《假消息終結戰》', task:'假資訊查核／證據評估', sheet:'學習單：為什麼查證資訊很重要？', themes:['verify-ai']}
    ]
  },
  {
    id:'g6', label:'六年級', progress:'行動', role:'公民行動家', color:'#c35663', soft:'#fdecef', angle:-94,
    branches:[
      {id:'g6-vote', label:'公民倡議線', book:'《去投票吧！》做出選擇，創造改變', task:'公民提案／立場比較', sheet:'學習單：我想改變的一件事', themes:['civic-choice']},
      {id:'g6-recycle', label:'AI 回收線', book:'《分好的垃圾去哪兒了？》', task:'AI 資源回收辨識', sheet:'學習單：AI 能幫我們把垃圾分對嗎？', themes:['verify-ai']},
      {id:'g6-biochar', label:'資源循環線', book:'北園稻作 × 稻梗／米糠', task:'火箭爐 × 碳化再利用', sheet:'學習單：稻梗燒掉就沒有了嗎？', themes:['eco-cycle']}
    ]
  }
];

const crossLinks = [
  {from:'g1-route', to:'g3-walk', label:'上學路 → 社區散步'},
  {from:'g1-beetle', to:'g3-herb', label:'生命觀察 → 植物探究'},
  {from:'g2-park', to:'g4-history', label:'公園文物 → 地方記憶'},
  {from:'g2-seed', to:'g4-water', label:'種子 → 稻米'},
  {from:'g4-history', to:'g5-mayor', label:'耆老訪談 → 利害關係人'},
  {from:'g5-mayor', to:'g6-vote', label:'選舉 → 公民提案'},
  {from:'g5-fact', to:'g6-recycle', label:'查證 → AI 驗證'},
  {from:'g4-water', to:'g6-biochar', label:'水 × 稻米 → 稻梗／米糠再利用'}
];

const svg = document.getElementById('mindmapSvg');
const viewport = document.getElementById('mapViewport');
const canvas = document.getElementById('mapCanvas');
const statusBox = document.getElementById('mapStatus');
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');
const fitBtn = document.getElementById('fitMap');
const resetFocusBtn = document.getElementById('resetFocus');
const NS = 'http://www.w3.org/2000/svg';
const center = {x:0,y:0};

let linkLayer;
let crossLayer;
let nodeLayer;
let overlayLayer;

const branchAnchors = new Map();
const routeNodeGroups = new Map();
const routeLines = new Map();
const gradeNodes = new Map();
const gradeTrunks = new Map();
const crossElements = [];
const routeToGrade = new Map();
const themeToRoutes = new Map();
const relationMap = new Map();

const state = {
  x:window.innerWidth/2,
  y:window.innerHeight/2,
  scale:Math.max(.62, Math.min(.92, window.innerWidth / 1800)),
  pinnedGradeId:null
};
let drag = null;

function createThemeRelations(){
  grades.forEach(grade=>{
    grade.branches.forEach(branch=>{
      routeToGrade.set(branch.id, grade.id);
      relationMap.set(branch.id, new Set([branch.id]));
      branch.themes.forEach(theme=>{
        if(!themeToRoutes.has(theme)) themeToRoutes.set(theme, new Set());
        themeToRoutes.get(theme).add(branch.id);
      });
    });
  });
  themeToRoutes.forEach(routes=>{
    const ids=[...routes];
    ids.forEach(id=>{
      const set=relationMap.get(id);
      ids.forEach(other=>set.add(other));
    });
  });
}

function el(tag, attrs={}){
  const node=document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([key,value])=>node.setAttribute(key,value));
  return node;
}

function addText(parent, x, y, lines, className){
  const text=el('text',{x,y,class:className,'text-anchor':'middle'});
  const arr=Array.isArray(lines)?lines:[lines];
  arr.forEach((line,index)=>{
    const tspan=el('tspan',{x,dy:index===0?0:18});
    tspan.textContent=line;
    text.appendChild(tspan);
  });
  parent.appendChild(text);
  return text;
}

function wrapText(text,maxChars=12){
  const chars=[...String(text)];
  const out=[];
  for(let i=0;i<chars.length;i+=maxChars) out.push(chars.slice(i,i+maxChars).join(''));
  return out.slice(0,3);
}

function polar(angleDeg,radius){
  const rad=angleDeg*Math.PI/180;
  return {x:Math.cos(rad)*radius,y:Math.sin(rad)*radius};
}

function branchOffsets(count){
  if(count===1) return [0];
  if(count===2) return [-14,14];
  if(count===3) return [-22,0,22];
  const start=-18*(count-1)/2;
  return Array.from({length:count},(_,i)=>start+i*18);
}

function cardSize(type,text){
  const lines=wrapText(text,type==='grade'?6:12);
  const height=type==='grade'?92:84+Math.max(0,lines.length-1)*14;
  let width=214;
  if(type==='center') width=260;
  if(type==='grade') width=210;
  if(type==='sheet') width=236;
  return {width,height,lines};
}

function makeNode({id,type,title,subtitle='',x,y,color,soft,badge=''}){
  const {width,height,lines}=cardSize(type,title);
  const group=el('g',{class:`map-node ${type}`,transform:`translate(${x-width/2} ${y-height/2})`});
  group.style.setProperty('--node-color',color);
  group.style.setProperty('--node-soft',soft);
  group.dataset.id=id;
  group.appendChild(el('rect',{class:'node-card',x:0,y:0,width,height,rx:type==='center'?28:24}));

  let titleY=34;
  if(badge){
    group.appendChild(el('rect',{class:'node-badge',x:14,y:12,width:50,height:22,rx:11}));
    addText(group,39,27,badge,'node-badge-text');
    titleY=50;
  }
  if(type==='grade'){
    addText(group,width/2,24,subtitle,'node-kicker');
    titleY=56;
  }
  if(type==='center') titleY=42;
  addText(group,width/2,titleY,lines,'node-title');
  if(type!=='grade'&&subtitle) addText(group,width/2,height-16,wrapText(subtitle,20)[0],'node-sub');
  if(type==='grade') addText(group,width/2,height-18,title==='六年級'?'六年收束與行動':'年級主線樞紐','node-sub');
  return group;
}

function routePoints(gradeAngle,offset){
  return {
    branch:polar(gradeAngle+offset,438),
    task:polar(gradeAngle+offset,678),
    sheet:polar(gradeAngle+offset,920)
  };
}

function trunkPoint(angle){ return polar(angle,220); }

function routePath(from,branch,task,sheet){
  return [`M ${from.x} ${from.y}`,`L ${branch.x} ${branch.y}`,`L ${task.x} ${task.y}`,`L ${sheet.x} ${sheet.y}`].join(' ');
}

function createLayers(){
  viewport.innerHTML='';
  linkLayer=el('g',{class:'link-layer'});
  crossLayer=el('g',{class:'cross-layer'});
  nodeLayer=el('g',{class:'node-layer'});
  overlayLayer=el('g',{class:'overlay-layer'});
  viewport.append(linkLayer,crossLayer,nodeLayer,overlayLayer);
}

function drawGuideLabels(){
  linkLayer.appendChild(el('circle',{cx:0,cy:0,r:112,fill:'none',stroke:'#e3e8e4','stroke-dasharray':'6 8'}));
  const hint=el('text',{x:0,y:-126,class:'grade-label','text-anchor':'middle'});
  hint.textContent='從中心向外讀：年級 → 書名 → 任務 → 學習單';
  overlayLayer.appendChild(hint);
}

function drawCenter(){
  const centerNode=makeNode({id:'center',type:'center',title:'北園六年閱讀 PBL',subtitle:'六個年級 × 書名 × 任務 × 學習單',x:0,y:0,color:'#4a6857',soft:'#f1f6f2',badge:'核心'});
  nodeLayer.appendChild(centerNode);
}

function relatedRoutesFor(routeId){
  return relationMap.get(routeId)?new Set(relationMap.get(routeId)):new Set([routeId]);
}

function relatedRoutesForGrade(grade){
  const routes=new Set();
  grade.branches.forEach(branch=>{
    relatedRoutesFor(branch.id).forEach(id=>routes.add(id));
  });
  return routes;
}

function gradesForRoutes(routeIds){
  return new Set([...routeIds].map(id=>routeToGrade.get(id)).filter(Boolean));
}

function drawGradesAndRoutes(){
  grades.forEach(grade=>{
    const gradePoint=trunkPoint(grade.angle);
    const trunk=el('path',{d:`M 0 0 L ${gradePoint.x} ${gradePoint.y}`,class:'map-link grade-trunk',stroke:grade.color,'data-grade':grade.id});
    linkLayer.appendChild(trunk);
    gradeTrunks.set(grade.id,trunk);

    const gradeNode=makeNode({id:grade.id,type:'grade',title:grade.label,subtitle:`${grade.progress}｜${grade.role}`,x:gradePoint.x,y:gradePoint.y,color:grade.color,soft:grade.soft});
    gradeNode.setAttribute('tabindex','0');
    gradeNode.setAttribute('role','button');
    gradeNode.setAttribute('aria-label',`${grade.label}，${grade.progress}，${grade.role}。點擊鎖定相關路線。`);
    gradeNode.addEventListener('pointerdown',event=>event.stopPropagation());
    attachGradeInteraction(gradeNode,trunk,grade);
    nodeLayer.appendChild(gradeNode);
    gradeNodes.set(grade.id,gradeNode);

    const offsets=branchOffsets(grade.branches.length);
    grade.branches.forEach((branch,index)=>{
      const pts=routePoints(grade.angle,offsets[index]);
      branchAnchors.set(branch.id,{grade:gradePoint,...pts,color:grade.color});

      const path=el('path',{d:routePath(gradePoint,pts.branch,pts.task,pts.sheet),class:'map-link route-line',stroke:grade.color,'data-route':branch.id});
      linkLayer.appendChild(path);
      routeLines.set(branch.id,path);

      const nodeGroup=el('g',{class:'route-group','data-route':branch.id});
      const bookNode=makeNode({id:`${branch.id}-book`,type:'book',title:branch.book,subtitle:'核心文本',x:pts.branch.x,y:pts.branch.y,color:grade.color,soft:grade.soft,badge:'書名'});
      const taskNode=makeNode({id:`${branch.id}-task`,type:'task',title:branch.task,subtitle:branch.label,x:pts.task.x,y:pts.task.y,color:grade.color,soft:grade.soft,badge:'任務'});
      const sheetNode=makeNode({id:`${branch.id}-sheet`,type:'sheet',title:branch.sheet,subtitle:'閱讀學習單',x:pts.sheet.x,y:pts.sheet.y,color:grade.color,soft:grade.soft,badge:'學習單'});
      nodeGroup.append(bookNode,taskNode,sheetNode);
      nodeGroup.addEventListener('pointerdown',event=>event.stopPropagation());
      attachRouteHover(nodeGroup,path,grade,branch);
      nodeLayer.appendChild(nodeGroup);
      routeNodeGroups.set(branch.id,nodeGroup);
    });
  });
}

function crossPath(from,to){
  const dx=to.x-from.x,dy=to.y-from.y;
  const c1x=from.x+dx*.3;
  const c1y=from.y+(dy>0?90:-90);
  const c2x=from.x+dx*.7;
  const c2y=to.y+(dy>0?-90:90);
  return `M ${from.x} ${from.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${to.x} ${to.y}`;
}

function drawCrossLinks(){
  crossLinks.forEach(link=>{
    const from=branchAnchors.get(link.from)?.task;
    const to=branchAnchors.get(link.to)?.task;
    if(!from||!to) return;
    const path=el('path',{d:crossPath(from,to),class:'map-link cross-link','data-from':link.from,'data-to':link.to});
    crossLayer.appendChild(path);
    const label=el('text',{x:(from.x+to.x)/2,y:(from.y+to.y)/2-8,class:'cross-label','text-anchor':'middle'});
    label.textContent=link.label;
    crossLayer.appendChild(label);
    crossElements.push({path,label,from:link.from,to:link.to,labelText:link.label});
  });
}

function updateStatusForRoute(grade,branch,relatedSet){
  const relatedNames=[...relatedSet].filter(id=>id!==branch.id).map(id=>{
    for(const item of grades){
      const found=item.branches.find(b=>b.id===id);
      if(found) return `${item.label}｜${found.book}`;
    }
    return null;
  }).filter(Boolean);
  statusBox.innerHTML=`<strong>${grade.label}｜${branch.label}</strong><p><b>書名：</b>${branch.book}<br><b>要做的事：</b>${branch.task}<br><b>學習單：</b>${branch.sheet}</p>${relatedNames.length?`<ul>${relatedNames.map(name=>`<li>關聯路線：${name}</li>`).join('')}</ul>`:''}`;
}

function updateStatusForGrade(grade,pinned=false){
  const related=relatedRoutesForGrade(grade);
  const relatedGradeNames=[...gradesForRoutes(related)].filter(id=>id!==grade.id).map(id=>grades.find(g=>g.id===id)?.label).filter(Boolean);
  statusBox.innerHTML=`<strong>${grade.label}｜${grade.progress}｜${grade.role}${pinned?'｜已鎖定':''}</strong><p>${pinned?'滑鼠移開也會保持聚焦。':'目前為暫時聚焦。點年級可鎖定。'} 這個年級的主線與跨年級延伸會一起亮起。</p><ul>${grade.branches.map(branch=>`<li>${branch.book} → ${branch.task} → ${branch.sheet}</li>`).join('')}${relatedGradeNames.length?`<li>跨年級連到：${relatedGradeNames.join('、')}</li>`:''}</ul>`;
}

function showDefaultStatus(){
  statusBox.innerHTML='<strong>閱讀方式</strong><p>這是一張全展開路網圖。滑過路線可暫時聚焦；點年級可鎖定該年級所有主線與跨年級關聯，直到再次點擊或按「取消聚焦」。</p>';
}

function setNodeState(node,on,hot=false){
  if(!node) return;
  node.classList.toggle('is-dim',!on);
  node.classList.toggle('is-hot',Boolean(on&&hot));
}

function setLineState(line,on,hot=false){
  if(!line) return;
  line.classList.toggle('is-dim',!on);
  line.classList.toggle('route-hot',Boolean(on&&hot));
}

function applyActive(routeIds,gradeIds,{pinnedGradeId=null}={}){
  const routes=new Set(routeIds||[]);
  const gradeSet=new Set(gradeIds||[]);

  routeNodeGroups.forEach((group,routeId)=>setNodeState(group,routes.has(routeId),routes.has(routeId)));
  routeLines.forEach((line,routeId)=>setLineState(line,routes.has(routeId),routes.has(routeId)));
  gradeNodes.forEach((node,gradeId)=>{
    const on=gradeSet.has(gradeId);
    setNodeState(node,on,on);
    node.classList.toggle('is-pinned',gradeId===pinnedGradeId);
  });
  gradeTrunks.forEach((line,gradeId)=>setLineState(line,gradeSet.has(gradeId),gradeSet.has(gradeId)));

  crossElements.forEach(item=>{
    const on=routes.has(item.from)&&routes.has(item.to);
    item.path.classList.toggle('is-dim',!on);
    item.path.classList.toggle('cross-hot',on);
    item.label.classList.toggle('is-dim',!on);
  });
}

function clearVisualFocus(){
  routeNodeGroups.forEach(group=>group.classList.remove('is-dim','is-hot'));
  routeLines.forEach(line=>line.classList.remove('is-dim','route-hot'));
  gradeNodes.forEach(node=>node.classList.remove('is-dim','is-hot','is-pinned'));
  gradeTrunks.forEach(line=>line.classList.remove('is-dim','route-hot'));
  crossElements.forEach(item=>{
    item.path.classList.remove('is-dim','cross-hot');
    item.label.classList.remove('is-dim');
  });
}

function focusGrade(grade,pinned=false){
  const routes=relatedRoutesForGrade(grade);
  const gradeIds=gradesForRoutes(routes);
  gradeIds.add(grade.id);
  applyActive(routes,gradeIds,{pinnedGradeId:pinned?grade.id:null});
  updateStatusForGrade(grade,pinned);
}

function restorePinnedOrDefault(){
  if(state.pinnedGradeId){
    const grade=grades.find(item=>item.id===state.pinnedGradeId);
    if(grade){ focusGrade(grade,true); return; }
  }
  clearVisualFocus();
  showDefaultStatus();
}

function setPinnedGrade(grade){
  if(state.pinnedGradeId===grade.id){
    state.pinnedGradeId=null;
    resetFocusBtn.disabled=true;
    resetFocusBtn.classList.remove('focus-active');
    restorePinnedOrDefault();
    return;
  }
  state.pinnedGradeId=grade.id;
  resetFocusBtn.disabled=false;
  resetFocusBtn.classList.add('focus-active');
  focusGrade(grade,true);
}

function attachRouteHover(group,path,grade,branch){
  const enter=()=>{
    if(state.pinnedGradeId){
      updateStatusForRoute(grade,branch,relatedRoutesFor(branch.id));
      return;
    }
    const related=relatedRoutesFor(branch.id);
    const gradeIds=gradesForRoutes(related);
    gradeIds.add(grade.id);
    applyActive(related,gradeIds);
    updateStatusForRoute(grade,branch,related);
  };
  const leave=()=>restorePinnedOrDefault();
  [group,path].forEach(target=>{
    target.addEventListener('mouseenter',enter);
    target.addEventListener('mouseleave',leave);
  });
}

function attachGradeInteraction(node,trunk,grade){
  const enter=()=>{
    if(state.pinnedGradeId) return;
    focusGrade(grade,false);
  };
  const leave=()=>restorePinnedOrDefault();
  [node,trunk].forEach(target=>{
    target.addEventListener('mouseenter',enter);
    target.addEventListener('mouseleave',leave);
  });
  const activate=event=>{
    if(event) event.stopPropagation();
    setPinnedGrade(grade);
  };
  node.addEventListener('click',activate);
  node.addEventListener('keydown',event=>{
    if(event.key==='Enter'||event.key===' '){ event.preventDefault(); activate(event); }
  });
}

function setTransform(){ viewport.setAttribute('transform',`translate(${state.x} ${state.y}) scale(${state.scale})`); }

function fitMap(){
  state.x=window.innerWidth/2;
  state.y=window.innerHeight/2;
  state.scale=Math.max(.62,Math.min(.92,window.innerWidth/1800));
  setTransform();
}

function bindPanZoom(){
  canvas.addEventListener('pointerdown',event=>{
    drag={x:event.clientX,y:event.clientY,originX:state.x,originY:state.y};
    canvas.classList.add('dragging');
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove',event=>{
    if(!drag) return;
    state.x=drag.originX+(event.clientX-drag.x);
    state.y=drag.originY+(event.clientY-drag.y);
    setTransform();
  });
  const endDrag=event=>{
    if(event.pointerId&&canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    drag=null;
    canvas.classList.remove('dragging');
  };
  canvas.addEventListener('pointerup',endDrag);
  canvas.addEventListener('pointercancel',endDrag);
  canvas.addEventListener('wheel',event=>{
    event.preventDefault();
    const factor=event.deltaY<0?1.08:.92;
    const next=Math.max(.34,Math.min(1.6,state.scale*factor));
    const rect=svg.getBoundingClientRect();
    const px=event.clientX-rect.left,py=event.clientY-rect.top;
    const wx=(px-state.x)/state.scale,wy=(py-state.y)/state.scale;
    state.scale=next;
    state.x=px-wx*state.scale;
    state.y=py-wy*state.scale;
    setTransform();
  },{passive:false});
}

function bindButtons(){
  zoomInBtn.addEventListener('click',()=>{ state.scale=Math.min(1.6,state.scale*1.12); setTransform(); });
  zoomOutBtn.addEventListener('click',()=>{ state.scale=Math.max(.34,state.scale/1.12); setTransform(); });
  fitBtn.addEventListener('click',fitMap);
  resetFocusBtn.addEventListener('click',()=>{
    state.pinnedGradeId=null;
    resetFocusBtn.disabled=true;
    resetFocusBtn.classList.remove('focus-active');
    restorePinnedOrDefault();
  });
}

function resize(){
  svg.setAttribute('viewBox',`0 0 ${window.innerWidth} ${window.innerHeight}`);
  setTransform();
}

function init(){
  createThemeRelations();
  createLayers();
  resize();
  drawGuideLabels();
  drawCenter();
  drawGradesAndRoutes();
  drawCrossLinks();
  bindPanZoom();
  bindButtons();
  fitMap();
  showDefaultStatus();
  window.addEventListener('resize',()=>{ resize(); fitMap(); });
}

init();

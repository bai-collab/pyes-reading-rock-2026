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
const NS = 'http://www.w3.org/2000/svg';
const center = {x:0,y:0};
const branchAnchors = new Map();
const routeGroups = new Map();
const gradeGroups = new Map();
const crossElements = [];
const routeToGrade = new Map();
const themeToRoutes = new Map();
const relationMap = new Map();
const state = {
  x:window.innerWidth/2,
  y:window.innerHeight/2,
  scale:Math.max(.62, Math.min(.92, window.innerWidth / 1800))
};
let drag = null;
let activeRoutes = null;
let activeGrades = null;

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
    const ids = [...routes];
    ids.forEach(id=>{
      const set = relationMap.get(id);
      ids.forEach(other=>set.add(other));
    });
  });
}

function el(tag, attrs={}){
  const node = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([key, value])=>node.setAttribute(key, value));
  return node;
}

function addText(parent, x, y, lines, className){
  const text = el('text', {x, y, class:className, 'text-anchor':'middle'});
  const arr = Array.isArray(lines) ? lines : [lines];
  arr.forEach((line, index)=>{
    const tspan = el('tspan', {x, dy:index===0?0:18});
    tspan.textContent = line;
    text.appendChild(tspan);
  });
  parent.appendChild(text);
  return text;
}

function wrapText(text, maxChars=12){
  const chars = [...String(text)];
  const out = [];
  for(let i=0; i<chars.length; i += maxChars){
    out.push(chars.slice(i, i + maxChars).join(''));
  }
  return out.slice(0, 3);
}

function polar(angleDeg, radius){
  const rad = angleDeg * Math.PI / 180;
  return {x: Math.cos(rad) * radius, y: Math.sin(rad) * radius};
}

function branchOffsets(count){
  if(count === 1) return [0];
  if(count === 2) return [-14, 14];
  if(count === 3) return [-22, 0, 22];
  const start = -18 * (count - 1) / 2;
  return Array.from({length: count}, (_, i)=>start + i * 18);
}

function cardSize(type, text){
  const lines = wrapText(text, type === 'grade' ? 6 : 12);
  const height = type === 'grade' ? 92 : 84 + Math.max(0, lines.length - 1) * 14;
  let width = 214;
  if(type === 'center') width = 260;
  if(type === 'grade') width = 210;
  if(type === 'sheet') width = 236;
  return {width, height, lines};
}

function makeNode({id, type, title, subtitle='', x, y, color, soft, badge=''}){
  const {width, height, lines} = cardSize(type, title);
  const group = el('g', {class:`map-node ${type}`, transform:`translate(${x - width/2} ${y - height/2})`});
  group.style.setProperty('--node-color', color);
  group.style.setProperty('--node-soft', soft);
  group.dataset.id = id;
  group.appendChild(el('rect', {class:'node-card', x:0, y:0, width, height, rx:type==='center'?28:24}));

  let titleY = 34;
  if(badge){
    group.appendChild(el('rect',{class:'node-badge', x:14, y:12, width:50, height:22, rx:11}));
    addText(group, 39, 27, badge, 'node-badge-text');
    titleY = 50;
  }
  if(type === 'grade'){
    addText(group, width/2, 24, `${subtitle}`, 'node-kicker');
    titleY = 56;
  }
  if(type === 'center') titleY = 42;
  addText(group, width/2, titleY, lines, 'node-title');
  if(type !== 'grade' && subtitle){
    addText(group, width/2, height - 16, wrapText(subtitle, 20)[0], 'node-sub');
  }
  if(type === 'grade'){
    addText(group, width/2, height - 18, title === '六年級' ? '六年收束與行動' : '年級主線樞紐', 'node-sub');
  }
  return group;
}

function routePoints(gradeAngle, offset){
  return {
    branch: polar(gradeAngle + offset, 438),
    task: polar(gradeAngle + offset, 678),
    sheet: polar(gradeAngle + offset, 920)
  };
}

function trunkPoint(angle){
  return polar(angle, 220);
}

function routePath(from, branch, task, sheet){
  return [
    `M ${from.x} ${from.y}`,
    `L ${branch.x} ${branch.y}`,
    `L ${task.x} ${task.y}`,
    `L ${sheet.x} ${sheet.y}`
  ].join(' ');
}

function drawCenter(){
  const centerNode = makeNode({
    id:'center', type:'center', title:'北園六年閱讀 PBL',
    subtitle:'六個年級 × 書名 × 任務 × 學習單',
    x:center.x, y:center.y, color:'#4a6857', soft:'#f1f6f2', badge:'核心'
  });
  viewport.appendChild(centerNode);
}

function drawGradesAndRoutes(){
  grades.forEach(grade=>{
    const gradePoint = trunkPoint(grade.angle);
    const gradeGroup = el('g', {class:'grade-group', 'data-grade':grade.id});
    const trunk = el('path', {
      d:`M ${center.x} ${center.y} L ${gradePoint.x} ${gradePoint.y}`,
      class:'map-link grade-trunk', stroke:grade.color, 'data-grade':grade.id
    });
    gradeGroup.appendChild(trunk);
    const gradeNode = makeNode({
      id:grade.id, type:'grade', title:grade.label, subtitle:`${grade.progress}｜${grade.role}`,
      x:gradePoint.x, y:gradePoint.y, color:grade.color, soft:grade.soft
    });
    gradeGroup.appendChild(gradeNode);
    gradeGroups.set(grade.id, gradeGroup);

    attachGradeHover(gradeGroup, grade);
    viewport.appendChild(gradeGroup);

    const offsets = branchOffsets(grade.branches.length);
    grade.branches.forEach((branch, index)=>{
      const pts = routePoints(grade.angle, offsets[index]);
      branchAnchors.set(branch.id, {grade:gradePoint, ...pts, color:grade.color});

      const routeGroup = el('g', {class:'route-group', 'data-route':branch.id});
      const path = el('path', {
        d:routePath(gradePoint, pts.branch, pts.task, pts.sheet),
        class:'map-link route-line', stroke:grade.color, 'data-route':branch.id
      });
      routeGroup.appendChild(path);

      const bookNode = makeNode({
        id:`${branch.id}-book`, type:'book', title:branch.book, subtitle:'核心文本',
        x:pts.branch.x, y:pts.branch.y, color:grade.color, soft:grade.soft, badge:'書名'
      });
      const taskNode = makeNode({
        id:`${branch.id}-task`, type:'task', title:branch.task, subtitle:branch.label,
        x:pts.task.x, y:pts.task.y, color:grade.color, soft:grade.soft, badge:'任務'
      });
      const sheetNode = makeNode({
        id:`${branch.id}-sheet`, type:'sheet', title:branch.sheet, subtitle:'閱讀學習單',
        x:pts.sheet.x, y:pts.sheet.y, color:grade.color, soft:grade.soft, badge:'學習單'
      });
      routeGroup.appendChild(bookNode);
      routeGroup.appendChild(taskNode);
      routeGroup.appendChild(sheetNode);
      routeGroups.set(branch.id, routeGroup);
      attachRouteHover(routeGroup, grade, branch);
      viewport.appendChild(routeGroup);
    });
  });
}

function crossPath(from, to){
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const c1x = from.x + dx * .3;
  const c1y = from.y + (dy > 0 ? 90 : -90);
  const c2x = from.x + dx * .7;
  const c2y = to.y + (dy > 0 ? -90 : 90);
  return `M ${from.x} ${from.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${to.x} ${to.y}`;
}

function drawCrossLinks(){
  const group = el('g', {class:'cross-group'});
  crossLinks.forEach(link=>{
    const from = branchAnchors.get(link.from)?.task;
    const to = branchAnchors.get(link.to)?.task;
    if(!from || !to) return;
    const path = el('path', {d:crossPath(from, to), class:'map-link cross-link', 'data-from':link.from, 'data-to':link.to});
    group.appendChild(path);
    const mx = (from.x + to.x) / 2;
    const my = (from.y + to.y) / 2;
    const label = el('text', {x:mx, y:my - 8, class:'cross-label', 'text-anchor':'middle'});
    label.textContent = link.label;
    group.appendChild(label);
    crossElements.push({path, label, from:link.from, to:link.to, labelText:link.label});
  });
  viewport.insertBefore(group, viewport.firstChild);
}

function relatedRoutesFor(routeId){
  return relationMap.get(routeId) ? new Set(relationMap.get(routeId)) : new Set([routeId]);
}

function updateStatusForRoute(grade, branch, relatedSet){
  const relatedNames = [...relatedSet]
    .filter(id=>id !== branch.id)
    .map(id=>{
      for(const item of grades){
        const found = item.branches.find(branchItem=>branchItem.id === id);
        if(found) return `${item.label}｜${found.book}`;
      }
      return null;
    })
    .filter(Boolean);

  statusBox.innerHTML = `
    <strong>${grade.label}｜${branch.label}</strong>
    <p><b>書名：</b>${branch.book}<br><b>要做的事：</b>${branch.task}<br><b>學習單：</b>${branch.sheet}</p>
    ${relatedNames.length ? `<ul>${relatedNames.map(name=>`<li>關聯路線：${name}</li>`).join('')}</ul>` : ''}
  `;
}

function updateStatusForGrade(grade){
  statusBox.innerHTML = `
    <strong>${grade.label}｜${grade.progress}｜${grade.role}</strong>
    <p>這個年級共有 ${grade.branches.length} 條主線，已全部展開在畫布上。</p>
    <ul>${grade.branches.map(branch=>`<li>${branch.book} → ${branch.task} → ${branch.sheet}</li>`).join('')}</ul>
  `;
}

function showDefaultStatus(){
  statusBox.innerHTML = `
    <strong>閱讀方式</strong>
    <p>這是一張全展開路網圖。先看中心，再沿著六個年級往外讀到書名、任務與學習單；滑過任一路線時，其他不相關路線會淡化。</p>
  `;
}

function applyActive(routeIds, gradeIds){
  activeRoutes = routeIds ? new Set(routeIds) : null;
  activeGrades = gradeIds ? new Set(gradeIds) : null;

  routeGroups.forEach((group, routeId)=>{
    const on = activeRoutes ? activeRoutes.has(routeId) : true;
    group.classList.toggle('is-dim', !on);
    group.querySelectorAll('.map-link, .map-node').forEach(elm=>{
      elm.classList.toggle('is-dim', !on);
      elm.classList.toggle('route-hot', on && elm.classList.contains('map-link'));
      elm.classList.toggle('is-hot', on && elm.classList.contains('map-node'));
    });
  });

  gradeGroups.forEach((group, gradeId)=>{
    const on = activeGrades ? activeGrades.has(gradeId) : true;
    group.querySelectorAll('.map-link, .map-node').forEach(elm=>{
      elm.classList.toggle('is-dim', !on);
      elm.classList.toggle('route-hot', on && elm.classList.contains('map-link'));
      elm.classList.toggle('is-hot', on && elm.classList.contains('map-node'));
    });
  });

  crossElements.forEach(item=>{
    const on = activeRoutes ? (activeRoutes.has(item.from) && activeRoutes.has(item.to)) : true;
    item.path.classList.toggle('is-dim', !on);
    item.path.classList.toggle('cross-hot', on);
    item.label.classList.toggle('is-dim', !on);
  });
}

function resetActive(){
  activeRoutes = null;
  activeGrades = null;
  routeGroups.forEach(group=>{
    group.querySelectorAll('.map-link, .map-node').forEach(elm=>{
      elm.classList.remove('is-dim','route-hot','is-hot');
    });
  });
  gradeGroups.forEach(group=>{
    group.querySelectorAll('.map-link, .map-node').forEach(elm=>{
      elm.classList.remove('is-dim','route-hot','is-hot');
    });
  });
  crossElements.forEach(item=>{
    item.path.classList.remove('is-dim','cross-hot');
    item.label.classList.remove('is-dim');
  });
  showDefaultStatus();
}

function attachRouteHover(group, grade, branch){
  const enter = ()=>{
    const related = relatedRoutesFor(branch.id);
    const gradeIds = new Set([...related].map(id=>routeToGrade.get(id)).filter(Boolean));
    gradeIds.add(grade.id);
    applyActive(related, gradeIds);
    updateStatusForRoute(grade, branch, related);
  };
  const leave = ()=>resetActive();
  group.addEventListener('mouseenter', enter);
  group.addEventListener('mouseleave', leave);
  group.addEventListener('focusin', enter);
  group.addEventListener('focusout', leave);
}

function attachGradeHover(group, grade){
  const enter = ()=>{
    const ownRoutes = new Set(grade.branches.map(branch=>branch.id));
    applyActive(ownRoutes, new Set([grade.id]));
    updateStatusForGrade(grade);
  };
  const leave = ()=>resetActive();
  group.addEventListener('mouseenter', enter);
  group.addEventListener('mouseleave', leave);
  group.addEventListener('focusin', enter);
  group.addEventListener('focusout', leave);
}

function setTransform(){
  viewport.setAttribute('transform', `translate(${state.x} ${state.y}) scale(${state.scale})`);
}

function fitMap(){
  state.x = window.innerWidth / 2;
  state.y = window.innerHeight / 2;
  state.scale = Math.max(.62, Math.min(.92, window.innerWidth / 1800));
  setTransform();
}

function bindPanZoom(){
  canvas.addEventListener('pointerdown', event=>{
    drag = {x:event.clientX, y:event.clientY, originX:state.x, originY:state.y};
    canvas.classList.add('dragging');
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove', event=>{
    if(!drag) return;
    state.x = drag.originX + (event.clientX - drag.x);
    state.y = drag.originY + (event.clientY - drag.y);
    setTransform();
  });
  const endDrag = event=>{
    if(event.pointerId && canvas.hasPointerCapture(event.pointerId)){
      canvas.releasePointerCapture(event.pointerId);
    }
    drag = null;
    canvas.classList.remove('dragging');
  };
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);
  canvas.addEventListener('wheel', event=>{
    event.preventDefault();
    const factor = event.deltaY < 0 ? 1.08 : 0.92;
    const next = Math.max(.34, Math.min(1.6, state.scale * factor));
    const rect = svg.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    const wx = (px - state.x) / state.scale;
    const wy = (py - state.y) / state.scale;
    state.scale = next;
    state.x = px - wx * state.scale;
    state.y = py - wy * state.scale;
    setTransform();
  }, {passive:false});
}

function bindButtons(){
  zoomInBtn.addEventListener('click', ()=>{
    state.scale = Math.min(1.6, state.scale * 1.12);
    setTransform();
  });
  zoomOutBtn.addEventListener('click', ()=>{
    state.scale = Math.max(.34, state.scale / 1.12);
    setTransform();
  });
  fitBtn.addEventListener('click', fitMap);
}

function resize(){
  svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
  setTransform();
}

function drawGuideLabels(){
  const ring = el('circle', {cx:0, cy:0, r:112, fill:'none', stroke:'#e3e8e4', 'stroke-dasharray':'6 8'});
  viewport.insertBefore(ring, viewport.firstChild);
  const hint = el('text', {x:0, y:-126, class:'grade-label', 'text-anchor':'middle'});
  hint.textContent = '從中心向外讀：年級 → 書名 → 任務 → 學習單';
  viewport.insertBefore(hint, viewport.firstChild);
}

function init(){
  createThemeRelations();
  resize();
  drawGuideLabels();
  drawCenter();
  drawGradesAndRoutes();
  drawCrossLinks();
  bindPanZoom();
  bindButtons();
  fitMap();
  showDefaultStatus();
  window.addEventListener('resize', ()=>{
    resize();
    fitMap();
  });
}

init();

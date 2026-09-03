const pathwayRoutes = [
  {
    id:'g1-beetle', grade:'一年級', progress:'發現', role:'小小發現家', color:'#47745b',
    book:'《假裝我是獨角仙》', strategy:'觀察・指認・特徵', strategyNote:'從圖像與真實生物找細節',
    writing:'第一人稱圖文記敘', topic:'如果我是獨角仙',
    action:'獨角仙復育', actionNote:'校園生命觀察與紀錄'
  },
  {
    id:'g1-route', grade:'一年級', progress:'發現', role:'小小發現家', color:'#47745b',
    book:'《1、2、3，上學去！》', strategy:'順序・移景・空間', strategyNote:'沿路線讀景物與位置變化',
    writing:'記景小短文', topic:'我的上學路',
    action:'上學路線圖', actionNote:'畫／寫沿途風景與觀察'
  },
  {
    id:'g2-park', grade:'二年級', progress:'記錄', role:'生活記錄家', color:'#6e8a54',
    book:'《全世界最特別的公園》', strategy:'比較・分類・地方觀察', strategyNote:'比較公園特色與生活痕跡',
    writing:'記景／比較', topic:'我眼中的北社尾公園',
    action:'北社尾公園尋根', actionNote:'公園文物・社區記憶'
  },
  {
    id:'g2-seed', grade:'二年級', progress:'記錄', role:'生活記錄家', color:'#6e8a54', candidate:true,
    book:'《種子探險家》', bookNote:'候選核心文本', strategy:'歷程・比較・因果', strategyNote:'種子如何移動、萌發與生長',
    writing:'觀察歷程／說明', topic:'一顆種子的旅行',
    action:'食農・種子探究', actionNote:'銜接植物、農業與四年級稻米'
  },
  {
    id:'g3-walk', grade:'三年級', progress:'調查', role:'社區調查員', color:'#3f7880',
    book:'《社區散步去》', strategy:'提問・摘要・地圖', strategyNote:'從路線提出問題並整理資訊',
    writing:'記敘', topic:'社區散步記',
    action:'社區散步調查', actionNote:'地圖・路線・流程圖'
  },
  {
    id:'g3-herb', grade:'三年級', progress:'調查', role:'社區調查員', color:'#3f7880',
    book:'《香草植物栽培筆記》', strategy:'觀察・圖表・資料', strategyNote:'用紀錄表追蹤植物變化',
    writing:'事物說明', topic:'我的香草觀察記',
    action:'香草 × 蚊蟲探究', actionNote:'觀察、紀錄、初步資料判讀'
  },
  {
    id:'g4-history', grade:'四年級', progress:'詮釋', role:'在地說書人', color:'#6b6588',
    book:'《大人的小學時代》', strategy:'訪談・口述・多文本', strategyNote:'文字、老照片與耆老說法互證',
    writing:'敘事／訪談報告', topic:'阿公阿嬤的小學時代',
    action:'耆老訪談', actionNote:'社區文物與地方記憶互證'
  },
  {
    id:'g4-water', grade:'四年級', progress:'詮釋', role:'在地說書人', color:'#6b6588',
    book:'《水水三腳埤》', strategy:'因果・水文圖・多文本', strategyNote:'理解水、農業與聚落關係',
    writing:'記景＋事理說明', topic:'跟著一滴水去旅行',
    action:'嘉南大圳探究', actionNote:'水 × 稻米 × 聚落形成'
  },
  {
    id:'g5-mayor', grade:'五年級', progress:'分析', role:'永續設計師', color:'#986744',
    book:'《如果我是市長》', strategy:'公共問題・利害關係人', strategyNote:'從需求與證據辨識真正問題',
    writing:'如何型議論', topic:'如何讓我們的學校更好？',
    action:'小市長選舉', actionNote:'校園問題診斷・政策提案'
  },
  {
    id:'g5-fact', grade:'五年級', progress:'分析', role:'永續設計師', color:'#986744',
    book:'《假消息終結戰》', strategy:'來源查證・證據評估', strategyNote:'來源、證據與交叉查核',
    writing:'為何型議論', topic:'為什麼查證資訊很重要？',
    action:'假資訊查核', actionNote:'讓政見建立在可查證證據上'
  },
  {
    id:'g6-vote', grade:'六年級', progress:'行動', role:'公民行動家', color:'#87525a',
    book:'《去投票吧！》\n做出選擇，創造改變', strategy:'立場比較・論證', strategyNote:'理解不同觀點、理由與後果',
    writing:'議論／倡議', topic:'我想改變的一件事',
    action:'公民提案', actionNote:'延續選舉議題走向公共參與'
  },
  {
    id:'g6-recycle', grade:'六年級', progress:'行動', role:'公民行動家', color:'#87525a',
    book:'《分好的垃圾去哪兒了？》', strategy:'系統流程・資料判讀', strategyNote:'閱讀回收規則、流程與測試資料',
    writing:'證據型議論', topic:'AI 能幫我們把垃圾分對嗎？',
    action:'AI 資源回收辨識', actionNote:'影像→標註→訓練→驗證→改善'
  }
];

const gradeOrder = ['一年級','二年級','三年級','四年級','五年級','六年級'];
const svg = document.getElementById('pathwaySvg');
const filterBox = document.getElementById('gradeFilters');
const resetButton = document.getElementById('resetPathways');
const statusBox = document.getElementById('pathwayStatus');
const NS = 'http://www.w3.org/2000/svg';

let activeGrade = '全部';
let pinnedRouteIds = new Set();
let pinnedLabel = '';
let hoverRouteIds = new Set();

const columns = [
  {key:'grade', title:'① 年級情境', subtitle:'角色 × 學習尺度', x:45, w:185},
  {key:'book', title:'② 核心文本', subtitle:'從一本書進入真實問題', x:300, w:225},
  {key:'strategy', title:'③ 閱讀策略', subtitle:'學生怎麼讀、怎麼找證據', x:600, w:235},
  {key:'writing', title:'④ 寫作轉化', subtitle:'把作者寫法轉成自己的表達', x:910, w:230},
  {key:'action', title:'⑤ PBL 行動', subtitle:'把閱讀與寫作帶回真實世界', x:1210, w:250}
];

const routeY = new Map(pathwayRoutes.map((route,index)=>[route.id,90 + index * 70]));
const nodes = [];
const nodeMap = new Map();
const routeEls = new Map();

function svgEl(tag, attrs={}){
  const el = document.createElementNS(NS,tag);
  Object.entries(attrs).forEach(([key,value])=>el.setAttribute(key,value));
  return el;
}

function addText(parent, attrs, value){
  const text = svgEl('text',attrs);
  text.textContent = value;
  parent.appendChild(text);
  return text;
}

function routeIdsForGrade(grade){
  return pathwayRoutes.filter(route=>route.grade===grade).map(route=>route.id);
}

function makeNode(key, columnKey, y, routeIds, meta){
  if(nodeMap.has(key)){
    const existing = nodeMap.get(key);
    routeIds.forEach(id=>existing.routeIds.add(id));
    return existing;
  }
  const column = columns.find(item=>item.key===columnKey);
  const titleLines = String(meta.title || '').split('\n');
  const height = titleLines.length > 1 ? 70 : 58;
  const node = {
    key,columnKey,x:column.x,y,w:column.w,h:height,
    routeIds:new Set(routeIds),title:meta.title,sub:meta.sub || '',
    kicker:meta.kicker || '',candidate:Boolean(meta.candidate)
  };
  nodes.push(node);
  nodeMap.set(key,node);
  return node;
}

function prepareNodes(){
  gradeOrder.forEach(grade=>{
    const ids = routeIdsForGrade(grade);
    const gradeRoutes = pathwayRoutes.filter(route=>route.grade===grade);
    const y = gradeRoutes.reduce((sum,route)=>sum+routeY.get(route.id),0) / gradeRoutes.length;
    const sample = gradeRoutes[0];
    makeNode(`grade:${grade}`,'grade',y,ids,{
      title:grade,
      kicker:sample.progress,
      sub:sample.role
    });
  });

  pathwayRoutes.forEach(route=>{
    const y = routeY.get(route.id);
    makeNode(`book:${route.id}`,'book',y,[route.id],{
      title:route.book,
      sub:route.bookNote || '核心文本',
      candidate:route.candidate
    });
    makeNode(`strategy:${route.id}`,'strategy',y,[route.id],{
      title:route.strategy,
      sub:route.strategyNote
    });
    makeNode(`writing:${route.id}`,'writing',y,[route.id],{
      title:route.writing,
      sub:route.topic
    });
    makeNode(`action:${route.id}`,'action',y,[route.id],{
      title:route.action,
      sub:route.actionNote
    });
  });
}

function getNode(routeId,columnKey){
  const route = pathwayRoutes.find(item=>item.id===routeId);
  if(columnKey==='grade') return nodeMap.get(`grade:${route.grade}`);
  return nodeMap.get(`${columnKey}:${routeId}`);
}

function makeRoutePath(route){
  const ordered = ['grade','book','strategy','writing','action'].map(key=>getNode(route.id,key));
  let d = '';
  ordered.forEach((node,index)=>{
    if(index===0){
      d = `M ${node.x + node.w} ${node.y}`;
      return;
    }
    const prev = ordered[index-1];
    const x1 = prev.x + prev.w;
    const x2 = node.x;
    const mid = (x1+x2)/2;
    d += ` C ${mid} ${prev.y}, ${mid} ${node.y}, ${x2} ${node.y}`;
  });
  return d;
}

function drawBands(){
  const bg = svgEl('g',{'aria-hidden':'true'});
  gradeOrder.forEach((grade,index)=>{
    const ids = routeIdsForGrade(grade);
    const ys = ids.map(id=>routeY.get(id));
    const top = Math.min(...ys)-31;
    const bottom = Math.max(...ys)+31;
    const band = svgEl('rect',{
      x:18,y:top,width:1464,height:bottom-top,rx:18,
      fill:index%2===0?'#fbfaf5':'#f6f8f5',opacity:.75
    });
    bg.appendChild(band);
    addText(bg,{x:1474,y:top+17,'text-anchor':'end',class:'grade-label'},grade);
  });
  svg.appendChild(bg);
}

function drawHeaders(){
  const g = svgEl('g',{'aria-hidden':'true'});
  columns.forEach((column,index)=>{
    addText(g,{x:column.x+column.w/2,y:28,'text-anchor':'middle',class:'column-title'},column.title);
    addText(g,{x:column.x+column.w/2,y:45,'text-anchor':'middle',class:'column-subtitle'},column.subtitle);
    if(index<columns.length-1){
      const dividerX = column.x+column.w+35;
      g.appendChild(svgEl('line',{x1:dividerX,y1:58,x2:dividerX,y2:885,class:'svg-divider'}));
    }
  });
  svg.appendChild(g);
}

function drawRoutes(){
  const visibleGroup = svgEl('g');
  const hitGroup = svgEl('g');
  pathwayRoutes.forEach(route=>{
    const d = makeRoutePath(route);
    const line = svgEl('path',{d,class:'path-route',stroke:route.color,'data-route':route.id});
    const hit = svgEl('path',{d,class:'path-hit','data-route':route.id,tabindex:'0',role:'button','aria-label':`${route.grade}：${route.book.replace('\n','')} → ${route.strategy} → ${route.writing} → ${route.action}`});
    visibleGroup.appendChild(line);
    hitGroup.appendChild(hit);
    routeEls.set(route.id,{line,hit});

    const selectRoute = ()=>{
      pinnedRouteIds = new Set([route.id]);
      pinnedLabel = route.book.replace('\n','');
      hoverRouteIds.clear();
      applyState();
      updateStatusForRoutes([route],pinnedLabel);
    };
    hit.addEventListener('click',selectRoute);
    hit.addEventListener('keydown',event=>{
      if(event.key==='Enter' || event.key===' '){event.preventDefault();selectRoute();}
    });
    hit.addEventListener('mouseenter',()=>{
      if(pinnedRouteIds.size) return;
      hoverRouteIds = new Set([route.id]);
      applyState();
    });
    hit.addEventListener('mouseleave',()=>{
      if(pinnedRouteIds.size) return;
      hoverRouteIds.clear();
      applyState();
    });
  });
  svg.appendChild(visibleGroup);
  svg.appendChild(hitGroup);
}

function drawNode(node){
  const group = svgEl('g',{
    class:`path-node ${node.columnKey==='grade'?'grade':''} ${node.candidate?'candidate':''}`.trim(),
    transform:`translate(${node.x} ${node.y-node.h/2})`,
    tabindex:'0',role:'button',
    'aria-label':`${node.title.replace('\n','')}。${node.sub}`
  });
  group.dataset.node = node.key;
  group.appendChild(svgEl('rect',{x:0,y:0,width:node.w,height:node.h,rx:14}));

  if(node.kicker){
    addText(group,{x:12,y:17,class:'node-kicker'},node.kicker);
  }

  const titleLines = String(node.title).split('\n');
  const titleStart = node.kicker ? 36 : (titleLines.length>1 ? 21 : 24);
  titleLines.forEach((line,index)=>{
    addText(group,{x:12,y:titleStart+index*15,class:'node-title'},line);
  });

  const subY = node.h-11;
  const subText = node.candidate ? `候選｜${node.sub}` : node.sub;
  addText(group,{x:12,y:subY,class:node.candidate?'candidate-badge':'node-sub'},subText);

  const routeIds = [...node.routeIds];
  const selectNode = ()=>{
    pinnedRouteIds = new Set(routeIds);
    pinnedLabel = node.title.replace('\n','');
    hoverRouteIds.clear();
    applyState();
    const routes = pathwayRoutes.filter(route=>pinnedRouteIds.has(route.id));
    updateStatusForRoutes(routes,pinnedLabel);
  };
  group.addEventListener('click',selectNode);
  group.addEventListener('keydown',event=>{
    if(event.key==='Enter' || event.key===' '){event.preventDefault();selectNode();}
  });
  group.addEventListener('mouseenter',()=>{
    if(pinnedRouteIds.size) return;
    hoverRouteIds = new Set(routeIds);
    applyState();
  });
  group.addEventListener('mouseleave',()=>{
    if(pinnedRouteIds.size) return;
    hoverRouteIds.clear();
    applyState();
  });
  group.addEventListener('focus',()=>{
    if(pinnedRouteIds.size) return;
    hoverRouteIds = new Set(routeIds);
    applyState();
  });
  group.addEventListener('blur',()=>{
    if(pinnedRouteIds.size) return;
    hoverRouteIds.clear();
    applyState();
  });

  node.el = group;
  svg.appendChild(group);
}

function activeRouteSet(){
  if(pinnedRouteIds.size) return pinnedRouteIds;
  if(hoverRouteIds.size) return hoverRouteIds;
  return null;
}

function matchesGrade(routeId){
  if(activeGrade==='全部') return true;
  const route = pathwayRoutes.find(item=>item.id===routeId);
  return route && route.grade===activeGrade;
}

function applyState(){
  const focusSet = activeRouteSet();
  pathwayRoutes.forEach(route=>{
    const elements = routeEls.get(route.id);
    const gradeMatch = matchesGrade(route.id);
    const focused = focusSet ? focusSet.has(route.id) : false;
    const dim = !gradeMatch || (focusSet && !focused);
    elements.line.classList.toggle('is-hot',Boolean(focusSet && focused && gradeMatch));
    elements.line.classList.toggle('is-dim',Boolean(dim));
    elements.hit.style.pointerEvents = gradeMatch ? 'auto' : 'none';
  });

  nodes.forEach(node=>{
    const ids = [...node.routeIds];
    const gradeMatch = ids.some(matchesGrade);
    const focused = focusSet ? ids.some(id=>focusSet.has(id)) : false;
    const dim = !gradeMatch || (focusSet && !focused);
    node.el.classList.toggle('is-hot',Boolean(focusSet && focused && gradeMatch));
    node.el.classList.toggle('is-dim',Boolean(dim));
    node.el.style.pointerEvents = gradeMatch ? 'auto' : 'none';
  });
}

function updateStatusForRoutes(routes,label){
  if(!routes.length){
    showDefaultStatus();
    return;
  }
  if(routes.length===1){
    const route = routes[0];
    statusBox.innerHTML = `
      <strong>${label}</strong>
      <p>${route.grade}｜${route.progress}｜${route.role}</p>
      <ul>
        <li><b>閱讀：</b>${route.book.replace('\n','')} → ${route.strategy}</li>
        <li><b>寫作：</b>${route.writing}〈${route.topic}〉</li>
        <li><b>PBL：</b>${route.action}｜${route.actionNote}</li>
      </ul>`;
    return;
  }
  statusBox.innerHTML = `
    <strong>${label}</strong>
    <p>已鎖定 ${routes.length} 條學習路徑。</p>
    <ul>${routes.map(route=>`<li>${route.book.replace('\n','')} → ${route.writing} → ${route.action}</li>`).join('')}</ul>`;
}

function showDefaultStatus(){
  if(activeGrade!=='全部'){
    const routes = pathwayRoutes.filter(route=>route.grade===activeGrade);
    const sample = routes[0];
    statusBox.innerHTML = `
      <strong>${activeGrade}｜${sample.progress}｜${sample.role}</strong>
      <p>目前只顯示這個年級。點任一文本、策略、寫作或 PBL 節點，可再鎖定單一路徑。</p>
      <ul>${routes.map(route=>`<li>${route.book.replace('\n','')} → ${route.action}</li>`).join('')}</ul>`;
    return;
  }
  statusBox.innerHTML = `
    <strong>如何閱讀這張圖？</strong>
    <p>先點左側年級，看該年級的兩條主要學習路徑；也可以直接點中間的文本、閱讀策略或作文節點，反查它最後連到哪一個真實任務。</p>`;
}

function buildFilters(){
  ['全部',...gradeOrder].forEach(grade=>{
    const button = document.createElement('button');
    button.type='button';
    button.className='path-filter';
    button.textContent=grade;
    button.dataset.grade=grade;
    button.addEventListener('click',()=>{
      activeGrade=grade;
      pinnedRouteIds.clear();
      hoverRouteIds.clear();
      pinnedLabel='';
      [...filterBox.querySelectorAll('.path-filter')].forEach(btn=>btn.classList.toggle('active',btn.dataset.grade===grade));
      applyState();
      showDefaultStatus();
    });
    if(grade==='全部') button.classList.add('active');
    filterBox.appendChild(button);
  });
}

function resetAll(){
  activeGrade='全部';
  pinnedRouteIds.clear();
  hoverRouteIds.clear();
  pinnedLabel='';
  [...filterBox.querySelectorAll('.path-filter')].forEach(btn=>btn.classList.toggle('active',btn.dataset.grade==='全部'));
  applyState();
  showDefaultStatus();
}

prepareNodes();
drawBands();
drawHeaders();
drawRoutes();
nodes.forEach(drawNode);
buildFilters();
applyState();
showDefaultStatus();
resetButton.addEventListener('click',resetAll);

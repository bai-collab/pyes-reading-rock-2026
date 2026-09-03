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
  },
  {
    id:'g6-biochar', grade:'六年級', progress:'行動', role:'公民行動家', color:'#87525a',
    book:'北園稻作 × 稻梗／米糠', bookNote:'PBL 情境文本／模型閱讀', strategy:'因果・流程・模型閱讀', strategyNote:'理解燃燒、熱裂解、黑煙與炭化的關係',
    writing:'證據型說明／議論', topic:'稻梗燒掉就沒有了嗎？',
    action:'火箭爐 × 稻作副產物', actionNote:'燃燒→熱裂解→炭化→資源再利用'
  }
];

const gradeOrder = ['一年級','二年級','三年級','四年級','五年級','六年級'];
const gradeMeta = {
  '一年級':{progress:'發現',role:'小小發現家'},
  '二年級':{progress:'記錄',role:'生活記錄家'},
  '三年級':{progress:'調查',role:'社區調查員'},
  '四年級':{progress:'詮釋',role:'在地說書人'},
  '五年級':{progress:'分析',role:'永續設計師'},
  '六年級':{progress:'行動',role:'公民行動家'}
};

const journeyAxes = [
  {
    id:'place', name:'在地空間', subtitle:'生活尺度逐步放大', color:'#5f806d',
    stations:[
      ['一年級','上學路／校園','先看見自己每天經過的地方'],
      ['二年級','北社尾公園','從公共空間讀社區記憶'],
      ['三年級','社區散步','把路線變成調查場域'],
      ['四年級','嘉南大圳／地方','理解水、農業與聚落如何形成'],
      ['五年級','校園公共問題','從空間進入利害關係人與需求'],
      ['六年級','社區／城市行動','把提案帶向更大的公共尺度']
    ]
  },
  {
    id:'eco', name:'生態與資源', subtitle:'生命 → 生產 → 循環', color:'#79915b',
    stations:[
      ['一年級','獨角仙','觀察生命與棲地'],
      ['二年級','種子','理解生命的開始與移動'],
      ['三年級','香草／蚊蟲','用植物與環境做探究'],
      ['四年級','水 × 稻米','理解農業生產的環境條件'],
      ['五年級','永續問題','用證據分析環境與生活問題'],
      ['六年級','資源循環','AI 回收分類＋稻梗碳化再利用']
    ]
  },
  {
    id:'inquiry', name:'探究方法', subtitle:'從觀察走向驗證', color:'#4f7c84',
    stations:[
      ['一年級','觀察','看見、指認、描述'],
      ['二年級','比較／記錄','分類、找差異、留下紀錄'],
      ['三年級','提問／調查','地圖、圖表與資料蒐集'],
      ['四年級','訪談／整合','用多來源互相驗證'],
      ['五年級','查證／分析','來源、證據、因果與利害關係人'],
      ['六年級','AI／模型驗證','測試判斷、找錯誤、修正模型']
    ]
  },
  {
    id:'literacy', name:'閱讀與寫作', subtitle:'閱讀輸入 → 寫作輸出', color:'#766e90',
    stations:[
      ['一年級','描述','圖文記敘、移景小短文'],
      ['二年級','比較／記錄','記景、觀察歷程'],
      ['三年級','記敘／說明','把觀察與調查整理成文章'],
      ['四年級','敘事／報告','訪談、多文本與事理說明'],
      ['五年級','議論','如何型／為何型，用證據支持主張'],
      ['六年級','論證／倡議','用資料、反例與行動方案說服']
    ]
  },
  {
    id:'civic', name:'科技與公民', subtitle:'工具能力服務真實行動', color:'#9a6b4b',
    stations:[
      ['一年級','圖像／地圖','用簡易圖像表達生活'],
      ['二年級','分類','把資訊整理成可比較的類別'],
      ['三年級','圖表／流程','用資料與流程理解社區'],
      ['四年級','多來源整理','照片、訪談、水文圖交叉閱讀'],
      ['五年級','假資訊 × 選舉','查證資訊，形成有證據的政見'],
      ['六年級','AI／模擬 × 公民行動','驗證 AI、操作模型、提出改善方案']
    ]
  }
];

const crossGradeStories = [
  {
    kicker:'公共判斷線', title:'公民選舉 × 假資訊',
    stops:[
      '五年級｜訪談利害關係人，找出真正的校園問題',
      '五年級｜《假消息終結戰》：來源查證與證據評估',
      '五年級｜小市長選舉：讓政見建立在證據上',
      '六年級｜立場比較、論證與公民提案'
    ]
  },
  {
    kicker:'人機判斷線', title:'AI × 資源回收分類',
    stops:[
      '五年級｜不要盲信網路資訊：先查來源與證據',
      '六年級｜閱讀回收規則與處理流程',
      '六年級｜蒐集影像、標註資料、訓練 AI',
      '六年級｜用正式規則驗證 AI，分析它為什麼判錯'
    ]
  },
  {
    kicker:'生質資源線', title:'火箭爐 × 稻作副產物資源循環', featured:true,
    stops:[
      '二年級｜種子：生命與食農的起點',
      '三年級｜植物／香草：觀察生長與環境',
      '四年級｜水 × 稻米：嘉南大圳、農業與聚落',
      '六年級｜稻梗／米糠 → 火箭爐 → 熱裂解／炭化 → 再利用'
    ]
  }
];

const NS = 'http://www.w3.org/2000/svg';
const journeyBoard = document.getElementById('journeyBoard');
const journeyButtons = document.getElementById('journeyAxisButtons');
const journeyStatus = document.getElementById('journeyStatus');
const storyGrid = document.getElementById('storyGrid');
const svg = document.getElementById('pathwaySvg');
const filterBox = document.getElementById('gradeFilters');
const resetButton = document.getElementById('resetPathways');
const statusBox = document.getElementById('pathwayStatus');

let activeJourneyAxis = '全部';
let selectedJourneyStation = null;
let activeGrade = '全部';
let pinnedRouteIds = new Set();
let pinnedLabel = '';
let hoverRouteIds = new Set();

function renderJourney(){
  journeyBoard.innerHTML = '';
  journeyButtons.innerHTML = '';

  ['全部',...journeyAxes.map(axis=>axis.name)].forEach(label=>{
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'journey-axis-btn';
    btn.textContent = label;
    btn.dataset.axis = label;
    if(label==='全部') btn.classList.add('active');
    btn.addEventListener('click',()=>selectJourneyAxis(label));
    journeyButtons.appendChild(btn);
  });

  const gradeRail = document.createElement('div');
  gradeRail.className = 'journey-grade-rail';
  const corner = document.createElement('div');
  corner.className = 'journey-corner';
  corner.textContent = '年級 ↓';
  gradeRail.appendChild(corner);
  gradeOrder.forEach(grade=>{
    const cell = document.createElement('div');
    cell.className = 'journey-grade';
    cell.innerHTML = `<strong>${grade}</strong><small>${gradeMeta[grade].progress}｜${gradeMeta[grade].role}</small>`;
    gradeRail.appendChild(cell);
  });
  journeyBoard.appendChild(gradeRail);

  journeyAxes.forEach(axis=>{
    const col = document.createElement('section');
    col.className = 'journey-axis';
    col.dataset.axis = axis.name;
    col.style.setProperty('--axis-color',axis.color);

    const head = document.createElement('button');
    head.type = 'button';
    head.className = 'journey-axis-head';
    head.innerHTML = `<strong>${axis.name}</strong><small>${axis.subtitle}</small>`;
    head.addEventListener('click',()=>selectJourneyAxis(axis.name));
    col.appendChild(head);

    const track = document.createElement('div');
    track.className = 'journey-track';
    axis.stations.forEach(([grade,title,note])=>{
      const station = document.createElement('button');
      station.type = 'button';
      station.className = 'journey-station';
      station.dataset.grade = grade;
      station.dataset.axis = axis.name;
      station.innerHTML = `<strong>${title}</strong><small>${note}</small>`;
      station.addEventListener('click',()=>selectJourneyStation(axis,grade,title,note,station));
      track.appendChild(station);
    });
    col.appendChild(track);
    journeyBoard.appendChild(col);
  });
}

function selectJourneyAxis(label){
  activeJourneyAxis = label;
  selectedJourneyStation = null;
  [...journeyButtons.querySelectorAll('.journey-axis-btn')].forEach(btn=>btn.classList.toggle('active',btn.dataset.axis===label));
  [...journeyBoard.querySelectorAll('.journey-axis')].forEach(col=>{
    const match = label==='全部' || col.dataset.axis===label;
    col.classList.toggle('is-focus',label!=='全部' && match);
    col.classList.toggle('is-dim',label!=='全部' && !match);
  });
  [...journeyBoard.querySelectorAll('.journey-station')].forEach(station=>station.classList.remove('is-selected'));
  if(label==='全部'){
    journeyStatus.innerHTML = `<strong>整體讀法</strong><p>五條軸一起看，可以看到同一個孩子如何從一年級的生活觀察，逐步進入社區調查、地方理解、證據查證，最後用 AI、模型與公民提案處理真實問題。</p>`;
  } else {
    const axis = journeyAxes.find(item=>item.name===label);
    const path = axis.stations.map(item=>item[1]).join(' → ');
    journeyStatus.innerHTML = `<strong>${axis.name}｜六年縱貫</strong><p>${path}</p>`;
  }
}

function selectJourneyStation(axis,grade,title,note,station){
  selectJourneyAxis(axis.name);
  selectedJourneyStation = {axis:axis.name,grade,title};
  station.classList.add('is-selected');
  journeyStatus.innerHTML = `
    <strong>${grade}｜${axis.name}｜${title}</strong>
    <p>${note}</p>
    <button class="journey-detail-btn" type="button" data-grade="${grade}">查看 ${grade} 詳細 Threads ↓</button>`;
  const detailBtn = journeyStatus.querySelector('.journey-detail-btn');
  detailBtn.addEventListener('click',()=>{
    setGradeFilter(grade);
    document.getElementById('pathways').scrollIntoView({behavior:'smooth',block:'start'});
  });
}

function renderStories(){
  storyGrid.innerHTML = '';
  crossGradeStories.forEach(story=>{
    const card = document.createElement('article');
    card.className = `story-card${story.featured?' featured':''}`;
    card.innerHTML = `
      <span class="story-kicker">${story.kicker}</span>
      <h3>${story.title}</h3>
      <div class="story-route">${story.stops.map(stop=>`<div class="story-stop">${stop}</div>`).join('')}</div>`;
    storyGrid.appendChild(card);
  });
}

const columns = [
  {key:'grade', title:'① 年級情境', subtitle:'角色 × 學習尺度', x:45, w:190},
  {key:'book', title:'② 核心文本／情境', subtitle:'從文本或真實問題進入探究', x:305, w:235},
  {key:'strategy', title:'③ 閱讀策略', subtitle:'學生怎麼讀、怎麼找證據', x:615, w:245},
  {key:'writing', title:'④ 寫作轉化', subtitle:'把閱讀方法轉成自己的表達', x:935, w:235},
  {key:'action', title:'⑤ PBL 行動', subtitle:'把閱讀與寫作帶回真實世界', x:1240, w:255}
];

const routeY = new Map(pathwayRoutes.map((route,index)=>[route.id,105 + index * 82]));
const nodes = [];
const nodeMap = new Map();
const routeEls = new Map();
let crossGradeLink = null;

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
  const height = titleLines.length > 1 ? 82 : 68;
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
    const top = Math.min(...ys)-38;
    const bottom = Math.max(...ys)+38;
    const band = svgEl('rect',{
      x:18,y:top,width:1510,height:bottom-top,rx:18,
      fill:index%2===0?'#fbfaf5':'#f6f8f5',opacity:.76
    });
    bg.appendChild(band);
    addText(bg,{x:1518,y:top+20,'text-anchor':'end',class:'grade-label'},grade);
  });
  svg.appendChild(bg);
}

function drawHeaders(){
  const g = svgEl('g',{'aria-hidden':'true'});
  columns.forEach((column,index)=>{
    addText(g,{x:column.x+column.w/2,y:31,'text-anchor':'middle',class:'column-title'},column.title);
    addText(g,{x:column.x+column.w/2,y:50,'text-anchor':'middle',class:'column-subtitle'},column.subtitle);
    if(index<columns.length-1){
      const dividerX = column.x+column.w+35;
      g.appendChild(svgEl('line',{x1:dividerX,y1:63,x2:dividerX,y2:1135,class:'svg-divider'}));
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

function drawCrossGradeLinks(){
  const from = getNode('g4-water','action');
  const to = getNode('g6-biochar','action');
  if(!from || !to) return;

  const defs = svgEl('defs');
  const marker = svgEl('marker',{id:'crossArrow',viewBox:'0 0 10 10',refX:'8',refY:'5',markerWidth:'7',markerHeight:'7',orient:'auto-start-reverse'});
  marker.appendChild(svgEl('path',{d:'M 0 0 L 10 5 L 0 10 z',fill:'#9b6b45'}));
  defs.appendChild(marker);
  svg.appendChild(defs);

  const x = from.x + from.w - 8;
  const loopX = 1585;
  const path = svgEl('path',{
    d:`M ${x} ${from.y} C ${loopX} ${from.y}, ${loopX} ${to.y}, ${x} ${to.y}`,
    class:'cross-grade-link','marker-end':'url(#crossArrow)'
  });
  svg.appendChild(path);
  svg.appendChild(svgEl('circle',{cx:x,cy:from.y,r:5,class:'cross-grade-dot'}));
  addText(svg,{x:1576,y:(from.y+to.y)/2-5,'text-anchor':'end',class:'cross-grade-caption'},'四年水×稻米 → 六年稻作副產物');
  crossGradeLink = path;
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
    addText(group,{x:13,y:19,class:'node-kicker'},node.kicker);
  }

  const titleLines = String(node.title).split('\n');
  const titleStart = node.kicker ? 41 : (titleLines.length>1 ? 24 : 29);
  titleLines.forEach((line,index)=>{
    addText(group,{x:13,y:titleStart+index*17,class:'node-title'},line);
  });

  const subY = node.h-12;
  const subText = node.candidate ? `候選｜${node.sub}` : node.sub;
  addText(group,{x:13,y:subY,class:node.candidate?'candidate-badge':'node-sub'},subText);

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

  if(crossGradeLink){
    const related = !focusSet || focusSet.has('g4-water') || focusSet.has('g6-biochar');
    crossGradeLink.style.opacity = related ? '.72' : '.08';
  }
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
    <p>先選年級，再點文本、閱讀策略、作文或 PBL 節點，反查完整的「讀 → 寫 → 探究 → 行動」路徑。右側虛線顯示四年級「水 × 稻米」如何銜接六年級稻作副產物與火箭爐探究。</p>`;
}

function buildFilters(){
  ['全部',...gradeOrder].forEach(grade=>{
    const button = document.createElement('button');
    button.type='button';
    button.className='path-filter';
    button.textContent=grade;
    button.dataset.grade=grade;
    button.addEventListener('click',()=>setGradeFilter(grade));
    if(grade==='全部') button.classList.add('active');
    filterBox.appendChild(button);
  });
}

function setGradeFilter(grade){
  activeGrade=grade;
  pinnedRouteIds.clear();
  hoverRouteIds.clear();
  pinnedLabel='';
  [...filterBox.querySelectorAll('.path-filter')].forEach(btn=>btn.classList.toggle('active',btn.dataset.grade===grade));
  applyState();
  showDefaultStatus();
}

function resetAll(){
  setGradeFilter('全部');
}

function enableDragScroll(element){
  let dragging = false;
  let pointerId = null;
  let startX = 0;
  let startScrollLeft = 0;

  element.addEventListener('pointerdown',event=>{
    if(event.pointerType!=='mouse' || event.button!==0) return;
    if(event.target.closest('button,a,.path-node,.path-hit')) return;
    dragging = true;
    pointerId = event.pointerId;
    startX = event.clientX;
    startScrollLeft = element.scrollLeft;
    element.setPointerCapture(pointerId);
    element.classList.add('dragging');
  });

  element.addEventListener('pointermove',event=>{
    if(!dragging || event.pointerId!==pointerId) return;
    element.scrollLeft = startScrollLeft - (event.clientX-startX);
  });

  const endDrag = event=>{
    if(!dragging || (event.pointerId!=null && event.pointerId!==pointerId)) return;
    dragging = false;
    element.classList.remove('dragging');
    if(pointerId!=null && element.hasPointerCapture(pointerId)) element.releasePointerCapture(pointerId);
    pointerId = null;
  };

  element.addEventListener('pointerup',endDrag);
  element.addEventListener('pointercancel',endDrag);
  element.addEventListener('lostpointercapture',()=>{
    dragging=false;
    pointerId=null;
    element.classList.remove('dragging');
  });
}

renderJourney();
renderStories();
prepareNodes();
drawBands();
drawHeaders();
drawRoutes();
drawCrossGradeLinks();
nodes.forEach(drawNode);
buildFilters();
applyState();
showDefaultStatus();
resetButton.addEventListener('click',resetAll);
document.querySelectorAll('.drag-scroll').forEach(enableDragScroll);

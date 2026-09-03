const gradeOrder = ['一年級','二年級','三年級','四年級','五年級','六年級'];

const axes = [
  {
    id:'place', title:'在地空間', subtitle:'從上學路走向城市', color:'#5f806d', soft:'#edf4ef', angle:-90,
    grades:[
      ['一年級','上學路／校園',{text:'《1、2、3，上學去！》',read:'順序・移景・空間',write:'記景小短文〈我的上學路〉',pbl:'上學路線圖／校園觀察'}],
      ['二年級','北社尾公園',{text:'《全世界最特別的公園》',read:'比較・分類・地方觀察',write:'記景／比較〈我眼中的北社尾公園〉',pbl:'北社尾公園尋根／社區文物'}],
      ['三年級','社區散步',{text:'《社區散步去》',read:'提問・摘要・地圖',write:'記敘〈社區散步記〉',pbl:'社區散步調查／路線與流程'}],
      ['四年級','嘉南大圳／地方',{text:'《水水三腳埤》＋地方資料',read:'因果・水文圖・多文本',write:'記景＋事理說明〈跟著一滴水去旅行〉',pbl:'水 × 稻米 × 聚落探究'}],
      ['五年級','校園公共問題',{text:'《如果我是市長》',read:'公共問題・利害關係人',write:'如何型議論〈如何讓學校更好？〉',pbl:'小市長選舉／校園政策提案'}],
      ['六年級','社區／城市行動',{text:'公共議題與倡議文本',read:'立場比較・系統思考',write:'議論／倡議〈我想改變的一件事〉',pbl:'公民提案／社區與城市行動'}]
    ]
  },
  {
    id:'eco', title:'生態與資源', subtitle:'生命 → 生產 → 循環', color:'#79915b', soft:'#f0f4e8', angle:-18,
    grades:[
      ['一年級','獨角仙',{text:'《假裝我是獨角仙》',read:'觀察・指認・特徵',write:'第一人稱圖文記敘〈如果我是獨角仙〉',pbl:'獨角仙復育／校園生命觀察'}],
      ['二年級','種子',{text:'《種子探險家》（候選）',read:'歷程・比較・因果',write:'觀察歷程／說明〈一顆種子的旅行〉',pbl:'食農・種子探究'}],
      ['三年級','香草／蚊蟲',{text:'《香草植物栽培筆記》',read:'觀察・圖表・資料',write:'事物說明〈我的香草觀察記〉',pbl:'香草 × 蚊蟲探究'}],
      ['四年級','水 × 稻米',{text:'《水水三腳埤》',read:'因果・水文圖・多文本',write:'記景＋事理說明',pbl:'嘉南大圳／稻米生產條件'}],
      ['五年級','永續問題',{text:'環境／永續案例與資料',read:'證據評估・因果分析',write:'如何型／為何型議論',pbl:'用證據分析校園與社區永續問題'}],
      ['六年級','資源循環',{text:'《分好的垃圾去哪兒了？》＋北園稻作情境',read:'系統流程・資料判讀・模型閱讀',write:'證據型議論／說明',pbl:'AI 回收分類＋火箭爐／稻梗炭化再利用'}]
    ]
  },
  {
    id:'inquiry', title:'探究方法', subtitle:'從觀察走向驗證', color:'#4f7c84', soft:'#eaf2f3', angle:54,
    grades:[
      ['一年級','觀察',{text:'圖像、照片、簡易地圖',read:'看見・指認・描述',write:'用圖文留下觀察',pbl:'校園尋寶與生命觀察'}],
      ['二年級','比較／記錄',{text:'地方照片、紀錄表、圖文書',read:'分類・比較・找差異',write:'比較與觀察紀錄',pbl:'公園／種子資料紀錄'}],
      ['三年級','提問／調查',{text:'社區地圖、觀察表、圖表',read:'提問・摘要・讀圖表',write:'把調查整理成記敘／說明',pbl:'社區與自然調查'}],
      ['四年級','訪談／整合',{text:'老照片、耆老口述、水文圖',read:'多來源互證・訪談',write:'敘事／訪談報告',pbl:'地方歷史與水文探究'}],
      ['五年級','查證／分析',{text:'新聞、統計圖、查證案例',read:'來源查證・證據評估',write:'用證據支持議論主張',pbl:'公共問題診斷／假資訊查核'}],
      ['六年級','AI／模型驗證',{text:'回收規則、模型流程、測試資料',read:'系統流程・反例・驗證',write:'以測試結果修正論點',pbl:'AI 分類驗證＋火箭爐燃燒模型'}]
    ]
  },
  {
    id:'literacy', title:'閱讀與寫作', subtitle:'從描述走向論證', color:'#766e90', soft:'#f0eef5', angle:126,
    grades:[
      ['一年級','描述',{text:'《假裝我是獨角仙》／《1、2、3，上學去！》',read:'觀察、順序、移景',write:'圖文記敘／記景小短文',pbl:'從真實觀察取得寫作素材'}],
      ['二年級','比較／記錄',{text:'公園／種子相關文本',read:'比較、分類、歷程',write:'記景／觀察歷程',pbl:'把社區與食農紀錄轉成文章'}],
      ['三年級','記敘／說明',{text:'《社區散步去》／《香草植物栽培筆記》',read:'提問、摘要、資料閱讀',write:'記敘文＋事物說明',pbl:'用調查結果支撐寫作'}],
      ['四年級','敘事／報告',{text:'《大人的小學時代》／《水水三腳埤》',read:'訪談、多文本整合',write:'敘事／訪談報告／事理說明',pbl:'用人物、照片與水文資料互證'}],
      ['五年級','議論',{text:'《如果我是市長》／《假消息終結戰》',read:'公共問題、來源查證',write:'如何型／為何型議論',pbl:'政見必須建立在調查與證據上'}],
      ['六年級','論證／倡議',{text:'回收、選舉與公共議題文本',read:'立場比較、系統思考、反例',write:'證據型議論／公民倡議',pbl:'用 AI／模型資料形成主張與方案'}]
    ]
  },
  {
    id:'civic', title:'科技與公民', subtitle:'工具服務真實行動', color:'#9a6b4b', soft:'#f6eee8', angle:198,
    grades:[
      ['一年級','圖像／地圖',{text:'照片、簡易地圖、QR 資訊',read:'圖像與空間閱讀',write:'圖文表達',pbl:'用圖像記錄校園與上學路'}],
      ['二年級','分類',{text:'圖文書、紀錄表、地方照片',read:'把資訊整理成類別',write:'比較卡／圖文記錄',pbl:'用分類理解公園、種子與生活'}],
      ['三年級','圖表／流程',{text:'地圖、流程圖、調查表',read:'讀圖表與關鍵資訊',write:'調查說明',pbl:'社區調查＋流程思考'}],
      ['四年級','多來源整理',{text:'照片、訪談、水文圖',read:'跨媒介整理與互證',write:'數位敘事／報告',pbl:'地方故事與水資源資料整合'}],
      ['五年級','假資訊 × 選舉',{text:'《如果我是市長》＋《假消息終結戰》',read:'來源可信度、證據與利害關係人',write:'議論與政策表達',pbl:'小市長選舉／有證據的政見'}],
      ['六年級','AI／模擬 × 公民行動',{text:'《分好的垃圾去哪兒了？》＋資源循環／模型文本',read:'驗證 AI、讀模型、比較系統結果',write:'證據型議論／倡議',pbl:'①公民選舉×假資訊 ②AI回收分類 ③火箭爐×稻作副產物'}]
    ]
  }
];

const svg = document.getElementById('mindmapSvg');
const viewport = document.getElementById('mapViewport');
const canvas = document.getElementById('mapCanvas');
const statusBox = document.getElementById('mapStatus');
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');
const fitBtn = document.getElementById('fitMap');
const collapseBtn = document.getElementById('collapseMap');
const NS = 'http://www.w3.org/2000/svg';

const state = {
  expandedAxes:new Set(),
  expandedGrades:new Set(),
  x:window.innerWidth/2,
  y:window.innerHeight/2,
  scale:Math.max(.52,Math.min(.72,window.innerWidth/1500))
};

let drag = null;
let suppressClickUntil = 0;

function el(tag,attrs={}){
  const node=document.createElementNS(NS,tag);
  Object.entries(attrs).forEach(([key,value])=>node.setAttribute(key,value));
  return node;
}

function wrapLabel(text,max=12){
  const chars=[...String(text)];
  if(chars.length<=max) return [text];
  const lines=[];
  for(let i=0;i<chars.length;i+=max) lines.push(chars.slice(i,i+max).join(''));
  return lines.slice(0,3);
}

function polar(angleDeg,radius){
  const a=angleDeg*Math.PI/180;
  return {x:Math.cos(a)*radius,y:Math.sin(a)*radius};
}

function nodeSize(type,label){
  const length=[...label].length;
  if(type==='root') return {w:230,h:78};
  if(type==='axis') return {w:190,h:68};
  if(type==='grade') return {w:180,h:64};
  return {w:Math.min(220,150+Math.max(0,length-8)*5),h:length>18?76:62};
}

function addLink(from,to,className='map-link'){
  const dx=to.x-from.x,dy=to.y-from.y;
  const d=`M ${from.x} ${from.y} C ${from.x+dx*.42} ${from.y+dy*.12}, ${from.x+dx*.58} ${from.y+dy*.88}, ${to.x} ${to.y}`;
  viewport.appendChild(el('path',{d,class:className}));
}

function addNode({id,type,title,subtitle='',x,y,color='#5f806d',soft='#edf4ef',open=false,onClick=null}){
  const size=nodeSize(type,title);
  const g=el('g',{
    class:`map-node ${type} ${open?'is-open':''} entering`,
    transform:`translate(${x-size.w/2} ${y-size.h/2})`,
    tabindex:onClick?'0':'-1',
    role:onClick?'button':'group',
    'aria-label':subtitle?`${title}。${subtitle}`:title
  });
  g.style.setProperty('--node-color',color);
  g.style.setProperty('--node-soft',soft);
  g.dataset.id=id;
  g.appendChild(el('rect',{class:'node-card',x:0,y:0,width:size.w,height:size.h,rx:type==='root'?24:18}));

  const lines=wrapLabel(title,type==='detail'?14:11);
  const baseY=subtitle?size.h/2-(lines.length-1)*9-5:size.h/2-(lines.length-1)*9+5;
  lines.forEach((line,index)=>{
    const t=el('text',{class:'node-title',x:size.w/2,y:baseY+index*18,'dominant-baseline':'middle'});
    t.textContent=line;
    g.appendChild(t);
  });
  if(subtitle){
    const sub=el('text',{class:'node-sub',x:size.w/2,y:size.h-11});
    sub.textContent=subtitle;
    g.appendChild(sub);
  }
  if(type==='axis' || type==='grade'){
    g.appendChild(el('circle',{class:'node-dot',cx:size.w-11,cy:11,r:5}));
  }
  if(onClick){
    const activate=(event)=>{
      if(Date.now()<suppressClickUntil) return;
      event.stopPropagation();
      onClick();
    };
    g.addEventListener('click',activate);
    g.addEventListener('keydown',event=>{
      if(event.key==='Enter' || event.key===' '){event.preventDefault();activate(event);}
    });
  }
  viewport.appendChild(g);
  return {x,y,w:size.w,h:size.h,el:g};
}

function buildGeometry(){
  const geometry={root:{x:0,y:0},axes:new Map(),grades:new Map(),details:new Map()};
  axes.forEach(axis=>{
    const axisPos=polar(axis.angle,260);
    geometry.axes.set(axis.id,axisPos);
    if(!state.expandedAxes.has(axis.id)) return;

    axis.grades.forEach((grade,index)=>{
      const radius=460+index*165;
      const bend=(index-2.5)*1.2;
      const pos=polar(axis.angle+bend,radius);
      const key=`${axis.id}:${grade[0]}`;
      geometry.grades.set(key,pos);
      if(!state.expandedGrades.has(key)) return;

      const outwardAngle=(axis.angle+bend)*Math.PI/180;
      const ux=Math.cos(outwardAngle),uy=Math.sin(outwardAngle);
      const tx=-uy,ty=ux;
      const offsets=[-210,-70,70,210];
      const keys=['text','read','write','pbl'];
      keys.forEach((detailKey,i)=>{
        geometry.details.set(`${key}:${detailKey}`,{
          x:pos.x+ux*145+tx*offsets[i],
          y:pos.y+uy*145+ty*offsets[i]
        });
      });
    });
  });
  return geometry;
}

function render(){
  viewport.innerHTML='';
  const geo=buildGeometry();

  axes.forEach(axis=>{
    const axisPos=geo.axes.get(axis.id);
    addLink(geo.root,axisPos,'map-link axis-link');
    if(!state.expandedAxes.has(axis.id)) return;

    let previous=axisPos;
    axis.grades.forEach(grade=>{
      const key=`${axis.id}:${grade[0]}`;
      const pos=geo.grades.get(key);
      addLink(previous,pos,'map-link');
      previous=pos;
      if(!state.expandedGrades.has(key)) return;
      ['text','read','write','pbl'].forEach(detailKey=>addLink(pos,geo.details.get(`${key}:${detailKey}`),'map-link'));
    });
  });

  if(state.expandedAxes.has('eco')){
    const from=geo.grades.get('eco:四年級');
    const to=geo.grades.get('eco:六年級');
    if(from&&to){
      const dx=to.x-from.x,dy=to.y-from.y;
      const bendX=(from.x+to.x)/2 + (-dy)*.18;
      const bendY=(from.y+to.y)/2 + dx*.18;
      const d=`M ${from.x} ${from.y} Q ${bendX} ${bendY} ${to.x} ${to.y}`;
      viewport.appendChild(el('path',{d,class:'map-link cross-link'}));
      const label=el('text',{class:'cross-label',x:bendX,y:bendY-10,'text-anchor':'middle'});
      label.textContent='稻米生產 → 稻梗／米糠再利用';
      viewport.appendChild(label);
    }
  }

  addNode({id:'root',type:'root',title:'北園六年閱讀 PBL',subtitle:'從看見我的世界，到改變我們的世界',x:0,y:0,open:true,onClick:()=>{
    state.expandedAxes.clear();state.expandedGrades.clear();render();showStatus('北園六年閱讀 PBL','五條縱貫主軸由中心向外生長；點主軸展開一年級到六年級。');
  }});

  axes.forEach(axis=>{
    const axisPos=geo.axes.get(axis.id);
    const axisOpen=state.expandedAxes.has(axis.id);
    addNode({id:axis.id,type:'axis',title:axis.title,subtitle:axis.subtitle,x:axisPos.x,y:axisPos.y,color:axis.color,soft:axis.soft,open:axisOpen,onClick:()=>{
      if(axisOpen){
        state.expandedAxes.delete(axis.id);
        [...state.expandedGrades].filter(key=>key.startsWith(`${axis.id}:`)).forEach(key=>state.expandedGrades.delete(key));
      }else state.expandedAxes.add(axis.id);
      render();showStatus(axis.title,axisOpen?'已收合這條六年縱貫主軸。':'已展開一年級到六年級；再點任一年級可看到下層課程。');
    }});

    if(!axisOpen) return;
    axis.grades.forEach((grade,index)=>{
      const [gradeName,stage,detail]=grade;
      const key=`${axis.id}:${gradeName}`;
      const pos=geo.grades.get(key);
      const gradeOpen=state.expandedGrades.has(key);
      addNode({id:key,type:'grade',title:`${gradeName}｜${stage}`,subtitle:`${index+1} → ${index+2<=6?gradeOrder[index+1]:'行動收束'}`,x:pos.x,y:pos.y,color:axis.color,soft:axis.soft,open:gradeOpen,onClick:()=>{
        if(gradeOpen) state.expandedGrades.delete(key); else state.expandedGrades.add(key);
        render();showStatus(`${axis.title}｜${gradeName}｜${stage}`,gradeOpen?'已收合下層。':'下層已展開：核心文本／情境、閱讀／探究、寫作、PBL 行動。');
      }});

      if(!gradeOpen) return;
      const detailDefs=[
        ['text','文本／情境',detail.text],
        ['read','閱讀／探究',detail.read],
        ['write','寫作',detail.write],
        ['pbl','PBL 行動',detail.pbl]
      ];
      detailDefs.forEach(([detailKey,label,value])=>{
        const dpos=geo.details.get(`${key}:${detailKey}`);
        addNode({id:`${key}:${detailKey}`,type:'detail',title:value,subtitle:label,x:dpos.x,y:dpos.y,color:axis.color,soft:axis.soft});
      });
    });
  });

  applyTransform();
}

function showStatus(title,text){
  statusBox.innerHTML=`<strong>${title}</strong><p>${text}</p>`;
}

function applyTransform(){
  viewport.setAttribute('transform',`translate(${state.x} ${state.y}) scale(${state.scale})`);
}

function resetView(){
  state.x=window.innerWidth/2;
  state.y=window.innerHeight/2;
  state.scale=Math.max(.52,Math.min(.72,window.innerWidth/1500));
  applyTransform();
}

function zoomAt(factor,cx=window.innerWidth/2,cy=window.innerHeight/2){
  const old=state.scale;
  const next=Math.max(.28,Math.min(1.9,old*factor));
  const worldX=(cx-state.x)/old;
  const worldY=(cy-state.y)/old;
  state.x=cx-worldX*next;
  state.y=cy-worldY*next;
  state.scale=next;
  applyTransform();
}

canvas.addEventListener('pointerdown',event=>{
  if(event.button!==0 || event.target.closest('.map-node')) return;
  canvas.setPointerCapture(event.pointerId);
  drag={id:event.pointerId,startX:event.clientX,startY:event.clientY,x:state.x,y:state.y,moved:false};
  canvas.classList.add('dragging');
});
canvas.addEventListener('pointermove',event=>{
  if(!drag || drag.id!==event.pointerId) return;
  const dx=event.clientX-drag.startX,dy=event.clientY-drag.startY;
  if(Math.hypot(dx,dy)>4) drag.moved=true;
  state.x=drag.x+dx;state.y=drag.y+dy;applyTransform();
});
function endDrag(event){
  if(!drag || drag.id!==event.pointerId) return;
  if(drag.moved) suppressClickUntil=Date.now()+120;
  drag=null;canvas.classList.remove('dragging');
  try{canvas.releasePointerCapture(event.pointerId)}catch{}
}
canvas.addEventListener('pointerup',endDrag);
canvas.addEventListener('pointercancel',endDrag);
canvas.addEventListener('wheel',event=>{
  event.preventDefault();
  zoomAt(event.deltaY<0?1.1:.9,event.clientX,event.clientY);
},{passive:false});

zoomInBtn.addEventListener('click',()=>zoomAt(1.15));
zoomOutBtn.addEventListener('click',()=>zoomAt(.87));
fitBtn.addEventListener('click',()=>{resetView();showStatus('回到中心','畫布已回到知識地圖中心。');});
collapseBtn.addEventListener('click',()=>{
  state.expandedAxes.clear();state.expandedGrades.clear();render();resetView();showStatus('全部收合','目前只保留中央核心與五條六年縱貫主軸。');
});
window.addEventListener('resize',()=>{resetView();});

render();

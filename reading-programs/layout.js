// 無依賴、可重跑的世界座標布局。節點與SVG連線共用此座標。
window.ReadingLayout=(()=>{
  const size={Document:[190,190],Chapter:[144,104],Section:[244,178],Subsection:[244,178]};
  function rectangle(n){const [w,h]=size[n.type]||[244,178];return {x:n.x-w/2,y:n.y-h/2,w,h};}
  function intersection(a,b,gap=0){const A=rectangle(a),B=rectangle(b);return {x:Math.min(A.x+A.w,B.x+B.w)-Math.max(A.x,B.x)+gap,y:Math.min(A.y+A.h,B.y+B.h)-Math.max(A.y,B.y)+gap};}
  function resolve(nodes){
    // 固定核心／章群，只推開內容卡；少量確定性鬆弛，不依賴亂數。
    for(let step=0;step<180;step++){
      let changed=false;
      for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
        const a=nodes[i],b=nodes[j],o=intersection(a,b,24);if(o.x<=0||o.y<=0)continue;
        const movableA=['Section','Subsection'].includes(a.type),movableB=['Section','Subsection'].includes(b.type);if(!movableA&&!movableB)continue;
        const axis=o.x<o.y?'x':'y',delta=(o[axis]+.2)*(a[axis]<=b[axis]?-1:1);
        if(movableA&&movableB){a[axis]+=delta/2;b[axis]-=delta/2;}else if(movableA)a[axis]+=delta;else b[axis]-=delta;
        changed=true;
      }
      if(!changed)break;
    }
    const collisions=[];for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){const o=intersection(nodes[i],nodes[j]);if(o.x>.01&&o.y>.01)collisions.push([nodes[i].id,nodes[j].id]);}
    if(collisions.length)throw Error('LAYOUT_COLLISION:'+JSON.stringify(collisions));return nodes;
  }
  function layout(graph,doc,expanded=null){
    const all=new Map(graph.nodes.map(n=>[n.id,n])),root=all.get(doc);if(root?.type!=='Document')throw Error('DOCUMENT_REQUIRED');
    const nodes=[{...root,x:0,y:0,chapter:null}],edges=[];
    const chapters=graph.nodes.filter(n=>n.type==='Chapter'&&n.doc===doc);
    chapters.forEach((chapter,i)=>{
      const angle=(-90+i*60)*Math.PI/180,color=i,hub={...chapter,x:Math.cos(angle)*300,y:Math.sin(angle)*300,chapter:chapter.id,color};nodes.push(hub);edges.push({source:doc,target:chapter.id,type:'CONTAINS',kind:'hierarchy',color});
      const ss=graph.sections.filter(s=>s.doc===doc&&`${doc}-ch${s.ch}`===chapter.id);
      ss.forEach((s,j)=>{
        const offset=ss.length===1?0:((j/(ss.length-1))-.5)*48*Math.PI/180,a=angle+offset;
        const node={...all.get(s.id),x:Math.cos(a)*760,y:Math.sin(a)*760,chapter:chapter.id,color};nodes.push(node);edges.push({source:chapter.id,target:s.id,type:'CONTAINS',kind:'hierarchy',color});
        if(expanded===s.id){
          const subs=graph.nodes.filter(n=>n.type==='Subsection'&&graph.edges.some(e=>e.source===s.id&&e.target===n.id&&e.type==='CONTAINS'));
          subs.forEach((sub,k)=>{const spread=(k-(subs.length-1)/2)*260,tangent=a+Math.PI/2;nodes.push({...sub,x:node.x+Math.cos(a)*400+Math.cos(tangent)*spread,y:node.y+Math.sin(a)*400+Math.sin(tangent)*spread,chapter:chapter.id,color});edges.push({source:s.id,target:sub.id,type:'CONTAINS',kind:'hierarchy',color,subbranch:true});});
        }
      });
    });
    resolve(nodes);return {nodes,edges};
  }
  // 同主題關連：畫面上任兩張「節」卡只要共有整理者主題標籤就連一條虛線（可跨章）；theme 指定時只留該主題。
  function shared(a,b,theme='auto'){const t=(a.tags||[]).filter(x=>(b.tags||[]).includes(x));return theme==='auto'?t:theme?t.filter(x=>x===theme):[];}
  function links(graph,nodes,theme='auto'){
    const result=[],sections=nodes.filter(n=>n.type==='Section');
    for(let i=0;i<sections.length;i++)for(let j=i+1;j<sections.length;j++){const a=sections[i],b=sections[j],themes=shared(a,b,theme);if(!themes.length)continue;
      result.push({source:a.id,target:b.id,kind:'theme',theme:themes.join('、'),themes,crossChapter:a.chapter!==b.chapter,basis:'整理者同主題分類，非因果或先後',color:a.color});}
    return result;
  }
  function related(graph,node,theme='auto'){
    // 回傳與 node（節或子節）共有主題的其他「節」，含共同主題清單。
    if(!node?.tags?.length)return [];return graph.sections.filter(s=>s.doc===node.doc&&s.id!==node.id).map(s=>({id:s.id,themes:shared(node,s,theme)})).filter(r=>r.themes.length);
  }
  function bounds(nodes){if(!nodes.length)return {x:-100,y:-100,w:200,h:200};const rs=nodes.map(rectangle),x=Math.min(...rs.map(r=>r.x)),y=Math.min(...rs.map(r=>r.y));return {x,y,w:Math.max(...rs.map(r=>r.x+r.w))-x,h:Math.max(...rs.map(r=>r.y+r.h))-y};}
  function endpoint(a,b){const A=rectangle(a),dx=b.x-a.x,dy=b.y-a.y;if(!dx&&!dy)return {x:a.x,y:a.y};const k=Math.min(A.w/2/Math.max(Math.abs(dx),.001),A.h/2/Math.max(Math.abs(dy),.001));return {x:a.x+dx*k,y:a.y+dy*k};}
  return {layout,links,related,shared,rectangle,bounds,endpoint,intersection};
})();

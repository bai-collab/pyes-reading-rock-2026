const grades = [
  {g:'一年級',role:'小小發現家',progress:'發現',ability:'觀察、指認、說明',local:'我的校園會說話\n校園動物朋友\n我的社區好鄰居',action:'尋寶圖／小圖鑑／感謝卡',sdgs:'3・6・11・15',domains:'國語・生活・健康',candidate:'《假裝我是獨角仙》\n《食物從哪裡來？》',core:'核心書：《假裝我是獨角仙》\n搭配：《1、2、3，上學去！》＋校園照片／簡易地圖',reason:'《假裝我是獨角仙》直接連結校園昆蟲觀察、特徵與棲地，可支撐一年級「觀察、指認、說明」；再以《1、2、3，上學去！》補足校園空間、人物與生活情境。',texts:'圖像／照片／簡易地圖',library:'認識圖書館與自主選書',digital:'圖像／QR資訊閱讀與簡單表達',assessment:'觀察與說明規準',output:'校園／自然觀察作品',ind:['3-1','3-3','3-4','4-1']},
  {g:'二年級',role:'生活記錄家',progress:'記錄',ability:'比較、分類、圖文表達',local:'社區裡的心靈角落\n聽見社區的聲音\n公園裡的一天',action:'明信片／比較卡／班級公約',sdgs:'3・11・12・15',domains:'國語・生活・健體・藝文',candidate:'《全世界最特別的公園》\n《學校營養午餐的一天》',core:'核心書：《全世界最特別的公園》\n搭配：《我和世界的孩子不一樣的生活》＋地方照片／世界地圖',reason:'《全世界最特別的公園》從熟悉公共空間切入；搭配《我和世界的孩子不一樣的生活》進行跨文化比較，較能支撐二年級「比較、分類、圖文表達」。',texts:'圖文書／菜單／紀錄表',library:'認識書籍結構與基本分類',digital:'圖文整理與簡單比較',assessment:'比較分類與圖文表達規準',output:'生活記錄與文化比較作品',ind:['3-1','3-3','3-4','4-1']},
  {g:'三年級',role:'社區調查員',progress:'調查',ability:'提問、摘要、讀圖表',local:'便利生活的祕密\n社區職人大調查\n北園香草共生樂章',action:'地圖／調查圖表／倡議書',sdgs:'11・12・15',domains:'國語・社會・自然・綜合',candidate:'《社區散步去》\n《香草植物栽培筆記》',core:'核心書：《社區散步去》\n搭配：《香草植物栽培筆記》＋觀察日誌／表格／社區地圖',reason:'《社區散步去》適合作為社區調查入口；搭配香草種植資料、觀察日誌與表格，可讓三年級練習「提問、摘要、讀圖表」，兼顧在地與資料閱讀。',texts:'地圖／流程圖／訪談',library:'關鍵字與館藏查找',digital:'搜尋關鍵字、閱讀地圖／圖表',assessment:'提問摘要與圖表判讀規準',output:'社區調查與數據圖表',ind:['3-1','3-2','3-3','3-4','4-1']},
  {g:'四年級',role:'在地說書人',progress:'詮釋',ability:'訪談、多文本整合、敘事',local:'耆老口中的社區\n一粒米的旅行\n一滴水的旅行',action:'文化地圖／播客／改善提案',sdgs:'6・11・12',domains:'國語・社會・自然・資訊・藝術',candidate:'《大人的小學時代》\n《水水三腳埤》',core:'核心書：《大人的小學時代》\n搭配：《水水三腳埤》＋老照片／耆老訪談／水文圖',reason:'《大人的小學時代》可與耆老訪談、老照片互證；《水水三腳埤》可連結嘉南大圳、水文與地方資料，能形成四年級「訪談、多文本整合、敘事」的完整證據鏈。',texts:'老照片／水文圖／訪談／播客稿',library:'多來源查找與記錄來源',digital:'多來源搜尋、整理與數位敘事',assessment:'訪談與多文本整合規準',output:'在地故事、多文本敘事／播客',ind:['2-3','3-1','3-2','3-3','3-4','4-1','4-3']},
  {g:'五年級',role:'永續設計師',progress:'分析',ability:'評估證據、分析因果、查證',local:'社區正在面對什麼問題\n永續社區案例研究\n食物里程有多遠',action:'問題診斷／調查報告／紀錄短片',sdgs:'7・11・12・13',domains:'國語・社會・自然・資訊・綜合',candidate:'《如果我是市長》\n《1度C究竟有多熱？》',core:'核心書：《如果我是市長》\n搭配：《假消息終結戰》＋新聞／統計圖／查證表',reason:'《如果我是市長》可從公共問題與決策形成問題意識；《假消息終結戰》直接練習來源、證據與查證，與五年級「評估證據、分析因果、查證」最貼合。',texts:'新聞／統計圖／能源資料／查證案例',library:'來源比較與可信度判讀',digital:'來源評估、查證與證據整合',assessment:'證據評估與查證規準',output:'永續問題分析與解方設計',ind:['2-3','3-1','3-3','3-4','4-1','4-3']},
  {g:'六年級',role:'公民行動家',progress:'行動',ability:'論證、立場比較、系統思考',local:'誰的社區？誰來決定？\n地方創生與社區未來\n我的永續畢業行動',action:'公民提案／辯論／永續行動專題',sdgs:'6・11・12・16・17',domains:'國語・社會・自然・資訊・綜合',candidate:'《去投票吧！做出選擇，創造改變》\n《分好的垃圾去哪兒了？》',core:'核心書：《去投票吧！做出選擇，創造改變》\n搭配：《大聲說出來！》＋觀點文章／數據／倡議案例',reason:'《去投票吧！做出選擇，創造改變》支撐公共參與與不同立場理解；《大聲說出來！》進一步練習提出理由與推動改變，能銜接六年級「論證、立場比較、系統思考→提案與行動」。',texts:'政策／觀點文章／數據／倡議文本',library:'引用、整理與專題研究',digital:'多來源論證、引用與數位提案',assessment:'論證、系統思考與提案規準',output:'公民提案與永續行動專題',ind:['2-3','3-1','3-3','3-4','4-1','4-3']}
];

const strategies = [
  {name:'觀察／訊息擷取',hits:{'一年級':'● 我的校園會說話／校園動物朋友\n國語・生活\n尋寶圖／小圖鑑'}},
  {name:'比較／分類',hits:{'二年級':'● 世界節慶「藝」起來／世界孩子的早餐\n國語・生活・藝文\n比較卡／早餐轉盤','三年級':'● 同一種食物，不同吃法\n國語・社會\n食材文化比較表'}},
  {name:'重點整理／摘要',hits:{'二年級':'● 營養午餐解密／社區生活閱讀\n國語・生活\n營養偵探表／簡短書寫','三年級':'● 便利生活的祕密／植物成長日記\n國語・社會・自然\n重點整理／成長日記'}},
  {name:'圖文轉換／表達',hits:{'二年級':'● 心靈角落／聽見社區的聲音\n國語・生活・藝文\n明信片／聲音地圖'}},
  {name:'地圖／流程圖／圖表判讀',hits:{'三年級':'● 公車帶我去哪裡／一封信的旅行／垃圾大調查\n社會・自然・綜合\n路線圖／流程圖／調查圖表','五年級':'● 地球為什麼發燒／校園能源偵探\n自然・社會・資訊\n氣候因果圖／能源報告','六年級':'○ 全球糧食夠不夠\n社會・自然\n數據圖表→問題因果系統圖'}},
  {name:'提問／資料蒐集',hits:{'三年級':'● 社區職人大調查／香草共生樂章\n國語・社會・自然\n訪談提綱／觀察日誌','四年級':'○ 耆老口中的社區\n國語・社會\n訪談與資料對照','五年級':'○ 社區正在面對什麼問題\n社會・國語\n新聞＋居民訪談'}},
  {name:'訪談／口述資料',hits:{'四年級':'● 耆老口中的社區／一粒米的旅行\n國語・社會・自然\n口述歷史／農夫訪談','五年級':'○ 社區問題診斷\n國語・社會\n居民訪談＋新聞'}},
  {name:'多文本整合',hits:{'四年級':'● 社區故事／嘉南大圳／世界城市\n國語・社會・自然・資訊\n老照片＋文章＋水文圖／比較表','五年級':'○ 永續社區／氣候議題\n國語・社會・自然\n新聞＋政策圖文＋統計資料','六年級':'○ 水資源／SDGs／世界公民\n國語・社會・自然\n報導＋觀點文＋數據'}},
  {name:'數位敘事',hits:{'四年級':'● 社區文化地圖2.0／小小播客\n國語・社會・資訊・藝術\n互動地圖／三分鐘播客','五年級':'○ 紀錄片如何說故事\n國語・資訊・藝術\n分鏡腳本／永續短片'}},
  {name:'觀點辨識／表達',hits:{'四年級':'● 世界城市怎麼生活／小小播客\n國語・社會\n比較簡報／播客表達','五年級':'● 社區問題／紀錄片如何說故事\n國語・社會・資訊\n問題診斷／分鏡腳本','六年級':'● 水是商品還是權利／世界公民\n國語・社會\n立場短文／世界公民宣言'}},
  {name:'證據評估／資訊查證',hits:{'五年級':'● 網路資料都可信嗎／社區問題診斷\n國語・社會・資訊\n資訊查證紀錄／證據評估','六年級':'● 公民提案／SDGs議題\n國語・社會・資訊\n提案證據／資料評估'}},
  {name:'因果分析／系統思考',hits:{'四年級':'● 一滴水的旅行／水足跡\n自然・社會\n水路故事圖／水足跡圖卡','五年級':'● 地球為什麼發燒／食物里程\n自然・社會\n因果概念圖／食物里程調查','六年級':'● 全球糧食／循環經濟\n社會・自然\n因果系統圖／循環方案'}},
  {name:'論證／立場比較',hits:{'六年級':'● 水是商品還是權利／SDGs真的能改變世界嗎\n國語・社會\n立場論證短文／觀點辯論'}},
  {name:'問題解決／提案行動',hits:{'五年級':'● 永續社區案例／校園能源偵探\n社會・自然・綜合\n案例比較／改善解方','六年級':'● 公民提案／地方創生／畢業行動\n國語・社會・綜合\n公民提案／永續行動專題'}}
];

const indicators = [
 ['1-1','1. 理念・目標・組織','閱讀推動之理念及其發展脈絡','理念、目標、教學計畫、成效前後呼應；發展脈絡可分期呈現。','理念架構圖、發展脈絡、各階段代表作為'],
 ['1-2','1. 理念・目標・組織','短中長期程目標內涵','說明學生透過閱讀教育要達成什麼，並具體寫出短中長期內涵。','短中長程目標表、目標與課程對照'],
 ['1-3','1. 理念・目標・組織','閱讀推動組織架構與分工','重點是分類與分工，涵蓋校內外資源，不必詳列人名。','組織圖、分工表、校內外資源對照'],
 ['2-1','2. 資源與環境','有效整合校內外資源推動閱讀','看資源如何實際支持閱讀推動。','館藏文本盤點、合作資源、資源進入課程紀錄'],
 ['2-2','2. 資源與環境','優化閱讀環境提升學習成效','不只看環境布置，要看環境如何支持閱讀學習。','圖書室／閱讀角使用、活動紀錄、學生學習證據'],
 ['2-3','2. 資源與環境','資源整合提供數位閱讀學習課程','重點為確認問題、搜尋、評估可信度、整合來源、組織與呈現。','搜尋歷程、來源評估、跨來源統整、數位作品'],
 ['3-1','3. 閱讀教學','閱讀教學計畫、執行及檢核之品質','教學計畫→教學執行→學習檢核→計畫檢核。','教學計畫、課堂紀錄、學生作品、評量、修正紀錄'],
 ['3-2','3. 閱讀教學','圖書館資訊利用教育之規劃及執行','說明如何規劃並實際執行。','年級任務、查找任務、學生作品、執行紀錄'],
 ['3-3','3. 閱讀教學','多領域、跨文本閱讀課程','聚焦跨域、連續／非連續文本與教學策略。','跨域設計、文本類型、學生比較與整合作品'],
 ['3-4','3. 閱讀教學','各學習階段、領域閱讀策略教學','以雙向細目表與教學策略呈現六年縱向規劃。','年級策略表、教案、學生策略運用作品'],
 ['4-1','4. 學生歷程與成效','閱讀能力、興趣及習慣之培養','能力、興趣、習慣分開看；興趣與習慣不是同一件事。','作品評量、問卷／訪談、借閱／晨讀／閱讀紀錄'],
 ['4-2','4. 學生歷程與成效','閱讀個別差異之輔導及協助','需呈現拔尖與扶弱的支持歷程，不能只列最後成果。','介入前後作品、支持歷程、追蹤與學生改變'],
 ['4-3','4. 學生歷程與成效','運用閱讀素養進行議題探究與問題解決','可結合PBL／Big6；從問題形成走向行動與檢核。','問題形成、查找判讀、整合、行動、檢核與反思'],
 ['5-1','5. 專業精進與社群','全校教職員閱讀教育專業成長','呈現全校閱讀教育專業成長情形。','研習、工作坊、參與紀錄與後續教學應用'],
 ['5-2','5. 專業精進與社群','全校閱讀教學社群成長','呈現社群如何運作與成長。','社群紀錄、共備教案、觀課議課、修正版'],
 ['5-3','5. 專業精進與社群','閱讀推動組織及成員專業發展機制','說明如何形成持續專業發展機制。','年度機制、內外部指導、進度檢視與修正紀錄']
];

const timeline = [
 ['8/31–9/18','指標對照與架構鎖定','完成16項指標缺口矩陣、理念目標對照、組織分工、雙向細目表與代表課例選定','未開始'],
 ['8/31–10/2','課程、文本與資源整理','代表文本、閱讀素養六年縱向規劃、跨文本檢核、數位閱讀任務、教學計畫與規準','未開始'],
 ['10/5–11/27','代表課例與學生證據','低中高代表課例、數位閱讀作品、能力／興趣／習慣、扶弱拔尖、PBL／Big6證據鏈','未開始'],
 ['9/23–11/27','教師與組織專業','研習＋閱讀教學社群＋專業發展機制三層證據包','未開始'],
 ['11/16–12/11','成效整理與查核','代表課例／個案／PBL證據分析與必要圖表，16項指標Claim–Evidence複核','未開始'],
 ['11/30–12/31','申報文件定稿','申報書整合、內審、行政核定、附件總檢、版本凍結','未開始'],
 ['8/31','進度檢視','8月底進度檢視','未開始'],
 ['9/30','外聘指導','暫定邀請陳文瑜校長（日期待確認）','待確認'],
 ['11/4','共讀課程','閱讀磐石－閱讀共讀課程設計與執行（程可珍）','未開始'],
 ['11/30','外聘指導','暫定邀請陳文瑜校長（日期待確認）','待確認'],
 ['12/9','共讀課程','閱讀磐石－閱讀共讀課程設計與執行（程可珍）','未開始']
];

function renderGradeTabs(){const root=document.querySelector('#gradeTabs');grades.forEach((g,i)=>{const b=document.createElement('button');b.className='grade-tab'+(i===0?' active':'');b.textContent=g.g;b.setAttribute('role','tab');b.onclick=()=>{document.querySelectorAll('.grade-tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderGrade(i)};root.appendChild(b)});renderGrade(0)}
function renderGrade(i){const g=grades[i];document.querySelector('#gradeDetail').innerHTML=`<div class="grade-head"><div class="grade-title"><p class="eyebrow">${g.g}｜${g.role}</p><h3>${g.ability}</h3><p>閱讀進程：${g.progress}</p></div><div class="grade-progress">${g.progress}</div></div><div class="relation-flow"><div class="flow-card accent"><h4>課程主題</h4><p>${g.local}</p></div><div class="flow-card"><h4>候選核心文本</h4><p>${g.candidate}</p></div><div class="flow-card warm"><h4>核心書／搭配文本</h4><p>${g.core}</p></div><div class="flow-card accent"><h4>學生任務</h4><p>${g.action}</p></div></div><div class="detail-grid"><div class="detail-panel"><h4>為什麼選這組書？</h4><p>${g.reason}</p></div><div class="detail-panel"><h4>跨域與文本</h4><p><strong>領域：</strong>${g.domains}<br><strong>多元文本：</strong>${g.texts}<br><strong>SDGs：</strong>${g.sdgs}</p></div><div class="detail-panel"><h4>閱讀素養進階</h4><p><strong>圖書館利用：</strong>${g.library}<br><strong>數位閱讀：</strong>${g.digital}<br><strong>學習檢核：</strong>${g.assessment}</p></div><div class="detail-panel"><h4>對應指標</h4><div class="tag-list">${g.ind.map(x=>`<span class="tag">${x}</span>`).join('')}</div><p style="margin-top:10px"><strong>代表成果：</strong>${g.output}</p></div></div>`}
function renderStrategies(){const list=document.querySelector('#strategyList');strategies.forEach((s,i)=>{const b=document.createElement('button');b.className='strategy-btn'+(i===0?' active':'');b.textContent=s.name;b.onclick=()=>{document.querySelectorAll('.strategy-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderStrategy(i)};list.appendChild(b)});renderStrategy(0)}
function renderStrategy(i){const s=strategies[i];document.querySelector('#strategyDetail').innerHTML=`<p class="eyebrow">六年縱向檢視</p><h3>${s.name}</h3><div class="strategy-map">${grades.map(g=>s.hits[g.g]?`<div class="strategy-hit"><strong>${g.g}</strong><p>${s.hits[g.g]}</p></div>`:`<div class="strategy-hit empty"><strong>${g.g}</strong><p>目前未列為主要證據</p></div>`).join('')}</div><div class="legend-note" style="margin-top:16px">●＝v2 閱讀重點明列；○＝依課程任務可直接延伸的規劃建議。空白不代表完全不教，只表示目前未列為主要證據。</div>`}
function renderIndicators(){const groups=['全部',...new Set(indicators.map(x=>x[1]))];const f=document.querySelector('#indicatorFilter');groups.forEach((g,i)=>{const b=document.createElement('button');b.className='filter-btn'+(i===0?' active':'');b.textContent=g;b.onclick=()=>{document.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');drawIndicators(g)};f.appendChild(b)});drawIndicators('全部')}
function drawIndicators(group){const data=group==='全部'?indicators:indicators.filter(x=>x[1]===group);document.querySelector('#indicatorGrid').innerHTML=data.map(x=>`<article class="indicator-card"><span class="code">${x[0]}</span><h3>${x[2]}</h3><p><strong>${x[1]}</strong></p><p>${x[3]}</p><details><summary>建議證據</summary><p>${x[4]}</p></details></article>`).join('')}
function renderTimeline(){document.querySelector('#timelineList').innerHTML=timeline.map(x=>`<div class="timeline-item"><div class="timeline-date">${x[0]}</div><div class="timeline-phase">${x[1]}</div><div class="timeline-task">${x[2]}</div><span class="status ${x[3]==='待確認'?'wait':''}">${x[3]}</span></div>`).join('')}
renderGradeTabs();renderStrategies();renderIndicators();renderTimeline();

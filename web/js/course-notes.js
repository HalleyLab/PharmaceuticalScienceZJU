(function() {
    'use strict';

    const notes = [
        {
            id: 'situation-policy-i', title: '形势与政策 I', category: '通识课程',
            overview: '课程以当学期的重要时事、政策背景和专题讲座为主，知识更新快，重点在于理解宏观议题的来龙去脉并掌握课堂采用的规范表述。',
            tips: '不要试图提前背一整套固定答案。平时把每次讲座压缩成“主题、背景、关键词、案例、结论”五行，考前再按老师的简版 PPT 和思考题补齐。',
            outline: ['专题所处的国内外背景', '重要会议、政策文件与核心目标', '专题中的代表事件和案例', '政策实施路径与现实影响'],
            concepts: ['时事专题的时间线', '政策目标与政策工具', '官方表述中的关键词', '案例与宏观主题的对应关系'],
            pitfalls: ['只记新闻事件，不解释其政策背景', '混用不同年份或不同会议的表述', '材料题回答过于口语化，缺少关键词'],
            checklist: ['能用一分钟概括每个专题', '整理本学期重要会议和事件时间线', '重做课堂思考题', '核对老师反复强调的固定表述']
        },
        {
            id: 'situation-policy-ii', title: '形势与政策II', category: '通识课程',
            overview: '课程延续形势与政策专题学习，通过系列讲座追踪国内外重要议题，重点是把分散的时事材料放回政策背景、发展目标和现实影响中理解。',
            tips: '每次讲座结束后立即留下主题、主讲观点、三个关键词和一个现实案例。认定讲座次数要单独记录，复习时再按时间线合并各次专题。',
            outline: ['当学年重要会议与政策背景', '国内发展议题与阶段性任务', '国际形势、区域热点与中国立场', '专题案例的原因、影响与政策回应'],
            concepts: ['时事议题的政策语境', '发展目标与治理工具', '国际格局与国家利益', '专题讲座的规范表述'],
            pitfalls: ['漏记讲座次数或认定要求', '用过时材料回答当期专题', '只复述新闻，不分析背景与政策联系'],
            checklist: ['核对讲座与学分认定记录', '整理本学年专题时间线', '为每次讲座写一句核心结论', '复习课堂提供的关键词与材料']
        },
        {
            id: 'morality-law', title: '思想道德与法治', category: '通识课程',
            overview: '课程讨论人生观、价值观、道德规范、社会责任和法治思维，重点不是孤立背定义，而是用规范概念分析校园生活与社会案例。',
            tips: '把教材概念和具体案例成对整理。准备展示或报告时先明确问题，再用一到两个核心概念支撑判断，避免只写态度口号。',
            outline: ['人生观与价值选择', '理想信念和社会责任', '道德规范与公共生活', '法治体系、权利与义务'],
            concepts: ['个人理想与社会理想', '道德评价与道德实践', '法治思维', '权利义务相统一'],
            pitfalls: ['概念正确但没有结合案例', '把道德问题和法律责任混为一谈', '论述只有结论，没有理由和边界条件'],
            checklist: ['为每章整理一个现实案例', '能区分道德规范与法律规范', '准备常用论述结构', '确认课程报告和展示要求']
        },
        {
            id: 'modern-history', title: '中国近现代史纲要', category: '通识课程',
            overview: '课程以近代以来中国社会变迁为主线，串联重大历史事件、社会矛盾、道路选择和制度发展，核心是理解事件之间的因果关系。',
            tips: '先画时间轴，再把每个事件压缩成“背景—过程—影响—评价”。写报告时先确定问题意识，不要把材料简单堆成编年史。',
            outline: ['近代中国社会性质与主要矛盾', '民族危机与各阶层的探索', '新民主主义革命进程', '新中国建设、改革开放与现代化'],
            concepts: ['历史阶段与主要矛盾', '革命道路的形成', '历史事件的因果链', '现代化道路选择'],
            pitfalls: ['年代、人名和事件顺序混淆', '只描述过程，不分析原因和影响', '用后来的结论替代当时的历史条件'],
            checklist: ['独立画出主时间线', '整理十个关键事件的四段式笔记', '重看老师指定的报告范例', '用历年题检查薄弱阶段']
        },
        {
            id: 'marxism', title: '马克思主义基本原理', category: '通识课程',
            overview: '课程以哲学、政治经济学和科学社会主义为主要板块，讨论物质与意识、实践与认识、社会发展规律、资本运行和人的解放。',
            tips: '把它当作概念关系课来学。每个概念都写清“定义、相对概念、关系、例子”，再读对应原著片段，论文按“概念—文本—现实问题”展开。',
            outline: ['辩证唯物主义与认识论', '唯物史观和社会结构', '商品、价值与剩余价值', '资本主义矛盾与社会发展'],
            concepts: ['实践与认识', '矛盾的普遍性和特殊性', '生产力与生产关系', '劳动价值与剩余价值'],
            pitfalls: ['把辩证关系写成单向因果', '哲学概念只背定义不会举例', '政治经济学公式脱离前提条件'],
            checklist: ['画出核心概念关系图', '为每组辩证关系准备例子', '读完指定原著节选', '用历年论述题练习完整表达']
        },
        {
            id: 'mao-intro', title: '毛泽东思想和中国特色社会主义理论体系概论', category: '通识课程',
            overview: '课程围绕马克思主义中国化的历史进程，梳理不同时期形成的理论成果、实践背景与主要内容，并强调理论与中国具体实际的结合。',
            tips: '按“时期—现实问题—理论回答—实践结果”做纵向表格。展示和调研报告要用具体案例支撑，不要把不同阶段的理论表述互相替换。',
            outline: ['马克思主义中国化的提出与推进', '新民主主义革命理论', '社会主义改造和建设探索', '中国特色社会主义理论体系'],
            concepts: ['实事求是', '新民主主义革命道路', '社会主义初级阶段', '改革开放与现代化建设'],
            pitfalls: ['不同理论成果的时代背景混淆', '只背结论，不说明解决了什么问题', '人物、会议与理论形成时间错配'],
            checklist: ['完成理论成果时间轴', '整理每一阶段的核心问题', '重做复习提示和历年题', '准备可用于论述的调研案例']
        },
        {
            id: 'xi-thought', title: '习近平新时代中国特色社会主义思想概论', category: '通识课程',
            overview: '课程按专题讨论新时代治国理政的总体框架，涉及发展、改革、法治、文化、民生、生态、安全和党的建设等主题。',
            tips: '按专题编号建立四栏笔记：“核心概念、政策表述、案例、思考题”。先掌握总框架，再补充各专题细节，能显著减少重复记忆。',
            outline: ['新时代的历史方位与总体布局', '高质量发展与全面深化改革', '法治、文化、民生和生态建设', '国家安全、党的建设与国际关系'],
            concepts: ['中国式现代化', '新发展理念', '总体国家安全观', '全面从严治党'],
            pitfalls: ['专题之间的关键词串错', '案例和政策目标对应不准确', '论述题只有表述，没有结构层次'],
            checklist: ['画出课程专题总框架', '为每个专题准备一个案例', '整理课堂思考题答案', '核对重点政策表述']
        },
        {
            id: 'military-theory', title: '军事理论', category: '通识课程',
            overview: '课程覆盖国防、军事思想、战争形态、军事技术和国际安全形势，知识面较宽，但可以按思想、战争、技术和安全四个模块归纳。',
            tips: '先建立模块框架，再把战争案例放入对应模块。论文可用“背景—作战方式—技术变化—启示”结构，考试则优先复习老师课件和题库。',
            outline: ['国防建设与国家安全', '中外军事思想', '战争形态和经典战例', '信息化、智能化军事技术'],
            concepts: ['国防动员', '人民战争思想', '联合作战', '信息战与智能化战争'],
            pitfalls: ['战例年代和参战方混淆', '军事技术名词只会解释不会联系作战', '论文叙事过多，分析不足'],
            checklist: ['整理四模块总表', '准备三个可复用战例', '核对高频军事术语', '完成一次限时题库练习']
        },
        {
            id: 'english-iv', title: '大学英语 IV', category: '通识课程',
            overview: '课程以英语听说读写的综合运用为目标，现有材料偏听力训练，重点是抓取语篇信息、概括主题并进行清楚的口头或书面表达。',
            tips: '听力材料采用“盲听—核对—跟读—复述”四遍法。不要逐字翻译，先抓主题、转折、数字和观点，再补细节。',
            outline: ['主题与主旨识别', '细节信息和逻辑连接', '口头复述与观点表达', '常用学术和课堂写作'],
            concepts: ['关键词预测', '语篇信号词', '同义替换', '观点与证据'],
            pitfalls: ['被个别生词卡住而漏掉后文', '听见原词才会判断，忽略同义替换', '表达时句子过长导致逻辑不清'],
            checklist: ['完成音频精听和跟读', '整理高频同义替换', '练习一分钟口头概括', '复盘错题对应的听力原因']
        },
        {
            id: 'computer-foundation', title: '计算机科学基础（A）', category: '通识课程',
            overview: '课程介绍计算机系统、数据表示、办公与数据库工具、基础算法和计算思维，并通过实验训练实际操作能力。',
            tips: '操作类内容必须亲手走一遍。把实验报告当作步骤模板，做完后用自己的话写出“输入、处理、输出、常见错误”。',
            outline: ['计算机系统与信息表示', '办公工具和数据处理', '数据库基础与 Access 操作', '算法、程序和计算思维'],
            concepts: ['二进制与编码', '数据表和关系', '算法流程', '输入—处理—输出模型'],
            pitfalls: ['只看操作截图但没有实际执行', '字段类型和数据库关系设置错误', '算法步骤正确但边界输入未处理'],
            checklist: ['独立完成主要实验', '整理常用操作步骤', '复习数据库字段和关系', '重做综合题与实验报告']
        },
        {
            id: 'python-programming', title: 'Python 程序设计', category: '通识课程',
            overview: '课程从 Python 基础语法出发，逐步学习条件、循环、函数、字符串、列表、字典、文件和简单的问题求解。',
            tips: '边学边写，每个知识点至少独立写一个小程序。出错时先读报错位置和异常类型，再检查变量值，不要一开始就照抄答案。',
            outline: ['变量、类型与表达式', '条件、循环和程序流程', '函数与模块化', '常用数据结构、文件与基础算法'],
            concepts: ['可变与不可变对象', '作用域与参数传递', '迭代与索引', '异常和边界输入'],
            pitfalls: ['缩进层级错误', '循环边界多一项或少一项', '列表修改和返回值混淆', '变量名覆盖内置函数'],
            checklist: ['不看答案重写章节例题', '整理常用字符串和列表方法', '完成函数拆分练习', '重做错题并记录报错原因']
        },
        {
            id: 'calculus', title: '微积分（乙）Ⅰ / Ⅱ', category: '通识课程',
            overview: '课程建立极限、导数、积分、级数和多元微积分等数学工具，为后续物理化学、统计和药动学中的定量分析打基础。',
            tips: '按题型训练比泛读更有效。每类题保留一份“识别特征—标准步骤—适用条件—易错点”，错题隔几天不看答案重做。',
            outline: ['函数、极限与连续', '导数、微分及其应用', '不定积分与定积分', '级数、多元函数与偏导'],
            concepts: ['极限存在条件', '导数的局部变化意义', '积分的累积意义', '收敛与多元近似'],
            pitfalls: ['忽略定义域和连续条件', '换元后忘记改变积分限', '级数判别法使用条件混淆', '偏导与全微分混用'],
            checklist: ['整理常见极限方法', '熟练导数和积分公式', '每类题完成至少三道变式', '限时重做综合复习题']
        },
        {
            id: 'analytical-chemistry', title: '分析化学（乙）', category: '专业基础',
            overview: '课程研究如何可靠地确定物质的组成与含量，重点包括化学平衡、滴定分析、误差与数据处理，强调结果的准确度和可追溯性。',
            tips: '所有计算先写反应和平衡关系，再列物料、电荷或质子条件。滴定题要同时画出滴定阶段和判断指示剂范围。',
            outline: ['分析结果与误差处理', '酸碱平衡和酸碱滴定', '络合、沉淀与氧化还原滴定', '滴定曲线、终点判断与数据表达'],
            concepts: ['准确度与精密度', '分布分数与条件常数', '滴定突跃', '系统误差与随机误差'],
            pitfalls: ['有效数字保留不一致', '化学计量点与滴定终点混淆', '忽略副反应和条件常数', '直接套公式而未判断滴定阶段'],
            checklist: ['会画主要滴定曲线', '掌握四类滴定计算框架', '整理误差和有效数字规则', '重做优秀作业和典型计算题']
        },
        {
            id: 'organic-chemistry-experiment', title: '大学化学实验（O）', category: '专业基础',
            overview: '实验课训练有机合成的基本操作、安全规范、反应监测、产物纯化和实验报告表达，重点是把反应原理落实为可靠步骤。',
            tips: '实验前写一页预习卡：反应式、投料量、危险点、装置、关键温度和后处理。实验后立即记录现象，不要凭记忆补写。',
            outline: ['实验安全与玻璃仪器', '加热、回流、蒸馏和萃取', '结晶、过滤与干燥', '合成设计、产率计算与报告'],
            concepts: ['限量试剂与理论产率', '分配系数和萃取', '沸点、共沸与蒸馏', '纯化与结构确认'],
            pitfalls: ['装置不密闭或冷凝水方向错误', '萃取时未及时放气', '产率计算混入未干燥质量', '现象、结果和讨论三者重复'],
            checklist: ['能口述实验完整流程', '核对危险试剂和废液分类', '掌握产率与误差计算', '完成报告中的异常原因分析']
        },
        {
            id: 'organic-chemistry', title: '有机化学', category: '专业基础',
            overview: '课程研究有机分子的结构、性质和反应，主线是官能团转化、电子效应、反应机理与合成路线，为药物化学和天然药化打基础。',
            tips: '不要按章节孤立背反应。用一张反应网络连接烯烃、卤代烃、醇、羰基、羧酸衍生物和胺，并在箭头上写条件、机理和选择性。',
            outline: ['结构、命名、立体化学和电子效应', '取代、消除与加成反应', '芳香性和芳香取代', '羰基、羧酸衍生物、胺与合成'],
            concepts: ['亲核体与亲电体', '碳正离子稳定性', '立体选择性和区域选择性', '共振、诱导效应与芳香性'],
            pitfalls: ['只记产物不判断机理', 'SN1/SN2 与 E1/E2 条件混淆', '箭推方向画反', '忽略重排、立体化学和主要产物'],
            checklist: ['手绘完整官能团转化图', '比较四类取代消除机理', '练习逆合成和鉴别题', '重做历年卷并标注反应类型']
        },
        {
            id: 'physical-chemistry-experiment', title: '大学化学实验（P）', category: '专业基础',
            overview: '课程通过热力学、动力学、电化学等实验把理论模型与测量数据连接起来，重点是仪器操作、作图拟合和误差分析。',
            tips: '每个实验单独整理“原始量—计算量—作图坐标—斜率意义—最终参数”。Origin 或 MATLAB 只负责拟合，必须知道图上每个量代表什么。',
            outline: ['温度、压力、电势等基本测量', '热力学参数实验', '动力学和速率常数测定', '作图拟合、误差与实验论文'],
            concepts: ['线性化与回归', '斜率和截距的物理意义', '系统误差和传递误差', '实验条件与模型假设'],
            pitfalls: ['单位未统一就代入公式', '只报告拟合结果不解释参数', '删除异常点但不给理由', '有效数字超过仪器精度'],
            checklist: ['整理所有实验核心公式', '会独立完成主要作图', '复习回忆卷和实验问题', '准备常见误差来源与改进方法']
        },
        {
            id: 'physical-chemistry', title: '物理化学', category: '专业基础',
            overview: '课程用热力学、动力学、电化学和相平衡解释物质体系的能量、方向、速率与平衡，是后续药剂和药动学的重要理论基础。',
            tips: '每个公式都写上适用条件、变量含义和单位。先画过程或状态变化，再选择方程；推导题要理解起点和假设，不要只背最后一行。',
            outline: ['热力学第一、第二定律', '化学势、相平衡与溶液', '化学动力学', '电化学、表面与胶体'],
            concepts: ['状态函数与过程量', '熵、自由能与自发方向', '化学势和相律', '速率方程和活化能'],
            pitfalls: ['把 ΔG<0 当成反应一定很快', '标准态和平衡态混淆', '可逆过程条件漏写', '公式中温度、压力和浓度单位不统一'],
            checklist: ['整理公式条件表', '独立推导核心关系式', '完成热力学与动力学综合题', '逐题检查单位和正负号']
        },
        {
            id: 'cell-biology', title: '细胞生物学及实验（乙）', category: '专业基础',
            overview: '课程研究细胞结构、细胞器功能、膜运输、信号转导、细胞周期和细胞命运，并结合显微与分子实验理解细胞机制。',
            tips: '过程题用“位置—参与分子—先后顺序—结果—调控”整理。结构图必须自己画，名词解释要写出定义和功能，不能只写缩写。',
            outline: ['细胞膜、细胞器与物质运输', '细胞骨架和细胞运动', '信号转导与基因表达', '细胞周期、死亡、分化和实验技术'],
            concepts: ['膜的流动镶嵌模型', '蛋白质分选', '第二信使和级联放大', '检查点、凋亡与自噬'],
            pitfalls: ['细胞器定位与功能串错', '主动运输和协助扩散混淆', '信号通路上下游颠倒', '有丝分裂与细胞周期阶段错配'],
            checklist: ['默画细胞结构与运输路径', '整理高频名词解释', '比较主要信号通路', '用历年卷完成一次查漏补缺']
        },
        {
            id: 'anatomy-histology', title: '人体解剖与组织学', category: '专业必修',
            overview: '课程从宏观解剖和微观组织两个尺度认识人体结构，强调空间定位、形态识别以及结构与功能的联系。',
            tips: '解剖学按部位建立空间地图，组织学用“细胞形态、排列、染色、层次、功能”五项识别。反复看图比纯文字背诵更有效。',
            outline: ['基本组织与器官构造', '运动、循环和呼吸系统', '消化、泌尿、生殖系统', '神经、内分泌与感觉器官'],
            concepts: ['解剖方位和切面', '上皮、结缔、肌和神经组织', '器官实质与间质', '形态—功能对应'],
            pitfalls: ['左右、内外和近远端方向混淆', '相似组织只记名称不看鉴别特征', '切片方向变化后无法识别', '宏观器官与微观组织脱节'],
            checklist: ['按系统完成结构图谱', '制作相似切片对照表', '遮住标注识图', '口述主要器官的结构功能联系']
        },
        {
            id: 'physiology', title: '生理学', category: '专业必修',
            overview: '课程研究人体各系统如何维持正常功能与内环境稳态，重点是调节机制、反馈回路以及系统之间的协调。',
            tips: '每个机制都用“刺激—感受器—中枢/通路—效应器—反馈结果”画成箭头图。题库只用来查漏，不能替代理解过程。',
            outline: ['细胞电活动与肌肉', '血液、循环和呼吸', '消化、能量代谢和体温', '肾脏、神经与内分泌调节'],
            concepts: ['内环境稳态', '膜电位与动作电位', '负反馈调节', '清除、滤过与重吸收'],
            pitfalls: ['神经调节和体液调节混淆', '压力、流量、阻力关系方向写反', '动作电位离子流向记错', '实验现象与生理机制没有对应'],
            checklist: ['画出各系统调节回路', '整理重要正常值及意义', '比较相似激素和反射', '完成题库错题二次归类']
        },
        {
            id: 'microbiology-immunology', title: '医学微生物与免疫学', category: '专业必修',
            overview: '课程一部分研究细菌、病毒等病原体的结构、致病与检测，另一部分研究先天和适应性免疫及其在感染、免疫疾病中的作用。',
            tips: '微生物按“结构—传播—致病—检测—防治”列表；免疫学按细胞和分子的相互作用画流程。实验图片要和判断依据一起记。',
            outline: ['细菌、病毒及其他病原体', '感染、致病与微生物检测', '免疫器官、细胞和分子', '免疫应答、超敏反应与免疫应用'],
            concepts: ['病原体与毒力', '抗原、抗体与补体', 'MHC 与抗原呈递', '体液免疫和细胞免疫'],
            pitfalls: ['革兰染色结果和细胞壁结构串错', 'Ig 类型及功能混淆', '先天免疫和适应性免疫界限绝对化', '不同超敏反应机制记反'],
            checklist: ['完成主要病原体对照表', '画出免疫应答流程', '整理实验图片判读特征', '用病例题练习机制判断']
        },
        {
            id: 'biochemistry', title: '生物化学与分子生物学 / 实验', category: '专业必修',
            overview: '课程研究生物大分子的结构与功能、能量代谢、物质代谢和遗传信息传递，核心是理解细胞内各通路如何连接和调控。',
            tips: '代谢通路一定手绘：底物、产物、关键酶、能量变化、细胞定位和调控点同时标出。先理解碳流和能量流，再背细节。',
            outline: ['蛋白质、酶、核酸和生物膜', '糖、脂、氨基酸代谢', '生物氧化与能量转换', 'DNA 复制、转录、翻译和调控'],
            concepts: ['酶动力学与酶调控', 'ATP 和还原当量', '代谢通路的区室化', '中心法则与基因表达'],
            pitfalls: ['关键酶和限速步骤混淆', '细胞质与线粒体定位记错', 'ATP、NADH 收支漏算', '复制、转录和翻译方向写反'],
            checklist: ['默画核心代谢通路', '整理关键酶与调控因子', '比较三类遗传信息过程', '结合实验理解定量和检测方法']
        },
        {
            id: 'natural-pharm-chem', title: '天然药物化学 / 实验', category: '专业必修',
            overview: '课程研究天然产物的结构类型、理化性质、提取分离、结构鉴定和生物活性，连接有机化学、波谱和药物发现。',
            tips: '按化合物类别建立“基本骨架—取代特征—性质—提取方法—代表成分”表格。实验流程要理解每次溶剂和 pH 调整的目的。',
            outline: ['天然产物生源与结构分类', '生物碱、黄酮、萜类等主要类型', '提取、分离和纯化技术', '结构鉴定、活性与实验'],
            concepts: ['极性和分配', '酸碱提取', '色谱分离', '结构类型与生源途径'],
            pitfalls: ['结构类型和代表化合物错配', '萃取相判断错误', '只记操作不解释溶剂选择', '显色反应和专属性混淆'],
            checklist: ['绘制主要结构母核', '完成提取分离流程图', '比较常用色谱方法', '复习代表天然产物及活性']
        },
        {
            id: 'medical-statistics', title: '医药统计学', category: '专业必修',
            overview: '课程研究如何从医学和药学数据中获得可靠结论，完整过程包括研究问题、设计、数据整理、描述、推断和结果解释。',
            tips: '不要先找公式，先判断变量类型、研究设计、比较目的和数据条件。每种检验整理成“何时用—前提—统计量—结果怎么写”。',
            outline: ['医学数据类型与描述统计', '抽样分布、参数估计和假设检验', 't 检验、方差分析和非参数方法', '列联表、相关回归与研究设计'],
            concepts: ['总体、样本与抽样误差', '置信区间和 P 值', '第一、第二类错误', '相关与因果'],
            pitfalls: ['P>0.05 被解释为两组完全相同', '多次比较不做校正', '把相关关系写成因果关系', '不检查正态性、独立性和方差条件'],
            checklist: ['完成统计方法选择流程图', '会规范报告统计结果', '复现一份脚本分析', '逐题解释为什么选择该检验']
        },
        {
            id: 'medicinal-chemistry', title: '药物化学 / 实验', category: '专业必修',
            overview: '课程从化学结构解释药物的靶点作用、活性、选择性、代谢和成药性，重点是代表药物、药效团和构效关系。',
            tips: '按药物类别整理“母核—关键取代基—靶点—机制—代表药—构效关系”。结构一定自己画，画完再解释每个基团为什么存在。',
            outline: ['药物作用的化学基础与构效关系', '中枢、心血管和代谢类药物', '抗感染与抗肿瘤药物', '先导化合物优化、代谢和实验合成'],
            concepts: ['药效团', '构效关系', '生物电子等排体', '前药、代谢软点与选择性'],
            pitfalls: ['只背商品名不认结构母核', '相似药物的取代位置混淆', '机制和靶点对应错误', '把提升活性的改造误认为一定提升成药性'],
            checklist: ['默画重点药物结构', '建立同类药物构效表', '整理靶点和作用机制', '用结构题和合成题检验掌握度']
        },
        {
            id: 'pharmacology', title: '药理学 / 实验', category: '专业必修',
            overview: '课程研究药物与机体相互作用，按系统学习药物机制、药理作用、临床用途、不良反应和禁忌，并用实验观察量效关系。',
            tips: '每类药只抓一条主轴：“靶点—生理改变—治疗作用—不良反应”。先掌握代表药，再比较同类药差异，避免平铺药名。',
            outline: ['药效学、药动学和受体理论', '中枢、外周和心血管药理', '呼吸、消化、内分泌药理', '抗感染、抗肿瘤和实验药理'],
            concepts: ['激动剂、拮抗剂与受体', '效能、效价和治疗指数', '耐受性与依赖性', '机制—作用—用途—不良反应链'],
            pitfalls: ['效能和效价混淆', '同类药共同作用与个体差异混淆', '不良反应没有从机制解释', '适应证和禁忌证记反'],
            checklist: ['完成各系统药物对照表', '掌握代表药主轴', '复习量效曲线和受体题', '用病例题选择药物并说明理由']
        },
        {
            id: 'drug-instrumental-analysis', title: '药物仪器分析 / 实验', category: '专业必修',
            overview: '课程介绍光谱、电化学、色谱等仪器分析方法的原理、仪器组成、定性定量方式及其在药物检测中的应用。',
            tips: '把每种方法整理成同一张对照表：激发/分离原理、信号、仪器部件、定量依据、适用对象、优缺点和干扰。',
            outline: ['紫外、荧光等光谱分析', '电化学分析', '气相和液相色谱', '样品处理、定量方法与实验'],
            concepts: ['朗伯-比尔定律', '激发与发射', '保留时间和分离度', '外标、内标和标准加入'],
            pitfalls: ['吸收光谱和发射光谱混淆', '峰高、峰面积与浓度关系使用不当', '流动相与固定相极性判断错误', '忽略空白、基线和系统适用性'],
            checklist: ['完成仪器方法对照表', '画出主要仪器组成', '掌握定量计算流程', '复习色谱与光谱图判断题']
        },
        {
            id: 'drug-discovery-frontiers', title: '药物研发前沿', category: '专业必修',
            overview: '课程通过新药案例和研究论文了解靶点发现、先导优化、临床开发和监管获批，重点在于理解研发逻辑与前沿技术。',
            tips: '阅读案例时固定回答五个问题：疾病未满足需求是什么、靶点为何成立、药物如何作用、证据到哪一阶段、仍有什么局限。',
            outline: ['疾病机制与靶点发现', '先导化合物和药物形式', '临床前与临床开发', '获批案例、前沿技术和研发失败'],
            concepts: ['靶点验证', '转化医学', '临床终点', '获益—风险与未满足需求'],
            pitfalls: ['把体外活性直接等同于临床有效', '只介绍技术优势而不谈限制', '忽略对照组、样本和终点', '把相关机制写成已验证因果'],
            checklist: ['完整拆解两个新药案例', '整理研发阶段和关键证据', '阅读一篇原始论文', '准备前沿技术的优势与局限']
        },
        {
            id: 'pharmaceutics', title: '药剂学 / 实验', category: '专业必修',
            overview: '课程研究如何把药物制成安全、稳定、有效且可使用的剂型，核心是处方设计、制备工艺、质量评价和给药系统。',
            tips: '每种剂型按“治疗需求—处方组成—制备流程—关键工艺—质量指标—常见问题”整理。辅料不要只背名称，要写清作用。',
            outline: ['剂型、处方与药物制剂基础', '液体、固体和半固体制剂', '无菌制剂与质量控制', '缓控释、靶向和新型给药系统'],
            concepts: ['溶解、分散与稳定性', '辅料功能', '释放与溶出', '无菌、等渗与给药途径'],
            pitfalls: ['相似辅料功能混淆', '工艺步骤与质量问题无法对应', '只记制法不理解剂型选择', '实验处方换算和投料顺序错误'],
            checklist: ['完成主要剂型对照表', '整理辅料功能清单', '默写典型制备流程', '用质量问题反推工艺原因']
        },
        {
            id: 'pharmacoanalysis', title: '药物分析学 / 实验', category: '专业必修',
            overview: '课程以药品质量标准为核心，学习鉴别、杂质检查、含量测定、制剂分析和体内药物分析，强调药典方法与规范表达。',
            tips: '围绕一份质量标准理解每一步“测什么、为什么、怎么判”。方法学题按专属性、准确度、精密度、线性、范围等指标组织。',
            outline: ['药品质量标准和药典', '鉴别试验与一般杂质检查', '含量测定和制剂分析', '方法验证、体内分析与实验'],
            concepts: ['质量标准与限度', '专属性和灵敏度', '准确度与精密度', '含量均匀度、溶出度和有关物质'],
            pitfalls: ['鉴别、检查和含量测定目的混淆', '限度计算方向错误', '精密度与准确度混用', '结果表达缺少单位或判定结论'],
            checklist: ['读懂一份完整药典标准', '整理常见杂质检查原理', '掌握含量与限度计算', '用规范语言完成实验结果判定']
        },
        {
            id: 'spectrum-analysis', title: '药物波谱解析', category: '专业必修',
            overview: '课程利用质谱、红外、核磁氢谱和碳谱等信息推断有机化合物结构，关键是将多个局部证据整合为唯一结构。',
            tips: '每道题固定顺序：分子式与不饱和度—官能团—碳骨架—氢环境与裂分—片段连接—回代核对。不要一看到特征峰就猜答案。',
            outline: ['分子式、质谱与不饱和度', '红外官能团识别', '氢谱化学位移、积分和裂分', '碳谱及多谱综合解析'],
            concepts: ['不饱和度', '化学位移和屏蔽效应', '积分与等价氢', 'n+1 裂分和偶合'],
            pitfalls: ['积分比未化为合理氢数', '交换氢照搬裂分规则', '只看单峰忽略整体分子式', '提出结构后没有回代所有峰'],
            checklist: ['熟记常见位移区间', '完成特征峰对照表', '按固定步骤解析综合题', '每题最后核对分子式和全部信号']
        },
        {
            id: 'biopharmaceutics-pharmacokinetics', title: '生物药剂学与药物动力学 / 实验', category: '专业必修',
            overview: '课程连接剂型、人体生理与药物体内过程，研究吸收、分布、代谢、排泄以及浓度随时间变化的定量规律。',
            tips: '公式必须配浓度—时间曲线理解。先判断给药途径、房室模型和输入方式，再计算 AUC、清除率、分布容积和半衰期。',
            outline: ['吸收与生物利用度', '分布、代谢和排泄', '单房室与多房室模型', '非线性动力学、给药方案与实验'],
            concepts: ['AUC 与生物利用度', '清除率和分布容积', '半衰期与稳态', '一级、零级和非线性过程'],
            pitfalls: ['清除率与消除速率常数混淆', '静脉和口服公式错用', '半衰期变化原因判断错误', '单位不统一或对数转换错误'],
            checklist: ['画出常见给药曲线', '整理核心参数关系图', '完成单次和多次给药计算', '用实验数据复算主要参数']
        },
        {
            id: 'pharmacy-administration', title: '药事管理', category: '专业必修',
            overview: '课程从法规与政策角度理解药品研制、生产、经营、使用和监督全过程，也涉及药学服务、医保和行业治理。',
            tips: '法规内容按“对象—主管部门—许可/备案—流程—责任—处罚”整理。案例题先识别主体和行为，再定位适用规则。',
            outline: ['药事组织与法律体系', '药品注册、生产和经营管理', '医疗机构药事与药学服务', '特殊药品、监督、医保与政策'],
            concepts: ['全生命周期监管', '上市许可持有人', '处方药与非处方药', '药品质量责任和风险治理'],
            pitfalls: ['部门职责和审批流程混淆', '使用旧法规结论', '行政责任、民事责任和刑事责任不分', '案例未识别特殊药品规则'],
            checklist: ['完成药品生命周期流程图', '整理主要监管主体职责', '核对最新课堂法规版本', '用案例练习规则适用']
        }
    ];

    window.courseNotesData = notes;

    if (!document.getElementById('noteBoard')) {
        return;
    }

    const categories = ['全部课程', '通识课程', '专业基础', '专业必修'];
    let activeCategory = '全部课程';
    let activeNoteId = localStorage.getItem('activeCourseNote') || notes[0].id;
    let searchTerm = '';

    const categoryFilters = document.getElementById('categoryFilters');
    const courseList = document.getElementById('courseList');
    const courseCount = document.getElementById('courseCount');
    const emptyState = document.getElementById('emptyState');
    const searchInput = document.getElementById('noteSearch');

    renderCategories();
    renderCourseList();
    renderNote(notes.find((item) => item.id === activeNoteId) || notes[0], false);
    bindNavigation();

    function renderCategories() {
        categoryFilters.innerHTML = '';
        categories.forEach((category) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'category-button' + (category === activeCategory ? ' active' : '');
            button.textContent = category;
            button.addEventListener('click', function() {
                activeCategory = category;
                renderCategories();
                renderCourseList();
            });
            categoryFilters.appendChild(button);
        });
    }

    function getFilteredNotes() {
        const term = searchTerm.trim().toLocaleLowerCase('zh-CN');
        return notes.filter((note) => {
            const inCategory = activeCategory === '全部课程' || note.category === activeCategory;
            if (!inCategory) {
                return false;
            }
            if (!term) {
                return true;
            }
            const searchable = [
                note.title,
                note.category,
                note.overview,
                note.tips,
                ...note.outline,
                ...note.concepts,
                ...note.pitfalls,
                ...note.checklist
            ].join(' ').toLocaleLowerCase('zh-CN');
            return searchable.includes(term);
        });
    }

    function renderCourseList() {
        const filteredNotes = getFilteredNotes();
        courseList.innerHTML = '';
        courseCount.textContent = filteredNotes.length + ' 门课程';
        emptyState.hidden = filteredNotes.length !== 0;

        filteredNotes.forEach((note, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'course-button' + (note.id === activeNoteId ? ' active' : '');
            button.dataset.noteId = note.id;
            button.innerHTML = '<strong></strong><small></small>';
            button.querySelector('strong').textContent = note.title;
            button.querySelector('small').textContent = String(index + 1).padStart(2, '0') + ' / ' + note.category;
            button.addEventListener('click', function() {
                activeNoteId = note.id;
                localStorage.setItem('activeCourseNote', activeNoteId);
                renderCourseList();
                renderNote(note, true);
            });
            courseList.appendChild(button);
        });
    }

    function renderNote(note, shouldScroll) {
        document.getElementById('noteCategory').textContent = note.category + ' / COURSE NOTE';
        document.getElementById('noteTitle').textContent = note.title;
        document.getElementById('noteOverview').textContent = note.overview;
        document.getElementById('noteTips').textContent = note.tips;
        fillList('noteOutline', note.outline);
        fillList('noteConcepts', note.concepts);
        fillList('notePitfalls', note.pitfalls);
        fillList('noteChecklist', note.checklist);
        document.title = note.title + ' - 个人分享';
        history.replaceState(null, '', '#note=' + note.id);
        if (shouldScroll) {
            document.getElementById('noteBoard').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function fillList(id, items) {
        const list = document.getElementById(id);
        list.innerHTML = '';
        items.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = item;
            list.appendChild(li);
        });
    }

    function bindNavigation() {
        searchInput.addEventListener('input', function() {
            searchTerm = searchInput.value;
            renderCourseList();
        });

        document.getElementById('printNote').addEventListener('click', function() {
            window.print();
        });

        const hashMatch = location.hash.match(/^#note=([a-z0-9-]+)$/);
        if (hashMatch) {
            const hashNote = notes.find((note) => note.id === hashMatch[1]);
            if (hashNote) {
                activeNoteId = hashNote.id;
                renderCourseList();
                renderNote(hashNote, false);
            }
        }
    }
})();

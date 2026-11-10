// 站点全部内容集中在这里，改这一个文件即可更新整站。
// 数据来源：2026-11 版《王甲申 — Java / AI 应用 / Agent 后端开发》与《王甲申 — AI 应用开发工程师》简历。

export interface Skill {
  name: string
  /** 1–5，用于技术栈的熟练度刻度 */
  level: number
  /** 这项能力在哪些项目中经过实际使用 */
  usedIn?: string[]
}

export interface SkillGroup {
  label: string
  en: string
  items: Skill[]
}

export interface ProjectStage {
  label: string
  detail: string
}

export interface ProjectLink {
  label: string
  href: string
  kind: 'demo' | 'code'
}

export interface Project {
  id: string
  title: string
  /** 承担的角色，例如「独立开发」 */
  subtitle: string
  period: string
  /** 一句话定位，显示在标题上方 */
  domain: string
  description: string
  role: string
  constraint: string
  decision: string
  /** 2–3 条实现要点，只写能站得住的技术动作 */
  points: string[]
  /** 一个可量化或可验证的结果 */
  metric: string
  evidence: string[]
  architecture: ProjectStage[]
  tech: string[]
  featured: boolean
  links?: ProjectLink[]
}

export interface Job {
  period: string
  role: string
  company: string
  /** 业务方向，一句话 */
  summary: string
  points: string[]
}

export interface Metric {
  value: string
  label: string
  source: string
}

export interface Principle {
  tag: string
  title: string
  body: string
}

export const profile = {
  name: '王甲申',
  pinyin: 'WANG JIASHEN',
  handle: 'wangjiashen',
  initials: 'WJ',
  role: 'Java 后端 · AI 应用开发',
  headline: {
    lead: '把大模型接进',
    accent: '能上线',
    tail: '的后端。',
  },
  subline: '不是演示用的 Demo，而是能追溯、能降级、能算成本的那一层。',
  bio: '河南工业大学计算机科学与技术专业，2027 届。两段实习分别在边缘云计算平台做 Java 后端、在 AI 外呼系统做大模型接入；独立做过旅游 Agent、合同智能审查、代码评审助手和宠物医院 SaaS。习惯先定问题和验收标准，再决定用模型还是规则。',
  location: '河南 · 郑州',
  education: '河南工业大学 · 计算机科学与技术',
  cohort: '2027 届',
  availability: '随时到岗',
  updated: '2026.11',
  openTo: 'Java 后端 / AI 应用',
  workLocation: '郑州',
  notice: '随时到岗',
  email: '994900484@qq.com',
  phone: '17513200017',
  wechat: 'jiashensama',
  /** 有 GitHub 主页时填完整链接，留空则页面上不显示该条目 */
  github: '',
  // PDF 放在 public/ 下；用 BASE_URL 拼接，部署到二级目录时链接才不会 404
  resumes: [
    { label: 'AI 应用开发工程师', href: `${import.meta.env.BASE_URL}wangjiashen-resume-ai.pdf` },
    { label: 'Java / Agent 后端', href: `${import.meta.env.BASE_URL}wangjiashen-resume-java.pdf` },
  ],
  stats: {
    internships: '2',
    projects: '4',
    ranking: '前 20%',
  },
}

export const metrics: Metric[] = [
  {
    value: '38% → 67%',
    label: 'PR 评审有效评论率',
    source: 'AI 代码评审助手 · 回放 200 个历史 PR 评测',
  },
  {
    value: '−52%',
    label: '单个 PR 的 token 成本',
    source: '按 token 预算裁剪上下文后测得',
  },
  {
    value: '−22%',
    label: '模型接口平均响应耗时',
    source: 'AI 外呼系统 · 分级重试 + 上下文摘要压缩',
  },
  {
    value: '1/5',
    label: '审批记录统计响应时间',
    source: 'MEC 边缘云平台 · 重构索引 + 拆分嵌套子查询',
  },
]

export const principles: Principle[] = [
  {
    tag: 'Spec first',
    title: '先定验收标准',
    body: '动手前先把问题边界和验收口径说清楚，再决定这件事该交给模型、规则还是数据库。多数「模型效果不好」，其实是需求没定清楚。',
  },
  {
    tag: 'Traceable',
    title: '结果可追溯',
    body: '模型的每条结论都要带条款 ID、原文片段和风险等级，后端逐条校验引用，对不上就丢弃。宁可少报，不可乱报。',
  },
  {
    tag: 'Degradable',
    title: '失败可降级',
    body: '模型超时退回静态规则结果，输出校验失败只重试一次就降级，置信度低的结论不展示——链路不能因为一次调用失败而整体不可用。',
  },
  {
    tag: 'Metered',
    title: '成本可核算',
    body: '上下文按 token 预算裁剪，长会话做摘要压缩。把每次调用的成本算清楚，才知道这个功能到底能不能长期跑。',
  },
]

export const projects: Project[] = [
  {
    id: 'yuyou',
    title: '豫游 AI 助手',
    subtitle: '独立开发',
    period: '2026.07 — 2026.08',
    domain: 'Agent · RAG',
    description:
      '面向河南旅游场景的对话式 Agent 后端，把大模型调度、工具调用、语义检索和个人日程接到同一条链路上。',
    role: '负责需求拆解、Agent 编排、模型抽象、检索链路与后端接口。',
    constraint: '攻略信息分散、用户意图跨多轮变化，并且不能把业务绑定到单一模型。',
    decision: '用 Think–Execute 循环约束执行步骤，并把模型、工具和检索分别做成可替换边界。',
    points: [
      '把「规划郑州两日游并记下第二天下午行程」拆成多轮意图、工具调用与结果回填',
      '基于 LangChain4j 抽象模型层，让 DeepSeek / Qwen 可动态切换',
      'Milvus 向量检索叠加时间衰减与重排序，降低过时攻略的优先级',
    ],
    metric: '模型接入成本 −60%',
    evidence: ['同一业务链路可切换 DeepSeek / Qwen', '工具调用结果进入下一轮计划', '个人日程写入可回查'],
    architecture: [
      { label: 'PLAN', detail: '识别意图并生成下一步动作' },
      { label: 'TOOLS', detail: '检索攻略、查询信息、写入日程' },
      { label: 'MEMORY', detail: 'Redis 保存多轮状态与执行结果' },
      { label: 'ANSWER', detail: '汇总工具结果并生成可执行行程' },
    ],
    tech: ['Spring Boot', 'LangChain4j', 'Milvus', 'Function Calling', 'MCP', 'Redis'],
    featured: true,
  },
  {
    id: 'contract',
    title: '合同风险智能审查平台',
    subtitle: '独立开发',
    period: '2026.04 — 2026.06',
    domain: '规则 + 模型双引擎',
    description:
      '面向企业法务的合同审查系统：上传后先按版面还原切成条款，规则库抓硬风险、模型判软风险，审查员确认后归档。',
    role: '负责文档解析、风险规则、模型提示结构、引用校验和流式审查接口。',
    constraint: '模型结论必须能回到原合同条款，且模型超时或输出失真时不能阻断审查。',
    decision: '硬风险交给确定性规则，软风险交给模型；所有模型结论先通过条款 ID 与原文双重校验。',
    points: [
      '合同还原成「章—条—款」树，规则引擎处理无限责任、自动续约、单方解除等硬风险',
      '模型输出携带条款 ID、原文片段、风险等级与修改建议，后端逐条核对引用',
      '高风险标红、中风险计入 100 分制评分、低风险只提示，审查项按合同类型配置',
    ],
    metric: '不可溯源即丢弃',
    evidence: ['每条结论带条款 ID 与原文', '规则结果可在模型失败时独立返回', '风险等级与评分口径可配置'],
    architecture: [
      { label: 'PARSE', detail: 'OCR 与版面还原生成条款树' },
      { label: 'RULES', detail: '确定性规则匹配硬风险' },
      { label: 'MODEL', detail: '模型判断语义与软风险' },
      { label: 'VERIFY', detail: '核对条款 ID、引文与风险等级' },
    ],
    tech: ['Spring Boot', 'LangChain4j', 'Milvus', 'OCR', 'SSE', 'Redis'],
    featured: true,
  },
  {
    id: 'review',
    title: 'AI 代码评审助手',
    subtitle: '独立开发',
    period: '2026.01 — 2026.03',
    domain: '上下文工程 · 评测',
    description:
      '给研发团队做的 PR 评审工具。通用模型只看 diff 会漏掉跨文件影响，所以重点在「给模型看多少上下文」和「哪些话不该说」。',
    role: '负责调用链上下文构建、规则/模型分工、去重置信度策略和离线评测。',
    constraint: '完整仓库放不进上下文；只看 diff 又会漏掉调用方、事务边界和相关测试。',
    decision: '以 diff 为种子沿调用链扩展上下文，再按 token 预算裁剪；先做规则检查，模型只处理语义问题。',
    points: [
      '沿调用链补上被改函数、调用方与相关测试，再按 token 预算裁剪上下文',
      '空指针、事务边界、并发问题交给静态规则；同类评论合并，低置信度不输出',
      '回放 200 个历史 PR 并人工标注，分别统计有效评论率与单 PR token 成本',
    ],
    metric: '有效评论率 38% → 67%',
    evidence: ['200 个历史 PR 回放评测', '单 PR token 成本降低 52%', '低置信度与重复评论在发布前过滤'],
    architecture: [
      { label: 'DIFF', detail: '定位修改文件与函数' },
      { label: 'GRAPH', detail: '补齐调用方、依赖与相关测试' },
      { label: 'BUDGET', detail: '按 token 预算裁剪上下文' },
      { label: 'REVIEW', detail: '规则预检、模型判断、合并去重' },
    ],
    tech: ['Spring Boot', 'LangChain4j', 'JavaParser', 'Git API', 'Milvus', 'MCP'],
    featured: true,
  },
  {
    id: 'pet',
    title: '宠爱之家',
    subtitle: '独立开发',
    period: '2026',
    domain: 'SaaS · 高并发预约',
    description:
      '面向宠物医院的 SaaS 管理平台，含服务项目、在线预约、宠物档案与文件上传，重点解决抢号并发和缓存一致性。',
    role: '负责预约链路、缓存策略、身份鉴权、宠物档案和文件上传接口。',
    constraint: '放号瞬间并发集中，需要同时防止超卖、重复预约和数据库失败后的缓存脏数据。',
    decision: '把名额校验与扣减收敛到 Redis Lua 原子操作，数据库落单失败时回补名额。',
    points: [
      '放号前预热号源，Lua 原子执行「名额校验 + 扣减 + 一人一单标记」',
      '空值缓存防穿透、随机过期防雪崩、逻辑过期防击穿；数据库失败时回补名额',
      'JWT 无状态登录 + Redis 会话续期，双拦截器统一校验并以注解控制角色权限',
    ],
    metric: 'Lua 原子扣减 · 不超卖',
    evidence: ['校验、扣减和预约标记一次完成', '数据库失败后补偿 Redis 名额', '接口权限统一由注解声明'],
    architecture: [
      { label: 'WARMUP', detail: '号源提前写入 Redis' },
      { label: 'LUA', detail: '原子校验名额、用户与扣减' },
      { label: 'ORDER', detail: '数据库持久化预约记录' },
      { label: 'COMPENSATE', detail: '失败时回补名额并清理标记' },
    ],
    tech: ['Spring Boot', 'MyBatis-Plus', 'MySQL', 'Redis', 'Nginx', '阿里云 OSS'],
    featured: false,
  },
]

export const experience: Job[] = [
  {
    period: '2026.08 — 2026.10',
    role: 'AI 应用开发工程师（实习）',
    company: '郑州毅之恒电子科技有限公司',
    summary: 'AI 外呼系统后端：通话中的流式调用与多轮状态管理。',
    points: [
      '对接阿里云大模型 API，实现通话中的流式调用，支撑语音理解与动态话术生成',
      '负责会话上下文与多轮状态管理，保证并发外呼场景下的稳定',
      '联调语音通道与大模型接口，处理超时与上下文截断：分级重试 + 摘要压缩，模型接口平均响应耗时降低 22%',
      '补充单元测试与功能验证，支撑单次 20 路并发外呼，上线后跑通基础业务流程',
    ],
  },
  {
    period: '2025.06 — 2026.09',
    role: 'Java 开发实习生',
    company: '浙江优创信息技术有限公司',
    summary: 'MEC 边缘云计算平台：订单、工单、告警与多级审批。',
    points: [
      '为浙江比亚迪工厂提供边缘云计算服务支撑，覆盖订单流转、工单派发、设备告警与多级审批',
      '参与订单、工单、审批系统的核心功能开发，配合前端完成接口联调',
      '用 Explain 分析慢 SQL，重构索引并拆分嵌套子查询，审批记录统计响应时间缩短到原来的 1/5',
    ],
  },
]

export const skillGroups: SkillGroup[] = [
  {
    label: 'AI 应用',
    en: 'AI / Agent',
    items: [
      { name: 'LangChain4j', level: 5, usedIn: ['豫游', '合同审查', '代码评审'] },
      { name: 'RAG / 向量检索', level: 4, usedIn: ['豫游', '合同审查'] },
      { name: 'Function Calling · MCP', level: 4, usedIn: ['豫游', '代码评审'] },
      { name: 'Prompt 设计与评测', level: 4, usedIn: ['合同审查', '代码评审'] },
    ],
  },
  {
    label: 'Java 后端',
    en: 'Backend',
    items: [
      { name: 'Java 并发 · JVM', level: 4, usedIn: ['宠爱之家'] },
      { name: 'Spring Boot', level: 5, usedIn: ['4 个独立项目'] },
      { name: 'Spring Cloud Alibaba', level: 3, usedIn: ['边缘云实习'] },
      { name: 'MyBatis / MyBatis-Plus', level: 4, usedIn: ['宠爱之家', '边缘云实习'] },
    ],
  },
  {
    label: '数据与中间件',
    en: 'Data',
    items: [
      { name: 'MySQL 索引与事务', level: 4, usedIn: ['宠爱之家', '边缘云实习'] },
      { name: 'Redis 缓存 · Lua', level: 4, usedIn: ['豫游', '宠爱之家'] },
      { name: 'Milvus 向量库', level: 3, usedIn: ['豫游', '合同审查', '代码评审'] },
      { name: 'RabbitMQ', level: 3, usedIn: ['后端实践'] },
    ],
  },
  {
    label: '工程化',
    en: 'Tooling',
    items: [
      { name: 'Git / Maven / Apifox', level: 4, usedIn: ['全部项目'] },
      { name: 'Nginx / 部署', level: 3, usedIn: ['宠爱之家'] },
      { name: '单元测试 · 接口联调', level: 4, usedIn: ['两段实习', '代码评审'] },
      { name: 'AI 辅助开发工作流', level: 5, usedIn: ['个人项目'] },
    ],
  },
]

export const education = [
  {
    school: '河南工业大学',
    degree: '计算机科学与技术 · 本科 · 全日制',
    period: '2023.09 — 2027.06',
    note: '专业课程成绩位列 315 人中前 20%',
  },
]

export const honors = ['学院程序设计竞赛 二等奖', '校级大学生软件创新大赛', '专业课程成绩位列 315 人中前 20%']

export const about = {
  paragraphs: [
    '我是王甲申，河南工业大学计算机科学与技术专业 2027 届。比起把模型能力堆进页面，我更在意它接进业务之后还能不能讲清楚：这条结论从哪来、失败了怎么办、一次调用花多少钱。',
    '两段实习分别落在传统后端和大模型应用上——在 MEC 边缘云平台写过订单、工单和审批，也在 AI 外呼系统里做过流式调用与多轮会话。现在想找一份 Java 后端 / AI 应用方向的岗位，把这些经验接着用下去。',
  ],
}

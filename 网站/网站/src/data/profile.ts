// 所有可编辑内容都集中在这个文件里。
// 替换成你的真实姓名、联系方式、项目链接和经历即可，页面会自动同步。

export interface Skill {
  name: string
  /** 1–5，用于「关于」页的熟练度圆点 */
  level: number
}

export interface SkillGroup {
  label: string
  en: string
  items: Skill[]
}

export interface Project {
  id: number
  title: string
  description: string
  highlight: string
  tech: string[]
  status: 'live' | 'building'
  year: string
  href: string
}

export interface Job {
  period: string
  role: string
  company: string
  description: string
}

export const profile = {
  name: '晓宁',
  handle: 'xiaoning',
  initials: 'XN',
  role: '前端工程师 / 全栈开发者',
  headline: '把复杂的产品，做成简单好用的界面。',
  bio: '3 年前端开发经验，专注 Vue 3、TypeScript 与现代工程化。做过数据密集的 B 端平台，也从 0 到 1 搭过电商小程序，习惯用性能指标和可维护性衡量交付。',
  location: '中国 · 北京',
  experience: '3+ 年',
  education: '软件工程 · 本科',
  availability: '开放机会',
  updated: '2026.11',
  deliveredProjects: '12',
  openTo: '前端 / 全栈',
  workLocation: '北京 / 远程',
  notice: '一个月内',
  email: 'your.email@example.com',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourname',
}

export const skillGroups: SkillGroup[] = [
  {
    label: '前端',
    en: 'Frontend',
    items: [
      { name: 'Vue 3 / TypeScript', level: 5 },
      { name: 'React / Next.js', level: 4 },
      { name: 'Tailwind CSS', level: 4 },
      { name: 'Vite / Webpack', level: 4 },
    ],
  },
  {
    label: '后端',
    en: 'Backend',
    items: [
      { name: 'Node.js / Express', level: 4 },
      { name: 'RESTful / GraphQL', level: 4 },
      { name: 'MySQL / PostgreSQL', level: 3 },
    ],
  },
  {
    label: '工程化',
    en: 'Engineering',
    items: [
      { name: 'Git / CI/CD', level: 5 },
      { name: 'Docker / 部署', level: 4 },
      { name: '性能优化', level: 4 },
    ],
  },
]

export const projects: Project[] = [
  {
    id: 1,
    title: '企业级数据可视化平台',
    description: '面向运营与管理层的实时监控平台，承接 30+ 业务指标与多维筛选。',
    highlight: '首屏渲染 1.2s',
    tech: ['Vue 3', 'TypeScript', 'ECharts', 'WebSocket'],
    status: 'live',
    year: '2025',
    href: 'https://github.com/yourusername',
  },
  {
    id: 2,
    title: '电商小程序商城',
    description: '从 0 到 1 的跨端商城，覆盖微信与支付宝小程序，支持拼团与分销。',
    highlight: '日活 2 万+',
    tech: ['Uniapp', 'Vue 3', 'Pinia', 'TailwindCSS'],
    status: 'live',
    year: '2024',
    href: 'https://github.com/yourusername',
  },
  {
    id: 3,
    title: '云文档协作系统',
    description: '多人实时协作编辑，基于 OT 算法处理并发冲突与版本合并。',
    highlight: '合并延迟 < 200ms',
    tech: ['WebSocket', 'OT', 'Redis', 'MySQL'],
    status: 'building',
    year: '2026',
    href: 'https://github.com/yourusername',
  },
]

export const experience: Job[] = [
  {
    period: '2022 — 至今',
    role: '高级前端工程师',
    company: '某电商科技公司',
    description: '负责核心产品的前端架构与技术选型，带领 3 人小组完成从需求拆解到上线的完整链路。',
  },
  {
    period: '2021 — 2022',
    role: '前端工程师',
    company: '某 SaaS 创业公司',
    description: '独立负责电商平台前端开发，完成从 0 到 1 的构建，并搭建组件库与 CI 流程。',
  },
  {
    period: '2020 — 2021',
    role: '前端开发实习生',
    company: '某数字营销公司',
    description: '参与多个企业官网与营销页面开发，负责响应式适配与动效实现。',
  },
]

export const education = [
  {
    school: '某大学',
    degree: '计算机软件工程 · 学士',
    period: '2016 — 2020',
  },
]

export const certifications = [
  'AWS Certified Developer — Associate',
  'Microsoft Certified: Azure Developer',
  'Adobe Certified Expert (ACE)',
]

export const about = {
  paragraphs: [
    '我是晓宁，一名前端工程师。比起堆功能，我更在意界面是否清晰、交互是否顺手，以及半年后这套代码还能不能被轻松改。',
    '目前负责核心产品的前端架构与技术选型，带 3 人小组完成从需求拆解到上线的完整链路。业余时间维护几个开源小工具，也写一些关于 Vue 与工程化的笔记。',
  ],
}

<script setup lang="ts">
import { ref } from 'vue'

// 工作经历
const experience = ref([
  {
    company: 'Tech Company A',
    role: '高级前端工程师',
    period: '2022 - 至今',
    description: '负责核心产品的前端架构设计和技术选型，带领 3 人团队完成多个重要项目'
  },
  {
    company: 'Startup B',
    role: '前端工程师',
    period: '2021 - 2022',
    description: '独立负责电商平台前端开发，实现了从 0 到 1 的构建'
  },
  {
    company: 'Digital Agency C',
    role: '前端开发实习生',
    period: '2020 - 2021',
    description: '参与多个企业官网和营销页面的开发，积累了丰富实战经验'
  }
])

// 教育背景
const education = ref([
  {
    school: '某大学',
    degree: '计算机软件工程 学士',
    period: '2016 - 2020'
  }
])

// 技术认证
const certifications = ref([
  'AWS Certified Developer - Associate',
  'Microsoft Certified: Azure Developer',
  'Adobe Certified Expert (ACE)'
])

// 技能详情
const techSkills = ref([
  { category: '前端开发', skills: [
    { name: 'Vue.js / React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: '现代构建工具 (Vite/Webpack)', level: 85 },
    { name: '状态管理 (Pinia/Redux)', level: 88 },
    { name: 'CSS 与动画', level: 82 }
  ]},
  { category: '后端开发', skills: [
    { name: 'Node.js / Express', level: 80 },
    { name: '数据库 (MySQL/PostgreSQL)', level: 75 },
    { name: 'RESTful API / GraphQL', level: 70 },
    { name: '服务器配置', level: 65 }
  ]},
  { category: 'DevOps & 工具', skills: [
    { name: 'Git / CI/CD', level: 90 },
    { name: 'Docker / 部署', level: 70 },
    { name: 'Linux / 服务器', level: 65 }
  ]}
])
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12">
    <div class="container mx-auto px-4 max-w-5xl">
      <!-- 个人简介 -->
      <div class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-8 animate-on-scroll">
        <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          关于我
        </h1>
        <p class="text-xl text-gray-700 mb-6 leading-relaxed">
          我是一名热衷于创造卓越用户体验的前端工程师，拥有 3 年以上的开发经验。
          专注于 Vue.js、TypeScript 和现代 Web 技术栈，致力于为各类项目构建高性能、可维护的解决方案。
        </p>

        <div class="grid md:grid-cols-3 gap-6">
          <div class="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
            <div class="text-4xl font-bold text-blue-600 mb-2">{{ experience.length + 3 }}</div>
            <div class="text-gray-600 font-medium">年工作经验</div>
          </div>
          <div class="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
            <div class="text-4xl font-bold text-emerald-600 mb-2">{{ experience.length + 1 }}</div>
            <div class="text-gray-600 font-medium">完整项目经验</div>
          </div>
          <div class="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
            <div class="text-4xl font-bold text-purple-600 mb-2">10+</div>
            <div class="text-gray-600 font-medium">技术认证</div>
          </div>
        </div>
      </div>

      <!-- 工作经历 -->
      <div class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-8 animate-on-scroll">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          工作经历
        </h2>
        <div class="space-y-6">
          <div
            v-for="job in experience"
            :key="job.company"
            class="relative border-l-2 border-blue-500 pl-6 hover:border-blue-600 transition-colors cursor-pointer group"
          >
            <div class="absolute -left-2 top-2 w-4 h-4 bg-blue-500 rounded-full group-hover:bg-blue-600 transition-colors"></div>
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
              <h3 class="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {{ job.role }}
              </h3>
              <span class="text-gray-500 text-sm font-medium mt-1 md:mt-0">{{ job.period }}</span>
            </div>
            <div class="text-blue-600 font-medium mb-2 text-lg">{{ job.company }}</div>
            <p class="text-gray-600 leading-relaxed">{{ job.description }}</p>
          </div>
        </div>
      </div>

      <!-- 教育背景 -->
      <div class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-8 animate-on-scroll">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          教育背景
        </h2>
        <div class="space-y-4">
          <div
            v-for="edu in education"
            :key="edu.school"
            class="flex items-center justify-between p-6 gradient-card bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-shadow"
          >
            <div>
              <div class="font-bold text-xl text-gray-900">{{ edu.school }}</div>
              <div class="text-gray-600 text-lg">{{ edu.degree }}</div>
            </div>
            <div class="text-gray-500 text-lg font-medium">{{ edu.period }}</div>
          </div>
        </div>
      </div>

      <!-- 技术认证 -->
      <div class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-8 animate-on-scroll">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          技术认证
        </h2>
        <div class="flex flex-wrap gap-4">
          <div
            v-for="cert in certifications"
            :key="cert"
            class="px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 rounded-full font-semibold hover:shadow-md transition-shadow transform hover:-translate-y-0.5"
          >
            {{ cert }}
          </div>
        </div>
      </div>

      <!-- 技能详情 -->
      <div class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 animate-on-scroll">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          专业技能
        </h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="category in techSkills"
            :key="category.category"
            class="p-6 gradient-card bg-gradient-to-br from-gray-50 to-white rounded-xl"
          >
            <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              {{ category.category }}
            </h3>
            <div class="space-y-4">
              <div
                v-for="skill in category.skills"
                :key="skill.name"
                class="space-y-2"
              >
                <div class="flex items-center justify-between">
                  <span class="font-medium text-gray-700">{{ skill.name }}</span>
                  <span class="text-sm text-gray-500 font-semibold">{{ skill.level }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    class="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000"
                    :style="{ width: skill.level + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
}

/* 动效增强 */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 延迟动画 */
.animate-on-scroll:nth-child(2) { animation-delay: 0.2s; }
.animate-on-scroll:nth-child(3) { animation-delay: 0.4s; }
.animate-on-scroll:nth-child(4) { animation-delay: 0.6s; }
.animate-on-scroll:nth-child(5) { animation-delay: 0.8s; }

/* 响应式优化 */
@media (max-width: 768px) {
  .text-4xl {
    font-size: 2.5rem;
  }

  .text-3xl {
    font-size: 2rem;
  }

  .container {
    padding: 0 1rem;
  }
}
</style>


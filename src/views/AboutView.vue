<script setup lang="ts">
import { ref } from 'vue'

// 工作经历
const experience = ref([
  {
    company: ' Tech Company A',
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
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
    <div class="container mx-auto px-4 max-w-5xl">
      <!-- 个人简介 -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">关于我</h1>
        <p class="text-xl text-gray-600 mb-6">
          我是一名热衷于创造卓越用户体验的前端工程师，拥有 3 年以上的开发经验。
          专注于 Vue.js、TypeScript 和现代 Web 技术栈，致力于为各类项目构建高性能、可维护的解决方案。
        </p>

        <div class="grid md:grid-cols-3 gap-6 mt-8">
          <div class="text-center p-4 bg-gray-50 rounded-xl">
            <div class="text-3xl font-bold text-blue-600">{ experience.length + 3 }</div>
            <div class="text-gray-600 mt-2">年工作经验</div>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-xl">
            <div class="text-3xl font-bold text-green-600">{{ experience.length + 1 }}</div>
            <div class="text-gray-600 mt-2">完整项目经验</div>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-xl">
            <div class="text-3xl font-bold text-purple-600">10+ </div>
            <div class="text-gray-600 mt-2">技术认证</div>
          </div>
        </div>
      </div>

      <!-- 工作经历 -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">工作经历</h2>
        <div class="space-y-6">
          <div
            v-for="job in experience"
            :key="job.company"
            class="border-l-4 border-blue-500 pl-4"
          >
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h3 class="text-xl font-semibold text-gray-900">{{ job.role }}</h3>
              <span class="text-gray-500 text-sm">{{ job.period }}</span>
            </div>
            <div class="text-blue-600 mb-2">{{ job.company }}</div>
            <p class="text-gray-600">{{ job.description }}</p>
          </div>
        </div>
      </div>

      <!-- 教育背景 -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">教育背景</h2>
        <div class="space-y-4">
          <div
            v-for="edu in education"
            :key="edu.school"
            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <div class="font-semibold text-gray-900">{{ edu.school }}</div>
              <div class="text-gray-600">{{ edu.degree }}</div>
            </div>
            <div class="text-gray-500">{{ edu.period }}</div>
          </div>
        </div>
      </div>

      <!-- 技术认证 -->
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">技术认证</h2>
        <div class="flex flex-wrap gap-4">
          <div
            v-for="cert in certifications"
            :key="cert"
            class="px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-medium"
          >
            {{ cert }}
          </div>
        </div>
      </div>

      <!-- 技能详情 -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mt-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">专业技能</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="font-semibold text-gray-900 mb-3">前端开发</h3>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span>Vue.js / React</span>
                <div class="w-1/2 bg-gray-200 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full" style="width: 95%"></div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span>TypeScript</span>
                <div class="w-1/2 bg-gray-200 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full" style="width: 90%"></div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span>现代构建工具 (Vite/Webpack)</span>
                <div class="w-1/2 bg-gray-200 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full" style="width: 85%"></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="font-semibold text-gray-900 mb-3">后端开发</h3>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span>Node.js / Express</span>
                <div class="w-1/2 bg-gray-200 rounded-full h-2">
                  <div class="bg-green-600 h-2 rounded-full" style="width: 80%"></div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span>数据库 (MySQL/PostgreSQL)</span>
                <div class="w-1/2 bg-gray-200 rounded-full h-2">
                  <div class="bg-green-600 h-2 rounded-full" style="width: 75%"></div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span>RESTful API / GraphQL</span>
                <div class="w-1/2 bg-gray-200 rounded-full h-2">
                  <div class="bg-green-600 h-2 rounded-full" style="width: 70%"></div>
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
</style>


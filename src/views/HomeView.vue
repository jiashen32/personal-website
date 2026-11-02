<script setup lang="ts">
import { ref } from 'vue'

// 个人简介数据
const profile = ref({
  name: '你的名字',
  title: '前端工程师 | 全栈开发者',
  bio: '热爱创造优雅、高效的用户体验，专注于构建现代 Web 应用。拥有 3 年前端开发经验，擅长 Vue.js、TypeScript 和现代构建工具。',
  avatar: 'https://via.placeholder.com/150',
  location: '中国北京',
  experience: '3+ 年'
})

// 核心技能
const skills = ref([
  { name: 'Vue 3/TypeScript', level: 95, category: 'frontend' },
  { name: 'React/Next.js', level: 85, category: 'frontend' },
  { name: 'Node.js/Express', level: 80, category: 'backend' },
  { name: '数据库 (MySQL/PostgreSQL)', level: 75, category: 'backend' },
  { name: 'Git/CI/CD', level: 90, category: 'devops' },
  { name: 'Docker/部署', level: 70, category: 'devops' }
])

// 项目展示
const projects = ref([
  {
    id: 1,
    title: '企业级数据可视化平台',
    description: '使用 Vue 3 + TypeScript + ECharts 构建的实时数据监控平台',
    tech: ['Vue 3', 'TypeScript', 'ECharts', 'WebSocket'],
    image: 'https://via.placeholder.com/400x250',
    href: '#project1'
  },
  {
    id: 2,
    title: '电商小程序商城',
    description: '基于 Uniapp 开发的跨平台电商应用，支持微信/支付宝小程序',
    tech: ['Uniapp', 'Vue 3', 'Pinia', 'TailwindCSS'],
    image: 'https://via.placeholder.com/400x250',
    href: '#project2'
  },
  {
    id: 3,
    title: '云文档协作系统',
    description: '实时协作编辑的在线文档工具，支持多人同时编辑',
    tech: ['WebSocket', 'OP-TextField', 'Redis', 'MySQL'],
    image: 'https://via.placeholder.com/400x250',
    href: '#project3'
  }
])

// 联系方式
const contact = ref({
  email: 'your.email@example.com',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourname',
  phone: '138-xxxx-xxxx'
})

// 平滑滚动
const scrollTo = (id: string) => {
  const element = document.querySelector(id)
  if (element) element.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <!-- Hero Section -->
    <section class="container mx-auto px-4 py-12 md:py-20">
      <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div class="flex-1 space-y-6 text-center md:text-left">
          <div>
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              你好，我是 {{ profile.name }}
            </h1>
            <p class="text-xl md:text-2xl text-gray-600 mb-2">
              {{ profile.title }}
            </p>
            <p class="text-lg text-gray-500">
              {{ profile.bio }}
            </p>
          </div>

          <div class="flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              @click="scrollTo('#projects')"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              查看作品
            </button>
            <button
              @click="scrollTo('#contact')"
              class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors font-medium"
            >
              联系我
            </button>
          </div>

          <div class="flex items-center gap-6 justify-center md:justify-start text-sm text-gray-500">
            <div class="flex items-center gap-2">
              <span>📍</span>
              <span>{{ profile.location }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span>💼</span>
              <span>{{ profile.experience }} 年经验</span>
            </div>
          </div>
        </div>

        <div class="flex-shrink-0">
          <div class="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img :src="profile.avatar" :alt="profile.name" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="container mx-auto px-4 py-12 bg-white rounded-2xl shadow-sm mx-4 md:mx-8">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-8">
        技术栈
      </h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="skill in skills"
          :key="skill.name"
          class="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
        >
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold text-gray-900">{{ skill.name }}</h3>
            <span class="text-sm text-gray-500">{{ skill.level }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-blue-600 h-2 rounded-full transition-all duration-1000"
              :style="{ width: skill.level + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="container mx-auto px-4 py-12 mt-8">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-8">
        项目展示
      </h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="project in projects"
          :key="project.id"
          class="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          <img
            :src="project.image"
            :alt="project.title"
            class="w-full h-48 object-cover"
          />
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              {{ project.title }}
            </h3>
            <p class="text-gray-600 mb-4">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tech in project.tech"
                :key="tech"
                class="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
              >
                {{ tech }}
              </span>
            </div>
            <a
              :href="project.href"
              class="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              查看详情 →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="container mx-auto px-4 py-12 mt-8">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-8">
        联系我
      </h2>
      <div class="max-w-2xl mx-auto space-y-4">
        <div class="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
          <span class="text-2xl">📧</span>
          <div>
            <p class="font-semibold text-gray-900">电子邮箱</p>
            <p class="text-gray-600">{{ contact.email }}</p>
          </div>
        </div>

        <div class="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
          <span class="text-2xl">🔗</span>
          <div>
            <p class="font-semibold text-gray-900">GitHub</p>
            <p class="text-gray-600">{{ contact.github }}</p>
          </div>
        </div>

        <div class="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
          <span class="text-2xl">💼</span>
          <div>
            <p class="font-semibold text-gray-900">LinkedIn</p>
            <p class="text-gray-600">{{ contact.linkedin }}</p>
          </div>
        </div>

        <div class="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
          <span class="text-2xl">📱</span>
          <div>
            <p class="font-semibold text-gray-900">电话</p>
            <p class="text-gray-600">{{ contact.phone }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="container mx-auto px-4 py-8 text-center text-gray-500">
      <p>© {{ new Date().getFullYear() }} {{ profile.name }}. All rights reserved.</p>
      <p class="text-sm mt-2">
        Built with Vue 3 + Vite + GitHub Pages
      </p>
    </footer>
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .text-4xl {
    font-size: 2.5rem;
  }

  .text-5xl {
    font-size: 3rem;
  }
}
</style>


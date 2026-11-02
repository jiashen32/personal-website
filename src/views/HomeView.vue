<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 个人简介数据
const profile = ref({
  name: '你的名字',
  title: '前端工程师 | 全栈开发者',
  bio: '热爱创造优雅、高效的用户体验，专注于构建现代 Web 应用。拥有 3 年前端开发经验，擅长 Vue.js、TypeScript 和现代构建工具。',
  avatar: 'https://via.placeholder.com/150',
  location: '中国北京',
  experience: '3+ 年'
})

// 核心技能（应用 60-30-10 配色法则）
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

// 动效：元素进入视野时添加动画
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in')
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el)
  })
})
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
    <!-- Hero Section - 使用渐变背景 -->
    <section class="container mx-auto px-4 py-12 md:py-20">
      <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div class="flex-1 space-y-6 text-center md:text-left animate-on-scroll">
          <div>
            <h1 class="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              你好，我是 {{ profile.name }}
            </h1>
            <p class="text-xl md:text-2xl text-gray-700 mb-2 font-medium">
              {{ profile.title }}
            </p>
            <p class="text-lg text-gray-600 leading-relaxed">
              {{ profile.bio }}
            </p>
          </div>

          <div class="flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              @click="scrollTo('#projects')"
              class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              查看作品 ←
            </button>
            <button
              @click="scrollTo('#contact')"
              class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300 font-medium shadow-sm hover:shadow-md"
            >
              联系我 →
            </button>
          </div>

          <div class="flex items-center gap-6 justify-center md:justify-start text-sm text-gray-500">
            <div class="flex items-center gap-2">
              <span class="text-blue-600">📍</span>
              <span>{{ profile.location }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-purple-600">💼</span>
              <span>{{ profile.experience }} 年经验</span>
            </div>
          </div>
        </div>

        <div class="flex-shrink-0 animate-on-scroll">
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div class="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl">
              <img :src="profile.avatar" :alt="profile.name" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section - 使用渐变色卡片 -->
    <section class="container mx-auto px-4 py-12">
      <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 animate-on-scroll">
        技术栈
      </h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="skill in skills"
          :key="skill.name"
          class="p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 animate-on-scroll border border-gray-100"
          :class="{
            'bg-gradient-to-br from-blue-50 to-indigo-50': skill.category === 'frontend',
            'bg-gradient-to-br from-emerald-50 to-teal-50': skill.category === 'backend',
            'bg-gradient-to-br from-orange-50 to-amber-50': skill.category === 'devops'
          }"
        >
          <div class="flex justify-between items-center mb-3">
            <h3 class="font-semibold text-gray-900 text-lg">{{ skill.name }}</h3>
            <span class="text-sm text-gray-500 font-medium">{{ skill.level }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              class="h-3 rounded-full transition-all duration-1000"
              :class="{
                'bg-gradient-to-r from-blue-500 to-indigo-600': skill.category === 'frontend',
                'bg-gradient-to-r from-emerald-500 to-teal-600': skill.category === 'backend',
                'bg-gradient-to-r from-orange-500 to-amber-600': skill.category === 'devops'
              }"
              :style="{ width: skill.level + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="container mx-auto px-4 py-12 mt-8">
      <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 animate-on-scroll">
        项目展示
      </h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="project in projects"
          :key="project.id"
          class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-on-scroll"
        >
          <div class="relative overflow-hidden">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {{ project.title }}
            </h3>
            <p class="text-gray-600 mb-4 leading-relaxed">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tech in project.tech"
                :key="tech"
                class="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 rounded-full text-sm font-medium"
              >
                {{ tech }}
              </span>
            </div>
            <a
              :href="project.href"
              class="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-md"
            >
              查看详情 →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="container mx-auto px-4 py-12 mt-8">
      <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 animate-on-scroll">
        联系我
      </h2>
      <div class="max-w-2xl mx-auto space-y-4">
        <div class="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-md hover:shadow-lg transition-shadow animate-on-scroll">
          <span class="text-2xl">📧</span>
          <div>
            <p class="font-semibold text-gray-900">电子邮箱</p>
            <p class="text-gray-600">{{ contact.email }}</p>
          </div>
        </div>

        <div class="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-md hover:shadow-lg transition-shadow animate-on-scroll">
          <span class="text-2xl">🔗</span>
          <div>
            <p class="font-semibold text-gray-900">GitHub</p>
            <p class="text-gray-600">{{ contact.github }}</p>
          </div>
        </div>

        <div class="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-md hover:shadow-lg transition-shadow animate-on-scroll">
          <span class="text-2xl">💼</span>
          <div>
            <p class="font-semibold text-gray-900">LinkedIn</p>
            <p class="text-gray-600">{{ contact.linkedin }}</p>
          </div>
        </div>

        <div class="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-md hover:shadow-lg transition-shadow animate-on-scroll">
          <span class="text-2xl">📱</span>
          <div>
            <p class="font-semibold text-gray-900">电话</p>
            <p class="text-gray-600">{{ contact.phone }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer - 使用渐变背景 -->
    <footer class="container mx-auto px-4 py-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl">
      <p class="text-lg">© {{ new Date().getFullYear() }} {{ profile.name }}. All rights reserved.</p>
      <p class="text-sm mt-2 opacity-90">
        🚀 Built with Vue 3 + Vite + Tailwind CSS + Gitee Pages
      </p>
    </footer>
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

/* 响应式优化 */
@media (max-width: 768px) {
  .text-4xl {
    font-size: 2.5rem;
  }

  .text-5xl {
    font-size: 3rem;
  }

  .container {
    padding: 0 1rem;
  }
}
</style>


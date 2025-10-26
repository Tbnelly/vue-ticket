<template>
  <nav class="flex items-center py-4 px-6 max-w-[1440px] mx-auto w-full relative">
    <!-- Logo -->
    <div class="flex-shrink-0">
      <h1 class="text-2xl font-bold text-blue-600">TicketWave</h1>
    </div>

    <!-- Desktop Links -->
    <div class="hidden md:flex flex-1 justify-center">
      <div class="flex items-center space-x-6">
        <router-link
          to="/"
          class="text-gray-700 hover:text-blue-600"
          :class="{ 'text-blue-600 font-bold': isActive('/') }"
        >
          Home
        </router-link>
        <router-link
          to="/auth/login"
          class="text-gray-700 hover:text-blue-600"
          :class="{ 'text-blue-600 font-bold': isActive('/auth/login') }"
        >
          Login
        </router-link>
        <router-link
          to="/auth/signup"
          class="text-gray-700 hover:text-blue-600"
          :class="{ 'text-blue-600 font-bold': isActive('/auth/signup') }"
        >
          Register
        </router-link>
      </div>
    </div>

    <!-- Hamburger Icon (mobile) -->
    <div class="flex md:hidden ml-auto">
      <button
        @click="toggleMenu"
        class="text-gray-700 hover:text-blue-600 focus:outline-none"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="menuOpen"
      class="fixed top-0 right-0 h-full w-1/2 bg-white shadow-lg z-50 flex flex-col justify-center items-start p-6 md:hidden transition-transform duration-300 space-y-6"
    >
      <router-link
        to="/"
        class="text-gray-700 text-lg hover:text-blue-600"
        :class="{ 'text-blue-600 font-bold': isActive('/') }"
        @click="toggleMenu"
      >
        Home
      </router-link>
      <router-link
        to="/auth/login"
        class="text-gray-700 text-lg hover:text-blue-600"
        :class="{ 'text-blue-600 font-bold': isActive('/auth/login') }"
        @click="toggleMenu"
      >
        Login
      </router-link>
      <router-link
        to="/auth/signup"
        class="text-gray-700 text-lg hover:text-blue-600"
        :class="{ 'text-blue-600 font-bold': isActive('/auth/signup') }"
        @click="toggleMenu"
      >
        Register
      </router-link>

      <!-- Close button -->
      <button
        @click="toggleMenu"
        class="absolute top-6 right-6 text-gray-700 hover:text-blue-600"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "Navbar",
  setup() {
    const menuOpen = ref(false);
    const route = useRoute();

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    const isActive = (path) => route.path === path;

    return { menuOpen, toggleMenu, isActive };
  },
};
</script>

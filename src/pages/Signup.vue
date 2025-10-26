<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />

    <main class="flex flex-1 flex-col justify-center items-center bg-gray-50">
      <div class="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
        <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">Create Account</h2>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              class="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500"
              v-model="email"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              class="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500"
              v-model="password"
            />
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              class="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500"
              v-model="confirmPassword"
            />
            <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Sign Up
          </button>

          <p class="text-center text-sm text-gray-600 mt-4">
            Already have an account?
            <router-link to="/auth/login" class="text-blue-600 font-semibold hover:underline">
              Login
            </router-link>
          </p>
        </form>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  components: { Navbar, Footer },
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const errors = ref({});

    const handleSubmit = () => {
      errors.value = {};

      if (!email.value.trim()) errors.value.email = "Email is required.";
      if (!password.value.trim()) errors.value.password = "Password is required.";
      if (password.value.length < 6)
        errors.value.password = "Password must be at least 6 characters.";
      if (password.value !== confirmPassword.value)
        errors.value.confirmPassword = "Passwords do not match.";

      if (Object.keys(errors.value).length) return;

      let users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.some(u => u.email === email.value)) {
        toast.error("User already exists. Please log in.");
        return;
      }

      users.push({ email: email.value, password: password.value });
      localStorage.setItem("users", JSON.stringify(users));

      toast.success("Signup successful! Redirecting to login...");
      setTimeout(() => router.push("/auth/login"), 1000);
    };

    return { email, password, confirmPassword, errors, handleSubmit };
  },
};
</script>

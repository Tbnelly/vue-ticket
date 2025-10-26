<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />

    <main class="flex flex-1 flex-col justify-center items-center bg-gray-50">
      <div class="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
        <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              class="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500"
              v-model="form.email"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              class="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500"
              v-model="form.password"
            />
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p class="text-center text-sm text-gray-600 mt-4">
            Don't have an account?
            <router-link to="/auth/signup" class="text-blue-600 font-semibold hover:underline">
              Sign Up
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
    const form = ref({ email: "", password: "" });
    const errors = ref({});

    const validate = () => {
      const err = {};
      if (!form.value.email.trim()) err.email = "Email is required";
      if (!form.value.password.trim()) err.password = "Password is required";
      return err;
    };

    const handleSubmit = () => {
      const err = validate();
      if (Object.keys(err).length) {
        errors.value = err;
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.email === form.value.email);

      if (!user) {
        toast.error("User does not exist. Please sign up.");
        return;
      }

      if (user.password !== form.value.password) {
        toast.error("Incorrect password. Try again.");
        return;
      }

      localStorage.setItem("ticketapp_session", "valid_session_token");
      localStorage.setItem("current_user", JSON.stringify(user));

      toast.success("Login successful!");
      setTimeout(() => router.push("/dashboard"), 800);
    };

    return { form, errors, handleSubmit };
  },
};
</script>

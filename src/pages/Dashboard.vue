<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <!-- Custom Dashboard Navbar -->
    <div class="flex justify-between items-center max-w-[1440px] mx-auto w-full px-6 py-6">
      <h1 class="text-2xl font-bold text-blue-600">TicketWave</h1>
      <button
        @click="handleLogout"
        class="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>

    <main class="flex-1 max-w-[1440px] mx-auto w-full px-6 py-10">
      <div class="flex justify-between items-center mb-10">
        <h2 class="text-3xl font-bold text-gray-800">Dashboard</h2>
        <p class="text-gray-600 text-sm">
          Welcome, <span class="font-medium">{{ userEmail }}</span>
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div class="bg-white p-6 rounded-2xl shadow">
          <h3 class="text-gray-600">Total Tickets</h3>
          <p class="text-3xl font-bold text-gray-800 mt-2">{{ stats.total }}</p>
        </div>

        <div class="bg-green-100 p-6 rounded-2xl shadow">
          <h3 class="text-gray-600">Open</h3>
          <p class="text-3xl font-bold text-green-700 mt-2">{{ stats.open }}</p>
        </div>

        <div class="bg-amber-100 p-6 rounded-2xl shadow">
          <h3 class="text-gray-600">In Progress</h3>
          <p class="text-3xl font-bold text-amber-700 mt-2">{{ stats.in_progress }}</p>
        </div>

        <div class="bg-gray-200 p-6 rounded-2xl shadow">
          <h3 class="text-gray-600">Closed</h3>
          <p class="text-3xl font-bold text-gray-700 mt-2">{{ stats.closed }}</p>
        </div>
      </div>

      <!-- Navigation -->
      <div class="text-center">
        <router-link
          to="/tickets"
          class="bg-blue-600 text-white px-8 py-3 rounded-2xl shadow hover:bg-blue-700 transition"
        >
          Manage Tickets
        </router-link>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getTickets } from "../utils/tickets";
import { logout, isAuthenticated } from "../utils/auth";
import Footer from "../components/Footer.vue";

export default {
  components: { Footer },
  setup() {
    const router = useRouter();
    const stats = ref({ total: 0, open: 0, in_progress: 0, closed: 0 });
    const userEmail = ref("");

    const calculateStats = (email) => {
      const tickets = getTickets() || [];
      const userTickets = tickets.filter(t => t.owner === email);

      stats.value.total = userTickets.length;
      stats.value.open = userTickets.filter(t => t.status === "open").length;
      stats.value.in_progress = userTickets.filter(t => t.status === "in_progress").length;
      stats.value.closed = userTickets.filter(t => t.status === "closed").length;
    };

    const handleLogout = () => {
      logout();
      router.push("/auth/login");
    };

    onMounted(() => {
      const currentUser = JSON.parse(localStorage.getItem("current_user"));
      if (!currentUser || !isAuthenticated()) {
        router.push("/auth/login");
        return;
      }

      userEmail.value = currentUser.email;
      calculateStats(currentUser.email);
    });

    return { stats, handleLogout, userEmail };
  },
};
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <main class="flex-1 max-w-[1440px] mx-auto w-full px-6 py-10">
      <!-- Back to Dashboard Button -->
      <div class="mb-6">
        <button @click="$router.push('/dashboard')"
          class="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition">
          ← Back to Dashboard
        </button>
      </div>

      <h2 class="text-3xl font-bold text-gray-800 mb-6">Ticket Management</h2>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded-2xl shadow mb-10 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input type="text" class="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500"
            v-model="form.title" />
          <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea class="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500" rows="3"
            v-model="form.description"></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status *</label>
          <select class="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500" v-model="form.status">
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <p v-if="errors.status" class="text-red-500 text-sm mt-1">{{ errors.status }}</p>
        </div>

        <div class="flex space-x-4">
          <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
            {{ editId ? "Update Ticket" : "Create Ticket" }}
          </button>
          <button v-if="editId" type="button" @click="resetForm"
            class="bg-gray-300 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-400 transition">
            Cancel
          </button>
        </div>
      </form>

      <!-- Ticket List -->
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <p v-if="tickets.length === 0" class="text-gray-600">No tickets yet. Create one above!</p>

        <div v-for="ticket in tickets" :key="ticket.id"
          class="bg-white p-6 rounded-2xl shadow relative hover:shadow-lg transition">
          <span class="absolute top-3 right-3 text-xs font-medium px-3 py-1 rounded-full"
            :class="statusColor(ticket.status)">
            {{ ticket.status.replace('_', ' ') }}
          </span>

          <h3 class="text-lg font-semibold text-gray-800">{{ ticket.title }}</h3>
          <p v-if="ticket.description" class="text-gray-600 mt-2 text-sm">{{ ticket.description }}</p>

          <div class="flex space-x-3 mt-4">
            <button @click="handleEdit(ticket)" class="text-blue-600 hover:underline">Edit</button>
            <button @click="handleDelete(ticket.id)" class="text-red-600 hover:underline">Delete</button>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Footer from "../components/Footer.vue";
import { getTickets, createTicket, updateTicket, deleteTicket } from "../utils/tickets";
import { isAuthenticated } from "../utils/auth";
import { useToast } from "vue-toastification";

export default {
  components: { Footer },
  setup() {
    const router = useRouter();
    const tickets = ref([]);
    const form = ref({ title: "", description: "", status: "open" });
    const editId = ref(null);
    const errors = ref({});
    const toast = useToast();

    const validate = () => {
      const err = {};
      if (!form.value.title.trim()) err.title = "Title is required.";
      if (!["open", "in_progress", "closed"].includes(form.value.status))
        err.status = "Status must be open, in_progress, or closed.";
      return err;
    };

    const loadTickets = () => {
      tickets.value = getTickets();
    };

    const resetForm = () => {
      form.value = { title: "", description: "", status: "open" };
      editId.value = null;
      errors.value = {};
    };

    const handleSubmit = () => {
      const err = validate();
      if (Object.keys(err).length) {
        errors.value = err;
        return;
      }

      if (editId.value) {
        updateTicket(editId.value, form.value);
        toast.success("Ticket updated successfully!");
      } else {
        createTicket(form.value);
        toast.success("Ticket created successfully!");
      }

      loadTickets();
      resetForm();
    };

    const handleEdit = (ticket) => {
      editId.value = ticket.id;
      form.value = {
        title: ticket.title,
        description: ticket.description || "",
        status: ticket.status,
      };
    };

    const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this ticket?")) {
        deleteTicket(id);
        loadTickets();
        toast.success("Ticket deleted successfully!");
      }
    };

    const statusColor = (status) => {
      switch (status) {
        case "open":
          return "bg-green-100 text-green-800";
        case "in_progress":
          return "bg-amber-100 text-amber-800";
        case "closed":
          return "bg-gray-200 text-gray-700";
        default:
          return "bg-gray-100";
      }
    };

    onMounted(() => {
      if (!isAuthenticated()) router.push("/auth/login");
      else loadTickets();
    });

    return {
      tickets,
      form,
      editId,
      errors,
      handleSubmit,
      handleEdit,
      handleDelete,
      resetForm,
      statusColor,
    };
  },
};
</script>

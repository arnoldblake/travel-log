<script setup lang="ts">
const authStore = useAuthStore();

onMounted(() => {
  authStore.signOut();
});
</script>

<template>
  <div class="card container bg-base-300 mx-auto min-h-72 mt-4 text-center flex flex-col items-center justify-center">
    <span class="loading loading-spinner loading-xl" />
  </div>
</template>

<script lang="js" setup>
const route = useRoute();
const { slug } = route.params;
const { data: location, status, error } = await useFetch(`/api/locations/${slug}`, { lazy: true });
</script>

<template>
  <div class="p-4 min-h-64">
    <div v-if="status === 'pending'">
      <span class="loading loading-spinner loading-xl" />
    </div>
    <div v-if="location && status === 'success'">
      <h2 class="text-lx">
        {{ location.name }}
      </h2>
      <p class="text-sm">
        {{ location.description }}
      </p>
    </div>
    <div v-if="error && status !== 'pending'" class="text-error">
      <p>Error loading location: {{ error.statusMessage }}</p>
    </div>
  </div>
</template>

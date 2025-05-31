<script setup lang="ts">
const route = useRoute();
const error = route.query.error || "An unexpected error occurred.";
</script>

<template>
  <div class="card container bg-base-300 mx-auto min-h-72 mt-4 text-center flex flex-col items-center justify-center">
    <div role="alert" class="alert alert-error min-w-1/2 text-center">
      <span>Oh no! Something went wrong. {{ error }}</span>
    </div>
    <NuxtLink to="/" class="btn btn-primary mt-4">
      Home
      <Icon name="tabler:arrow-left" size="32" />
    </NuxtLink>
  </div>
</template>

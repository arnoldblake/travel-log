<script setup lang="ts">
const isSidebarOpen = ref(true);
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("sidebarOpen", JSON.stringify(isSidebarOpen.value));
}
onMounted(() => {
  const storedSidebarState = localStorage.getItem("sidebarOpen");
  if (storedSidebarState !== null) {
    isSidebarOpen.value = JSON.parse(storedSidebarState);
  }
});
</script>

<template>
  <div class="flex-1 flex">
    <div class="bg-base-200 transition-all duration-300" :class=" { 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }">
      <div
        class="flex btn"
        :class="{ 'justify-center': !isSidebarOpen, 'justify-end': isSidebarOpen }"
        @click="toggleSidebar"
      >
        <Icon
          v-if="isSidebarOpen"
          name="tabler:chevron-left"
          size="32"
        />
        <Icon
          v-else
          name="tabler:chevron-right"
          size="32"
        />
      </div>
      <div class="flex flex-col gap-2">
        <SidebarButton
          :show-label="isSidebarOpen"
          label="Locations"
          icon="tabler:map"
          href="/dashboard"
        />
        <SidebarButton
          :show-label="isSidebarOpen"
          label="Add Location"
          icon="tabler:circle-plus-filled"
          href="/dashboard/add"
        />
        <div class="divider" />
        <SidebarButton
          :show-label="isSidebarOpen"
          label="Sign Out"
          icon="tabler:logout-2"
          href="sign-out"
        />
      </div>
    </div>
    <div class="flex-1">
      Hi
    </div>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(value: boolean) {
    colorMode.value = value ? "dark" : "light";
  },
});
</script>

<template>
  <label class="swap swap-rotate mx-5">
    <input
      v-model="isDark"
      type="checkbox"
      class="theme-controller"
    >
    <Icon
      class="swap-off h-10 w-10 fill-current"
      name="tabler:sun-filled"
      size="24"
    />
    <Icon
      class="swap-on h-10 w-10 fill-current"
      name="tabler:moon-filled"
      size="24"
    />
  </label>
</template>

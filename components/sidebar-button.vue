<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";

const props = defineProps<{
  label: string;
  icon: string;
  href?: string;
  to?: RouteLocationRaw;
  showLabel?: boolean;
  iconColor?: "text-accent" | "text-secondary" | "text-primary";
}>();

const route = useRoute();
</script>

<template>
  <div
    class="tooltip-right flex flex-col mt-4"
    :data-tip="props.label"
    :class="{ tooltip: !showLabel }"
  >
    <NuxtLink
      :to="props.href || props.to"
      :class="{ 'btn-secondary': route.path === props.href, 'justify-center': !showLabel, 'justify-start': showLabel }"
      class="btn btn-primary"
    >
      <Icon
        :name="props.icon"
        size="24"
        :class="iconColor"
      />
      <Transition name="grow">
        <span v-if="showLabel">{{ props.label }}</span>
      </Transition>
    </NuxtLink>
  </div>
</template>

<style scoped>
.grow-enter-active {
  animation: grow 0.1s;
}
.grow-leave-active {
  animation: grow 0.1s reverse;
}
@keyframes grow {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>

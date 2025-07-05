import type { RouteLocationRaw } from "vue-router";

import type { MapPoint } from "~/lib/types";

export type sidebarItem = {
  id: string;
  label: string;
  icon: string;
  href?: string;
  to?: RouteLocationRaw;
  location?: MapPoint | null;
};

export const useSidebarStore = defineStore("useSidebarStore", () => {
  const sidebarItems = ref<sidebarItem[]>([]);
  const loading = ref(false);
  return {
    loading,
    sidebarItems,
  };
});

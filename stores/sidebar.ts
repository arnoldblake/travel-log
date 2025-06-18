export type sidebarItem = {
  id: string;
  label: string;
  icon: string;
  href: string;
};

export const useSidebarStore = defineStore("useSidebarStore", () => {
  const sidebarItems = ref<sidebarItem[]>([]);
  const loading = ref(false);
  return {
    loading,
    sidebarItems,
  };
});

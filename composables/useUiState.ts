const state = reactive({
  isSidebarOpen: false,
});

const useUiState = () => {
  const isSidebarOpen = computed(() => state.isSidebarOpen);

  const toggleSidebar = () => {
    state.isSidebarOpen = !state.isSidebarOpen;
  };

  const openSidebar = () => {
    state.isSidebarOpen = true;
  };

  const closeSidebar = () => {
    state.isSidebarOpen = false;
  };

  return {
    isSidebarOpen,
    toggleSidebar,
    openSidebar,
    closeSidebar,
  };
};

export default useUiState;

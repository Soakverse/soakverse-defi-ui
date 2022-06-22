const state = reactive({
  isSidebarOpen: false,
});

const useUiState = () => {
  const isSidebarOpen = computed(() => state.isSidebarOpen);
  const toggleSidebar = () => {
    state.isSidebarOpen = !state.isSidebarOpen;
  };

  return {
    isSidebarOpen,
    toggleSidebar,
  };
};

export default useUiState;

const state = reactive({
  isSidebarOpen: false,
  isSoundEnabled: false,
});

const useUiState = () => {
  const isSidebarOpen = computed(() => state.isSidebarOpen);
  const isSoundEnabled = computed(() => state.isSoundEnabled);

  const toggleSidebar = () => {
    state.isSidebarOpen = !state.isSidebarOpen;
  };

  const openSidebar = () => {
    state.isSidebarOpen = true;
  };

  const closeSidebar = () => {
    state.isSidebarOpen = false;
  };

  const toggleSoundEnabled = () => {
    state.isSoundEnabled = !state.isSoundEnabled;
  };

  return {
    state,
    isSidebarOpen,
    isSoundEnabled,
    toggleSidebar,
    openSidebar,
    closeSidebar,
    toggleSoundEnabled,
  };
};

export default useUiState;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const download = async () => {
  const states = [
    isWorkCompletedThisYearCollapsed,
    isWorkInProgressCollapsed,
    isPrioritizedforQ2Collapsed,
    isPrioritizedforQ3Collapsed,
    isPrioritizedforQ4Collapsed,
    isBacklogRecentProdIssuesCollapsed,
    isBacklogRecentNewDemandCollapsed,
    isBacklogCollapsed,
  ];

  const setStates = [
    setIsWorkCompletedThisYearCollapsed,
    setIsWorkInProgressCollapsed,
    setIsPrioritizedforQ2Collapsed,
    setIsPrioritizedforQ3Collapsed,
    setIsPrioritizedforQ4Collapsed,
    setIsBacklogRecentProdIssuesCollapsed,
    setIsBacklogRecentNewDemandCollapsed,
    setIsBacklogCollapsed,
  ];

  // Collapse all sections
  setStates.forEach(setState => setState(false));

  // Wait for a second
  await delay(1000);

  // Export the table to Excel
  exportTableToExcel();

  // Restore the previous states
  states.forEach((state, index) => setStates[index](state));
};

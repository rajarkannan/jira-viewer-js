// Example conditions
const conditions: FilterCondition[] = [
  // Condition 1: status in ("In Review", "Progress", "Coded", "Pending Test", "Testing", "Sign off") and labels in ("Q22024Prioritized")
  (item: Dictionary) => 
    ["In Review", "Progress", "Coded", "Pending Test", "Testing", "Sign off"].includes(item.status) &&
    item.labels.includes("Q22024Prioritized"),

  // Condition 2: status not in ("Closed") and labels includes "Backlog" and labels does not include "Recent"
  (item: Dictionary) => 
    item.status !== "Closed" &&
    item.labels.includes("Backlog") &&
    !item.labels.includes("Recent")
  
  // Add more conditions here as needed
];

// Example usage
const dictionaries: Dictionary[] = [
  // Example dictionary array
  {
    key: "1",
    summary: "Summary 1",
    status: "In Review",
    tshirtsize: "M",
    labels: ["Q22024Prioritized", "Backlog"],
    fixversion: "1.0",
    assignee: "Alice",
    duedate: "2024-06-30",
    rag: "Green",
    cap: "Cap1",
    bcm: "Bcm1",
    resolutiondate: "2024-06-10"
  },
  {
    key: "2",
    summary: "Summary 2",
    status: "Closed",
    tshirtsize: "L",
    labels: ["Backlog", "Recent"],
    fixversion: "1.0",
    assignee: "Bob",
    duedate: "2024-07-01",
    rag: "Red",
    cap: "Cap2",
    bcm: "Bcm2",
    resolutiondate: "2024-06-20"
  }
  // Add more dictionary objects here
];

const filteredDictionaries = filterDictionaries(dictionaries, conditions);
console.log(filteredDictionaries);

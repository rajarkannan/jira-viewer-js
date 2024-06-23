interface Dictionary {
  key: string;
  summary: string;
  status: string;
  tshirtsize: string;
  labels: string[];
  fixversion: string;
  assignee: string;
  duedate: string;
  rag: string;
  cap: string;
  bcm: string;
  resolutiondate: string;
}

type FilterCondition = (item: Dictionary) => boolean;

const filterConditions: { [key: string]: FilterCondition[] } = {
  conditionSet1: [
    (item: Dictionary) => 
      ["In Review", "Progress", "Coded", "Pending Test", "Testing", "Sign off"].includes(item.status) &&
      item.labels.includes("Q22024Prioritized"),
  ],
  conditionSet2: [
    (item: Dictionary) => 
      item.status !== "Closed" &&
      item.labels.includes("Backlog") &&
      !item.labels.includes("Recent"),
  ],
  // Add more sets of conditions here as needed
};

function filterDictionaries(dictionaries: Dictionary[], conditionKey: string): Dictionary[] {
  const conditions = filterConditions[conditionKey];
  if (!conditions) {
    throw new Error(`No conditions found for key: ${conditionKey}`);
  }
  return dictionaries.filter(item => conditions.every(condition => condition(item)));
}

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

const filteredDictionaries = filterDictionaries(dictionaries, 'conditionSet1');
console.log(filteredDictionaries);

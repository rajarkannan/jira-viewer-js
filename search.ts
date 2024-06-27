interface DataRow {
  [key: string]: any; // Define the structure of your dictionary
}

function filterRows(data: DataRow[], searchString: string): DataRow[] {
  // Convert the search string to lower case for case insensitive search
  const lowerCaseSearchString = searchString.toLowerCase();

  return data.filter(row => {
    // Check if any value in the row matches the search string
    return Object.values(row).some(value =>
      value.toString().toLowerCase().includes(lowerCaseSearchString)
    );
  });
}

// Example usage:
const data: DataRow[] = [
  { id: 1, name: 'Alice', age: 30, city: 'New York' },
  { id: 2, name: 'Bob', age: 25, city: 'Los Angeles' },
  { id: 3, name: 'Charlie', age: 35, city: 'Chicago' },
];

const searchString = 'ali';
const filteredData = filterRows(data, searchString);

console.log(filteredData);

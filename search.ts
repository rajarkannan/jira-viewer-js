interface DataRow {
  [key: string]: any; // Define the structure of your dictionary
}

function filterRows(data: DataRow[], searchString: string): DataRow[] {
  // Convert the search string to lower case for case insensitive search
  const lowerCaseSearchString = searchString.toLowerCase();

  return data.filter(row => {
    // Check if any value in the row matches the search string
    return Object.values(row).some(value => {
      if (value == null) {
        return false; // Skip null or undefined values
      } else if (Array.isArray(value)) {
        // Check if any element in the array matches the search string
        return value.some(element => 
          element != null && element.toString().toLowerCase().includes(lowerCaseSearchString)
        );
      } else {
        return value.toString().toLowerCase().includes(lowerCaseSearchString);
      }
    });
  });
}

// Example usage:
const data: DataRow[] = [
  { id: 1, name: 'Alice', age: 30, city: 'New York', tags: ['developer', 'designer'] },
  { id: 2, name: 'Bob', age: 25, city: 'Los Angeles', tags: null },
  { id: 3, name: 'Charlie', age: 35, city: 'Chicago', tags: ['manager', 'lead'] },
  { id: 4, name: null, age: undefined, city: 'Seattle', tags: ['engineer'] },
];

const searchString = 'ali';
const filteredData = filterRows(data, searchString);

console.log(filteredData);

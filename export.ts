import * as XLSX from 'xlsx';

export const exportTablesToExcel = (tableIds: string[], fileName: string = 'tables.xlsx') => {
  const workbook = XLSX.utils.book_new();
  
  tableIds.forEach((tableId, index) => {
    const table = document.getElementById(tableId);
    if (!table) {
      console.error(`Table with id ${tableId} not found`);
      return;
    }
    
    const worksheet = XLSX.utils.table_to_sheet(table);
    XLSX.utils.book_append_sheet(workbook, worksheet, `Sheet${index + 1}`);
  });

  XLSX.writeFile(workbook, fileName);
};

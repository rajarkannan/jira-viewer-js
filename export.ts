import * as XLSX from 'xlsx';

export const exportTableToExcel = (tableId: string, fileName: string = 'table.xlsx') => {
  const table = document.getElementById(tableId);
  if (!table) {
    console.error(`Table with id ${tableId} not found`);
    return;
  }

  const workbook = XLSX.utils.table_to_book(table, { sheet: 'Sheet1' });
  XLSX.writeFile(workbook, fileName);
};

import React from 'react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver';

const ExportData = ({data}) => {
    console.log("in the export data ",data);
    const worksheet=XLSX.utils.json_to_sheet(data);
    const workbook=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook,worksheet,"population_data");

    //

    const excelBuffer=XLSX.write(workbook,{bookType:'xlsx',type:'array'});
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(blob,"data.xlsx");
  return (
    <div>
      
    </div>
  )
}

export default ExportData

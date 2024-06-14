import * as XLSX from 'xlsx';

export const readExcel = (file) => {
  return new Promise((resolve, reject) => {

    //Creating a FileReader Instance
    const reader = new FileReader();

    reader.onload = (e) => {
      //converts it into a Uint8Array. This Uint8Array is a 
      //typed array that represents the raw binary data of the file.
      const data = new Uint8Array(e.target.result);
      //parse the binary data into a workbook object.
      //converts in the form of array
      const workbook = XLSX.read(data, { type: 'array' });
      // retrieves the name of the first sheet in the workbook
      const sheetName = workbook.SheetNames[0];
      //This line retrieves the sheet object corresponding to the first sheet name.
      const sheet = workbook.Sheets[sheetName];
      // convert the sheet data into a JSON array. 
      const excelData = XLSX.utils.sheet_to_json(sheet);

      resolve(excelData);

    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
};

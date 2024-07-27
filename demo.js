const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const data = e.target.result;
    const workbook = XLSX.read(data, { type: "binary" });

    console.log("hi i m here");
    console.log("workbook", workbook);

    const sheetName = workbook.SheetNames[0]; // Corrected to SheetNames
    const worksheet = workbook.Sheets[sheetName];
    const emailList = XLSX.utils.sheet_to_json(worksheet, { header: "A" }); // Consistent use of XLSX
    console.log(emailList);
  };

  reader.readAsBinaryString(file);
});

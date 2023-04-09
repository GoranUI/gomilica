const APP = {
  data: [],
  init() {
    APP.addListeners();
    APP.loadSavedData();
  },
  addListeners() {
    const form = document.querySelector('#collect form');
    form.addEventListener('submit', APP.saveData);

    document
      .getElementById('btnExport')
      .addEventListener('click', APP.exportData);

    document
      .querySelector('table tbody')
      .addEventListener('dblclick', APP.editCell);
  },
  loadSavedData() {
    const savedData = localStorage.getItem('appData');
    if (savedData) {
      APP.data = JSON.parse(savedData);
      APP.buildTable();
    }
  },
  saveData(ev) {
    ev.preventDefault();
    const form = ev.target;
    const formdata = new FormData(form);
    //save the data in APP.data
    APP.cacheData(formdata);
    //build a row in the table
    APP.buildRow(formdata);
    //clear the form
    form.reset();
    //focus on first name
    document.getElementById('title').focus();
    //save data to local storage
    localStorage.setItem('appData', JSON.stringify(APP.data));
  },
  cacheData(formdata) {
    //extract the data from the FormData object and update APP.data
    APP.data.push(Array.from(formdata.values()));
    console.table(APP.data);
  },
  buildRow(formdata) {
    const tbody = document.querySelector('#display > table > tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = '';
    tr.setAttribute('data-row', document.querySelectorAll('tbody tr').length);
    let col = 0;
    //loop through the FormData object entries and build a row with
    for (let entry of formdata.entries()) {
      tr.innerHTML += `<td data-col="${col}" data-name="${entry[0]}">${entry[1]}</td>`;
      col++;
    }
    tbody.append(tr);
    //data references for later editing
  },
  buildTable() {
    const tbody = document.querySelector('#display > table > tbody');
    APP.data.forEach((row, rowIndex) => {
      const tr = document.createElement('tr');
      tr.setAttribute('data-row', rowIndex);
      row.forEach((col, colIndex) => {
        tr.innerHTML += `<td data-col="${colIndex}" data-name="${APP.getColumnName(colIndex)}">${col}</td>`;
      });
      tbody.append(tr);
    });
  },
  exportData() {
    //insert the header row
    APP.data.unshift(['Title', 'About', 'Link', 'Tag']);
    //convert array to a string with \n at the end
    let str = '';
    APP.data.forEach((row) => {
      str += row
        .map((col) => JSON.stringify(col))
        .join(',')
        .concat('\n');
    });

    //create the file
    let filename = `dataexport.${Date.now()}.csv`;
    let file = new File([str], filename, { type: 'text/csv' });

    //create an anchor tag with "download" attribute
    let a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
    //and click the anchor
  },
  editCell(ev) {
    let cell = ev.target.closest('td');
    if (cell) {
      let row = +cell.parentElement.getAttribute('data-row');
      let col = +cell.getAttribute('data-col');
      //a td was clicked so make it editable
      cell.contentEditable = true;
      cell.focus();
      let txt = cell.textContent;
      cell.addEventListener('keydown', function save(ev) {
        if (ev.key === 'Enter' || ev.code === 'Enter') {
          cell.contentEditable = false;
          cell.removeEventListener('keydown', save);
          APP.data[row][col] = cell.textContent;
          localStorage.setItem('data', JSON.stringify(APP.data)); // store data in localStorage
          console.table(APP.data);
        }
      });
      //listen for the enter key to end the editing
      //update the APP.data
    }
  },
  getColumnName(index) {
    const columns = ['Title', 'About', 'Link', 'Tag'];
    return columns[index];
  }
};

APP.init();
// Render permanent records grouped by Academic Year and Semester.
(function(){
  const defaultStudent = { id: 's123456', name: 'Juan Dela Cruz' };

  // sample records include academic year and semester so we can render per-semester tables
  const sampleRecords = [
    { ay: '2021-2022', semester: 'First Semester', section: '1A', subject: 'Math 101', units: 3, grade: '1.75', completion: 'Passed' },
    { ay: '2021-2022', semester: 'First Semester', section: '1A', subject: 'Eng 101', units: 3, grade: '2.00', completion: 'Passed' },
    { ay: '2021-2022', semester: 'Second Semester', section: '1B', subject: 'Sci 101', units: 4, grade: '2.50', completion: 'Passed' },
    { ay: '2022-2023', semester: 'First Semester', section: '2A', subject: 'Math 102', units: 3, grade: '3.00', completion: 'Passed' },
    { ay: '2023-2024', semester: 'First Semester', section: '3A', subject: 'CS 201', units: 3, grade: '1.50', completion: 'Passed' },
    { ay: '2024-2025', semester: 'Second Semester', section: '4A', subject: 'Thesis 1', units: 6, grade: '1.25', completion: 'Completed' }
  ];

  function getStudentFromStorage(){
    try{ const raw = localStorage.getItem('currentStudent'); return raw ? JSON.parse(raw) : null; }
    catch(e){ return null; }
  }

  // order semesters in natural academic order
  const semesterOrder = { 'First Semester': 1, 'Second Semester': 2, 'Summer': 3 };

  function groupRecords(records){
    const map = new Map();
    records.forEach(r => {
      const key = `${r.ay}||${r.semester}`;
      if(!map.has(key)) map.set(key, { ay: r.ay, semester: r.semester, items: [] });
      map.get(key).items.push(r);
    });
    // convert to array and sort by AY then semester
    const arr = Array.from(map.values());
    arr.sort((a,b)=>{
      if(a.ay !== b.ay) return a.ay.localeCompare(b.ay, undefined, {numeric:true});
      return (semesterOrder[a.semester] || 99) - (semesterOrder[b.semester] || 99);
    });
    return arr;
  }

  function createTableForGroup(group){
    const wrapper = document.createElement('div');
    wrapper.className = 'semester-sep';
    wrapper.style.marginTop = '1rem';

    const title = document.createElement('h3');
    title.textContent = `${group.ay} — ${group.semester}`;
    title.style.marginBottom = '0.5rem';
    wrapper.appendChild(title);

    const table = document.createElement('table');
    table.className = 'records-table';

    // define colgroup so columns align across multiple tables
    const colgroup = document.createElement('colgroup');
    const cols = [
      {cls:'group-no', w:'10rem'},
      {cls:'group-section', w:'13rem'},
      {cls:'group-subject', w:'10rem'},
      {cls:'group-units', w:'10rem'},
      {cls:'group-grade', w:'10rem'},
      {cls:'group-completion', w:'120px'}
    ];
    cols.forEach(c=>{
      const col = document.createElement('col');
      col.className = c.cls;
      if(c.w && c.w !== 'auto') col.style.width = c.w;
      colgroup.appendChild(col);
    });
    table.appendChild(colgroup);

    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>No.</th>
        <th>Section ID</th>
        <th>Subject</th>
        <th>Units</th>
        <th>Final Grade</th>
        <th>Completion</th>
      </tr>`;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    group.items.forEach((r, idx)=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx+1}</td>
        <td>${r.section}</td>
        <td>${r.subject}</td>
        <td>${r.units}</td>
        <td>${r.grade}</td>
        <td>${r.completion}</td>
      `;
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    wrapper.appendChild(table);
    return wrapper;
  }

  function render(){
    const s = getStudentFromStorage() || defaultStudent;
    const idEl = document.getElementById('pr-student-id');
    const nameEl = document.getElementById('pr-student-name');
    if(idEl) idEl.textContent = s.id || '-';
    if(nameEl) nameEl.textContent = s.name || '-';

    const container = document.getElementById('records-container');
    if(!container) return;
    container.innerHTML = '';

    const groups = groupRecords(sampleRecords);
    groups.forEach(g => {
      const tableEl = createTableForGroup(g);
      container.appendChild(tableEl);
    });

    // attach print handler to the page print button
    const printBtn = document.getElementById('print-records-btn');
    if(printBtn){
      printBtn.removeEventListener('click', window._prPrintHandler);
      window._prPrintHandler = ()=> window.print();
      printBtn.addEventListener('click', window._prPrintHandler);
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();

document.addEventListener('DOMContentLoaded', ()=>{
  const aySelect = document.getElementById('ay');
  const semSelect = document.getElementById('semester');
  const form = document.getElementById('grades-form');
  const preview = document.getElementById('grade-preview');
  const printBtn = document.getElementById('print-btn');

  // Populate academic years
  const now = new Date();
  const currentYear = now.getFullYear();
  const years = [];
  for(let i=0;i<6;i++){
    const start = currentYear - i - 1;
    const end = currentYear - i;
    years.push(`${start}-${end}`);
  }
  years.forEach(y=>{ const opt=document.createElement('option'); opt.value=y; opt.textContent=y; aySelect.appendChild(opt); });
  aySelect.selectedIndex = 0;

  // Mock grades data (replace with backend integration later)
  const mockGrades = [
    {code:'CS101',title:'Intro to Programming',units:3,grade:'A',numeric:95},
    {code:'MATH201',title:'Calculus II',units:4,grade:'B+',numeric:88},
    {code:'HIST110',title:'World History',units:3,grade:'A-',numeric:90}
  ];

  function computeGPA(items){
    // simple mapping A=4.0, A-=3.7, B+=3.3, B=3.0 etc (demo)
    const map = {'A':4.0,'A-':3.7,'B+':3.3,'B':3.0,'B-':2.7,'C+':2.3,'C':2.0,'D':1.0,'F':0};
    let points = 0, units=0;
    items.forEach(it=>{ const u=it.units||0; const p=map[it.grade]||((it.numeric||0)/25); points += (p*u); units+=u; });
    const gpa = units? (points/units):0; return {gpa:gpa.toFixed(2), units};
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const ay = aySelect.value; const sem = semSelect.value;

    // render preview with larger area
    const gpaData = computeGPA(mockGrades);
    let rows = '';
    mockGrades.forEach(g=>{
      rows += `<tr><td>${g.code}</td><td>${g.title}</td><td style="text-align:center">${g.units}</td><td style="text-align:center">${g.grade}</td></tr>`;
    });

    preview.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <h3 style="margin:0">Grade Slip</h3>
          <div class="muted">Academic Year: ${ay} • ${sem}</div>
        </div>
        <div style="text-align:right">
          <div class="muted">Units: ${gpaData.units}</div>
          <div><strong>GPA: ${gpaData.gpa}</strong></div>
        </div>
      </div>
      <hr style="margin:0.75rem 0">
      <table style="width:100%;border-collapse:collapse;margin-top:0.6rem">
        <thead class="muted"><tr><th style="text-align:left">Code</th><th style="text-align:left">Course</th><th style="width:60px">Units</th><th style="width:100px">Grade</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p class="muted" style="margin-top:0.75rem">This is a demonstration grade slip. Integration will pull actual grades from the SIS backend.</p>
    `;

    printBtn.style.display = 'inline-block';
  });

  printBtn.addEventListener('click', ()=> window.print());
});

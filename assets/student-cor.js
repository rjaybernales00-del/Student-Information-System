document.addEventListener('DOMContentLoaded', ()=>{
  const aySelect = document.getElementById('ay');
  const semSelect = document.getElementById('semester');
  const form = document.getElementById('cor-form');
  const preview = document.getElementById('cor-preview');
  const printBtn = document.getElementById('print-btn');

  // Populate academic years (last 6 years)
  const now = new Date();
  const currentYear = now.getFullYear();
  const years = [];
  for(let i=0;i<6;i++){
    const start = currentYear - i - 1;
    const end = currentYear - i;
    years.push(`${start}-${end}`);
  }
  years.forEach(y=>{
    const opt = document.createElement('option'); opt.value=y; opt.textContent=y; aySelect.appendChild(opt);
  });

  // Optionally preselect latest
  aySelect.selectedIndex = 0;

  // Use student mock data if available from student.js
  const studentData = window.studentData || null;

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const ay = aySelect.value;
    const sem = semSelect.value;

    // Build a simple COR preview
    const name = (studentData && studentData.name) ? studentData.name : document.getElementById('student-name') ? document.getElementById('student-name').textContent : 'Student Name';
    const id = (studentData && studentData.id) ? studentData.id : (document.getElementById('student-id') ? document.getElementById('student-id').textContent : 's000000');

    preview.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <h3 style="margin:0">Certificate of Registration</h3>
          <div class=\"muted\">Academic Year: ${ay} &nbsp; • &nbsp; ${sem}</div>
        </div>
        <div style="text-align:right">
          <div><strong>${name}</strong></div>
          <div class=\"muted\">ID: ${id}</div>
        </div>
      </div>
      <hr style=\"margin:0.75rem 0\">
      <p class=\"muted\">This is a generated preview of the Certificate of Registration. Once integrated with the backend it will list enrolled courses and official registration details.</p>
    `;

    preview.classList.remove('hidden');
    printBtn.style.display = 'inline-block';
  });

  printBtn.addEventListener('click', ()=>{
    window.print();
  });
});

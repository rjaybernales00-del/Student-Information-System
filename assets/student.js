document.addEventListener('DOMContentLoaded', ()=>{
  // Mock student data for demo — replace with real API calls later
  const student = {
    id: 's123456',
    name: 'Alex Johnson',
    email: 'alex.johnson@school.edu',
    major: 'Computer Science',
    year: 'Sophomore',
    gpa: 3.72,
    credits: 48,
    courses: [
      {code:'CS101', title:'Intro to Programming', instructor:'Dr. Smith'},
      {code:'MATH201', title:'Calculus II', instructor:'Prof. Lee'},
      {code:'HIST110', title:'World History', instructor:'Ms. Adams'}
    ],
    assignments: [
      {title:'Project Proposal', course:'CS101', due:'2025-12-20'},
      {title:'Homework 8', course:'MATH201', due:'2025-12-18'}
    ]
  };

  // Fill UI with safety checks (some elements may be absent)
  const el = id => document.getElementById(id);
  const setText = (id, text) => { const e = el(id); if(e) e.textContent = text; };
  setText('student-name', student.name);
  setText('student-id', student.id);
  setText('student-major', student.major);
  setText('student-year', student.year);
  setText('student-email', student.email);
  const gpaEl = el('gpa'); if(gpaEl) gpaEl.textContent = student.gpa.toFixed(2);
  const creditsEl = el('credits'); if(creditsEl) creditsEl.textContent = student.credits;

  const coursesList = el('courses-list');
  student.courses.forEach(c => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${c.code}</strong> — ${c.title}<div style="font-size:0.9rem;color:var(--muted)">Instructor: ${c.instructor}</div>`;
    coursesList.appendChild(li);
  });

  const assignmentsList = el('assignments-list');
  student.assignments.forEach(a => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${a.title}</strong> <div style="font-size:0.9rem;color:var(--muted)">${a.course} — due ${a.due}</div>`;
    assignmentsList.appendChild(li);
  });

  // Logout button
  const logout = document.getElementById('logout');
  if(logout){
    logout.addEventListener('click', ()=>{
      // In a real app, clear session and redirect to login
      window.location.href = '../index.html';
    });
  }

  // Header menu handled by assets/header.js (kept out of page-specific scripts)
});

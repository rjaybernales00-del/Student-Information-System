document.addEventListener('DOMContentLoaded', ()=>{
  // Mock teacher data — replace with API integration later
  const teacher = {
    id: 't1001',
    name: 'Dr. Emily Carter',
    dept: 'Computer Science',
    email: 'e.carter@school.edu',
    courses: [
      {id:'CS301', title:'Algorithms', term:'Spring 2026', students:[
        {id:'s123456',name:'Alex Johnson'},
        {id:'s234567',name:'Maya Cruz'}
      ]},
      {id:'CS410', title:'Software Engineering', term:'Spring 2026', students:[
        {id:'s345678',name:'Sam Lee'},
        {id:'s456789',name:'Priya Singh'}
      ]}
    ],
    recentSubmissions: [
      {student:'Alex Johnson', assignment:'Project Proposal', course:'CS301', date:'2025-12-10'},
      {student:'Maya Cruz', assignment:'Homework 7', course:'CS301', date:'2025-12-09'}
    ]
  };

  const setText = (id, text)=>{ const e=document.getElementById(id); if(e) e.textContent=text };
  setText('teacher-name', teacher.name);
  setText('teacher-id', teacher.id);
  setText('teacher-dept', teacher.dept);
  setText('teacher-email', teacher.email);

  // Populate courses managed
  const coursesList = document.getElementById('courses-managed-list');
  if(coursesList){
    teacher.courses.forEach(c =>{
      const li = document.createElement('li');
      li.innerHTML = `<button class="nav-link" data-course-id="${c.id}">${c.id} — ${c.title} <div class=\"muted\">${c.term}</div></button>`;
      coursesList.appendChild(li);
    });

    // click handler to show roster
    coursesList.addEventListener('click', (e)=>{
      const btn = e.target.closest('button[data-course-id]');
      if(!btn) return;
      const id = btn.getAttribute('data-course-id');
      const course = teacher.courses.find(x=>x.id===id);
      const roster = document.getElementById('class-roster');
      if(roster){
        roster.innerHTML = '';
        const ul = document.createElement('ul');
        ul.style.listStyle='none'; ul.style.padding='0';
        course.students.forEach(s=>{
          const li = document.createElement('li');
          li.style.padding='0.45rem 0';
          li.textContent = `${s.id} — ${s.name}`;
          ul.appendChild(li);
        });
        roster.appendChild(ul);
      }
    });
  }

  // Recent submissions
  const subs = document.getElementById('recent-submissions-list');
  if(subs){
    teacher.recentSubmissions.forEach(s=>{
      const li = document.createElement('li');
      li.style.padding='0.5rem 0';
      li.innerHTML = `<strong>${s.assignment}</strong><div class="muted">${s.student} — ${s.course} — ${s.date}</div>`;
      subs.appendChild(li);
    });
  }

  // Logout
  const logout = document.getElementById('logout');
  if(logout) logout.addEventListener('click', ()=> window.location.href = '../index.html');

  // Hamburger toggle (safe guards)
    // Header menu handled by assets/header.js (kept out of page-specific scripts)
});

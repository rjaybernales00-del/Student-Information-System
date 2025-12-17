// Global header menu toggle
(function(){
  function initHeader(){
    const wrappers = document.querySelectorAll('.menu-wrap');
    wrappers.forEach(wrap => {
      const toggle = wrap.querySelector('.nav-toggle');
      const dropdown = wrap.querySelector('.menu-dropdown');
      if(!toggle) return;
      toggle.addEventListener('click', (e)=>{
        e.stopPropagation();
        const isOpen = wrap.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
      });

      // Close on outside click
      document.addEventListener('click', (e)=>{
        if(!wrap.contains(e.target)){
          wrap.classList.remove('open');
          const t = wrap.querySelector('.nav-toggle');
          if(t) t.setAttribute('aria-expanded','false');
        }
      });

      // Close on Escape
      document.addEventListener('keydown', (e)=>{
        if(e.key === 'Escape'){
          wrap.classList.remove('open');
          const t = wrap.querySelector('.nav-toggle');
          if(t) t.setAttribute('aria-expanded','false');
        }
      });
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initHeader);
  else initHeader();
})();

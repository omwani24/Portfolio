const nav=document.querySelector('.nav'),menu=document.querySelector('.menu');
menu.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

// reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.style.animation='rise .7s ease both';io.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.skill-card,.timeline-item,.project-card,.cert-box,.contact-box,.facts div').forEach(el=>{el.style.opacity='0';io.observe(el)});

// scroll progress bar + active nav link
const bar=document.querySelector('.progress'),links=[...document.querySelectorAll('nav a')];
const secs=links.map(a=>document.querySelector(a.getAttribute('href')));
addEventListener('scroll',()=>{
  const h=document.documentElement;
  bar.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
  let cur=-1;secs.forEach((s,i)=>{if(s&&s.getBoundingClientRect().top<window.innerHeight*.4)cur=i});
  links.forEach((a,i)=>a.classList.toggle('active',i===cur));
},{passive:true});

// spotlight hover on skill cards
document.querySelectorAll('.skill-card').forEach(c=>c.addEventListener('pointermove',e=>{
  const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px');
}));

// typing effect in the hero terminal
if(!matchMedia('(prefers-reduced-motion:reduce)').matches){
  const lines=[...document.querySelectorAll('.terminal-body h3')];
  const full=lines.map(l=>l.textContent);lines.forEach(l=>l.textContent='');
  (async()=>{for(let i=0;i<lines.length;i++){for(const ch of full[i]){lines[i].textContent+=ch;await new Promise(r=>setTimeout(r,38))}await new Promise(r=>setTimeout(r,350))}})();
}

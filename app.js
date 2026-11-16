const progress=document.querySelector('.progress');
const plan=document.querySelector('.plan');
const planSteps=[...plan.querySelectorAll('li')];
const scenes=[...document.querySelectorAll('.explain-art,.hero-picture,.flow')];
const stages=[...document.querySelectorAll('.flow-step')];
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let current=0,playing=null,ticking=false;
function update(){
 const max=document.documentElement.scrollHeight-innerHeight;
 progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;
 let passed=0;
 planSteps.forEach(el=>{const yes=el.getBoundingClientRect().top<innerHeight*.75;el.classList.toggle('passed',yes);if(yes)passed++;});
 plan.style.setProperty('--plan-fill',String(passed/planSteps.length));
 let next=null,best=Infinity;
 if(!reduced.matches&&!document.hidden)scenes.forEach(el=>{const r=el.getBoundingClientRect();if(r.bottom>72&&r.top<innerHeight){const distance=Math.abs((r.top+r.bottom)/2-innerHeight*.52);if(distance<best){best=distance;next=el;}}});
 if(next!==playing){if(playing)playing.classList.remove('is-playing');playing=next;if(playing)playing.classList.add('is-playing');}
 ticking=false;
}
function schedule(){if(!ticking){requestAnimationFrame(update);ticking=true;}}
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);document.addEventListener('visibilitychange',schedule);reduced.addEventListener('change',schedule);
setInterval(()=>{if(playing&&playing.classList.contains('flow')&&!reduced.matches){stages[current].classList.remove('active');current=(current+1)%stages.length;stages[current].classList.add('active');}},2200);
update();

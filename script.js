(function(){
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header=document.querySelector('.site-header');
  window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>20),{passive:true});

  if(!reduce && window.gsap){
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.reveal').forEach((el)=>{
      gsap.to(el,{opacity:1,y:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}});
    });
    gsap.to('.character-hero',{y:-12,duration:2.5,ease:'sine.inOut',repeat:-1,yoyo:true});
    gsap.to('.hero-spark',{rotation:360,duration:12,ease:'none',repeat:-1,stagger:2});
    gsap.to('.lightning-orb',{y:-8,duration:2,ease:'sine.inOut',repeat:-1,yoyo:true});
    gsap.to('.speech',{y:-6,duration:2,ease:'sine.inOut',repeat:-1,yoyo:true});
  }else document.querySelectorAll('.reveal').forEach(el=>{el.style.opacity=1;el.style.transform='none'});

  const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');
  if(dot&&ring&&window.matchMedia('(pointer:fine)').matches){
    let mx=0,my=0,rx=0,ry=0;
    window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.opacity=1;ring.style.opacity=1},{passive:true});
    function tick(){rx+=(mx-rx)*.14;ry+=(my-ry)*.14;dot.style.left=mx+'px';dot.style.top=my+'px';ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(tick)} tick();
    document.querySelectorAll('a,.magnetic').forEach(el=>{
      el.addEventListener('mouseenter',()=>{ring.style.width='58px';ring.style.height='58px';ring.style.background='rgba(178,138,75,.08)';ring.style.borderColor='rgba(178,138,75,.6)'});
      el.addEventListener('mouseleave',()=>{ring.style.width='38px';ring.style.height='38px';ring.style.background='transparent';ring.style.borderColor='rgba(14,58,44,.45)'});
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const target=document.querySelector(a.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:reduce?'auto':'smooth'})}}));
})();

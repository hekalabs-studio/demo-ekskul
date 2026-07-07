// hero load animation
  window.addEventListener('load', ()=>{
    document.getElementById('titleWrap').parentElement.classList.add('anim-ready');
  });

  // parallax clouds
  const skyLayer = document.getElementById('skyLayer');
  const cloudCount = 6;
  for(let i=0;i<cloudCount;i++){
    const c = document.createElement('div');
    c.className='cloud';
    const w = 60 + Math.random()*50;
    c.style.width = w+'px';
    c.style.height = (w*0.35)+'px';
    c.style.top = (Math.random()*45)+'%';
    c.style.left = (Math.random()*100)+'%';
    c.style.borderRadius = '40px';
    c.dataset.speed = (0.3 + Math.random()*0.8).toFixed(2);
    skyLayer.appendChild(c);
  }
  let scrollY = 0;
  document.addEventListener('scroll', ()=>{
    scrollY = window.scrollY;
    document.querySelectorAll('.cloud').forEach(c=>{
      const speed = parseFloat(c.dataset.speed);
      c.style.transform = `translateX(${scrollY*speed*0.15}px)`;
    });
  });

  // ambient cloud drift
  document.querySelectorAll('.cloud').forEach((c,i)=>{
    let base = parseFloat(c.style.left);
    let dir = Math.random()>0.5?1:-1;
    setInterval(()=>{
      base += 0.02*dir;
      if(base>105) base=-10;
      if(base<-10) base=105;
      c.style.left = base+'%';
    }, 60);
  });

  // scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('in-view'); }
    });
  }, {threshold:.2});
  revealEls.forEach(el=>io.observe(el));

  // checklist staggered ticking
  const items = document.querySelectorAll('.check-list li');
  const io2 = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        items.forEach((li,idx)=>{
          setTimeout(()=> li.classList.add('in-view'), idx*180);
        });
        io2.disconnect();
      }
    });
  }, {threshold:.3});
  if(items.length) io2.observe(items[0].closest('.check-list'));

  // mouse parallax on grass blocks
  document.addEventListener('mousemove', (e)=>{
    const x = (e.clientX/window.innerWidth - .5);
    const y = (e.clientY/window.innerHeight - .5);
    document.querySelectorAll('.grass-block').forEach((b,i)=>{
      const depth = (i+1)*4;
      b.style.marginLeft = (x*depth)+'px';
      b.style.marginTop = (y*depth)+'px';
    });
  });
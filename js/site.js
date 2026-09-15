(function(){
 var THEME_KEY='theme';

 function currentTheme(){
  try{
   var t=localStorage.getItem(THEME_KEY);
   if(t==='light'||t==='dark') return t;
  }catch(e){}
  return 'system';
 }

 function applyTheme(mode){
  var root=document.documentElement;
  if(mode==='light'||mode==='dark'){
   root.setAttribute('data-theme',mode);
   try{localStorage.setItem(THEME_KEY,mode)}catch(e){}
  }else{
   root.removeAttribute('data-theme');
   try{localStorage.removeItem(THEME_KEY)}catch(e){}
   mode='system';
  }
  document.querySelectorAll('[data-theme-set]').forEach(function(btn){
   btn.setAttribute('aria-pressed',btn.getAttribute('data-theme-set')===mode?'true':'false');
  });
 }

 function initTheme(){
  applyTheme(currentTheme());
  var group=document.querySelector('.theme');
  if(!group) return;
  group.addEventListener('click',function(e){
   var btn=e.target.closest('[data-theme-set]');
   if(!btn) return;
   applyTheme(btn.getAttribute('data-theme-set'));
  });
 }

 function initDraw(){
  document.querySelectorAll('.draw').forEach(function(p){
   try{p.style.setProperty('--len',Math.ceil(p.getTotalLength()))}catch(e){}
  });
 }

 function initTips(){
  var tip=document.getElementById('tip');
  function show(el,x,y){
   tip.innerHTML='<b></b><span></span>';
   tip.firstChild.textContent=el.dataset.name;
   tip.lastChild.textContent=el.dataset.info;
   var w=tip.offsetWidth,h=tip.offsetHeight;
   var L=Math.min(x+16,window.innerWidth-w-10);
   var T=y+16+h>window.innerHeight?y-h-12:y+16;
   tip.style.left=Math.max(10,L)+'px';tip.style.top=T+'px';tip.style.opacity=1;
  }
  function hide(){tip.style.opacity=0}
  document.querySelectorAll('.node,.inode').forEach(function(el){
   el.addEventListener('mousemove',function(e){show(el,e.clientX,e.clientY)});
   el.addEventListener('mouseleave',hide);
   el.addEventListener('click',function(e){e.stopPropagation();show(el,e.clientX,e.clientY)});
   el.addEventListener('focus',function(){var r=el.getBoundingClientRect();show(el,r.right,r.top)});
   el.addEventListener('blur',hide);
  });
  document.addEventListener('click',hide);
 }

 function loadMaps(){
  var mounts=document.querySelectorAll('[data-map]');
  return Promise.all(Array.prototype.map.call(mounts,function(el){
   return fetch(el.getAttribute('data-map')).then(function(r){
    if(!r.ok) throw new Error('Failed to load '+el.getAttribute('data-map'));
    return r.text();
   }).then(function(svg){el.innerHTML=svg});
  }));
 }

 initTheme();
 loadMaps().then(function(){initDraw();initTips()}).catch(function(err){
  console.error(err);
 });
})();

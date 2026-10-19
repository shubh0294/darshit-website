(function(){var b=document.body,t=document.getElementById('tm');if(!t)return;var m='light';
try{m=localStorage.getItem('dg-mode')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');}catch(e){}
function set(x){m=x;b.dataset.m=x;t.setAttribute('aria-pressed',x=='dark');t.setAttribute('aria-label',x=='dark'?'Switch to light mode':'Switch to dark mode');t.querySelector('use').setAttribute('href',x=='dark'?'#i-sun':'#i-moon');}
set(m);t.onclick=function(){set(m=='dark'?'light':'dark');try{localStorage.setItem('dg-mode',m);}catch(e){}};})();

(function(){var f=document.getElementById('qf');if(!f)return;var m=document.getElementById('qmsg');
function v(i){return (document.getElementById(i).value||'').trim();}
function txt(){return ['New inquiry for Darshit Global Trade','Name: '+v('q-name'),'Company: '+v('q-co'),'Email: '+v('q-mail'),'Phone/WhatsApp: '+v('q-ph'),'Country: '+v('q-cn'),'Product: '+v('q-pr'),'Quantity: '+v('q-qt'),'Message: '+v('q-ms')].join('\n');}
function go(k){if(!f.reportValidity())return;var s=txt();
if(k=='wa'){m.textContent='Opening WhatsApp with your inquiry. Press Send there to deliver it.';var a=document.createElement('a');a.href='https://wa.me/917977607022?text='+encodeURIComponent(s);a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();a.remove();}
else{m.textContent='Opening your email app. Press Send there to deliver it.';location.href='mailto:exports@darshitglobal.com?subject='+encodeURIComponent('Inquiry from '+v('q-name')+' - '+v('q-pr'))+'&body='+encodeURIComponent(s);}}
document.getElementById('sendWa').onclick=function(){go('wa');};document.getElementById('sendMail').onclick=function(){go('mail');};
f.addEventListener('submit',function(e){e.preventDefault();go('wa');});})();

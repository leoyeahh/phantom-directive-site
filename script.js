const nav=document.querySelector('nav');
const menu=document.querySelector('.menu-toggle');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'×':'☰';});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰';}));
const files={
'001':{title:'FILE_001 // THE WATCHER',copy:'Every recovered frame contains the same shape. Metadata is missing. The oldest copy predates the first upload by 11 years. Is it an artifact—or a message?'},
'002':{title:'FILE_002 // DEAD CHANNEL',copy:'A signal keeps returning on a frequency that should be silent. The transmission contains no voice, only a sequence of timestamps. The final timestamp is tomorrow.'},
'003':{title:'FILE_003 // 404: REALITY',copy:'The error page was found in a cached directory that never existed. One line survived the corruption: “If you can read this, the archive has already read you.”'}
};
const dialog=document.querySelector('#file-dialog');
function inspect(id){const f=files[id];document.querySelector('#dialog-title').textContent=f.title;document.querySelector('#dialog-copy').textContent=f.copy;dialog.showModal();}
document.querySelectorAll('[data-file]').forEach(b=>b.addEventListener('click',()=>inspect(b.dataset.file)));
document.querySelectorAll('.file-card').forEach(card=>card.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target===card){e.preventDefault();inspect(card.querySelector('[data-file]').dataset.file)}}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
document.querySelector('#dialog-close-action').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
const toast=document.querySelector('#toast');let toastTimer;
function notify(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2800);}
document.querySelector('#copy-contract').addEventListener('click',async()=>{notify('TOKEN ADDRESS NOT SET — official details will be added after launch.');});
document.querySelector('#community-link').addEventListener('click',e=>{e.preventDefault();notify('COMMUNITY LINK NOT CONFIGURED YET. Follow the project launch updates.');});

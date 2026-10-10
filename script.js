const nav=document.querySelector('nav');
const menu=document.querySelector('.menu-toggle');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'×':'☰';});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰';}));
const files={
'001':{title:'FILE_001 // THE WATCHER',copy:'Every recovered frame contains the same shape. Metadata is missing. The oldest copy predates the first upload by 11 years. Is it an artifact—or a message?'},
'002':{title:'FILE_002 // DEAD CHANNEL',copy:'A signal keeps returning on a frequency that should be silent. The transmission contains no voice, only a sequence of timestamps. The final timestamp is tomorrow.'},
'003':{title:'FILE_003 // 404: REALITY',copy:'The error page was found in a cached directory that never existed. One line survived the corruption: “If you can read this, the archive has already read you.”'},
'004':{title:'FILE_004 // THE GHOST KEY',copy:'ACCESS GRANTED. The fourth file was hidden in plain sight. It contains one instruction: when the signal changes, do not assume it is speaking to you. Observe. Decode. Decide. End of recovered payload.'}
};
const dialog=document.querySelector('#file-dialog');
function inspect(id){const f=files[id];if(!f)return;document.querySelector('#dialog-title').textContent=f.title;document.querySelector('#dialog-copy').textContent=f.copy;dialog.showModal();}
document.querySelectorAll('[data-file]').forEach(b=>b.addEventListener('click',()=>inspect(b.dataset.file)));
document.querySelectorAll('.file-card').forEach(card=>card.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target===card){e.preventDefault();inspect(card.querySelector('[data-file]').dataset.file)}}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
document.querySelector('#dialog-close-action').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
const toast=document.querySelector('#toast');let toastTimer;
function notify(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),3000);}
// Links are real, while token details intentionally remain unset until confirmed.
document.querySelector('#copy-contract').addEventListener('click',()=>notify('NO TOKEN ADDRESS HAS BEEN VERIFIED. TRANSMISSION WITHHELD.'));
// Easter egg 1: decode the terminal transmission.
const decodeButton=document.querySelector('#decode-signal');let decodeCount=0;
const terminalBody=document.querySelector('.terminal-body');
decodeButton.addEventListener('click',()=>{
  decodeCount++;
  if(decodeCount===1){terminalBody.innerHTML='<p><span class="terminal-green">root@phantom</span>:~$ decode --fragment=001</p><p class="terminal-dim">Decrypting recovered payload...</p><p class="terminal-green">THE KEY IS REPETITION.</p><p class="terminal-purple">Try the word: PHANTOM</p><p class="terminal-cursor">_</p>';notify('FRAGMENT DECODED // INPUT CHANNEL OPEN');}
  else if(decodeCount===2){terminalBody.innerHTML='<p><span class="terminal-green">root@phantom</span>:~$ listen --deep</p><p class="terminal-dim">Signal layer 02 recovered...</p><p class="terminal-green">THE ARCHIVE REMEMBERS.</p><p class="terminal-purple">Not every door is visible.</p><p class="terminal-cursor">_</p>';notify('SECONDARY SIGNAL DETECTED');}
  else {unlockSecret('TERMINAL');terminalBody.innerHTML='<p><span class="terminal-green">root@phantom</span>:~$ root --override</p><p class="terminal-green">ACCESS GRANTED // FILE_004 UNSEALED</p><p class="terminal-purple">You were paying attention.</p><p class="terminal-cursor">_</p>';}
});
function unlockSecret(source){document.body.classList.add('breach-mode');document.querySelector('#hidden-signal').classList.add('revealed');notify('SECRET FILE UNLOCKED // SOURCE: '+source);setTimeout(()=>inspect('004'),450);}
// Easter egg 2: type PHANTOM anywhere on the page.
let typed='';document.addEventListener('keydown',e=>{
  if(e.key.length===1 && !e.ctrlKey && !e.metaKey && !e.altKey && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){
    typed=(typed+e.key.toLowerCase()).slice(-7);
    if(typed==='phantom') {typed='';unlockSecret('KEYWORD');}
  }
});
// Easter egg 3: tap the coordinates 5 times, or the brand mark 7 times.
let coordinateTaps=0,brandTaps=0;
document.querySelector('#coordinates-trigger').addEventListener('click',()=>{coordinateTaps++;if(coordinateTaps>=5){coordinateTaps=0;unlockSecret('COORDINATES');}else notify('COORDINATE TRACE '+coordinateTaps+'/5 // KEEP SCANNING');});
document.querySelectorAll('.brand').forEach(el=>el.addEventListener('click',e=>{brandTaps++;if(brandTaps>=7){e.preventDefault();brandTaps=0;unlockSecret('BRAND MARK');}}));
// Easter egg 4: classic up-up-down-down-left-right-left-right sequence.
const sequence=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight'];let sequenceIndex=0;
document.addEventListener('keydown',e=>{if(e.key===sequence[sequenceIndex]){sequenceIndex++;if(sequenceIndex===sequence.length){sequenceIndex=0;unlockSecret('LEGACY INPUT');}}else sequenceIndex=e.key===sequence[0]?1:0;});


// Halloween launch countdown: 31 Oct 2026, 20:00 CET (15:00 New York).
(function(){
  const root=document.querySelector('#launch-countdown');
  if(!root)return;
  const target=new Date(root.dataset.target).getTime();
  const fields={days:document.querySelector('#count-days'),hours:document.querySelector('#count-hours'),minutes:document.querySelector('#count-minutes'),seconds:document.querySelector('#count-seconds')};
  function update(){
    let diff=Math.max(0,target-Date.now());
    const days=Math.floor(diff/86400000); diff%=86400000;
    const hours=Math.floor(diff/3600000); diff%=3600000;
    const minutes=Math.floor(diff/60000); diff%=60000;
    const seconds=Math.floor(diff/1000);
    fields.days.textContent=String(days).padStart(2,'0');
    fields.hours.textContent=String(hours).padStart(2,'0');
    fields.minutes.textContent=String(minutes).padStart(2,'0');
    fields.seconds.textContent=String(seconds).padStart(2,'0');
    if(target-Date.now()<=0){
      root.setAttribute('aria-label','Scheduled launch time reached');
      const label=document.querySelector('.countdown-label'); if(label)label.textContent='SCHEDULED LAUNCH TIME REACHED';
    }
  }
  update();setInterval(update,1000);
})();

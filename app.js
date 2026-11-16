'use strict';

const PRESETS = [
  {id:'calm',name:'Calm Flow',description:'A slower, steady moment for everyday calm.',short:'Ease into a calmer rhythm.',inhale:4,hold:2,exhale:6,rest:0,duration:5,accent:'#6FAE98',glow:'#E4F4EB'},
  {id:'focus',name:'Clear Focus',description:'A balanced pause to recenter your attention.',short:'Return your attention to the present.',inhale:4,hold:2,exhale:4,rest:0,duration:7,accent:'#87AFC3',glow:'#EBF4F5'},
  {id:'evening',name:'Evening Ease',description:'A gentle wind-down before your evening rest.',short:'Slow down before your evening rest.',inhale:4,hold:4,exhale:8,rest:0,duration:10,accent:'#91A79F',glow:'#EBF0ED'},
  {id:'morning',name:'Morning Reset',description:'A fresh start to your morning routine.',short:'Begin again with intention.',inhale:5,hold:2,exhale:5,rest:0,duration:6,accent:'#D7B783',glow:'#FAF4E7'},
  {id:'balanced',name:'Balanced Breath',description:'An even, four-part breathing rhythm.',short:'Find balance in four gentle steps.',inhale:4,hold:4,exhale:4,rest:4,duration:5,accent:'#83B9A2',glow:'#EAF5EE'},
  {id:'gentle',name:'Gentle Release',description:'Let a longer exhale invite a quieter pause.',short:'Make space for a longer exhale.',inhale:3,hold:2,exhale:6,rest:0,duration:5,accent:'#B3AECD',glow:'#F0ECF8'},
  {id:'stillness',name:'Deep Stillness',description:'Move slowly through a spacious breathing pattern.',short:'Create a little space to be still.',inhale:5,hold:5,exhale:7,rest:0,duration:8,accent:'#73B8AE',glow:'#E8F5F1'},
  {id:'quiet',name:'Quiet Rhythm',description:'A simple in-and-out breathing practice.',short:'Stay with a simple, quiet rhythm.',inhale:4,hold:0,exhale:6,rest:0,duration:6,accent:'#A7BA9D',glow:'#F0F6E8'}
];

// Translation affects only displayed copy. Existing localStorage keys and saved sessions remain unchanged.
const LANG = document.documentElement.lang === 'id' ? 'id' : 'en';
const ID_COPY = {
  minute:'menit',minutes:'menit',session:'sesi',sessions:'sesi',custom:'Kustom',practice:'LATIHAN',min:'MENIT',
  customDesc:'Pola pernapasan buatan Anda.',usePattern:'Gunakan pola',delete:'Hapus',deleteAsk:'Hapus pola tersimpan',deleted:'Pola khusus dihapus.',
  ready:'SIAP',readyWhen:'SIAP KAPAN SAJA',comfortable:'Cari posisi yang nyaman',gentleStart:'Momen tenang dimulai di sini.',
  start:'Mulai sesi',pause:'Jeda',resume:'Lanjutkan',end:'Akhiri sesi',
  INHALE:'TARIK NAPAS',HOLD:'TAHAN',EXHALE:'HEMBUSKAN',REST:'ISTIRAHAT',
  hintINHALE:'Tarik napas perlahan',hintHOLD:'Tahan hanya jika nyaman',hintEXHALE:'Hembuskan napas perlahan',hintREST:'Kembali ke ritme napas alami',
  phasePace:'sesuai ritme nyaman Anda.',cycle:'SIKLUS',paused:'Dijeda. Nikmati waktu Anda.',pausedHint:'Lanjutkan kapan pun Anda siap',
  ended:'Sesi diakhiri. Sesi yang belum selesai tidak dihitung.',completed:'SELESAI',completeHint:'Terima kasih telah meluangkan waktu',completeStatus:'Bagus! Sesi Anda selesai.',completeCycle:'SESI SELESAI',completeToast:'Sesi selesai! Progres tersimpan secara lokal.',
  started:'dimulai.',storageFail:'Penyimpanan browser tidak tersedia. Perubahan mungkin tidak tersimpan.',
  weekDays:['Sen','Sel','Rab','Kam','Jum','Sab','Min'],weekEmpty:'Belum ada sesi. Momen tenang pertama Anda menanti.',
  invalid:'Masukkan nama dan pengaturan waktu pernapasan yang valid.',limit:'Anda dapat menyimpan hingga 30 pola di browser ini.',saved:'Pola khusus disimpan di browser ini.',
  patternSelect:'Pilih', deleting:'Hapus',
  preset:{
    calm:{name:'Calm Flow',description:'Ritme perlahan dan stabil untuk ketenangan sehari-hari.',short:'Masuki ritme yang lebih tenang.'},
    focus:{name:'Clear Focus',description:'Jeda seimbang untuk kembali memusatkan perhatian.',short:'Arahkan perhatian ke momen saat ini.'},
    evening:{name:'Evening Ease',description:'Ritme lembut untuk bersantai menjelang malam.',short:'Perlambat ritme sebelum beristirahat.'},
    morning:{name:'Morning Reset',description:'Awal yang segar untuk rutinitas pagi Anda.',short:'Mulai hari dengan niat yang baik.'},
    balanced:{name:'Balanced Breath',description:'Ritme pernapasan seimbang dalam empat fase.',short:'Temukan keseimbangan dalam empat langkah.'},
    gentle:{name:'Gentle Release',description:'Hembusan lebih panjang untuk memberi ruang pada ketenangan.',short:'Luangkan waktu dengan hembusan lebih panjang.'},
    stillness:{name:'Deep Stillness',description:'Ikuti pola pernapasan yang lapang dan perlahan.',short:'Ciptakan ruang sejenak untuk diam.'},
    quiet:{name:'Quiet Rhythm',description:'Latihan sederhana dengan tarikan dan hembusan napas.',short:'Ikuti ritme sederhana dan tenang.'}
  }
};
function msg(key){return LANG === 'id' ? (ID_COPY[key] ?? key) : key;}
function displayName(p){return LANG === 'id' && ID_COPY.preset[p.id] ? ID_COPY.preset[p.id].name : p.name;}
function displayDesc(p,kind='description'){
  if (LANG !== 'id') return p[kind];
  return ID_COPY.preset[p.id]?.[kind] || (p.id.startsWith('custom-') ? ID_COPY.customDesc : p[kind]);
}
function displayHistoryName(name){
  const preset=PRESETS.find(item=>item.name===name);return preset?displayName(preset):name;
}

const STORAGE = {custom:'wnb_custom_patterns_v1',history:'wnb_web_sessions_v1'};
// Optional voice/audio consumers subscribe to breathing lifecycle events.
function emitBreath(type, detail={}){window.dispatchEvent(new CustomEvent('wnb:breath',{detail:{type,...detail}}));}
const $ = id => document.getElementById(id);
const select = $('practiceSelect');
const startButton = $('startButton');
const pauseButton = $('pauseButton');
const endButton = $('endButton');
const phaseText = $('phaseText');
const phaseSeconds = $('phaseSeconds');
const phaseHint = $('phaseHint');
const statusText = $('stageStatus');
let custom = loadArray(STORAGE.custom);
let history = loadArray(STORAGE.history).filter(item => item && typeof item.date==='string' && Number.isFinite(item.duration));
let selectedId = 'calm';
let session = null;
let toastTimer;

function loadArray(key){
  try { const value = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(value) ? value : []; }
  catch { return []; }
}
function saveArray(key,value){
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch { toast(LANG==='id'?msg('storageFail'):'Browser storage is unavailable. Your changes may not be saved.'); return false; }
}
function toast(message){
  const el = $('toast'); el.textContent = message;el.classList.add('is-visible');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('is-visible'),3500);
}
function pad(n){return String(n).padStart(2,'0');}
function formatTime(seconds){const value=Math.max(0,Math.ceil(seconds));return `${pad(Math.floor(value/60))}:${pad(value%60)}`;}
function durationLabel(min){return `${min} ${LANG==='id'?msg('minutes'):(min===1?'minute':'minutes')}`;}
function patternLabel(p){return [p.inhale,p.hold,p.exhale,p.rest].filter((v,i) => i===0 || i===2 || v>0).join(' · ');}
function allPatterns(){return [...PRESETS,...custom];}
function getPattern(id){return allPatterns().find(p => p.id===id) || PRESETS[0];}
function dateKey(date){return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;}
function localDay(offset=0){const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+offset);return dateKey(d);}
function setOrb(scale){const value=Math.max(.65,Math.min(1.08,scale));$('breathVisual').style.setProperty('--breath-scale',String(value));}
function scrollToStudio(){ $('studio').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}); }

function renderPresetCards(){
  const grid = $('practiceGrid');
  grid.innerHTML='';
  PRESETS.forEach((p,index)=>{
    const article=document.createElement('article');article.className='practice-card';
    article.style.setProperty('--practice-accent',p.accent);
    article.style.setProperty('--practice-glow',p.glow);
    article.innerHTML=`<div class="practice-top"><span class="practice-num">${LANG==='id'?msg('practice'):'PRACTICE'} ${pad(index+1)}</span><span class="practice-art" aria-hidden="true"></span></div><div><h3></h3><p></p><div class="practice-end"><span></span><button class="practice-start" type="button" aria-label="Choose ${p.name}">↗</button></div></div>`;
    article.querySelector('h3').textContent=displayName(p);
    article.querySelector('p').textContent=displayDesc(p,'short');
    article.querySelector('.practice-end span').textContent=`${patternLabel(p)}  /  ${p.duration} ${LANG==='id'?msg('min'):'MIN'}`;
    article.querySelector('button').setAttribute('aria-label',`${LANG==='id'?msg('patternSelect'):'Choose'} ${displayName(p)}`);
    article.querySelector('button').addEventListener('click',()=>{choosePattern(p.id);scrollToStudio();});
    grid.appendChild(article);
  });
}
function renderSelector(){
  select.innerHTML='';
  allPatterns().forEach(p=>{const option=document.createElement('option');option.value=p.id;option.textContent=displayName(p)+(p.id.startsWith('custom-')?` (${LANG==='id'?msg('custom'):'Custom'})`:'');select.appendChild(option);});
  if(!allPatterns().some(p=>p.id===selectedId)) selectedId='calm';
  select.value=selectedId;
  renderPatternDetail();
  renderCustomCards();
}
function renderPatternDetail(){
  const p=getPattern(selectedId);
  $('patternText').textContent=patternLabel(p);
  $('patternDescription').textContent=displayDesc(p);
  $('durationText').textContent=durationLabel(p.duration);
  if(!session)$('remainingText').textContent=formatTime(p.duration*60);
}
function choosePattern(id){
  if(session){endSession(false);}
  selectedId=id; select.value=id; renderPatternDetail();
  statusText.textContent=LANG==='id'?msg('gentleStart'):'A gentle moment starts here.';
  phaseText.textContent=LANG==='id'?msg('ready'):'READY';phaseSeconds.textContent='✦';phaseHint.textContent=LANG==='id'?msg('comfortable'):'Find a comfortable position';
  $('cycleCounter').textContent=LANG==='id'?msg('readyWhen'):'READY WHEN YOU ARE';setOrb(.75);
}
function renderCustomCards(){
  const el=$('customPatterns');el.innerHTML='';
  custom.forEach(p=>{
    const card=document.createElement('div');card.className='custom-card';
    const title=document.createElement('strong');title.textContent=p.name;
    const details=document.createElement('small');details.textContent=`${patternLabel(p)} · ${p.duration} min`;
    const actions=document.createElement('div');actions.className='custom-card-actions';
    const use=document.createElement('button');use.type='button';use.textContent=LANG==='id'?msg('usePattern'):'Use pattern';use.addEventListener('click',()=>{choosePattern(p.id);scrollToStudio();});
    const del=document.createElement('button');del.type='button';del.textContent=LANG==='id'?msg('delete'):'Delete';del.className='delete-custom';del.setAttribute('aria-label',`${LANG==='id'?msg('delete'):'Delete'} ${p.name}`);
    del.addEventListener('click',()=>{
      if(!confirm(LANG==='id'?`${msg('deleteAsk')} "${p.name}"?`:`Delete your saved pattern "${p.name}"?`))return;
      custom=custom.filter(item=>item.id!==p.id);saveArray(STORAGE.custom,custom);
      if(selectedId===p.id)choosePattern('calm');renderSelector();toast(LANG==='id'?msg('deleted'):'Custom pattern deleted.');
    });
    actions.append(use,del);card.append(title,details,actions);el.appendChild(card);
  });
}

function setControls(){
  const active=Boolean(session);
  startButton.disabled=active;
  pauseButton.disabled=!active;
  endButton.disabled=!active;
  select.disabled=active;
  pauseButton.textContent=session && session.paused?(LANG==='id'?msg('resume'):'Resume'):(LANG==='id'?msg('pause'):'Pause');
}
function phasesFor(p){return [
  {name:'INHALE',hint:'Breathe in gently',duration:p.inhale},
  {name:'HOLD',hint:'Pause only if comfortable',duration:p.hold},
  {name:'EXHALE',hint:'Let your breath out slowly',duration:p.exhale},
  {name:'REST',hint:'Return to your natural rhythm',duration:p.rest}
].filter(phase=>phase.duration>0);}
function currentElapsed(){return !session?0:(session.elapsed + (session.paused?0:(performance.now()-session.startedAt)/1000));}
function startSession(){
  if(session)return;
  const pattern={...getPattern(selectedId)};
  const phaseList=phasesFor(pattern);
  const cycleLength=phaseList.reduce((total,p)=>total+p.duration,0);
  if(cycleLength<=0)return;
  session={pattern,phaseList,cycleLength,elapsed:0,startedAt:performance.now(),paused:false,raf:0,lastPhase:''};
  emitBreath('started',{pattern:pattern.name});setControls();updateSession();toast(`${displayName(pattern)} ${LANG==='id'?msg('started'):'has started.'}`);
}
function updateSession(){
  if(!session || session.paused)return;
  const s=session;const totalSeconds=s.pattern.duration*60;
  const elapsed=Math.min(totalSeconds,currentElapsed());
  if(elapsed>=totalSeconds){completeSession();return;}
  const cycleTime=elapsed%s.cycleLength;
  let end=0;let start=0;let current=s.phaseList[s.phaseList.length-1];
  for(const phase of s.phaseList){start=end;end+=phase.duration;if(cycleTime<end){current=phase;break;}}
  const phaseFraction=Math.min(1,Math.max(0,(cycleTime-start)/current.duration));
  let scale=.73;
  if(current.name==='INHALE')scale=.73+.32*phaseFraction;
  if(current.name==='HOLD')scale=1.05;
  if(current.name==='EXHALE')scale=1.05-.32*phaseFraction;
  if(current.name==='REST')scale=.73;
  setOrb(scale);
  phaseText.textContent=LANG==='id'?msg(current.name):current.name;
  phaseSeconds.textContent=String(Math.max(1,Math.ceil(end-cycleTime)));
  phaseHint.textContent=LANG==='id'?msg('hint'+current.name):current.hint;
  if(s.lastPhase!==current.name){s.lastPhase=current.name;emitBreath('phase',{phase:current.name,duration:current.duration});statusText.textContent=LANG==='id'?`${msg(current.name)} ${msg('phasePace')}`:`${current.name.charAt(0)}${current.name.slice(1).toLowerCase()} at your own pace.`;}
  $('remainingText').textContent=formatTime(totalSeconds-elapsed);
  $('cycleCounter').textContent=`${LANG==='id'?msg('cycle'):'CYCLE'} ${Math.floor(elapsed/s.cycleLength)+1}`;
  const percent=(elapsed/totalSeconds)*100;
  $('progressFill').style.width=`${percent}%`;
  $('progressTrack').setAttribute('aria-valuenow',String(Math.round(percent)));
  s.raf=requestAnimationFrame(updateSession);
}
function togglePause(){
  if(!session)return;
  if(!session.paused){
    session.elapsed=currentElapsed();session.paused=true;cancelAnimationFrame(session.raf);
    emitBreath('paused');statusText.textContent=LANG==='id'?msg('paused'):'Paused. Take your time.';
    phaseText.textContent=LANG==='id'?'DIJEDA':'PAUSED';phaseHint.textContent=LANG==='id'?msg('pausedHint'):'Resume whenever you are ready';
  }else{
    session.paused=false;session.startedAt=performance.now();session.lastPhase='';updateSession();
  }
  setControls();
}
function endSession(showMessage=true){
  if(!session)return;
  cancelAnimationFrame(session.raf);session=null;emitBreath('ended');setControls();
  phaseText.textContent=LANG==='id'?msg('ready'):'READY';phaseSeconds.textContent='✦';phaseHint.textContent=LANG==='id'?msg('comfortable'):'Find a comfortable position';
  statusText.textContent=LANG==='id'?msg('gentleStart'):'A gentle moment starts here.';
  $('cycleCounter').textContent=LANG==='id'?msg('readyWhen'):'READY WHEN YOU ARE';
  $('progressFill').style.width='0%';$('progressTrack').setAttribute('aria-valuenow','0');
  $('remainingText').textContent=formatTime(getPattern(selectedId).duration*60);setOrb(.75);
  if(showMessage)toast(LANG==='id'?msg('ended'):'Session ended. Incomplete sessions are not counted.');
}
function completeSession(){
  if(!session)return;
  const completed={date:dateKey(new Date()),timestamp:Date.now(),name:session.pattern.name,duration:session.pattern.duration};
  cancelAnimationFrame(session.raf);session=null;emitBreath('completed');
  history.unshift(completed);history=history.slice(0,300);saveArray(STORAGE.history,history);
  renderProgress();setControls();setOrb(.77);
  phaseText.textContent=LANG==='id'?msg('completed'):'COMPLETE';phaseSeconds.textContent='✓';phaseHint.textContent=LANG==='id'?msg('completeHint'):'Thank you for taking this moment';
  statusText.textContent=LANG==='id'?msg('completeStatus'):'Well done. Your session is complete.';
  $('cycleCounter').textContent=LANG==='id'?msg('completeCycle'):'SESSION COMPLETE';$('remainingText').textContent='00:00';
  $('progressFill').style.width='100%';$('progressTrack').setAttribute('aria-valuenow','100');
  toast(LANG==='id'?msg('completeToast'):'Session complete! Your progress was saved locally.');
}
function renderProgress(){
  const minutes=history.reduce((sum,h)=>sum+h.duration,0);
  $('statSessions').textContent=String(history.length);
  $('statMinutes').textContent=String(minutes);
  const unique=new Set(history.map(h=>h.date));
  let offset=unique.has(localDay())?0:-1;let streak=0;
  while(unique.has(localDay(offset))){streak++;offset--;if(streak>4000)break;}
  $('statStreak').textContent=String(streak);
  const now=new Date();const day=(now.getDay()+6)%7;
  const monday=new Date(now.getFullYear(),now.getMonth(),now.getDate()-day,12);
  const days=Array.from({length:7},(_,i)=>{const d=new Date(monday);d.setDate(monday.getDate()+i);return d;});
  const counts=days.map(d=>history.filter(h=>h.date===dateKey(d)).length);
  const weekTotal=counts.reduce((sum,c)=>sum+c,0);
  $('statThisWeek').textContent=`${weekTotal} ${LANG==='id'?msg('sessions'):(weekTotal===1?'session':'sessions')}`;
  const weekly=$('weekBars');weekly.innerHTML='';
  const max=Math.max(...counts,1);const names=LANG==='id'?msg('weekDays'):['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  counts.forEach((n,i)=>{
    const el=document.createElement('div');el.className='week-bar';
    el.setAttribute('aria-label',`${names[i]}: ${n} ${LANG==='id'?msg('sessions'):(n===1?'session':'sessions')}`);
    const rail=document.createElement('div');rail.className='week-bar-rail';
    const fill=document.createElement('div');fill.className='week-bar-fill';fill.style.height=`${n===0?0:Math.max(13,(n/max)*100)}%`;
    const name=document.createElement('small');name.textContent=names[i];rail.appendChild(fill);el.append(rail,name);weekly.appendChild(el);
  });
  const recent=$('recentSessions');recent.innerHTML='';
  if(!history.length){const p=document.createElement('p');p.textContent=LANG==='id'?msg('weekEmpty'):'No sessions yet. Your first quiet moment awaits.';recent.appendChild(p);}
  else history.slice(0,4).forEach(item=>{
    const row=document.createElement('div');row.className='recent-row';
    const name=document.createElement('strong');name.textContent=displayHistoryName(item.name);
    const date=document.createElement('span');date.textContent=`${item.duration} min · ${item.date}`;
    row.append(name,date);recent.appendChild(row);
  });
}

const ARTICLES={
 one:{category:'BREATHING · 3 MIN READ',title:'Begin with just one breath',body:`<p>When your day is moving quickly, you don’t always need an elaborate routine. Sometimes a single mindful breath is enough to notice where you are.</p><h3>Make room for a pause</h3><p>Sit or stand comfortably. Let your shoulders soften. Notice the natural rhythm of your breath without trying to change it. After a moment, allow your next inhale and exhale to feel unhurried.</p><h3>Keep it uncomplicated</h3><p>A breathing practice is not a test. You can return to your usual breathing whenever you wish. There’s no need to force deeper breaths or hold longer than feels comfortable.</p><p>Little moments can become familiar rituals. You may choose to take one mindful breath when you begin work, before a meal, or after closing your laptop.</p>`},
 two:{category:'MINDFULNESS · 3 MIN READ',title:'How to make space in a busy day',body:`<p>A full schedule can make rest feel like something we have to earn. But small pauses can be part of an ordinary day rather than an event we wait for.</p><h3>Notice a natural transition</h3><p>Choose a moment that already exists: after getting up, between tasks, or before heading outside. Put your feet on the ground and notice the sounds around you.</p><h3>Choose one gentle cue</h3><p>Maybe you loosen your hands, look away from the screen, or take an easy breath. Repeating one simple cue may help you remember to pause.</p><p>Keep your practice flexible. On some days you may have five minutes, and on others just ten seconds. Both can be worthwhile moments of awareness.</p>`},
 three:{category:'EVENING ROUTINE · 2 MIN READ',title:'A gentler end to the day',body:`<p>An evening routine need not be perfectly timed or complicated. Think of it as a familiar sequence that marks the transition from doing to resting.</p><h3>Lower the pace</h3><p>Try dimming a bright light, putting your phone aside for a moment, or listening to the quieter sounds of your room. Create a space that feels comfortable to you.</p><h3>Let your breathing stay easy</h3><p>If you enjoy a guided exercise, choose a gentle pattern and avoid any breath-holds that cause strain. You can always simply observe your natural breathing.</p><p>Explore what works for your circumstances. The purpose is a peaceful pre-sleep ritual, not a promise about how quickly you will fall asleep.</p>`}
};

const ARTICLES_ID = {
 one:{category:'PERNAPASAN · BACA 3 MENIT',title:'Mulai dari satu tarikan napas',body:`<p>Saat hari terasa begitu cepat, Anda tidak selalu membutuhkan rutinitas yang panjang. Terkadang, satu napas penuh kesadaran cukup untuk membantu menyadari keadaan saat ini.</p><h3>Beri ruang untuk jeda</h3><p>Duduk atau berdirilah dengan nyaman. Rilekskan bahu dan perhatikan ritme alami napas tanpa berusaha mengubahnya. Setelah sejenak, biarkan tarikan dan hembusan berikutnya terasa lebih santai.</p><h3>Tetap sederhana</h3><p>Latihan pernapasan bukan ujian. Anda dapat kembali ke pola napas biasa kapan saja. Tidak perlu memaksakan tarikan yang lebih dalam atau menahan napas lebih lama daripada yang nyaman.</p><p>Momen kecil dapat menjadi ritual yang akrab. Cobalah satu napas sadar saat mulai bekerja, sebelum makan, atau setelah menutup laptop.</p>`},
 two:{category:'KESADARAN PENUH · BACA 3 MENIT',title:'Menciptakan ruang di tengah kesibukan',body:`<p>Jadwal yang padat kadang membuat istirahat terasa seperti sesuatu yang harus diperjuangkan. Padahal, jeda kecil dapat menjadi bagian dari hari biasa.</p><h3>Kenali momen peralihan</h3><p>Pilih waktu yang sudah ada: setelah bangun, di antara pekerjaan, atau sebelum keluar rumah. Rasakan telapak kaki menyentuh lantai dan dengarkan suara di sekitar Anda.</p><h3>Pilih satu pengingat lembut</h3><p>Mungkin Anda melemaskan tangan, mengalihkan pandangan dari layar, atau mengambil satu napas yang nyaman. Mengulangi isyarat sederhana dapat membantu Anda mengingat untuk berhenti sejenak.</p><p>Biarkan latihan tetap fleksibel. Ada hari ketika Anda punya lima menit, dan ada hari ketika hanya tersedia sepuluh detik. Keduanya tetap dapat menjadi momen sadar yang bermakna.</p>`},
 three:{category:'RUTINITAS MALAM · BACA 2 MENIT',title:'Menutup hari dengan lebih tenang',body:`<p>Rutinitas malam tidak harus sempurna atau rumit. Anggaplah sebagai urutan kebiasaan yang menandai peralihan dari aktivitas menuju istirahat.</p><h3>Perlambat suasana</h3><p>Cobalah meredupkan lampu terang, menjauhkan ponsel sejenak, atau mendengarkan suara yang lebih lembut di sekitar Anda. Ciptakan ruang yang terasa nyaman.</p><h3>Bernapas senyaman mungkin</h3><p>Jika menyukai latihan terpandu, pilih pola yang lembut dan hindari menahan napas sampai terasa berat. Anda juga boleh sekadar memperhatikan napas alami.</p><p>Temukan pendekatan yang cocok dengan keadaan Anda. Tujuannya adalah ritual sebelum tidur yang damai, bukan janji akan tertidur lebih cepat.</p>`}
};

function openArticle(id){
  const article=(LANG==='id'?ARTICLES_ID:ARTICLES)[id];if(!article)return;
  const parent=$('articleContent');parent.innerHTML='';
  const meta=document.createElement('div');meta.className='article-meta';meta.textContent=article.category;
  const title=document.createElement('h2');title.textContent=article.title;
  const body=document.createElement('div');body.innerHTML=article.body;
  parent.append(meta,title,body);$('articleDialog').showModal();
}
function setupDialogs(){
  const dialog=$('customDialog');
  $('customOpen').addEventListener('click',()=>dialog.showModal());
  $('customClose').addEventListener('click',()=>dialog.close());
  $('customCancel').addEventListener('click',()=>dialog.close());
  $('customForm').addEventListener('submit',event=>{
    event.preventDefault();const data=new FormData(event.currentTarget);
    const name=String(data.get('patternName')||'').trim();
    const value=key=>Number(data.get(key));
    const pattern={id:`custom-${Date.now()}-${Math.floor(Math.random()*100000)}`,name,description:LANG==='id'?msg('customDesc'):'A breathing rhythm created by you.',inhale:value('inhale'),hold:value('hold'),exhale:value('exhale'),rest:value('rest'),duration:value('duration')};
    if(!name||name.length>40||!Number.isInteger(pattern.duration)||pattern.duration<1||pattern.duration>60||
      ['inhale','exhale'].some(k=>!Number.isInteger(pattern[k])||pattern[k]<1||pattern[k]>20)||
      ['hold','rest'].some(k=>!Number.isInteger(pattern[k])||pattern[k]<0||pattern[k]>20)){
        toast(LANG==='id'?msg('invalid'):'Please enter a name and valid breathing times.');return;
    }
    if(custom.length>=30){toast(LANG==='id'?msg('limit'):'You can save up to 30 patterns in this browser.');return;}
    custom.push(pattern);saveArray(STORAGE.custom,custom);renderSelector();choosePattern(pattern.id);
    dialog.close();event.currentTarget.reset();toast(LANG==='id'?msg('saved'):'Custom pattern saved in this browser.');scrollToStudio();
  });
  $('articleDialog').querySelector('.article-close').addEventListener('click',()=>$('articleDialog').close());
  [$('customDialog'),$('articleDialog')].forEach(d=>d.addEventListener('click',event=>{if(event.target===d)d.close();}));
  document.querySelectorAll('[data-article]').forEach(button=>button.addEventListener('click',()=>openArticle(button.dataset.article)));
}
function setupNavigation(){
  const toggle=$('menuToggle');const menu=$('mainNav');
  toggle.addEventListener('click',()=>{const open=menu.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?(LANG==='id'?'Tutup navigasi':'Close navigation'):(LANG==='id'?'Buka navigasi':'Open navigation'));});
  menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menu.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');}));
  document.querySelectorAll('[data-start-practice]').forEach(button=>button.addEventListener('click',()=>{choosePattern(button.dataset.startPractice);scrollToStudio();}));
  $('copyrightYear').textContent=String(new Date().getFullYear());
}
function init(){
  renderPresetCards();renderSelector();renderProgress();setupDialogs();setupNavigation();
  select.addEventListener('change',()=>choosePattern(select.value));
  startButton.addEventListener('click',startSession);
  pauseButton.addEventListener('click',togglePause);
  endButton.addEventListener('click',()=>endSession(true));
  window.addEventListener('pagehide',()=>{if(session){cancelAnimationFrame(session.raf);}});
}
init();

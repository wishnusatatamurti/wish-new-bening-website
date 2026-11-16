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
const STORAGE = {custom:'wnb_custom_patterns_v1',history:'wnb_web_sessions_v1'};
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
  catch { toast('Browser storage is unavailable. Your changes may not be saved.'); return false; }
}
function toast(message){
  const el = $('toast'); el.textContent = message;el.classList.add('is-visible');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('is-visible'),3500);
}
function pad(n){return String(n).padStart(2,'0');}
function formatTime(seconds){const value=Math.max(0,Math.ceil(seconds));return `${pad(Math.floor(value/60))}:${pad(value%60)}`;}
function durationLabel(min){return `${min} ${min===1?'minute':'minutes'}`;}
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
    article.innerHTML=`<div class="practice-top"><span class="practice-num">PRACTICE ${pad(index+1)}</span><span class="practice-art" aria-hidden="true"></span></div><div><h3></h3><p></p><div class="practice-end"><span></span><button class="practice-start" type="button" aria-label="Choose ${p.name}">↗</button></div></div>`;
    article.querySelector('h3').textContent=p.name;
    article.querySelector('p').textContent=p.short;
    article.querySelector('.practice-end span').textContent=`${patternLabel(p)}  /  ${p.duration} MIN`;
    article.querySelector('button').addEventListener('click',()=>{choosePattern(p.id);scrollToStudio();});
    grid.appendChild(article);
  });
}
function renderSelector(){
  select.innerHTML='';
  allPatterns().forEach(p=>{const option=document.createElement('option');option.value=p.id;option.textContent=p.name+(p.id.startsWith('custom-')?' (Custom)':'');select.appendChild(option);});
  if(!allPatterns().some(p=>p.id===selectedId)) selectedId='calm';
  select.value=selectedId;
  renderPatternDetail();
  renderCustomCards();
}
function renderPatternDetail(){
  const p=getPattern(selectedId);
  $('patternText').textContent=patternLabel(p);
  $('patternDescription').textContent=p.description;
  $('durationText').textContent=durationLabel(p.duration);
  if(!session)$('remainingText').textContent=formatTime(p.duration*60);
}
function choosePattern(id){
  if(session){endSession(false);}
  selectedId=id; select.value=id; renderPatternDetail();
  statusText.textContent='A gentle moment starts here.';
  phaseText.textContent='READY';phaseSeconds.textContent='✦';phaseHint.textContent='Find a comfortable position';
  $('cycleCounter').textContent='READY WHEN YOU ARE';setOrb(.75);
}
function renderCustomCards(){
  const el=$('customPatterns');el.innerHTML='';
  custom.forEach(p=>{
    const card=document.createElement('div');card.className='custom-card';
    const title=document.createElement('strong');title.textContent=p.name;
    const details=document.createElement('small');details.textContent=`${patternLabel(p)} · ${p.duration} min`;
    const actions=document.createElement('div');actions.className='custom-card-actions';
    const use=document.createElement('button');use.type='button';use.textContent='Use pattern';use.addEventListener('click',()=>{choosePattern(p.id);scrollToStudio();});
    const del=document.createElement('button');del.type='button';del.textContent='Delete';del.className='delete-custom';del.setAttribute('aria-label',`Delete ${p.name}`);
    del.addEventListener('click',()=>{
      if(!confirm(`Delete your saved pattern "${p.name}"?`))return;
      custom=custom.filter(item=>item.id!==p.id);saveArray(STORAGE.custom,custom);
      if(selectedId===p.id)choosePattern('calm');renderSelector();toast('Custom pattern deleted.');
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
  pauseButton.textContent=session && session.paused?'Resume':'Pause';
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
  setControls();updateSession();toast(`${pattern.name} has started.`);
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
  phaseText.textContent=current.name;
  phaseSeconds.textContent=String(Math.max(1,Math.ceil(end-cycleTime)));
  phaseHint.textContent=current.hint;
  if(s.lastPhase!==current.name){s.lastPhase=current.name;statusText.textContent=`${current.name.charAt(0)}${current.name.slice(1).toLowerCase()} at your own pace.`;}
  $('remainingText').textContent=formatTime(totalSeconds-elapsed);
  $('cycleCounter').textContent=`CYCLE ${Math.floor(elapsed/s.cycleLength)+1}`;
  const percent=(elapsed/totalSeconds)*100;
  $('progressFill').style.width=`${percent}%`;
  $('progressTrack').setAttribute('aria-valuenow',String(Math.round(percent)));
  s.raf=requestAnimationFrame(updateSession);
}
function togglePause(){
  if(!session)return;
  if(!session.paused){
    session.elapsed=currentElapsed();session.paused=true;cancelAnimationFrame(session.raf);
    statusText.textContent='Paused. Take your time.';
    phaseText.textContent='PAUSED';phaseHint.textContent='Resume whenever you are ready';
  }else{
    session.paused=false;session.startedAt=performance.now();session.lastPhase='';updateSession();
  }
  setControls();
}
function endSession(showMessage=true){
  if(!session)return;
  cancelAnimationFrame(session.raf);session=null;setControls();
  phaseText.textContent='READY';phaseSeconds.textContent='✦';phaseHint.textContent='Find a comfortable position';
  statusText.textContent='A gentle moment starts here.';
  $('cycleCounter').textContent='READY WHEN YOU ARE';
  $('progressFill').style.width='0%';$('progressTrack').setAttribute('aria-valuenow','0');
  $('remainingText').textContent=formatTime(getPattern(selectedId).duration*60);setOrb(.75);
  if(showMessage)toast('Session ended. Incomplete sessions are not counted.');
}
function completeSession(){
  if(!session)return;
  const completed={date:dateKey(new Date()),timestamp:Date.now(),name:session.pattern.name,duration:session.pattern.duration};
  cancelAnimationFrame(session.raf);session=null;
  history.unshift(completed);history=history.slice(0,300);saveArray(STORAGE.history,history);
  renderProgress();setControls();setOrb(.77);
  phaseText.textContent='COMPLETE';phaseSeconds.textContent='✓';phaseHint.textContent='Thank you for taking this moment';
  statusText.textContent='Well done. Your session is complete.';
  $('cycleCounter').textContent='SESSION COMPLETE';$('remainingText').textContent='00:00';
  $('progressFill').style.width='100%';$('progressTrack').setAttribute('aria-valuenow','100');
  toast('Session complete! Your progress was saved locally.');
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
  $('statThisWeek').textContent=`${weekTotal} ${weekTotal===1?'session':'sessions'}`;
  const weekly=$('weekBars');weekly.innerHTML='';
  const max=Math.max(...counts,1);const names=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  counts.forEach((n,i)=>{
    const el=document.createElement('div');el.className='week-bar';
    el.setAttribute('aria-label',`${names[i]}: ${n} ${n===1?'session':'sessions'}`);
    const rail=document.createElement('div');rail.className='week-bar-rail';
    const fill=document.createElement('div');fill.className='week-bar-fill';fill.style.height=`${n===0?0:Math.max(13,(n/max)*100)}%`;
    const name=document.createElement('small');name.textContent=names[i];rail.appendChild(fill);el.append(rail,name);weekly.appendChild(el);
  });
  const recent=$('recentSessions');recent.innerHTML='';
  if(!history.length){const p=document.createElement('p');p.textContent='No sessions yet. Your first quiet moment awaits.';recent.appendChild(p);}
  else history.slice(0,4).forEach(item=>{
    const row=document.createElement('div');row.className='recent-row';
    const name=document.createElement('strong');name.textContent=item.name;
    const date=document.createElement('span');date.textContent=`${item.duration} min · ${item.date}`;
    row.append(name,date);recent.appendChild(row);
  });
}

const ARTICLES={
 one:{category:'BREATHING · 3 MIN READ',title:'Begin with just one breath',body:`<p>When your day is moving quickly, you don’t always need an elaborate routine. Sometimes a single mindful breath is enough to notice where you are.</p><h3>Make room for a pause</h3><p>Sit or stand comfortably. Let your shoulders soften. Notice the natural rhythm of your breath without trying to change it. After a moment, allow your next inhale and exhale to feel unhurried.</p><h3>Keep it uncomplicated</h3><p>A breathing practice is not a test. You can return to your usual breathing whenever you wish. There’s no need to force deeper breaths or hold longer than feels comfortable.</p><p>Little moments can become familiar rituals. You may choose to take one mindful breath when you begin work, before a meal, or after closing your laptop.</p>`},
 two:{category:'MINDFULNESS · 3 MIN READ',title:'How to make space in a busy day',body:`<p>A full schedule can make rest feel like something we have to earn. But small pauses can be part of an ordinary day rather than an event we wait for.</p><h3>Notice a natural transition</h3><p>Choose a moment that already exists: after getting up, between tasks, or before heading outside. Put your feet on the ground and notice the sounds around you.</p><h3>Choose one gentle cue</h3><p>Maybe you loosen your hands, look away from the screen, or take an easy breath. Repeating one simple cue may help you remember to pause.</p><p>Keep your practice flexible. On some days you may have five minutes, and on others just ten seconds. Both can be worthwhile moments of awareness.</p>`},
 three:{category:'EVENING ROUTINE · 2 MIN READ',title:'A gentler end to the day',body:`<p>An evening routine need not be perfectly timed or complicated. Think of it as a familiar sequence that marks the transition from doing to resting.</p><h3>Lower the pace</h3><p>Try dimming a bright light, putting your phone aside for a moment, or listening to the quieter sounds of your room. Create a space that feels comfortable to you.</p><h3>Let your breathing stay easy</h3><p>If you enjoy a guided exercise, choose a gentle pattern and avoid any breath-holds that cause strain. You can always simply observe your natural breathing.</p><p>Explore what works for your circumstances. The purpose is a peaceful pre-sleep ritual, not a promise about how quickly you will fall asleep.</p>`}
};
function openArticle(id){
  const article=ARTICLES[id];if(!article)return;
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
    const pattern={id:`custom-${Date.now()}-${Math.floor(Math.random()*100000)}`,name,description:'A breathing rhythm created by you.',inhale:value('inhale'),hold:value('hold'),exhale:value('exhale'),rest:value('rest'),duration:value('duration')};
    if(!name||name.length>40||!Number.isInteger(pattern.duration)||pattern.duration<1||pattern.duration>60||
      ['inhale','exhale'].some(k=>!Number.isInteger(pattern[k])||pattern[k]<1||pattern[k]>20)||
      ['hold','rest'].some(k=>!Number.isInteger(pattern[k])||pattern[k]<0||pattern[k]>20)){
        toast('Please enter a name and valid breathing times.');return;
    }
    if(custom.length>=30){toast('You can save up to 30 patterns in this browser.');return;}
    custom.push(pattern);saveArray(STORAGE.custom,custom);renderSelector();choosePattern(pattern.id);
    dialog.close();event.currentTarget.reset();toast('Custom pattern saved in this browser.');scrollToStudio();
  });
  $('articleDialog').querySelector('.article-close').addEventListener('click',()=>$('articleDialog').close());
  [$('customDialog'),$('articleDialog')].forEach(d=>d.addEventListener('click',event=>{if(event.target===d)d.close();}));
  document.querySelectorAll('[data-article]').forEach(button=>button.addEventListener('click',()=>openArticle(button.dataset.article)));
}
function setupNavigation(){
  const toggle=$('menuToggle');const menu=$('mainNav');
  toggle.addEventListener('click',()=>{const open=menu.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
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

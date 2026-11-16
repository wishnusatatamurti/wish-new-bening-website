/* Wish New Bening v1.5 — browser-based guidance and synthetic sound previews.
   No remote audio requests, trackers, analytics or medical claims. */
(() => {
 "use strict";
 const code=(document.documentElement.lang||"en").toLowerCase().split("-")[0];
 const names=["rain","ocean","nature","fire"];
 const texts={
 en:"Voice guidance|Enable|Select a voice|Test voice|Volume|Voices depend on your browser and device. Sound works after you press play.|Play|Stop|Preview|Stop sound|Generated ambience for preview, not original field recordings. Automatically stops after 20 minutes.|Sound volume|Audio is unavailable in this browser.|Voice guidance not supported in this browser.|Auto voice",
 id:"Panduan suara|Aktifkan|Pilih suara|Tes suara|Volume|Pilihan suara bergantung pada browser dan perangkat. Audio dimulai setelah Anda menekan putar.|Putar|Hentikan|Pratinjau|Hentikan suara|Ambience sintetis untuk pratinjau, bukan rekaman suara alam asli. Otomatis berhenti setelah 20 menit.|Volume suara|Audio tidak tersedia pada browser ini.|Panduan suara tidak didukung browser ini.|Suara otomatis",
 es:"Guía de voz|Activar|Elegir voz|Probar voz|Volumen|Las voces dependen del dispositivo. El sonido comienza al pulsar reproducir.|Reproducir|Detener|Vista previa|Detener sonido|Ambiente generado en el navegador, no grabación real. Se detiene tras 20 minutos.|Volumen del sonido|Audio no disponible.|Guía de voz no disponible.|Voz automática",
 fr:"Guidage vocal|Activer|Choisir une voix|Tester la voix|Volume|Les voix dépendent de votre appareil. Le son démarre après votre action.|Écouter|Arrêter|Aperçu|Arrêter le son|Ambiance générée dans le navigateur, pas un enregistrement naturel. Arrêt après 20 minutes.|Volume du son|Audio indisponible.|Guidage vocal indisponible.|Voix automatique",
 de:"Sprachführung|Aktivieren|Stimme wählen|Stimme testen|Lautstärke|Stimmen hängen vom Gerät ab. Ton beginnt nach dem Start.|Abspielen|Stoppen|Vorschau|Ton stoppen|Synthetische Klangvorschau, keine Naturaufnahme. Stoppt nach 20 Minuten.|Klanglautstärke|Audio nicht verfügbar.|Sprachführung nicht verfügbar.|Automatische Stimme",
 pt:"Guia por voz|Ativar|Escolher voz|Testar voz|Volume|As vozes dependem do dispositivo. O áudio começa ao tocar em reproduzir.|Reproduzir|Parar|Prévia|Parar som|Ambiente gerado no navegador, não é gravação real. Para após 20 minutos.|Volume do som|Áudio indisponível.|Guia por voz indisponível.|Voz automática",
 it:"Guida vocale|Attiva|Scegli la voce|Prova la voce|Volume|Le voci dipendono dal dispositivo. L’audio parte quando premi play.|Ascolta|Ferma|Anteprima|Ferma audio|Ambiente sintetico di anteprima, non una registrazione naturale. Si ferma dopo 20 minuti.|Volume audio|Audio non disponibile.|Guida vocale non disponibile.|Voce automatica",
 ru:"Голосовые подсказки|Включить|Выбрать голос|Проверить голос|Громкость|Голоса зависят от устройства. Звук запускается после нажатия.|Слушать|Стоп|Просмотр|Остановить звук|Синтезированная звуковая атмосфера, не запись природы. Остановка через 20 минут.|Громкость звука|Аудио недоступно.|Голосовые подсказки недоступны.|Автовыбор",
 ar:"إرشاد صوتي|تفعيل|اختيار صوت|اختبار الصوت|مستوى الصوت|الأصوات تعتمد على جهازك. يبدأ الصوت بعد الضغط على التشغيل.|تشغيل|إيقاف|معاينة|إيقاف الصوت|أجواء صوتية مولّدة في المتصفح وليست تسجيلًا طبيعيًا. تتوقف بعد 20 دقيقة.|حجم الصوت|الصوت غير متاح.|الإرشاد الصوتي غير متاح.|صوت تلقائي",
 hi:"वॉइस गाइड|चालू करें|आवाज़ चुनें|आवाज़ जाँचें|वॉल्यूम|उपलब्ध आवाज़ डिवाइस पर निर्भर है। प्ले दबाने पर आवाज़ शुरू होगी।|चलाएँ|बंद करें|पूर्वावलोकन|ध्वनि रोकें|ब्राउज़र में बनी कृत्रिम ध्वनि, वास्तविक रिकॉर्डिंग नहीं। 20 मिनट में स्वतः बंद।|ध्वनि वॉल्यूम|ऑडियो उपलब्ध नहीं।|वॉइस गाइड उपलब्ध नहीं।|ऑटो आवाज़",
 zh:"语音引导|启用|选择声音|测试声音|音量|可用声音取决于设备，点击播放后开始发声。|播放|停止|预览|停止声音|浏览器生成的合成环境音，并非真实自然录音。20分钟后自动停止。|声音音量|音频不可用。|语音引导不可用。|自动声音",
 ja:"音声ガイド|有効にする|声を選ぶ|音声テスト|音量|利用できる声は端末によります。再生ボタンで音が始まります。|再生|停止|プレビュー|音を停止|ブラウザ生成の環境音プレビュー。自然音の録音ではありません。20分で自動停止。|音量|音声を利用できません。|音声ガイド非対応。|自動音声",
 ko:"음성 안내|사용|음성 선택|음성 테스트|음량|사용 가능한 음성은 기기에 따라 다릅니다. 재생을 누르면 시작합니다.|재생|중지|미리듣기|소리 중지|브라우저가 생성한 합성 환경음이며 실제 자연 녹음이 아닙니다. 20분 후 자동 종료됩니다.|소리 음량|오디오를 사용할 수 없습니다.|음성 안내를 지원하지 않습니다.|자동 음성",
 th:"เสียงนำทาง|เปิดใช้|เลือกเสียง|ทดสอบเสียง|ระดับเสียง|เสียงขึ้นอยู่กับอุปกรณ์ กดเล่นเพื่อเริ่มฟัง|เล่น|หยุด|ตัวอย่าง|หยุดเสียง|เสียงบรรยากาศสังเคราะห์ในเบราว์เซอร์ ไม่ใช่เสียงบันทึกจริง หยุดอัตโนมัติใน 20 นาที|ระดับเสียง|ไม่รองรับเสียง|ไม่รองรับเสียงนำทาง|เสียงอัตโนมัติ",
 vi:"Hướng dẫn bằng giọng nói|Bật|Chọn giọng|Thử giọng|Âm lượng|Giọng nói tùy thuộc thiết bị. Âm thanh bắt đầu khi nhấn phát.|Phát|Dừng|Nghe thử|Dừng âm thanh|Âm thanh môi trường tổng hợp, không phải bản thu thiên nhiên. Tự dừng sau 20 phút.|Âm lượng âm thanh|Không hỗ trợ âm thanh.|Không hỗ trợ giọng nói.|Giọng tự động",
 ms:"Panduan suara|Aktifkan|Pilih suara|Uji suara|Kelantangan|Suara bergantung pada peranti. Audio bermula selepas anda tekan main.|Main|Henti|Pratonton|Hentikan bunyi|Ambien sintetik dalam pelayar, bukan rakaman alam sebenar. Berhenti selepas 20 minit.|Kelantangan bunyi|Audio tidak tersedia.|Panduan suara tidak tersedia.|Suara automatik"
 };
 const fields=["voice","enable","choose","test","volume","voiceNote","play","stop","preview","stopSound","generated","soundVolume","audioError","voiceError","autoVoice"];
 const raw=(texts[code]||texts.en).split("|");const t=Object.fromEntries(fields.map((k,i)=>[k,raw[i]]));
 const loc={en:"en-US",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",it:"it-IT",ru:"ru-RU",ar:"ar-SA",hi:"hi-IN",zh:"zh-CN",ja:"ja-JP",ko:"ko-KR",th:"th-TH",vi:"vi-VN",ms:"ms-MY"};
 const phaseWords={
 en:["Inhale","Hold","Exhale","Rest"],id:["Tarik napas","Tahan","Hembuskan","Istirahat"],
 es:["Inhala","Mantén","Exhala","Descansa"],fr:["Inspirez","Retenez","Expirez","Reposez-vous"],
 de:["Einatmen","Halten","Ausatmen","Pause"],pt:["Inspire","Segure","Expire","Descanse"],
 it:["Inspira","Trattieni","Espira","Riposa"],ru:["Вдох","Задержка","Выдох","Отдых"],
 ar:["شهيق","توقف","زفير","راحة"],hi:["साँस अंदर","रोकें","साँस बाहर","आराम"],
 zh:["吸气","屏息","呼气","休息"],ja:["吸って","止めて","吐いて","休んで"],
 ko:["들이쉬세요","멈추세요","내쉬세요","쉬세요"],th:["หายใจเข้า","กลั้นหายใจ","หายใจออก","พัก"],
 vi:["Hít vào","Giữ hơi","Thở ra","Nghỉ"],ms:["Tarik nafas","Tahan","Hembus","Rehat"]
 };
 const phaseMap={INHALE:0,HOLD:1,EXHALE:2,REST:3};
 const $=id=>document.getElementById(id);
 const store={
 get:(key,def)=>{try{return localStorage.getItem(key)??def}catch(_){return def}},
 set:(key,value)=>{try{localStorage.setItem(key,value)}catch(_){}}
 };
 const synth=window.speechSynthesis;
 const supportsSpeech=!!synth&&typeof window.SpeechSynthesisUtterance==="function";
 const studioControls=document.querySelector(".studio-sidebar .studio-controls");
 let enabled=store.get("wnb_voice_enabled_v1","false")==="true";
 const panel=document.createElement("div");panel.className="wnb-voice-panel";
 panel.innerHTML='<div class="wnb-voice-head"><strong></strong><label><input type="checkbox" id="voiceEnable"><span></span></label></div><p class="wnb-voice-info"></p><div class="wnb-voice-row"><select id="voiceSelect" aria-label="Select speaking voice"></select><button type="button" id="voiceTest"></button></div><label class="wnb-voice-volume"><span></span><input type="range" min="0" max="100" value="65" id="voiceVolume" aria-label="Voice volume"></label>';
 panel.querySelector(".wnb-voice-head strong").textContent=t.voice;
 panel.querySelector(".wnb-voice-head label span").textContent=t.enable;
 panel.querySelector(".wnb-voice-info").textContent=supportsSpeech?t.voiceNote:t.voiceError;
 panel.querySelector("#voiceTest").textContent=t.test;
 panel.querySelector(".wnb-voice-volume span").textContent=t.volume;
 if(studioControls)studioControls.insertAdjacentElement("afterend",panel);
 const vEnable=$("voiceEnable"),vSelect=$("voiceSelect"),vTest=$("voiceTest"),vVolume=$("voiceVolume");
 if(vEnable){vEnable.checked=enabled&&supportsSpeech;vEnable.disabled=!supportsSpeech;}
 if(vTest)vTest.disabled=!supportsSpeech;
 if(vSelect)vSelect.setAttribute("aria-label",t.choose);
 let voices=[],voiceId=store.get("wnb_voice_id_v1","");
 const vol=Number(store.get("wnb_voice_volume_v1","65"));
 if(vVolume)vVolume.value=String(Number.isFinite(vol)?Math.max(0,Math.min(100,vol)):65);
 function availableVoices(){
  if(!supportsSpeech||!vSelect)return;
  voices=synth.getVoices();
  const prefix=(loc[code]||loc.en).split("-")[0].toLowerCase();
  const matching=voices.filter(v=>v.lang.toLowerCase().startsWith(prefix));
  const selection=matching.length?matching:voices.filter(v=>v.lang.toLowerCase().startsWith("en")).slice(0,12);
  vSelect.replaceChildren();
  const auto=document.createElement("option");auto.value="";auto.textContent=t.autoVoice;vSelect.append(auto);
  selection.forEach(v=>{const o=document.createElement("option");o.value=v.voiceURI;o.textContent=v.name+" ("+v.lang+")";vSelect.append(o)});
  if(selection.some(v=>v.voiceURI===voiceId))vSelect.value=voiceId;else vSelect.value="";
  if(!selection.length)panel.querySelector(".wnb-voice-info").textContent=t.voiceNote;
 }
 availableVoices();if(supportsSpeech)synth.addEventListener?.("voiceschanged",availableVoices);
 vSelect?.addEventListener("change",()=>{voiceId=vSelect.value;store.set("wnb_voice_id_v1",voiceId)});
 vEnable?.addEventListener("change",()=>{enabled=vEnable.checked;store.set("wnb_voice_enabled_v1",String(enabled));if(!enabled)synth?.cancel()});
 vVolume?.addEventListener("input",()=>store.set("wnb_voice_volume_v1",vVolume.value));
 function speak(phase,force=false){
  if(!supportsSpeech||(!force&&!enabled))return;
  const index=phaseMap[phase];if(index===undefined)return;
  try{
   synth.cancel();
   const utterance=new SpeechSynthesisUtterance((phaseWords[code]||phaseWords.en)[index]);
   utterance.lang=loc[code]||loc.en;utterance.rate=.82;utterance.pitch=1;
   utterance.volume=Math.max(0,Math.min(1,Number(vVolume?.value||65)/100));
   const selected=voices.find(v=>v.voiceURI===voiceId);if(selected)utterance.voice=selected;
   else{const prefix=(loc[code]||loc.en).split("-")[0].toLowerCase();const match=voices.find(v=>v.lang.toLowerCase().startsWith(prefix));if(match)utterance.voice=match;}
   synth.speak(utterance);
  }catch(_){}
 }
 vTest?.addEventListener("click",()=>speak("INHALE",true));
 window.addEventListener("wnb:breath",event=>{
  const d=event.detail||{};
  if(d.type==="phase")speak(d.phase);
  if(["paused","ended","completed"].includes(d.type))synth?.cancel();
 });
 // Mobile stage actions mirror the existing tested session buttons.
 const stage=document.querySelector(".studio-stage");
 const targets=["startButton","pauseButton","endButton"].map($);
 if(stage&&targets.every(Boolean)){
  const mobile=document.createElement("div");mobile.className="mobile-session-actions";
  targets.forEach(original=>{
   const button=document.createElement("button");button.type="button";button.dataset.mirror=original.id;
   button.addEventListener("click",()=>{if(!original.disabled)original.click()});
   mobile.appendChild(button);
  });
  stage.append(mobile);
  const reflect=()=>{targets.forEach((original,i)=>{const button=mobile.children[i];button.textContent=original.textContent.trim().replace(/↗/g,"").trim();button.disabled=original.disabled})};
  const observer=new MutationObserver(reflect);targets.forEach(x=>observer.observe(x,{attributes:true,attributeFilter:["disabled"],childList:true,characterData:true,subtree:true}));reflect();
 }
 const AudioCtx=window.AudioContext||window.webkitAudioContext;
 let audio=null,master=null,active=null;
 const tiles=names.map(name=>document.querySelector(".sound-"+name)).filter(Boolean);
 const volumeValue=Math.max(0,Math.min(100,Number.isFinite(Number(store.get("wnb_sound_volume_v1","40")))?Number(store.get("wnb_sound_volume_v1","40")):40));
 const copy=document.querySelector(".sounds-copy");
 let soundSlider=null,soundStop=null;
 if(copy){
  const bar=document.createElement("div");bar.className="wnb-sound-master";
  const label=document.createElement("label");label.className="wnb-sound-volume";
  const span=document.createElement("span");span.textContent=t.soundVolume;
  soundSlider=document.createElement("input");soundSlider.type="range";soundSlider.id="soundVolume";soundSlider.min="0";soundSlider.max="100";soundSlider.value=String(volumeValue);soundSlider.setAttribute("aria-label",t.soundVolume);
  label.append(span,soundSlider);
  soundStop=document.createElement("button");soundStop.type="button";soundStop.textContent=t.stopSound;soundStop.disabled=true;
  const notice=document.createElement("p");notice.className="wnb-sound-detail";notice.textContent=t.generated;
  bar.append(label,soundStop,notice);copy.append(bar);
 }
 const controls={};
 tiles.forEach((tile,i)=>{
  const name=names[i]; // All four tiles are currently present in the same order.
  const old=tile.querySelector("small");if(old)old.textContent=t.preview;
  const actions=document.createElement("div");actions.className="wnb-sound-actions";
  const button=document.createElement("button");button.type="button";button.dataset.sound=name;button.textContent=t.play;button.setAttribute("aria-pressed","false");button.setAttribute("aria-label",t.play+" "+(tile.querySelector("strong")?.textContent||name));
  const status=document.createElement("span");status.className="wnb-sound-status";status.setAttribute("aria-live","polite");status.textContent=t.preview;
  actions.append(button);tile.append(actions,status);
  controls[name]={button,status};
  if(!AudioCtx){button.disabled=true;status.textContent=t.audioError}
  button.addEventListener("click",()=>toggleSound(name));
 });
 function refreshSounds(){
  names.forEach(name=>{
   const c=controls[name];if(!c)return;
   const playing=!!active&&active.kind===name;
   c.button.textContent=playing?t.stop:t.play;
   c.button.setAttribute("aria-pressed",String(playing));
   c.status.textContent=playing?t.stopSound:t.preview;
  });
  if(soundStop)soundStop.disabled=!active;
 }
 soundSlider?.addEventListener("input",()=>{
  store.set("wnb_sound_volume_v1",soundSlider.value);
  if(master)master.gain.setTargetAtTime(Number(soundSlider.value)/100,audio.currentTime,.06);
 });
 soundStop?.addEventListener("click",stopSound);
 function stopSound(){
  if(active){
   active.intervals.forEach(clearInterval);clearTimeout(active.timeout);
   try{active.source.stop()}catch(_){}
   try{active.lfo?.stop()}catch(_){}
   active.nodes.forEach(node=>{try{node.disconnect()}catch(_){}});
   active=null;
  }
  refreshSounds();
 }
 function noiseBuffer(ctx,kind){
  const buffer=ctx.createBuffer(1,Math.floor(ctx.sampleRate*4),ctx.sampleRate),samples=buffer.getChannelData(0);
  let previous=0;
  for(let i=0;i<samples.length;i++){
   const white=Math.random()*2-1;
   if(kind==="ocean"){previous=(previous*.985)+(white*.015);samples[i]=Math.max(-1,Math.min(1,previous*5))}
   else if(kind==="fire"){previous=previous*.78+white*.22;samples[i]=previous}
   else if(kind==="nature"){previous=previous*.92+white*.08;samples[i]=previous}
   else samples[i]=white*.75;
  }
  return buffer;
 }
 function chirp(ctx,out){
  const now=ctx.currentTime,osc=ctx.createOscillator(),env=ctx.createGain();
  osc.type="sine";osc.frequency.setValueAtTime(760+Math.random()*220,now);
  osc.frequency.exponentialRampToValueAtTime(1250+Math.random()*400,now+.15);
  env.gain.setValueAtTime(.0001,now);env.gain.exponentialRampToValueAtTime(.025,now+.05);env.gain.exponentialRampToValueAtTime(.0001,now+.22);
  osc.connect(env);env.connect(out);osc.start(now);osc.stop(now+.24);osc.addEventListener("ended",()=>{osc.disconnect();env.disconnect()},{once:true});
 }
 function crackle(ctx,out){
  const now=ctx.currentTime,osc=ctx.createOscillator(),env=ctx.createGain();
  osc.type="triangle";osc.frequency.setValueAtTime(140+Math.random()*130,now);
  osc.frequency.exponentialRampToValueAtTime(55,now+.045);
  env.gain.setValueAtTime(.0001,now);env.gain.exponentialRampToValueAtTime(.04,now+.005);env.gain.exponentialRampToValueAtTime(.0001,now+.06);
  osc.connect(env);env.connect(out);osc.start(now);osc.stop(now+.07);osc.addEventListener("ended",()=>{osc.disconnect();env.disconnect()},{once:true});
 }
 async function toggleSound(kind){
  if(active?.kind===kind){stopSound();return}
  if(!AudioCtx)return;
  stopSound();
  try{
   if(!audio){
    audio=new AudioCtx();
    const limiter=audio.createDynamicsCompressor();limiter.threshold.value=-13;limiter.ratio.value=3;limiter.connect(audio.destination);
    master=audio.createGain();master.gain.value=Number(soundSlider?.value||40)/100;master.connect(limiter);
   }
   await audio.resume();
   const source=audio.createBufferSource();source.buffer=noiseBuffer(audio,kind);source.loop=true;
   const filter=audio.createBiquadFilter(),gain=audio.createGain();
   if(kind==="rain"){filter.type="highpass";filter.frequency.value=370;gain.gain.value=.24}
   if(kind==="ocean"){filter.type="lowpass";filter.frequency.value=340;gain.gain.value=.24}
   if(kind==="nature"){filter.type="lowpass";filter.frequency.value=590;gain.gain.value=.23}
   if(kind==="fire"){filter.type="bandpass";filter.frequency.value=440;filter.Q.value=.35;gain.gain.value=.24}
   source.connect(filter);filter.connect(gain);gain.connect(master);
   const nodes=[source,filter,gain];let lfo=null;const intervals=[];
   if(kind==="ocean"){
    lfo=audio.createOscillator();lfo.frequency.value=.095;
    const depth=audio.createGain();depth.gain.value=.12;lfo.connect(depth);depth.connect(gain.gain);lfo.start();nodes.push(lfo,depth);
   }
   if(kind==="nature"){chirp(audio,master);intervals.push(setInterval(()=>{if(active?.kind==="nature"&&audio.state==="running")chirp(audio,master)},3100))}
   if(kind==="fire"){intervals.push(setInterval(()=>{if(active?.kind==="fire"&&audio.state==="running")crackle(audio,master)},420))}
   source.start();
   const timeout=setTimeout(()=>stopSound(),20*60*1000);
   active={kind,source,lfo,nodes,intervals,timeout};refreshSounds();
  }catch(_){stopSound();if(controls[kind])controls[kind].status.textContent=t.audioError}
 }
 window.addEventListener("pagehide",()=>{stopSound();if(supportsSpeech)synth.cancel();audio?.close().catch(()=>{})});
})();

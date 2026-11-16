"use strict";
/* International-language UI previews. Full reviewed translations: en/id.
   For other locales, core interactive interface is translated and detailed
   long-form editorial/legal text falls back to English, never misrepresented. */
(() => {
  const lang = document.documentElement.lang;
  if (lang === "en" || lang === "id") return;
  const keys = {"nav":["Practices","Wellness","Mind & Body","Sounds","Progress","Journal","About","Get the app"],"hero":["Breathe better.","Feel clearer.","Start breathing","Explore practices"],"studio":["CHOOSE A PRACTICE","YOUR BREATHING PATTERN","SESSION LENGTH","YOUR TIME","Start session","Pause","Resume","End session"],"phase":["INHALE","HOLD","EXHALE","REST","READY","PAUSED","COMPLETE"],"stats":["Sessions","Minutes","Day streak","THIS WEEK","RECENT SESSIONS"],"extra":["Read overview","Find your","rhythm.","Your space to","breathe.","Every breath","counts."]};
  const translations = {"es":{"nav":"Prácticas|Bienestar|Mente y cuerpo|Sonidos|Progreso|Diario|Acerca de|Obtener la app","hero":"Respira mejor.|Siente más claridad.|Empezar a respirar|Explorar prácticas","studio":"ELIGE UNA PRÁCTICA|TU PATRÓN DE RESPIRACIÓN|DURACIÓN DE LA SESIÓN|TIEMPO RESTANTE|Iniciar sesión|Pausar|Reanudar|Finalizar sesión","phase":"INHALA|MANTÉN|EXHALA|DESCANSA|LISTO|EN PAUSA|COMPLETADO","stats":"Sesiones|Minutos|Días consecutivos|ESTA SEMANA|SESIONES RECIENTES","extra":"Leer explicación|Encuentra tu|ritmo.|Tu espacio para|respirar.|Cada respiración|cuenta."},"fr":{"nav":"Exercices|Bien-être|Corps et esprit|Sons|Progrès|Journal|À propos|Obtenir l’appli","hero":"Respirez mieux.|Retrouvez la clarté.|Commencer à respirer|Explorer les exercices","studio":"CHOISIR UN EXERCICE|VOTRE RYTHME RESPIRATOIRE|DURÉE DE LA SÉANCE|TEMPS RESTANT|Démarrer la séance|Pause|Reprendre|Terminer la séance","phase":"INSPIREZ|RETENEZ|EXPIREZ|REPOS|PRÊT|EN PAUSE|TERMINÉ","stats":"Séances|Minutes|Jours consécutifs|CETTE SEMAINE|SÉANCES RÉCENTES","extra":"Lire l’explication|Trouvez votre|rythme.|Un espace pour|respirer.|Chaque souffle|compte."},"de":{"nav":"Übungen|Wohlbefinden|Körper & Geist|Klänge|Fortschritt|Journal|Über uns|App erhalten","hero":"Atme besser.|Fühle dich klarer.|Atmung starten|Übungen entdecken","studio":"ÜBUNG AUSWÄHLEN|DEIN ATEMRHYTHMUS|SITZUNGSDAUER|VERBLEIBENDE ZEIT|Sitzung starten|Pausieren|Fortsetzen|Sitzung beenden","phase":"EINATMEN|HALTEN|AUSATMEN|RUHE|BEREIT|PAUSIERT|ABGESCHLOSSEN","stats":"Sitzungen|Minuten|Tage in Folge|DIESE WOCHE|LETZTE SITZUNGEN","extra":"Mehr erfahren|Finde deinen|Rhythmus.|Dein Raum zum|Atmen.|Jeder Atemzug|zählt."},"pt":{"nav":"Práticas|Bem-estar|Mente e corpo|Sons|Progresso|Diário|Sobre|Baixar o app","hero":"Respire melhor.|Sinta mais clareza.|Começar a respirar|Explorar práticas","studio":"ESCOLHA UMA PRÁTICA|SEU PADRÃO RESPIRATÓRIO|DURAÇÃO DA SESSÃO|TEMPO RESTANTE|Iniciar sessão|Pausar|Continuar|Encerrar sessão","phase":"INSPIRE|SEGURE|EXPIRE|DESCANSE|PRONTO|PAUSADO|CONCLUÍDO","stats":"Sessões|Minutos|Dias seguidos|ESTA SEMANA|SESSÕES RECENTES","extra":"Ler explicação|Encontre seu|ritmo.|Seu espaço para|respirar.|Cada respiração|importa."},"it":{"nav":"Esercizi|Benessere|Mente e corpo|Suoni|Progressi|Diario|Chi siamo|Scarica l’app","hero":"Respira meglio.|Ritrova chiarezza.|Inizia a respirare|Esplora gli esercizi","studio":"SCEGLI UN ESERCIZIO|IL TUO RITMO RESPIRATORIO|DURATA DELLA SESSIONE|TEMPO RIMANENTE|Avvia la sessione|Pausa|Riprendi|Termina la sessione","phase":"INSPIRA|TRATTIENI|ESPIRA|RIPOSO|PRONTO|IN PAUSA|COMPLETATO","stats":"Sessioni|Minuti|Giorni consecutivi|QUESTA SETTIMANA|SESSIONI RECENTI","extra":"Leggi di più|Trova il tuo|ritmo.|Uno spazio per|respirare.|Ogni respiro|conta."},"ru":{"nav":"Практики|Благополучие|Разум и тело|Звуки|Прогресс|Журнал|О проекте|Приложение","hero":"Дышите легче.|Думайте яснее.|Начать дыхание|Изучить практики","studio":"ВЫБЕРИТЕ ПРАКТИКУ|ВАШ РИТМ ДЫХАНИЯ|ДЛИТЕЛЬНОСТЬ СЕАНСА|ОСТАЛОСЬ ВРЕМЕНИ|Начать сеанс|Пауза|Продолжить|Завершить сеанс","phase":"ВДОХ|ЗАДЕРЖКА|ВЫДОХ|ОТДЫХ|ГОТОВО|ПАУЗА|ЗАВЕРШЕНО","stats":"Сеансы|Минуты|Дней подряд|НА ЭТОЙ НЕДЕЛЕ|НЕДАВНИЕ СЕАНСЫ","extra":"Подробнее|Найдите свой|ритм.|Место, чтобы|дышать.|Каждый вдох|важен."},"ar":{"nav":"التمارين|العافية|العقل والجسم|الأصوات|التقدم|المجلة|من نحن|احصل على التطبيق","hero":"تنفّس براحة أكبر.|صفاء أكثر.|ابدأ التنفس|استكشف التمارين","studio":"اختر تمرينًا|نمط تنفسك|مدة الجلسة|الوقت المتبقي|ابدأ الجلسة|إيقاف مؤقت|متابعة|إنهاء الجلسة","phase":"شهيق|احتفاظ|زفير|راحة|جاهز|متوقف مؤقتًا|مكتمل","stats":"الجلسات|الدقائق|الأيام المتتالية|هذا الأسبوع|الجلسات الأخيرة","extra":"اقرأ التفاصيل|اعثر على|إيقاعك.|مساحتك من أجل|التنفس.|كل نفس|مهم."},"hi":{"nav":"अभ्यास|कल्याण|मन और शरीर|ध्वनियाँ|प्रगति|पत्रिका|हमारे बारे में|ऐप प्राप्त करें","hero":"बेहतर साँस लें।|मन अधिक स्पष्ट रखें।|साँस का अभ्यास शुरू करें|अभ्यास देखें","studio":"अभ्यास चुनें|आपकी साँस की लय|सत्र की अवधि|शेष समय|सत्र शुरू करें|रोकें|जारी रखें|सत्र समाप्त करें","phase":"साँस अंदर|रोकें|साँस बाहर|विश्राम|तैयार|रुका हुआ|पूरा हुआ","stats":"सत्र|मिनट|लगातार दिन|इस सप्ताह|हाल के सत्र","extra":"विवरण पढ़ें|अपनी|लय खोजें।|आपकी जगह|साँस लेने के लिए।|हर साँस|मायने रखती है।"},"zh":{"nav":"呼吸练习|身心健康|身心探索|声音|进度|日志|关于|获取应用","hero":"呼吸更舒畅。|思绪更清晰。|开始呼吸|探索练习","studio":"选择练习|您的呼吸节奏|练习时长|剩余时间|开始练习|暂停|继续|结束练习","phase":"吸气|屏息|呼气|休息|准备就绪|已暂停|已完成","stats":"练习次数|分钟|连续天数|本周|最近练习","extra":"阅读说明|找到您的|节奏。|属于您的|呼吸空间。|每一次呼吸|都很重要。"},"ja":{"nav":"呼吸練習|ウェルネス|心と体|サウンド|記録|ジャーナル|概要|アプリを入手","hero":"心地よく呼吸。|心をもっとクリアに。|呼吸を始める|練習を見る","studio":"練習を選ぶ|呼吸パターン|セッション時間|残り時間|開始する|一時停止|再開|終了する","phase":"吸う|止める|吐く|休む|準備完了|一時停止中|完了","stats":"セッション|分|連続日数|今週|最近のセッション","extra":"詳しく見る|自分の|リズムを。|自分らしく|呼吸する場所。|ひと呼吸にも|意味があります。"},"ko":{"nav":"호흡 연습|웰니스|마음과 몸|사운드|진행 상황|저널|소개|앱 받기","hero":"더 편안하게 호흡하세요.|마음을 더 맑게.|호흡 시작하기|연습 살펴보기","studio":"연습 선택|나의 호흡 패턴|세션 길이|남은 시간|세션 시작|일시정지|계속하기|세션 종료","phase":"들이쉬기|멈추기|내쉬기|쉬기|준비|일시정지|완료","stats":"세션|분|연속 일수|이번 주|최근 세션","extra":"설명 보기|나만의|리듬을 찾으세요.|나를 위한|호흡 공간.|모든 호흡은|소중합니다."},"th":{"nav":"ฝึกหายใจ|สุขภาวะ|จิตใจและร่างกาย|เสียง|ความคืบหน้า|บันทึก|เกี่ยวกับ|รับแอป","hero":"หายใจได้สบายขึ้น|จิตใจปลอดโปร่งขึ้น|เริ่มฝึกหายใจ|สำรวจแบบฝึก","studio":"เลือกแบบฝึก|รูปแบบการหายใจของคุณ|ระยะเวลาเซสชัน|เวลาที่เหลือ|เริ่มเซสชัน|หยุดชั่วคราว|ทำต่อ|จบเซสชัน","phase":"หายใจเข้า|กลั้นหายใจ|หายใจออก|พัก|พร้อม|หยุดชั่วคราว|เสร็จสิ้น","stats":"เซสชัน|นาที|วันต่อเนื่อง|สัปดาห์นี้|เซสชันล่าสุด","extra":"อ่านรายละเอียด|ค้นหา|จังหวะของคุณ|พื้นที่สำหรับ|การหายใจ|ทุกลมหายใจ|มีความหมาย"},"vi":{"nav":"Bài tập|Sức khỏe tinh thần|Tâm trí và cơ thể|Âm thanh|Tiến trình|Nhật ký|Giới thiệu|Tải ứng dụng","hero":"Hít thở dễ chịu hơn.|Tâm trí sáng rõ hơn.|Bắt đầu hít thở|Khám phá bài tập","studio":"CHỌN BÀI TẬP|NHỊP THỞ CỦA BẠN|THỜI LƯỢNG|THỜI GIAN CÒN LẠI|Bắt đầu phiên|Tạm dừng|Tiếp tục|Kết thúc phiên","phase":"HÍT VÀO|GIỮ HƠI|THỞ RA|NGHỈ|SẴN SÀNG|TẠM DỪNG|HOÀN THÀNH","stats":"Phiên tập|Phút|Ngày liên tiếp|TUẦN NÀY|PHIÊN GẦN ĐÂY","extra":"Đọc thêm|Tìm|nhịp điệu.|Không gian để|hít thở.|Mỗi nhịp thở|đều ý nghĩa."},"ms":{"nav":"Latihan|Kesejahteraan|Minda & Tubuh|Bunyi|Kemajuan|Jurnal|Tentang|Dapatkan aplikasi","hero":"Bernafas lebih selesa.|Fikiran lebih jelas.|Mula bernafas|Terokai latihan","studio":"PILIH LATIHAN|CORAK PERNAFASAN ANDA|TEMPOH SESI|MASA BERBAKI|Mula sesi|Jeda|Sambung|Tamatkan sesi","phase":"TARIK NAFAS|TAHAN|HEMBUS|REHAT|SEDIA|DIJEDA|SELESAI","stats":"Sesi|Minit|Hari berturut-turut|MINGGU INI|SESI TERKINI","extra":"Baca penjelasan|Cari|rentak anda.|Ruang untuk|bernafas.|Setiap nafas|bermakna."}};
  const groups=translations[lang];
  if(!groups)return;
  const dictionary=new Map();
  Object.entries(keys).forEach(([group,english])=>{
    const localized=groups[group].split("|");
    english.forEach((phrase,i)=>dictionary.set(phrase,localized[i]));
  });
  // Extra phase and duration labels generated by the live session engine.
  const fallback={
    es:{minute:"minuto",minutes:"minutos",session:"sesión",sessions:"sesiones",cycle:"CICLO"},
    fr:{minute:"minute",minutes:"minutes",session:"séance",sessions:"séances",cycle:"CYCLE"},
    de:{minute:"Minute",minutes:"Minuten",session:"Sitzung",sessions:"Sitzungen",cycle:"ZYKLUS"},
    pt:{minute:"minuto",minutes:"minutos",session:"sessão",sessions:"sessões",cycle:"CICLO"},
    it:{minute:"minuto",minutes:"minuti",session:"sessione",sessions:"sessioni",cycle:"CICLO"},
    ru:{minute:"минута",minutes:"минут",session:"сеанс",sessions:"сеансов",cycle:"ЦИКЛ"},
    ar:{minute:"دقيقة",minutes:"دقائق",session:"جلسة",sessions:"جلسات",cycle:"دورة"},
    hi:{minute:"मिनट",minutes:"मिनट",session:"सत्र",sessions:"सत्र",cycle:"चक्र"},
    zh:{minute:"分钟",minutes:"分钟",session:"次",sessions:"次",cycle:"周期"},
    ja:{minute:"分",minutes:"分",session:"回",sessions:"回",cycle:"サイクル"},
    ko:{minute:"분",minutes:"분",session:"회",sessions:"회",cycle:"주기"},
    th:{minute:"นาที",minutes:"นาที",session:"ครั้ง",sessions:"ครั้ง",cycle:"รอบ"},
    vi:{minute:"phút",minutes:"phút",session:"phiên",sessions:"phiên",cycle:"CHU KỲ"},
    ms:{minute:"minit",minutes:"minit",session:"sesi",sessions:"sesi",cycle:"KITARAN"}
  }[lang];
  const exclude="SCRIPT,STYLE,NOSCRIPT,CODE,PRE,TEXTAREA";
  function translated(original){
    const value=original.trim();
    if(!value||value.length>450)return original;
    let target=dictionary.get(value);
    if(!target){
      let m=value.match(/^CYCLE\s+(\d+)$/);
      if(m) target=fallback.cycle+" "+m[1];
      if(!target){
        m=value.match(/^(\d+)\s+(minute|minutes|session|sessions)$/i);
        if(m)target=m[1]+" "+fallback[m[2].toLowerCase()];
      }
    }
    return target && target!==value ? original.replace(value,target):original;
  }
  function change(node){
    if(!node || node.nodeType!==3 || !node.parentElement)return;
    if(node.parentElement.closest(exclude))return;
    if(node.parentElement.closest(".locale-control"))return;
    const next=translated(node.nodeValue);
    if(next!==node.nodeValue)node.nodeValue=next;
  }
  function visit(root){
    if(!root)return;
    if(root.nodeType===3){change(root);return;}
    if(root.nodeType!==1 && root.nodeType!==9)return;
    if(root.nodeType===1&&root.closest(exclude))return;
    const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const all=[];while(w.nextNode())all.push(w.currentNode);
    all.forEach(change);
  }
  visit(document.body);
  const observer=new MutationObserver(records=>{
    for(const r of records){
      if(r.type==="characterData")change(r.target);
      else for(const node of r.addedNodes)visit(node);
    }
  });
  observer.observe(document.body,{subtree:true,childList:true,characterData:true});
})();
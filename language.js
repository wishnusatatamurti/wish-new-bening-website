"use strict";
/* Wish New Bening global language + appearance preferences. */
(() => {
  const langKey = "wnb_language_v1";
  const themeKey = "wnb_theme_v1";
  const allowed = ["en","id","es","fr","de","pt","it","ru","ar","hi","zh","ja","ko","th","vi","ms"];
  const pageLang = document.documentElement.lang || "en";
  const storage = {
    get: key => { try { return localStorage.getItem(key); } catch { return null; } },
    set: (key,val) => { try { localStorage.setItem(key,val); } catch {} }
  };
  const isLegal = /\/(privacy|terms)\.html$/i.exec(location.pathname);
  function destination(code){
    if(!allowed.includes(code))code="en";
    const hash = isLegal ? "" : (location.hash || "");
    const suffix = isLegal && (code==="en"||code==="id") ? isLegal[1]+".html" : "";
    return new URL("/"+code+"/"+suffix+hash,location.origin).href;
  }
  function setLang(code){
    if(!allowed.includes(code))return;
    storage.set(langKey,code);
    location.assign(destination(code));
  }
  const select = document.getElementById("languagePicker");
  if(select){
    select.value=allowed.includes(pageLang)?pageLang:"en";
    select.addEventListener("change",()=>setLang(select.value));
  }
  const button = document.getElementById("themeToggle");
  function updateThemeButton(){
    if(!button)return;
    const dark = document.documentElement.dataset.theme==="dark";
    button.textContent=dark?"☀":"☾";
    button.setAttribute("aria-label",dark?"Switch to light mode":"Switch to dark mode");
    button.setAttribute("title",dark?"Light mode":"Dark mode");
    button.setAttribute("aria-pressed",String(dark));
  }
  updateThemeButton();
  if(button) button.addEventListener("click",()=>{
    const next=document.documentElement.dataset.theme==="dark"?"light":"dark";
    document.documentElement.dataset.theme=next;
    storage.set(themeKey,next);
    updateThemeButton();
  });
  if(document.body.hasAttribute("data-language-welcome")){
    const saved = storage.get(langKey);
    if(saved && allowed.includes(saved)){
      location.replace(destination(saved));
      return;
    }
    const popup = document.getElementById("languageWelcome");
    const picker = document.getElementById("welcomeLanguage");
    const proceed = document.getElementById("languageDismiss");
    if(!popup || !picker || !proceed)return;
    const browserLangs = navigator.languages || [navigator.language || "en"];
    const suggestion=browserLangs.map(v=>String(v).split("-")[0].toLowerCase()).find(v=>allowed.includes(v)) || "en";
    picker.value = suggestion;
    proceed.addEventListener("click",()=>setLang(picker.value));
    picker.addEventListener("keydown",e=>{if(e.key==="Enter")setLang(picker.value)});
    popup.addEventListener("cancel", e=>{e.preventDefault();setLang(picker.value)});
    if(typeof popup.showModal==="function") popup.showModal();
    else popup.setAttribute("open","");
  }
})();
/* Set theme before styles paint — local preference or system. */
(function(){var v;try{v=localStorage.getItem('wnb_theme_v1')}catch(_){};if(v!=='light'&&v!=='dark'){v=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=v})();

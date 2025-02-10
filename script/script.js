"use strict";

// identify device

// if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//     document.body.classList.add('__touch');
//   } else {
//     document.body.classList.add('__pc');
// };

// document.addEventListener("DOMContentLoaded", function () {
//     const body = document.body;
  
//     // Перевірка наявності тачскріна
//     const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
//     if (isTouchDevice) {
//         document.body.classList.add('__touch');
//     } else {
//         document.body.classList.add('__pc');
//     }
//   });

const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);  
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);  
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);  
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);  
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);  
    },
    webOS: function () {
      return navigator.userAgent.match(/webOS/i);  
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows() ||
            isMobile.webOS()
        );
    }
};

if (isMobile.any()) {
    document.body.classList.add('__touch');

    let menuArrows = document.querySelectorAll('.header__menu-item-arrow');

    if(menuArrows.length>0) {
      for(let i = 0; i < menuArrows.length; i++) {
        const menuArrow = menuArrows[i];
        
        menuArrow.addEventListener('click', function (e) {
          menuArrow.parentElement.classList.toggle('__active');
        });
      }
    };
} else {
    document.body.classList.add('__pc');
}

// кнопка вгору

const returnBtn = document.querySelector('.return__btn');

document.addEventListener('scroll', function () {
    if (scrollY >= 100) {
        returnBtn.classList.remove('hidden');
    }else{
        returnBtn.classList.add('hidden');
    };
});

returnBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
});

// меню бургер

const burgerIcon = document.querySelector('.burger');
const menuBody = document.querySelector('.header__menu-body');

  if(burgerIcon) {
        burgerIcon.addEventListener('click', () => {
        document.body.classList.toggle('__lock');
        burgerIcon.classList.toggle('__active');
        menuBody.classList.toggle('__active');
      })
  }


// перекидання при натисканні

const menuLinks = document.querySelectorAll('.header__menu-item[data-goto]');

if(menuLinks.length > 0){
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', onMenuLinkClick);
  });

  function onMenuLinkClick (e) {
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

        if(burgerIcon.classList.contains('__active')) {
          document.body.classList.remove('__lock');
          burgerIcon.classList.remove('__active');
          menuBody.classList.remove('__active');
        };

        window.scrollTo ({
            top: gotoBlockValue,
            behavior: 'smooth'
        });
        e.preventDefault();

    };
  };
};

// перемикання кольорових схем

const lightStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=light]');
const darkStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]');
const darkSchemeMedia = matchMedia('(prefers-color-scheme: dark)');
const switcherRadios = document.querySelectorAll('.switcher__radio');

function setupSwitcher() {
  const savedScheme = getSavedScheme();

  if (savedScheme !== null) {
    const currentRadio = document.querySelector(`.switcher__radio[value=${savedScheme}]`);
    currentRadio.checked = true;
  };

  [...switcherRadios].forEach((radio) => {
    radio.addEventListener('change', (event) => {
      setScheme(event.target.value);
    });
  });
 };

function setupScheme() {
  const savedScheme = getSavedScheme();
  const systemScheme = getSystemScheme();

  if (savedScheme === null) return;

  if (savedScheme !== systemScheme) {
    setScheme(savedScheme);
  };
};

function setScheme(scheme) {
  switchMedia(scheme);

  if (scheme === 'auto') {
    clearScheme();
  } else {
    saveScheme(scheme);
  };
};

function switchMedia(scheme) {
  let lightMedia;
  let darkMedia;

  if (scheme === 'auto') {
    lightMedia = '(prefers-color-scheme: light)';
    darkMedia = '(prefers-color-scheme: dark)';
  } else {
    lightMedia = (scheme === 'light') ? 'all' : 'not all';
    darkMedia = (scheme === 'dark') ? 'all' : 'not all';    
  };

  [...lightStyles].forEach((link) => {
    link.media = lightMedia;
  });

  [...darkStyles].forEach((link) => {
    link.media = darkMedia;
  });
  
};

function getSystemScheme() {
  const darkScheme = darkSchemeMedia.matches;

  return darkScheme ? 'dark' : 'light';
};

function getSavedScheme() {
  return localStorage.getItem('color-scheme');
};

function saveScheme(scheme) {
  return localStorage.setItem('color-scheme', scheme);
};

function clearScheme() {
  return localStorage.removeItem('color-scheme');
};

setupSwitcher();
setupScheme();

// для Інтернет експлорера

function ibg(){

  let ibg=document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
      if(ibg[i].querySelector('img')){
        ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
      }
    }
}
  
ibg();

// *************************************************************************************************
 
// перемикання мов

// const translations = {};

// const currentLanguage = document.querySelectorAll(".current-language");

// const languageSwitcher = document.querySelector(".language");

// const languageOptions = document.querySelector(".language-options");

//  const browserLanguage = navigator.language || navigator.userLanguage;

//  let browsLangVar;

//  if (browserLanguage.startsWith('uk')) {
//      browsLangVar = "uk";
//    } else if (browserLanguage.startsWith('de')) {
//      browsLangVar = "de";
//    } else {
//      browsLangVar = "en";
//  }
 
//  const loadLanguage = async (lang) => {
//      try {
//          const response = await fetch(`./languages/${lang}.json`);
//          const responseUKR = await fetch(`./languages/uk.json`);

//          Object.assign(translations, await response.json());
         

//          const translationsUKR = await responseUKR.json();
         
//          document.querySelectorAll("[data-translate]").forEach(el => {
//              const key = el.getAttribute("data-translate");
//              el.textContent = translations[key];
//              el.placeholder = translations[key]; 
            
//          });


//      } catch (error) {
//          console.error("Error loading language:", error);
//      }
//  };

 
//  const toggleLanguageOptions = (event) => {
//      languageOptions.style.display = languageOptions.style.display === "block" ? "none" : "block";
//  };


 
//  const switchLanguage = (lang) => {

//      localStorage.setItem("selectedLanguage", lang);

//      let langvar;
     
//      if (lang === "en") {
//          langvar = "Eng";
//      } else if (lang === "de") {
//          langvar = "Deu";
//      } else {
//          langvar = "Ukr";
//      };

//      for (let index = 0; index < currentLanguage.length; index++) {
//          currentLanguage[index].textContent = langvar;
//      }
   
//      loadLanguage(lang).then(() => {
//          languageOptions.style.display = "none";
//      });
//  };

 
//  const selectedLanguage = localStorage.getItem("selectedLanguage") || browsLangVar;

//  let selLangvar;

//  if (selectedLanguage === "en") {
//      selLangvar = "Eng";
//  } else if (selectedLanguage === "de") {
//      selLangvar = "Deu";
//  } else {
//      selLangvar = "Ukr";
//  };

//  for (let index = 0; index < currentLanguage.length; index++) {
//      currentLanguage[index].textContent = selLangvar;
//  }

//  loadLanguage(selectedLanguage);

//  languageSwitcher.addEventListener("click", toggleLanguageOptions);

//  languageOptions.addEventListener("click", (event) => {
//      if (event.target.getAttribute("data-lang")) {
//          switchLanguage(event.target.getAttribute("data-lang"));
//      }
//  });


 
//  document.addEventListener("click", (event) => {
//      if (!languageSwitcher.contains(event.target)) {
//          languageOptions.style.display = "none";
//      }
//  });

// *************************************************

  let translations = {}; 

  const currentLanguage = document.querySelectorAll(".current-language");
  const languageSwitcher = document.querySelector(".language");
  const languageOptions = document.querySelector(".language-options");
  const browserLanguage = navigator.language || navigator.userLanguage;

  const getLangShort = (lang) => {
      const langMap = { en: "Eng", de: "Deu", uk: "Ukr" };
      return langMap[lang] || "Eng";
  };

  const browsLangVar = browserLanguage.startsWith("uk") ? "uk" : 
                      browserLanguage.startsWith("de") ? "de" : "en";

  const loadLanguage = async (lang) => {
      try {
          translations = {}; // Очищення попередніх перекладів

          const response = await fetch(`./languages/${lang}.json`);
          Object.assign(translations, await response.json());

          let translationsUKR = {};
          if (lang !== "uk") {
              const responseUKR = await fetch(`./languages/uk.json`);
              translationsUKR = await responseUKR.json();
          }

          document.querySelectorAll("[data-translate]").forEach(el => {
              const key = el.getAttribute("data-translate");
              el.textContent = translations[key] || key;
              el.placeholder = translations[key] || "";
          });

      } catch (error) {
          console.error("Error loading language:", error);
      }
  };

  const toggleLanguageOptions = () => {
      languageOptions.classList.toggle("visible");
  };

  const switchLanguage = (lang) => {
      localStorage.setItem("selectedLanguage", lang);
      currentLanguage.forEach(el => el.textContent = getLangShort(lang));

      loadLanguage(lang).then(() => {
          languageOptions.classList.remove("visible");
      });
  };

  const selectedLanguage = localStorage.getItem("selectedLanguage") || browsLangVar;
  currentLanguage.forEach(el => el.textContent = getLangShort(selectedLanguage));
  loadLanguage(selectedLanguage);

  languageSwitcher.addEventListener("click", toggleLanguageOptions);

  languageOptions.addEventListener("click", (event) => {
      const lang = event.target.getAttribute("data-lang");
      if (lang) switchLanguage(lang);
  });

  document.addEventListener("click", (event) => {
      if (!languageSwitcher.contains(event.target) && !languageOptions.contains(event.target)) {
          languageOptions.classList.remove("visible");
      }
  });


// *************************************************

const el = document.querySelector('.output-text');
const el2 = document.querySelector('.output-text2');

// розрахунки

let t = 140;
let x;
let c = 0.0000001;
let q = 0.0000001;
let pnh3;
let pco2;
let p;
let pb;
let y;
let y11;
let y22;
let z;
let d;
let nnm;
let nnc;
let nna;
let nnk;
let nnb;
let wc;

// данні по замовчуванню

// P synthesis, bar
let pSynthesis = 140;

// L liquid (NH3:CO2)
let l = 2.85;

// W liquid (H2O:CO2)
let w = 0.47;

// P INERTS (0%..8%) (PIN%)
let pInertsPercent = 8;

let ps = pSynthesis * (1 - (pInertsPercent / 100));


let knr1 = -0.01 * pInertsPercent + 0.86;


let knr2 = 0.1395 * l + 0.3024;


let knr = (knr1 >= knr2) ? knr1 : knr2;


let dp = 100;

// *************************************************

// основний варіант

let kpa = 1.09;

let kpc = 0.65;

let kpb = 1.2;

// *************************************************

let firstCicleIteration = 0;

while (dp > 0.1) {

  let msg1 = `Ітерація: ${firstCicleIteration}`;

  t += 0.01;

  let pb0 = Math.exp(-4916.583 / (t + 273) + 13.19548) * kpb;

  let hc = (59.88 * t - 6976.67) * kpc;

  // let pa0 = (10 ^ (5.48 - 1400 / (t + 273))) * kpa;
  let pa0 = (Math.pow(10, (5.48 - 1400 / (t + 273)))) * kpa;

  let c1 = 0;

  let x1 = 0;

  let r = 1;

  let k2 = Math.pow(10, (2331.19 / (t + 273) - 3.305));


  k2 = k2 * knr;


  let k4 = Math.pow(10, (3566.154 / (t + 273) - 5.8));

  let k3 = k2 / k4;

  // Ітераційний цикл для досягнення збіжності C та X
  let converged = false;

  while (!converged) {

    // Блок "2": розрахунок X
    let a = -1 / k3 - 1;
    let b = 2 - l - 3 * c - w / k3 - w;
    let z = (1 - c) * (l + w + 2 * c - 1);
    
    // Обчислення дискримінанту для квадратного рівняння
    const discriminant = b * b - 4 * a * z;
    // Захист від уявних коренів (якщо дискримінант негативний, можна припинити обчислення або обробити помилку)
    if (discriminant < 0) {
      throw new Error('Негативний дискримінант при обчисленні X');
    }
    x = (-b - Math.sqrt(discriminant)) / (2 * a);
    
    // Перерахунок коефіцієнтів для ітераційного обчислення C (блок "3")
    a = 4 * k2;
    b = 4 * k2 * (l - 2);
    z = k2 * Math.pow(l - 2, 2) - 2 * x * (x + w);
    let d = -x * (x + w) * (l + x + w - 1);
    
    // Внутрішня ітерація для розрахунку C
    let innerConverged = false;
    while (!innerConverged) {
      const poly = a * Math.pow(q, 3) + b * Math.pow(q, 2) + z * q + d;
      const y11 = poly * (1 - q);
      const y22 = -poly + (a + b + z + d);
      const y = y11 / y22;
      
      c = q - y;
      q = c;
      
      // Якщо значення полінома дорівнює нулю або зміна дуже мала, виходимо з внутрішнього циклу
      if (Math.abs(a * Math.pow(c, 3) + b * Math.pow(c, 2) + z * c + d) == 0) {
        innerConverged = true;
      }

      if (Math.abs(y) <= 0.00001) {
        innerConverged = true;
      }
      // Якщо не збіжилось, цикл повторюється автоматично
    }
    
    // Блок "4": перевірка збіжності C та X
    if (Math.abs(c - c1) > 0.00001 || Math.abs(x - x1) > 0.00001) {
      c1 = c;
      x1 = x;
      // Якщо значення не збіглися, повертаємося до блоку "2" (повторюємо зовнішній цикл)
      continue; // цикл while(!converged) повториться
    } else {
      converged = true; // збіжність досягнута
    }
    
  }

    firstCicleIteration++;

    // Розрахунок балансу (молярних часток)
    // Використовуємо X, яке отримано в ітераціях (можна використовувати X1, що дорівнює X після збіжності)
  const n = l + x + w + 2 * c - 1;

    nnb = (x + w) / n;
    nna = (l - 2 * (1 - c)) / n;
    nnm = x / n;
    nnc = c / n;
    nnk = (1 - c - x) / n;
    
    // Обчислення часткових тисків компонентів
  pb = pb0 * nnb;

  pco2 = hc * nnc;

  pnh3 = pa0 * nna;

    
    // Загальний тиск
  p = pb + pco2 + pnh3;

    
    // Обчислюємо різницю між розрахованим тиском та заданим значенням
  dp = Math.abs(p - ps);

    
  // Цикл while( DP > 0.1 ) продовжиться, якщо DP не менше за 0.1

}

// Обчислення молекулярного балансу
let np = 1 + l + w - x;
let ncp = (1 - x) / np;
let nap = (l - 2 * x) / np;
let nbp = (w + x) / np;
let nmp = x / np;

let gp = 44 * (1 - x) + 17 * (l - 2 * x) + 18 * (w + x) + 60 * x;
let wcp = 44 * (1 - x) / gp;
let wap = 17 * (l - 2 * x) / gp;
let wbp = 18 * (w + x) / gp;
let wmp = 60 * x / gp;

let gm = x * 60;
let gb = (x + w) * 18;
let gc = c * 44;
let gk = (1 - c - x) * 78;
let ga = (l - 2 + 2 * c) * 17;

let g = gm + gb + gc + gk + ga;

let m = gm / g;
let b = gb / g;
c = gc / g;
let k = gk / g;
let a = ga / g;

let nh3 = pnh3 / p;
let co2 = pco2 / p;
let h2o = pb / p;

let wg = nh3 * 17 + co2 * 44 + h2o * 18;
let wa = 17 * nh3 / wg;
wc = 44 * co2 / wg;
let wb = 18 * h2o / wg;

let lgas = nh3 / co2;
let wgas = h2o / co2;

let PINert = pSynthesis - p;

let msgtotal = `<pre>
Вхідні данні:
-------------

P synthesis:        ${pSynthesis}

L liquid (NH3:CO2): ${l}

W liquid (H2O:CO2): ${w}

P INERTS (0%..8%):  ${pInertsPercent}

T = ${t.toFixed(2)}


Проміжні данні:
---------------

KNR = ${knr}

Ітерацій: ${firstCicleIteration}


Вихідні данні:
--------------

P Synthesis = ${pSynthesis} bar

P inert = ${PINert.toFixed(2)} bar

P NH3+CO2+H2O = ${p.toFixed(2)} bar

L = ${l}

W = ${w}

X(conversion, Liquid) = ${(x * 100).toFixed(2)} %

Liquid, %:   MASS    MOL    MASS    MOL
CO(NH2)2 =  ${(m * 100).toFixed(2)}  ${(nnm * 100).toFixed(2)}   ${(wmp * 100).toFixed(2)}   ${(nmp * 100).toFixed(2)}
CO2 =        ${(c * 100).toFixed(2)}   ${(nnc * 100).toFixed(2)}   ${(wcp * 100).toFixed(2)}   ${(ncp * 100).toFixed(2)}
NH3 =       ${(a * 100).toFixed(2)}  ${(nna * 100).toFixed(2)}   ${(wap * 100).toFixed(2)}   ${(nap * 100).toFixed(2)} 
NH2COONH4 = ${(k * 100).toFixed(2)}  ${(nnk * 100).toFixed(2)}     wkp     nkp
H2O=        ${(b * 100).toFixed(2)}  ${(nnb * 100).toFixed(2)}   ${(wbp * 100).toFixed(2)}   ${(nbp * 100).toFixed(2)}

Gas (without Inerts), %:
      MASS    MOL
CO2 = ${(wc * 100).toFixed(2)}  ${(co2 * 100).toFixed(2)}
NH3 =  ${(wa * 100).toFixed(2)}   ${(nh3 * 100).toFixed(2)}
H2O =  ${(wb * 100).toFixed(2)}   ${(h2o * 100).toFixed(2)}

L(gas) = ${lgas.toFixed(2)} 
W(gas) = ${wgas.toFixed(2)} 


</pre>`;


el2.innerHTML = msgtotal;
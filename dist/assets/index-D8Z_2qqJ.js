(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const b of o.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&a(b)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();const g=[{id:1,name:"Cappuccino",category:"Espresso",price:120,emoji:"☕",desc:"Rich espresso with velvety steamed milk foam. Classic Italian perfection.",badge:"Popular"},{id:2,name:"Latte",category:"Latte",price:140,emoji:"🥛",desc:"Smooth espresso blended with creamy steamed milk. Soft and satisfying.",badge:""},{id:3,name:"Mocha",category:"Specialty",price:140,emoji:"🍫",desc:"Espresso meets rich chocolate sauce topped with whipped cream.",badge:""},{id:4,name:"Americano",category:"Espresso",price:90,emoji:"🖤",desc:"Bold double espresso diluted with hot water for a long, clean cup.",badge:""},{id:5,name:"Flat White",category:"Latte",price:150,emoji:"☕",desc:"Concentrated espresso with microfoam milk. Stronger than a latte.",badge:"New"},{id:6,name:"Cold Brew",category:"Cold",price:170,emoji:"🧊",desc:"Steeped 18 hours in cold water for an ultra-smooth, low-acidity concentrate.",badge:"Popular"},{id:7,name:"Matcha Latte",category:"Specialty",price:180,emoji:"🍵",desc:"Ceremonial-grade Japanese matcha whisked with oat milk. Earthy and refreshing.",badge:"New"},{id:8,name:"Espresso",category:"Espresso",price:80,emoji:"⚫",desc:"A single, perfectly pulled shot of intense, aromatic espresso.",badge:""},{id:9,name:"Caramel Macchiato",category:"Latte",price:165,emoji:"🍮",desc:"Vanilla syrup, steamed milk, espresso, and silky caramel drizzle.",badge:"Popular"},{id:10,name:"Iced Latte",category:"Cold",price:155,emoji:"🧋",desc:"Espresso poured over ice with cold milk. Chilled and refreshing.",badge:""},{id:11,name:"Cortado",category:"Espresso",price:110,emoji:"☕",desc:"Equal parts espresso and warm milk. Bold yet balanced.",badge:""},{id:12,name:"Chai Latte",category:"Specialty",price:160,emoji:"🫖",desc:"Spiced black tea concentrate blended with creamy steamed oat milk.",badge:""}];function S(){const t=new Set,e=[];for(const r of g)t.has(r.category)||(t.add(r.category),e.push(r.category));return e}const $="bodren_cart_v1";let i=O();function O(){try{const t=localStorage.getItem($);if(!t)return[];const e=JSON.parse(t);return Array.isArray(e)?e:[]}catch{return[]}}function h(){localStorage.setItem($,JSON.stringify(i))}function R(){return[...i]}function D(t){const e=i.find(r=>r.id===t.id);if(e)e.qty+=1;else{const r={id:t.id,name:t.name,price:t.price,emoji:t.emoji,qty:1};i.push(r)}h()}function N(t,e){const r=i.findIndex(n=>n.id===t);if(r===-1)return;const a=i[r].qty+e;a<=0?i.splice(r,1):i[r].qty=a,h()}function H(t){i=i.filter(e=>e.id!==t),h()}function Q(){i=[],h()}function U(){return i.reduce((t,e)=>t+e.qty,0)}function W(){return i.reduce((t,e)=>t+e.price*e.qty,0)}const u=Object.freeze({DEFAULT:"default",PRICE_ASC:"price-asc",PRICE_DESC:"price-desc"});function V(t,e){const r=e.trim().toLowerCase();return r?t.filter(a=>a.name.toLowerCase().includes(r)):[...t]}function K(t,e){return!e||e==="All"?[...t]:t.filter(r=>r.category===e)}function G(t,e){const r=[...t];switch(e){case u.PRICE_ASC:return r.sort((a,n)=>a.price-n.price);case u.PRICE_DESC:return r.sort((a,n)=>n.price-a.price);case u.DEFAULT:default:return r.sort((a,n)=>a.id-n.id)}}function J(t,{query:e="",category:r="All",sortKey:a=u.DEFAULT}){let n=V(t,e);return n=K(n,r),n=G(n,a),n}const E=document.getElementById("products-grid"),Y=document.getElementById("category-filters"),v=document.getElementById("cart-items-list"),B=document.getElementById("cart-badge"),Z=document.getElementById("cart-total-price"),x=document.getElementById("empty-state"),f=document.getElementById("cart-drawer"),m=document.getElementById("cart-overlay"),y=document.getElementById("cart-toggle-btn"),A=document.getElementById("cart-close-btn");function j(){f.classList.add("is-open"),m.classList.add("is-visible"),f.setAttribute("aria-hidden","false"),m.setAttribute("aria-hidden","false"),y.setAttribute("aria-expanded","true"),A.focus()}function X(){f.classList.remove("is-open"),m.classList.remove("is-visible"),f.setAttribute("aria-hidden","true"),m.setAttribute("aria-hidden","true"),y.setAttribute("aria-expanded","false"),y.focus()}function ee(t,e){y.addEventListener("click",t),A.addEventListener("click",e),m.addEventListener("click",e),document.addEventListener("keydown",r=>{r.key==="Escape"&&e()})}function T(t){if(t.length===0){E.innerHTML="",x.classList.remove("hidden");return}x.classList.add("hidden"),E.innerHTML=t.map(e=>`
      <article class="product-card" data-product-id="${e.id}">
        ${e.badge?`<span class="product-badge">${e.badge}</span>`:""}
        <div class="product-card-emoji" aria-hidden="true">${e.emoji}</div>
        <div class="product-card-body">
          <h3 class="product-card-name">${c(e.name)}</h3>
          <span class="product-card-category">${c(e.category)}</span>
          <p class="product-card-desc">${c(e.desc)}</p>
        </div>
        <div class="product-card-footer">
          <span class="product-card-price">${e.price} ₽</span>
          <button
            type="button"
            class="btn-add-to-cart"
            data-product-id="${e.id}"
            aria-label="Add ${c(e.name)} to cart"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
            Add to Cart
          </button>
        </div>
      </article>`).join("")}function P(t,e){const r=["All",...t];Y.innerHTML=r.map(a=>`
      <button
        type="button"
        class="category-chip${a===e?" is-active":""}"
        data-category="${a}"
        aria-pressed="${a===e}"
      >
        ${c(a)}
      </button>`).join("")}function te(t){if(t.length===0){v.innerHTML=`
      <div class="cart-empty">
        <p class="cart-empty-icon">☕</p>
        <p class="cart-empty-text">Your cart is empty.<br/>Add a drink to get started!</p>
      </div>`;return}v.innerHTML=t.map(e=>`
      <div class="cart-item" data-cart-item-id="${e.id}">
        <span class="cart-item-emoji" aria-hidden="true">${e.emoji}</span>
        <div class="cart-item-info">
          <span class="cart-item-name">${c(e.name)}</span>
          <span class="cart-item-unit-price">${e.price} ₽ each</span>
        </div>
        <div class="cart-item-qty-controls">
          <button
            type="button"
            class="qty-btn"
            data-action="decrement"
            data-product-id="${e.id}"
            aria-label="Decrease quantity of ${c(e.name)}"
          >−</button>
          <span class="qty-value" aria-label="Quantity: ${e.qty}">${e.qty}</span>
          <button
            type="button"
            class="qty-btn"
            data-action="increment"
            data-product-id="${e.id}"
            aria-label="Increase quantity of ${c(e.name)}"
          >+</button>
        </div>
        <div class="cart-item-subtotal">${e.price*e.qty} ₽</div>
        <button
          type="button"
          class="cart-item-remove"
          data-action="remove"
          data-product-id="${e.id}"
          aria-label="Remove ${c(e.name)} from cart"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>`).join("")}function re(t){B.textContent=t,B.classList.toggle("has-items",t>0)}function ne(t){Z.textContent=`${t} ₽`}function ae(t){E.addEventListener("click",e=>{const r=e.target.closest(".btn-add-to-cart");if(!r)return;const a=Number(r.dataset.productId);a&&t(a)})}function oe(t,e){v.addEventListener("click",r=>{const a=r.target.closest("[data-action]");if(!a)return;const n=Number(a.dataset.productId);if(!n)return;const o=a.dataset.action;o==="increment"?t(n,1):o==="decrement"?t(n,-1):o==="remove"&&e(n)})}function c(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const w=[{question:"How do you like your coffee strength?",options:[{text:"Light & mild",result:"Latte"},{text:"Balanced",result:"Cappuccino"},{text:"Bold & intense",result:"Espresso"},{text:"Extra strong",result:"Cold Brew"}]},{question:"What flavor notes do you enjoy most?",options:[{text:"Creamy & sweet",result:"Caramel Macchiato"},{text:"Chocolatey",result:"Mocha"},{text:"Earthy & green",result:"Matcha Latte"},{text:"Spiced & warm",result:"Chai Latte"}]},{question:"What time of day are you having coffee?",options:[{text:"Morning kick-start",result:"Espresso"},{text:"Lazy morning",result:"Flat White"},{text:"Afternoon pick-me-up",result:"Iced Latte"},{text:"Any time!",result:"Cappuccino"}]}],ie={Latte:"Smooth, creamy, and comforting — perfect for those who enjoy a gentle coffee experience.",Cappuccino:"A timeless Italian classic with the perfect balance of espresso and velvety foam.",Espresso:"Pure, concentrated intensity — for those who mean serious business.","Cold Brew":"Ultra-smooth and naturally sweet cold concentrate. Zero acidity, maximum flavour.","Caramel Macchiato":"Sweet, silky, and indulgent — a dessert in a cup.",Mocha:"Rich espresso meets chocolate. The best of both worlds.","Matcha Latte":"Earthy, vibrant, and energising — a mindful alternative to coffee.","Chai Latte":"Warm spices and creamy milk — cozy comfort in every sip.","Flat White":"Stronger than a latte, smoother than a cappuccino. Perfectly balanced.","Iced Latte":"Chilled espresso over ice. Refreshingly simple."};let l=0,d=[];const _=document.getElementById("quiz-start-view"),z=document.getElementById("quiz-question-view"),M=document.getElementById("quiz-result-view"),ce=document.getElementById("quiz-progress"),se=document.getElementById("quiz-question-text"),C=document.getElementById("quiz-options"),de=document.getElementById("quiz-result-name"),le=document.getElementById("quiz-result-desc"),q=document.getElementById("quiz-start-btn"),k=document.getElementById("quiz-restart-btn");function L(t){[_,z,M].forEach(e=>e.classList.add("hidden")),t.classList.remove("hidden")}function F(){const t=w[l];ce.textContent=`Question ${l+1} of ${w.length}`,se.textContent=t.question,C.innerHTML=t.options.map((e,r)=>`
      <button
        type="button"
        class="quiz-option-btn"
        data-result="${e.result}"
        data-index="${r}"
      >${e.text}</button>`).join(""),L(z)}function ue(t){d.push(t),l<w.length-1?(l++,F()):me()}function me(){const t={};d.forEach(a=>{t[a]=(t[a]||0)+1});let e=d[d.length-1],r=0;for(const[a,n]of Object.entries(t))n>r&&(r=n,e=a);de.textContent=e,le.textContent=ie[e]||"A wonderful coffee choice — enjoy every sip!",L(M)}function pe(){l=0,d=[],L(_)}function fe(){!q||!k||!C||(q.addEventListener("click",()=>{l=0,d=[],F()}),k.addEventListener("click",pe),C.addEventListener("click",t=>{const e=t.target.closest(".quiz-option-btn");e&&ue(e.dataset.result)}))}const s={query:"",category:"All",sortKey:u.DEFAULT};function I(){const t=J(g,s);T(t)}function p(){te(R()),re(U()),ne(W())}function ye(t){const e=g.find(r=>r.id===t);e&&(D(e),p(),j())}function ge(t,e){N(t,e),p()}function he(t){H(t),p()}function be(){Q(),p()}function Ee(t){s.query=t.target.value,I()}function ve(t){s.sortKey=t.target.value,I()}function we(t){const e=t.target.closest(".category-chip");if(!e)return;const r=e.dataset.category;s.category!==r&&(s.category=r,P(S(),s.category),I())}function Ce(){const t=document.getElementById("site-header");t&&window.addEventListener("scroll",()=>{t.classList.toggle("is-scrolled",window.scrollY>60)},{passive:!0})}function Le(){T(g),P(S(),s.category),p(),ee(()=>j(),()=>X()),ae(ye),oe(ge,he);const t=document.getElementById("clear-cart-btn");t&&t.addEventListener("click",be);const e=document.getElementById("search-input");e&&e.addEventListener("input",Ee);const r=document.getElementById("sort-select");r&&r.addEventListener("change",ve);const a=document.getElementById("category-filters");a&&a.addEventListener("click",we),fe(),Ce()}Le();

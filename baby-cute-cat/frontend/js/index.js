!function(){"use strict";window.Shopify=window.Shopify||{},window.Shopify.recaptchaV3=window.Shopify.recaptchaV3||{siteKey:""},window.Shopify.recaptchaV3.hideBadge=function(){if(null===document.querySelector("p[data-spam-detection-disclaimer]"))return;const t=document.createElement("style");document.head.appendChild(t);t.sheet.insertRule(".grecaptcha-badge { visibility: hidden; }")},window.Shopify.recaptchaV3.initialize=function(){document.querySelectorAll(['form[action^="/contact"] input[name="form_type"][value="contact"]','form[action^="/blogs"] input[name="form_type"][value="new_comment"]','form[action^="/account"] input[name="form_type"][value="customer_login"]','form[action^="/account"] input[name="form_type"][value="recover_customer_password"]','form[action^="/account"] input[name="form_type"][value="create_customer"]'].join(", ")).forEach((function(t){var e=t.form,n=t.getAttribute("value");e.setAttribute("onsubmit",`window.Shopify.recaptchaV3.addToken(this, "${n}"); return false;`)}))},window.Shopify.recaptchaV3.addToken=function(t,e){grecaptcha.execute(window.Shopify.recaptchaV3.siteKey,{action:e}).then((function(e){var n=t.querySelector("input[name=recaptcha-v3-token]");n instanceof HTMLElement?n.setAttribute("value",e):((n=document.createElement("input")).setAttribute("name","recaptcha-v3-token"),n.setAttribute("type","hidden"),n.setAttribute("value",e),t.appendChild(n,t)),t.submit()}))},window.storefrontContactFormsRecaptchaCallback=function(){window.Shopify.recaptchaV3.initialize(),window.Shopify.recaptchaV3.hideBadge()};const t=document.createElement("script");t.setAttribute("src","https://www.recaptcha.net/recaptcha/api.js?onload=storefrontContactFormsRecaptchaCallback&render="+window.Shopify.recaptchaV3.siteKey+"&hl=en"),document.body.appendChild(t)}();
//# sourceMappingURL=index.js.map

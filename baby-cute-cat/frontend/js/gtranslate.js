// show the language selector
window.gtranslate_installed = true;
var gtranslate_wrapper = document.getElementById('gtranslate_wrapper');
if(gtranslate_wrapper != null)
    gtranslate_wrapper.style.display = 'block';

 if(typeof GTranslateGetCurrentLang != 'function')
 function GTranslateGetCurrentLang() {
     var keyValue = document.cookie.match('(^|;) ?googtrans=([^;]*)(;|$)');
     return keyValue ? keyValue[2].split('/')[2] : null;
    }

 function gt_loadScript(url,callback){
     var script=document.createElement("script");
     script.type="text/javascript";
     if(script.readyState){
         script.onreadystatechange=function(){
             if(script.readyState=="loaded"||script.readyState=="complete"){
                 script.onreadystatechange=null;callback()
                }
            }
        } else {
            script.onload=function(){
                callback()
            }
        }
        // script.src=url;document.getElementsByTagName("head")[0].appendChild(script)
    }

 var gtSwitcherJS = function($){$(document).ready(function() {
     var allowed_languages = ["zh-CN","zh-TW","en","ja","ko"];
     var accept_language = navigator.language.toLowerCase() || navigator.userLanguage.toLowerCase();
     switch(accept_language) 
     {
         case 'zh-cn': var preferred_language = 'zh-CN'; break;
         case 'zh': var preferred_language = 'zh-CN'; break;
         case 'zh-tw': var preferred_language = 'zh-TW'; break;
         case 'zh-hk': var preferred_language = 'zh-TW'; break;
         case 'he': var preferred_language = 'iw'; break;
         
         default: var preferred_language = accept_language.substr(0, 2); 
         break;
    }
    if(preferred_language != 'en' && typeof navigator.userAgent != 'undefined' && /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent) == false && GTranslateGetCurrentLang() == null && document.cookie.match('gt_auto_switch') == null && allowed_languages.indexOf(preferred_language) >= 0){
        window.gt_autoswitch_interval = setInterval(function(){
            if(typeof window.gtranslate_installed == 'undefined')
            return;
            clearInterval(window.gt_autoswitch_interval);
            doGTranslate('en|'+preferred_language);
            document.cookie = 'gt_auto_switch=1; expires=Thu, 05 Dec 2030 08:08:08 UTC; path=/;';
            },500);
        }
    });
}

 gt_loadScript("//code.jquery.com/jquery-1.12.4.min.js", function(){
     jQuery_gtranslate = jQuery.noConflict(true);gtSwitcherJS(jQuery_gtranslate);});

 if(typeof GTranslateGetCurrentLang != 'function')function GTranslateGetCurrentLang() {
     var keyValue = document.cookie.match('(^|;) ?googtrans=([^;]*)(;|$)');
     return keyValue ? keyValue[2].split('/')[2] : null;}
 function GTranslateFireEvent(element,event){try{if(document.createEventObject){
     var evt=document.createEventObject();element.fireEvent('on'+event,evt)
    } else {
        var evt=document.createEvent('HTMLEvents');evt.initEvent(event,true,true);element.dispatchEvent(evt)
    }
}catch(e){}}
 function doGTranslate(lang_pair){
     if(lang_pair.value)lang_pair=lang_pair.value;
        if(lang_pair=='')return;
        var lang=lang_pair.split('|')[1];
        if(GTranslateGetCurrentLang() == null && lang == lang_pair.split('|')[0])
        return;
        if(typeof ga == 'function'){ga('send', 'event', 'GTranslate', lang, location.hostname+location.pathname+location.search);
    }else{
        if(typeof _gaq!='undefined')_gaq.push(['_trackEvent', 'GTranslate', lang, location.hostname+location.pathname+location.search]);
    }
    var teCombo;
    var sel=document.getElementsByTagName('select');
    for(var i=0;i<sel.length;i++)
    if(/goog-te-combo/.test(sel[i].className))teCombo=sel[i];
    if(document.getElementById('google_translate_element2')==null||document.getElementById('google_translate_element2').innerHTML.length==0||teCombo.length==0||teCombo.innerHTML.length==0){setTimeout(function(){doGTranslate(lang_pair)},500)}else{teCombo.value=lang;GTranslateFireEvent(teCombo,'change');GTranslateFireEvent(teCombo,'change')}}

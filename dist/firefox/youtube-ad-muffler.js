(()=>{"use strict";var e={238:function(e,t,n){var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(o,d){function a(e){try{s(i.next(e))}catch(e){d(e)}}function u(e){try{s(i.throw(e))}catch(e){d(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}s((i=i.apply(e,t||[])).next())}))},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const d=o(n(581));!function(){i(this,void 0,void 0,(function*(){const e=new d.default;let t=null,n=!1;function o(){var e;return"0px"===(null===(e=null==t?void 0:t.querySelector(".ytp-volume-slider-handle"))||void 0===e?void 0:e.style.left)}function a(){var e;null===(e=null==t?void 0:t.querySelector(".ytp-mute-button"))||void 0===e||e.click()}function u(){if(!t)return;o()||a();const e=t.querySelector("video");e&&(e.style.filter="grayscale(1) brightness(0.2)",e.playbackRate=16),n=!0}e.onOpenedVideoPage((()=>i(this,void 0,void 0,(function*(){t=e.getYoutubePlayer()})))),e.onClosedVideoPage((()=>i(this,void 0,void 0,(function*(){t=null})))),e.onAdStarted((()=>{u()})),e.onAdPlaying((()=>{n||u()})),e.onNextAd((()=>{n=!1,u()})),e.onAdEnded((()=>{!function(){if(!t)return;o()&&a();const e=t.querySelector("video");e&&(e.style.filter="none",e.playbackRate=1),n=!1}()})),e.startListener()}))}()},581:function(e,t){var n,i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(o,d){function a(e){try{s(i.next(e))}catch(e){d(e)}}function u(e){try{s(i.throw(e))}catch(e){d(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}s((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.OpenedVideoPage="yt-ad-muffler-video-page-open",e.NextVideoPage="yt-ad-muffler-video-page-new",e.ClosedVideoPage="yt-ad-muffler-video-page-close",e.AdStart="yt-ad-muffler-ad-start",e.AdPlaying="yt-ad-muffler-ad-playing",e.AdNext="yt-ad-muffler-ad-next",e.AdEnd="yt-ad-muffler-ad-end"}(n||(n={})),t.default=class{constructor(){this.location=null,this.videoId=null,this.ytdPlayer=null,this.adId=null,this.isRunningCheck=!1}startListener(){this.setupPageChangeListeners(),this.checkForPageChanges()}setupPageChangeListeners(){let e=[];const t=()=>{document.querySelectorAll("video").forEach((t=>{e.includes(t)||(e.push(t),t.addEventListener("canplay",(()=>this.checkForPageChanges())),t.addEventListener("canplaythrough",(()=>this.checkForPageChanges())),t.addEventListener("playing",(()=>this.checkForPageChanges())))}))};t(),document.addEventListener("yt-navigate-start",(()=>{t(),this.checkForPageChanges()})),document.addEventListener("yt-navigate-finish",(()=>{t(),this.checkForPageChanges()}))}waitForYoutubePlayer(){return Promise.race([new Promise((e=>{let t=document.getElementById("ytd-player");if(null==t?void 0:t.querySelector("video"))return e(t);const n=new MutationObserver((()=>{t||(t=document.getElementById("ytd-player")),(null==t?void 0:t.querySelector("video"))&&(n.disconnect(),e(t))}));n.observe(document.body,{childList:!0,subtree:!0})})),new Promise((e=>setTimeout(e,1e4,null)))])}getYoutubeVideoId(){return new URL(window.location.href).searchParams.get("v")}checkForPageChanges(){var e,t;return i(this,void 0,void 0,(function*(){if(this.isRunningCheck)return;this.isRunningCheck=!0;const i=window.location.href;if(i!==this.location){const e=this.getYoutubeVideoId();e!==this.videoId&&(null===this.videoId?(this.ytdPlayer=yield this.waitForYoutubePlayer(),this.dispatchYoutubeEvent(n.OpenedVideoPage)):null===e?(this.ytdPlayer=null,this.dispatchYoutubeEvent(n.ClosedVideoPage)):this.dispatchYoutubeEvent(n.NextVideoPage),this.videoId=e),this.location=i}if(!this.videoId)return void(this.isRunningCheck=!1);if(!this.ytdPlayer&&(this.ytdPlayer=yield this.waitForYoutubePlayer(),!this.ytdPlayer))return void(this.isRunningCheck=!1);const o=null!==(t=null===(e=this.ytdPlayer.querySelector(".ytp-ad-visit-advertiser-button"))||void 0===e?void 0:e.getAttribute("aria-label"))&&void 0!==t?t:null;o!==this.adId&&(null===this.adId?this.dispatchYoutubeEvent(n.AdStart):null===o?this.dispatchYoutubeEvent(n.AdEnd):this.dispatchYoutubeEvent(n.AdNext),this.adId=o),this.adId&&this.dispatchYoutubeEvent(n.AdPlaying),this.isRunningCheck=!1}))}dispatchYoutubeEvent(e){document.dispatchEvent(new CustomEvent(e))}addYoutubeEventListener(e,t){document.addEventListener(e,(()=>{t()}))}getYoutubePlayer(){return this.ytdPlayer}onOpenedVideoPage(e){this.addYoutubeEventListener(n.OpenedVideoPage,(()=>e()))}onNextVideoPage(e){this.addYoutubeEventListener(n.NextVideoPage,(()=>e()))}onClosedVideoPage(e){this.addYoutubeEventListener(n.ClosedVideoPage,(()=>e()))}onAdStarted(e){this.addYoutubeEventListener(n.AdStart,(()=>e()))}onAdPlaying(e){this.addYoutubeEventListener(n.AdPlaying,(()=>e()))}onAdEnded(e){this.addYoutubeEventListener(n.AdEnd,(()=>e()))}onNextAd(e){this.addYoutubeEventListener(n.AdNext,(()=>e()))}}}},t={};!function n(i){var o=t[i];if(void 0!==o)return o.exports;var d=t[i]={exports:{}};return e[i].call(d.exports,d,d.exports,n),d.exports}(238)})();
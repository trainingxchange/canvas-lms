(function(){var t=function(t,n){return function(){return t.apply(n,arguments)}};define(["jquery","jst/gradebook_uploads_form","jqueryui/dialog"],function(n,o){var i;return i=function(){function i(n){this.context_url=n,this.init=t(this.init,this),this.init()}return i.prototype.init=function(t){var i,r;return null==t&&(t={context_url:this.context_url}),r={download_gradebook_csv_url:""+t.context_url+"/gradebook.csv",action:""+t.context_url+"/gradebook_uploads",authenticityToken:ENV.AUTHENTICITY_TOKEN},i=n(o(r)),i.dialog({bgiframe:!0,modal:!0,width:720,resizable:!1,close:function(){return i.remove()}}).fixDialogButtons()},i}()})}).call(this);
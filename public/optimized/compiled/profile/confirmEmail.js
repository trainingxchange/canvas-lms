(function(){define(["jquery","i18n!profile","compiled/fn/preventDefault","jquery.ajaxJSON","compiled/jquery.rails_flash_notifications"],function(e,n,t){return e(function(){var i;return i=!1,e(".re_send_confirmation_link").click(t(function(){var t,r;return t=e(this),r=t.text(),i?void 0:(i=!0,t.text(n.t("resending","resending...")),e.ajaxJSON(t.attr("href"),"POST",{},function(){return i=!1,t.text(r),e.flashMessage(n.t("done_resending","Done! Message delivery may take a few minutes."))},function(){return i=!1,t.text(r),e.flashError(n.t("failed_resending","Request failed. Try again."))}))}))})})}).call(this);
(function(){define(["jquery","jquery.google-analytics"],function(t){return t("body").on("click","[data-track-category]",function(){var a,c,r,n,e;return e=t(this).data(),c=e.trackCategory,r=e.trackLabel,a=e.trackAction,n=e.trackValue,t.trackEvent(c,a,r,n),null})})}).call(this);
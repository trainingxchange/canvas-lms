(function(){define(["jquery","i18n!media_comments"],function(n){var t;return t=function(){function t(){}return t.prototype.loadTabs=function(t){return n.get("/partials/_media_comments.html",function(e){return t(e),n("#media_comment_dialog")})},t}()})}).call(this);
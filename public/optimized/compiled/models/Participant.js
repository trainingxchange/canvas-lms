(function(){var t={}.hasOwnProperty,n=function(n,r){function o(){this.constructor=n}for(var e in r)t.call(r,e)&&(n[e]=r[e]);return o.prototype=r.prototype,n.prototype=new o,n.__super__=r.prototype,n};define(["Backbone","i18n!discussions.participant"],function(t,r){var o,e;return o=function(t){function o(){return e=o.__super__.constructor.apply(this,arguments)}return n(o,t),o.prototype.defaults={avatar_image_url:"",display_name:r.t("anonymous_user","Anonymous"),id:null},o}(t.Model)})}).call(this);
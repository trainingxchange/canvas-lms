(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e={}.hasOwnProperty,r=function(t,r){function n(){this.constructor=t}for(var o in r)e.call(r,o)&&(t[o]=r[o]);return n.prototype=r.prototype,t.prototype=new n,t.__super__=r.prototype,t};define(["jst/ExternalTools/AppCenterView","compiled/views/PaginatedCollectionView","compiled/views/ExternalTools/AppThumbnailView"],function(e,n,o){var i,a;return i=function(n){function i(){return this.renderItem=t(this.renderItem,this),a=i.__super__.constructor.apply(this,arguments)}return r(i,n),i.prototype.filterText="",i.prototype.targetInstalledState="all",i.prototype.template=e,i.prototype.itemView=o,i.prototype.renderItem=function(t){var e,r,n,o,a;return r=new RegExp(this.filterText,"i"),n=t.get("is_installed")||!1,o=t.get("name")||"",e=t.get("categories")||[],a=!0,"not_installed"===this.targetInstalledState&&n?a=!1:"installed"!==this.targetInstalledState||n||(a=!1),a&&(o.match(r)||e.join().match(r))?i.__super__.renderItem.apply(this,arguments):void 0},i}(n)})}).call(this);
(function(){var t={}.hasOwnProperty,e=function(e,o){function i(){this.constructor=e}for(var n in o)t.call(o,n)&&(e[n]=o[n]);return i.prototype=o.prototype,e.prototype=new i,e.__super__=o.prototype,e};define(["jquery","Backbone","jst/searchView","compiled/views/SearchMixin"],function(t,o,i,n){var r,c;return r=function(t){function o(){return c=o.__super__.constructor.apply(this,arguments)}return e(o,t),o.mixin(n),o.child("inputFilterView",".inputFilterView"),o.child("collectionView",".collectionView"),o.prototype.template=i,o.prototype.toJSON=function(){return{collection:this.collection}},o}(o.View)})}).call(this);
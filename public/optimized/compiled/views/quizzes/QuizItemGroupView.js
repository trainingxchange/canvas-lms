(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e={}.hasOwnProperty,r=function(t,r){function n(){this.constructor=t}for(var o in r)e.call(r,o)&&(t[o]=r[o]);return n.prototype=r.prototype,t.prototype=new n,t.__super__=r.prototype,t};define(["jquery","underscore","compiled/views/CollectionView","compiled/views/PublishIconView","jst/quizzes/QuizItemGroupView","compiled/views/quizzes/QuizItemView"],function(e,n,o,i,p,c){var u,s;return u=function(n){function o(){return this.renderItem=t(this.renderItem,this),s=o.__super__.constructor.apply(this,arguments)}return r(o,n),o.prototype.template=p,o.prototype.itemView=c,o.prototype.tagName="div",o.prototype.className="item-group-condensed",o.prototype.events={"click .ig-header .element_toggler":"clickHeader"},o.prototype.clickHeader=function(t){return e(t.currentTarget).find("i").toggleClass("icon-mini-arrow-down").toggleClass("icon-mini-arrow-right")},o.prototype.isEmpty=function(){return this.collection.isEmpty()||this.collection.all(function(t){return t.get("hidden")})},o.prototype.attachCollection=function(){return this.collection.on("change:hidden",this.render)},o.prototype.render=function(){return o.__super__.render.apply(this,arguments),this.$el.find(".no_content").toggle(this.isEmpty()),this},o.prototype.renderItem=function(t){return t.get("hidden")?void 0:o.__super__.renderItem.apply(this,arguments)},o}(o)})}).call(this);
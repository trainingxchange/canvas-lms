(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e={}.hasOwnProperty,o=function(t,o){function n(){this.constructor=t}for(var r in o)e.call(o,r)&&(t[r]=o[r]);return n.prototype=o.prototype,t.prototype=new n,t.__super__=o.prototype,t};define(["jquery","Backbone","jst/gradebook2/total_column_header"],function(e,n,r){var i,s;return i=function(e){function n(){return this.togglePercent=t(this.togglePercent,this),s=n.__super__.constructor.apply(this,arguments)}return o(n,e),n.prototype.el="#total_column_header",n.prototype.events={"click .toggle_percent":"togglePercent"},n.prototype.template=r,n.prototype.togglePercent=function(){return this.options.toggleShowingPoints(),this.render(),!1},n.prototype.render=function(){return this.$menu&&this.$menu.remove(),n.__super__.render.call(this),this.options.weightedGroups()?this:(this.$menu=this.$el.find(".gradebook-header-menu"),this.$el.find("#total_dropdown").kyleMenu({noButton:!0,appendMenuTo:"#gradebook_grid"}),this.$menu.css("width","150"),this)},n.prototype.toJSON=function(){var t;return t={showingPoints:this.options.showingPoints,weightedGroups:this.options.weightedGroups}},n}(n.View)})}).call(this);
(function(){var t={}.hasOwnProperty,e=function(e,o){function r(){this.constructor=e}for(var n in o)t.call(o,n)&&(e[n]=o[n]);return r.prototype=o.prototype,e.prototype=new r,e.__super__=o.prototype,e};define(["compiled/views/groups/manage/PopoverMenuView","compiled/models/GroupUser","jst/groups/manage/assignToGroupMenu","jquery","underscore","compiled/jquery/outerclick"],function(t,o,r,n,p){var i,u;return i=function(o){function i(){return u=i.__super__.constructor.apply(this,arguments)}return e(i,o),i.prototype.defaults=p.extend({},t.prototype.defaults,{zIndex:10}),i.prototype.events=p.extend({},t.prototype.events,{"click .set-group":"setGroup"}),i.prototype.attach=function(){return this.collection.on("change add remove reset",this.render)},i.prototype.tagName="div",i.prototype.className="assign-to-group-menu ui-tooltip popover content-top horizontal",i.prototype.template=r,i.prototype.setGroup=function(t){var e;return t.preventDefault(),t.stopPropagation(),e=n(t.currentTarget).data("group-id"),this.collection.category.reassignUser(this.model,this.collection.get(e)),this.hide()},i.prototype.toJSON=function(){var t;return t=this.collection.length>0,{groups:this.collection.toJSON(),noGroups:!t,allFull:t&&this.collection.models.every(function(t){return t.isFull()})}},i.prototype.attachElement=function(){return n("body").append(this.$el)},i}(t)})}).call(this);
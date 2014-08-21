(function(){var t={}.hasOwnProperty,e=function(e,o){function r(){this.constructor=e}for(var n in o)t.call(o,n)&&(e[n]=o[n]);return r.prototype=o.prototype,e.prototype=new r,e.__super__=o.prototype,e};define(["underscore","Backbone","jst/groups/manage/groupUser"],function(t,o,r){var n,u,i;return u=o.View,n=function(o){function n(){return i=n.__super__.constructor.apply(this,arguments)}return e(n,o),n.optionProperty("canAssignToGroup"),n.optionProperty("canEditGroupAssignment"),n.prototype.tagName="li",n.prototype.className="group-user",n.prototype.template=r,n.prototype.els={".al-trigger":"$userActions"},n.prototype.closeMenu=function(){var t;return null!=(t=this.$userActions.data("kyleMenu"))?t.$menu.popup("close"):void 0},n.prototype.attach=function(){return this.model.on("change",this.render,this)},n.prototype.afterRender=function(){return this.$el.data("model",this.model)},n.prototype.highlight=function(){var t=this;return this.$el.addClass("group-user-highlight"),setTimeout(function(){return t.$el.removeClass("group-user-highlight")},1e3)},n.prototype.toJSON=function(){var e;return t.extend({groupId:null!=(e=this.model.get("group"))?e.id:void 0},this,n.__super__.toJSON.apply(this,arguments))},n.prototype.isLeader=function(){var t,e;return(null!=(t=this.model.get("group"))&&"function"==typeof t.get&&null!=(e=t.get("leader"))?e.id:void 0)===this.model.get("id")},n}(u)})}).call(this);
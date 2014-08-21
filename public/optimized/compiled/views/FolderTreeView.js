(function(){var e={}.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var o in n)e.call(n,o)&&(t[o]=n[o]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define(["Backbone","jquery","underscore","compiled/fn/preventDefault","compiled/models/Folder","compiled/views/PaginatedCollectionView","compiled/views/FileItemView","jst/FolderTreeCollection"],function(e,n,i,o,l,r,s,a){var d,p;return d=function(e){function o(){return p=o.__super__.constructor.apply(this,arguments)}return t(o,e),o.prototype.tagName="li",o.optionProperty("nestingLevel"),o.prototype.defaults={nestingLevel:1},o.prototype.attributes=function(){return{role:"treeitem","aria-expanded":""+!!this.model.isExpanded,"aria-level":this.nestingLevel,id:this.tagId}},o.prototype.events={"click .folderLabel":"toggle"},o.prototype.initialize=function(){return this.tagId=i.uniqueId("treenode-"),this.model.on("all",this.render,this),this.model.files.on("all",this.render,this),this.model.folders.on("all",this.render,this),this.render(),o.__super__.initialize.apply(this,arguments)},o.prototype.render=function(){return this.renderSelf(),this.renderContents()},o.prototype.toggle=function(e){return e.preventDefault(),e.stopPropagation(),this.model.toggle(),this.$el.attr(this.attributes())},o.prototype.title_text=function(){return this.model.get("custom_name")||this.model.get("name")},o.prototype.renderSelf=function(){return this.$el.attr(this.attributes()),this.$label||(this.$label=n("<a class='folderLabel' role='presentation' tabindex='-1' href='#' title='"+this.title_text()+"'/>").prependTo(this.$el)),this.$label.text(this.title_text()).toggleClass("expanded",!!this.model.isExpanded).toggleClass("loading after",!!this.model.isExpanding)},o.prototype.renderContents=function(){var e,t;return this.model.isExpanded?(this.$folderContents||(this.$folderContents=n("<ul role='group' class='folderContents'/>").appendTo(this.$el),t=new r({collection:this.model.folders,itemView:o,itemViewOptions:{nestingLevel:this.nestingLevel+1},tagName:"li",className:"folders",template:a,scrollContainer:this.$folderContents.closest("ul[role=tabpanel]")}),this.$folderContents.append(t.render().el),e=new r({collection:this.model.files,itemView:s,itemViewOptions:{nestingLevel:this.nestingLevel+1},tagName:"li",className:"files",template:a,scrollContainer:this.$folderContents.closest("ul[role=tabpanel]")}),this.$folderContents.append(e.render().el)),this.$("> .folderContents").removeClass("hidden")):this.$("> .folderContents").addClass("hidden")},o}(e.View)})}).call(this);
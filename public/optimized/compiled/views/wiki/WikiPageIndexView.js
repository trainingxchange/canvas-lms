(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e={}.hasOwnProperty,i=function(t,i){function r(){this.constructor=t}for(var n in i)e.call(i,n)&&(t[n]=i[n]);return r.prototype=i.prototype,t.prototype=new r,t.__super__=i.prototype,t};define(["jquery","i18n!pages","wikiSidebar","compiled/models/WikiPage","compiled/views/PaginatedCollectionView","compiled/views/wiki/WikiPageEditView","compiled/views/wiki/WikiPageIndexItemView","jst/wiki/WikiPageIndex","compiled/views/StickyHeaderMixin","compiled/str/splitAssetString","jquery.disableWhileLoading"],function(e,r,n,s,o,a,d,l,c,h){var p,u;return p=function(o){function p(){return this.sortChanged=t(this.sortChanged,this),u=p.__super__.constructor.apply(this,arguments)}return i(p,o),p.mixin(c),p.mixin({events:{"click .new_page":"createNewPage","click .header-row a[data-sort-field]":"sort"},els:{".no-pages":"$noPages",".no-pages a:first-child":"$noPagesLink",".header-row a[data-sort-field]":"$sortHeaders"}}),p.prototype.template=l,p.prototype.itemView=d,p.optionProperty("default_editing_roles"),p.optionProperty("WIKI_RIGHTS"),p.prototype.initialize=function(t){var e,i=this;return p.__super__.initialize.apply(this,arguments),this.WIKI_RIGHTS||(this.WIKI_RIGHTS={}),this.itemViewOptions||(this.itemViewOptions={}),this.itemViewOptions.indexView=this,this.itemViewOptions.collection=this.collection,this.itemViewOptions.WIKI_RIGHTS=this.WIKI_RIGHTS,this.contextAssetString=null!=t?t.contextAssetString:void 0,this.contextAssetString&&(e=h(this.contextAssetString),this.contextName=e[0],this.contextId=e[1]),this.itemViewOptions.contextName=this.contextName,this.collection.on("fetch",function(){return i.fetched?void 0:(i.fetched=!0,i.render())}),this.collection.on("fetched:last",function(){return i.fetchedLast=!0,i.render()}),this.collection.on("sortChanged",this.sortChanged),this.currentSortField=this.collection.currentSortField},p.prototype.afterRender=function(){return p.__super__.afterRender.apply(this,arguments),this.$noPages.redirectClickTo(this.$noPagesLink),this.renderSortHeaders()},p.prototype.sort=function(t){var i,r;return null!=t&&t.preventDefault(),i=e(t.currentTarget).data("sort-field"),this.currentSortField||(r=this.collection.sortOrders[i]),this.$el.disableWhileLoading(this.collection.sortByField(i,r))},p.prototype.sortChanged=function(t){return this.currentSortField=t,this.renderSortHeaders()},p.prototype.renderSortHeaders=function(){var t,i,n,s,o,a,d,l,c,h;if(this.$sortHeaders){for(a=this.collection.sortOrders,c=this.$sortHeaders,h=[],d=0,l=c.length;l>d;d++)s=c[d],i=e(s),t=i.find("i"),n=i.data("sort-field"),o="asc"===a[n]?"up":"down","up"===o?i.attr("aria-label",r.t("headers.sort_ascending","%{title}, Sort ascending",{title:i.text()})):i.attr("aria-label",r.t("headers.sort_descending","%{title}, Sort descending",{title:i.text()})),i.toggleClass("sort-field-active",n===this.currentSortField),t.removeClass("icon-mini-arrow-up icon-mini-arrow-down"),h.push(t.addClass("icon-mini-arrow-"+o));return h}},p.prototype.createNewPage=function(t){var i=this;return null!=t&&t.preventDefault(),this.$el.hide(),e("body").removeClass("index"),e("body").addClass("edit with-right-side"),this.editModel=new s({editing_roles:this.default_editing_roles},{contextAssetString:this.contextAssetString}),this.editView=new a({model:this.editModel,wiki_pages_path:ENV.WIKI_PAGES_PATH,WIKI_RIGHTS:ENV.WIKI_RIGHTS,PAGE_RIGHTS:{update:ENV.WIKI_RIGHTS.update_page,update_content:ENV.WIKI_RIGHTS.update_page_content,read_revisions:ENV.WIKI_RIGHTS.read_revisions}}),this.$el.parent().append(this.editView.$el),this.editView.render(),this.editView.on("cancel",function(){return i.editView.$el.remove(),n.hide(),e("body").removeClass("edit with-right-side"),e("body").addClass("index"),i.$el.show()})},p.prototype.toJSON=function(){var t;return t=p.__super__.toJSON.apply(this,arguments),t.CAN={CREATE:!!this.WIKI_RIGHTS.create_page,MANAGE:!!this.WIKI_RIGHTS.manage,PUBLISH:!!this.WIKI_RIGHTS.manage&&"courses"===this.contextName},t.CAN.VIEW_TOOLBAR=t.CAN.CREATE,t.fetched=!!this.fetched,t.fetchedLast=!!this.fetchedLast,t},p}(o)})}).call(this);
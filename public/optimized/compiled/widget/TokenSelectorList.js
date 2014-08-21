(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e={}.hasOwnProperty,o=function(t,o){function n(){this.constructor=t}for(var i in o)e.call(o,i)&&(t[i]=o[i]);return n.prototype=o.prototype,t.prototype=new n,t.__super__=o.prototype,t};define(["jquery","underscore","compiled/views/PaginatedView","jquery.disableWhileLoading"],function(e,n,i){var s,r;return s=function(i){function s(){return this.showPaginationLoader=t(this.showPaginationLoader,this),this.addOne=t(this.addOne,this),this.render=t(this.render,this),r=s.__super__.constructor.apply(this,arguments)}return o(s,i),s.prototype.tagName="div",s.prototype.className="list",s.prototype.paginationLoaderTemplate=function(){return'<div class="pagination-loader" style="height: 60px;">&nbsp;</div>'},s.prototype.events={"blur li":"onBlur","focus li":"onFocus","keydown li":"onKeydown"},s.prototype.keyCodes={13:"Enter",16:"Shift",17:"Control",18:"Alt",27:"Escape",32:"Space",37:"LeftArrow",38:"UpArrow",39:"RightArrow",40:"DownArrow",91:"Command"},s.prototype.initialize=function(){return this.paginationScrollContainer=e("<ul />",{role:"menu"}),s.__super__.initialize.apply(this,arguments),this.selector=this.options.selector,this.parent=this.options.parent,this.ancestors=this.options.ancestors,this.query=this.options.query,this.$heading=e("<ul />",{"class":"heading"}).appendTo(this.$el),this.$body=this.paginationScrollContainer.appendTo(this.$el),this.$el.find("ul").on("mousemove",this.selector.mouseMove).on("mousedown",this.selector.mouseDown).on("click",this.selector.click),this.collection.on("beforeFetch",this.showPaginationLoader,this),this.collection.on("fetch",this.render)},s.prototype.render=function(){var t,o,n,i,r,l,a,c,p,h,u,d;return n=this.paginationScrollContainer.children(".active").index(),this.clear(),this.$selectAll=null,this.parent?(t=this.parent.clone(),t.addClass("expanded").removeClass("active first last"),this.$heading.append(t).show()):this.$heading.hide(),this.query.search||(this.collection.length>0&&(r="function"==typeof(a=this.selector.options).includeFilterOption?a.includeFilterOption(this.query):void 0,r&&this.addFilterOption(r)),this.collection.length>1&&(i="function"==typeof(c=this.selector.options).includeEveryoneOption?c.includeEveryoneOption(this.query,this.parent):void 0,l="function"==typeof(p=this.selector.options).includeSelectAllOption?p.includeSelectAllOption(this.query,this.parent):void 0,i&&this.addEveryoneOption(i),l&&this.addSelectAllOption(l))),this.collection.each(this.addOne),(this.selectAllActive()||(null!=(h=this.parent)&&"function"==typeof h.hasClass?h.hasClass("on"):void 0))&&this.$body.find("li.toggleable").addClass("on"),this.$el.toggleClass("with-toggles",this.selector.options.showToggles&&this.$body.find("li.toggleable").length>0),this.selector.select(e(this.paginationScrollContainer.children()[n])),this.collection.fetchingPage||this.collection.fetchingNextPage?this.showPaginationLoader():this.hidePaginationLoader(),this.collection.atLeastOnePageFetched&&!this.$body.find("li").length&&(o=e('<li class="message first last no-results"></li>'),o.text(null!=(u=null!=(d=this.selector.options.messages)?d.noResults:void 0)?u:""),this.$body.append(o)),s.__super__.render.apply(this,arguments)},s.prototype.addEveryoneOption=function(t){var o,n;return o=this.parent.data("user_data"),n={id:""+this.query.context+"_all",name:t,user_count:o.user_count,type:"context",avatar_url:o.avatar_url},this.selector.options.includeSelectAllOption&&e.extend(n,{permissions:o.permissions,selectAll:o.permissions.send_messages_all}),this.addOneRaw(n)},s.prototype.addSelectAllOption=function(t){var e;return e=this.parent.data("user_data"),this.addOneRaw({id:this.query.context,name:t,user_count:e.user_count,type:"context",avatar_url:e.avatar_url,permissions:e.permissions,selectAll:!0,noExpand:!0})},s.prototype.addFilterOption=function(t){return this.addOneRaw({id:this.query.context,name:this.parent.data("text"),type:"context",avatar_url:this.parent.data("user_data").avatar_url,subText:t,noExpand:!0})},s.prototype.addOne=function(t){return this.addOneRaw(t.attributes)},s.prototype.addOneRaw=function(t){var o;return o=e("<li />",{"class":"selectable",tabindex:"-1"}),this.$body.find("li:first")||o.addClass("first"),this.$body.find("li:last").removeClass("last"),o.addClass("last"),this.populateRow(o,t,{level:this.ancestors.length,parent:this.parent,ancestors:this.ancestors}),t.selectAll&&(this.$selectAll=o),o.hasClass("toggleable")&&this.selector.input.hasToken(o.data("id"))&&o.addClass("on"),this.$body.append(o)},s.prototype.populateRow=function(t,o,n){return null==n&&(n={}),this.selector.options.populator?(n=e.extend({noExpand:this.selector.options.noExpand},n),this.selector.options.populator(this.selector,t,o,n)):(t.data("id",o.text),t.text(o.text))},s.prototype.first=function(){return this.$el.find("li:first")},s.prototype.last=function(){return this.$el.find("li:last")},s.prototype.appendTo=function(t){return t.append(this.$el)},s.prototype.insertAfter=function(t){return this.$el.insertAfter(t.$el)},s.prototype.remove=function(){return this.$el.remove()},s.prototype.hide=function(t){return this.$el.animate({height:"1px"},"fast",t)},s.prototype.restore=function(){return this.$el.css("height","auto")},s.prototype.clear=function(){return this.$body.empty(),this.$heading.empty()},s.prototype.showPaginationLoader=function(){var t;return t=s.__super__.showPaginationLoader.apply(this,arguments),this.$paginationLoader.disableWhileLoading(this.collection.deferred),t},s.prototype.placePaginationLoader=function(){var t;return null!=(t=this.$paginationLoader)?t.insertAfter(this.$body):void 0},s.prototype.canSelectAll=function(){return null!=this.$selectAll},s.prototype.selectAllActive=function(){var t;return null!=(t=this.$selectAll)?t.hasClass("on"):void 0},s.prototype.updateSelectAll=function(t,o){var n,i;if(this.$selectAll)return n=this.$body.find("li.toggleable").not(this.$selectAll),t?this.selectAllActive()?n.addClass("on").each(function(t,n){return o(!1,e(n))}):n.removeClass("on").each(function(t,n){return o(!1,e(n))}):(i=n.filter(".on"),i.length<n.length&&this.selectAllActive()?(this.$selectAll.removeClass("on"),o(!1,this.$selectAll),i.each(function(t,n){return o(!0,e(n))})):i.length!==n.length||this.selectAllActive()?void 0:(this.$selectAll.addClass("on"),o(!0,this.$selectAll),i.each(function(t,n){return o(!1,e(n))})))},s.prototype.onKeydown=function(t){var o,i,s;return o=e(t.target),i=t.keyCode||t.which,s="on"+this.keyCodes[i]+"Key",this[s]?this[s].call(this,t,o)&&t.preventDefault():n.include([16,17,18,92],i)?void 0:(this.selector.input.focus(),e(this.selector.input.$input).trigger(t))},s.prototype.onBlur=function(t){var o;return e(t.target).removeClass("active"),"function"==typeof(o=this.selector).blur?o.blur():void 0},s.prototype.onFocus=function(t){return e(t.target).addClass("active")},s.prototype.onUpArrowKey=function(t,e){return t.preventDefault(),this.selector.selectPrev(),0===e.prev().length?this.selector.input.focus():void 0},s.prototype.onDownArrowKey=function(t){return t.preventDefault(),this.selector.selectNext()},s.prototype.onRightArrowKey=function(t){return t.preventDefault(),this.selector.expandSelection()},s.prototype.onLeftArrowKey=function(){return this.selector.listExpanded()?this.selector.collapse():void 0},s.prototype.onEnterKey=function(t,e){return t.preventDefault(),this.selectResult(e)},s.prototype.onSpaceKey=function(t,e){return t.preventDefault(),this.selectResult(e)},s.prototype.onEscapeKey=function(){return this.selector.input.focus(),this.selector.close()},s.prototype.selectResult=function(t){return t.hasClass("expandable")&&t.find("a.toggle").length>0?this.selector.toggleSelection():t.click()},s}(i)})}).call(this);
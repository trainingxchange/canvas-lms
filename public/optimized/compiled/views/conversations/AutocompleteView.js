(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e={}.hasOwnProperty,n=function(t,n){function s(){this.constructor=t}for(var i in n)e.call(n,i)&&(t[i]=n[i]);return s.prototype=n.prototype,t.prototype=new s,t.__super__=n.prototype,t};define(["i18n!conversations","Backbone","jquery","underscore","compiled/collections/PaginatedCollection","compiled/models/ConversationSearchResult","compiled/views/PaginatedCollectionView","jst/conversations/autocompleteToken","jst/conversations/autocompleteResult"],function(e,s,i,o,r,l,a,u,c){var h,p,d;return p=function(t){return t.charAt(0).toUpperCase()+t.slice(1)},h=function(h){function _(){return this._addToken=t(this._addToken,this),this._onSearchResultLoad=t(this._onSearchResultLoad,this),this._getModel=t(this._getModel,this),this._addToModelCache=t(this._addToModelCache,this),d=_.__super__.constructor.apply(this,arguments)}return n(_,h),_.optionProperty("single"),_.optionProperty("excludeAll"),_.prototype.collection=null,_.prototype.currentRequest=null,_.prototype.currentContext=null,_.prototype.parentContexts=[],_.prototype.selectedModel=null,_.prototype.tokens=[],_.prototype.permissions={},_.prototype.cache={},_.prototype.url=function(t){var e,n;return e="/api/v1/search/recipients?",n={search:t,per_page:20,"permissions[]":"send_messages_all",synthetic_contexts:!0},this.currentContext&&(n.context=this.currentContext.id),e+o.reduce(n,function(t,e,n){return t.push(""+n+"="+e),t},[]).join("&")},_.prototype.messages={noResults:e.t("no_results_found","No results found"),back:e.t("back","Back"),everyone:function(t){return e.t("all_in_context","All in %{context}",{context:t})},"private":e.t("cannot_add_to_private","You cannot add participants to a private conversation.")},_.prototype.keys={8:"backspace",13:"enter",27:"escape",38:"up",40:"down"},_.prototype.els={".ac-input-box":"$inputBox",".ac-input":"$input",".ac-token-list":"$tokenList",".ac-result-wrapper":"$resultWrapper",".ac-result-container":"$resultContainer",".ac-result-contents":"$resultContents",".ac-result-list":"$resultList",".ac-placeholder":"$placeholder",".ac-clear":"$clearBtn",".ac-search-btn":"$searchBtn"},_.prototype.events={"blur      .ac-input":"_onInputBlur","click     .ac-input-box":"_onWidgetClick","click     .ac-clear":"_onClearTokens","click     .ac-token-remove-btn":"_onRemoveToken","click     .ac-search-btn":"_onSearch","keyclick  .ac-search-btn":"_onSearch","focus     .ac-input":"_onInputFocus","input     .ac-input":"_onSearchTermChange","keydown   .ac-input":"_onInputAction","mousedown .ac-result":"_onResultClick","mouseenter .ac-result-list":"_clearSelectedStyles"},_.prototype.initialize=function(){var t=this;return _.__super__.initialize.apply(this,arguments),this.render(),this.$span=this._initializeWidthSpan(),setTimeout(function(){return t.options.disabled?t._disable():void 0},0),this._fetchResults=o.debounce(this.__fetchResults,250),this.resultView=new a({el:this.$resultContents,scrollContainer:this.$resultContainer,buffer:50,collection:new s.Collection,template:null,itemView:s.View.extend({template:c}),itemViewOptions:{tagName:"li",attributes:function(){var t,e;return e=["ac-result"],this.model.get("isContext")&&e.push("context"),this.model.get("back")&&e.push("back"),this.model.get("everyone")&&e.push("everyone"),t={"class":e.join(" "),"data-id":this.model.id,"data-people-count":this.model.get("user_count"),id:"result-"+i.guid++},t["aria-haspopup"]=this.model.get("isContext"),t}}})},_.prototype._attachCollection=function(){return this.resultView.switchCollection(this.resultCollection),this.resultView.stopListening(this.resultCollection,"reset",this.resultView.renderOnReset),this.resultView.stopListening(this.resultCollection,"remove",this.resultView.removeItem)},_.prototype.toggleResultList=function(t){return this.$resultWrapper.attr("aria-hidden",!t),this.$resultWrapper.toggle(t),this.$input.attr("aria-expanded",t),t?void 0:this.$resultList.empty()},_.prototype._disable=function(){return this.disable(),this.$inputBox.attr("title",this.messages["private"]),this.$inputBox.attr("data-tooltip",'{"position":"bottom"}'),this.disabled=!0},_.prototype._resetContext=function(){return this.currentContext=this.hasExternalContext?o.isEmpty(this.parentContexts)?this.currentContext:o.head(this.parentContexts):null,this.parentContexts=[]},_.prototype._initializeWidthSpan=function(){return i("<span />").css({fontSize:"14px",position:"absolute",top:"-9999px"}).appendTo("body")},_.prototype.modelCache=new s.Collection,_.prototype._addToModelCache=function(t){return this.modelCache.add(t)},_.prototype._getModel=function(t){var e;return t=t&&String(t),e=this.modelCache.get(t)},_.prototype._clearSelectedStyles=function(){return this.$resultList.find(".selected").removeClass("selected"),this.selectedModel=null},_.prototype._onWidgetClick=function(){return this.$input.focus()},_.prototype._onInputAction=function(t){var e,n;if(e=this.keys[t.keyCode])return n="_on"+p(e)+"Key","function"==typeof this[n]?this[n].call(this,t):void 0},_.prototype._onInputBlur=function(){return this.$inputBox.removeClass("focused"),this.tokens.length||this.$input.val()||this.$placeholder.css({opacity:1}),this._resetContext(),this.toggleResultList(!1)},_.prototype._onInputFocus=function(t){return this.$inputBox.addClass("focused"),this.$placeholder.css({opacity:0}),i(t.target).hasClass("ac-input")?void 0:this.$input[0].selectionStart=this.$input.val().length},_.prototype._onSearchTermChange=function(){var t=this;return this.$input.val()?this._fetchResults():this.toggleResultList(!1),this.$input.width(this.$span.text(this.$input.val()).width()+15),this.resultView.collection.each(function(e){return t.resultView.removeItem(e)})},_.prototype._onSearchResultLoad=function(){var t,e;return o.extend(this.permissions,this._getPermissions()),!this.excludeAll&&this._canSendToAll()&&this._addEveryoneResult(this.resultCollection),this.resultCollection.each(this._addToModelCache),e=this.resultCollection.length,t=!this.nextRequest,this._addBackResult(this.resultCollection),this.currentRequest=null,e&&t?this._drawResults():t&&this.resultCollection.push(new l({id:"no_results",name:"",noResults:!0})),this.nextRequest?this._fetchResults(!0):void 0},_.prototype._canSendToAll=function(){var t;return this.currentContext?(t=this.currentContext.id.replace(/_(students|teachers)$/,""),this.permissions[t]):!1},_.prototype._getPermissions=function(){var t;return t=this.resultCollection.filter(function(t){return t.attributes.hasOwnProperty("permissions")}),o.reduce(t,function(t,e){var n;return n=e.id.replace(/_(students|teachers)$/,""),t[n]=!!e.get("permissions").send_messages_all,t},{})},_.prototype._addEveryoneResult=function(t){var e,n,s;if(this.currentContext){if(e=this.messages.everyone(this.currentContext.name),n=new RegExp(this.$input.val().trim(),"gi"),n&&!e.match(n)||!t.length&&!this.currentContext)return t;if(!this.currentContext.id.match(/course_\d+_(group|section)/))return s={id:this.currentContext.id,name:e,everyone:!0,people:this.currentContext.peopleCount},t.unshift(new l(s))}},_.prototype._addBackResult=function(t){var e,n;return this.parentContexts.length?(n={id:"back",name:this.messages.back,back:!0,isContext:!0},e=new l(n),t.unshift(e),this._addToModelCache(e)):t},_.prototype._drawResults=function(){var t;return this.resultView.empty=!this.resultView.collection.length,this.resultView.$(".collectionViewItems").empty(),this.resultView.render(),t=this.$resultList.find("li:first").addClass("selected"),this.selectedModel=this._getModel(t.data("id")),this.$input.attr("aria-activedescendant",t.attr("id"))},_.prototype.__fetchResults=function(t){var e;return null==t&&(t=!1),(this.$input.val()||t)&&(e=this._loadURL())?(this.currentUrl=e,this.cache[e]?(this.resultCollection=this.cache[e],this._attachCollection(),this.toggleResultList(!0),this._onSearchResultLoad()):(this.resultCollection=new r([],{model:l}),this.resultCollection.url=e,this.cache[e]=this.resultCollection,this._attachCollection(),this.currentRequest=this.resultCollection.fetch().done(this._onSearchResultLoad),this.toggleResultList(!0))):void 0},_.prototype._loadURL=function(){var t,e;return e=this.url(this.$input.val()),this.currentRequest?(this.nextRequest=e,""):(t=this.nextRequest,delete this.nextRequest,t||e)},_.prototype._onBackspaceKey=function(){return this.$input.val()?void 0:this._removeToken(o.last(this.tokens))},_.prototype._onEscapeKey=function(t){var e=this;return t.preventDefault()&&t.stopPropagation(),this.toggleResultList(!1),this._resetContext(),setTimeout(function(){return e.$input.focus()},0)},_.prototype._onEnterKey=function(t){return t.preventDefault()&&t.stopPropagation(),this._activateSelected(t.metaKey||t.ctrlKey)},_.prototype._activateSelected=function(t){return null==t&&(t=!1),this.selectedModel&&!this.selectedModel.get("noResults")?this.selectedModel.get("back")?(this.currentContext=this.parentContexts.pop(),this._fetchResults(!0)):this.selectedModel.get("isContext")?(this.parentContexts.push(this.currentContext),this.$input.val(""),this.currentContext={id:this.selectedModel.id,name:this.selectedModel.get("name"),peopleCount:this.selectedModel.get("user_count")},this._fetchResults(!0)):this._addToken(this.selectedModel.attributes,t):void 0},_.prototype._onDownKey=function(t){return this._onArrowKey(t,1)},_.prototype._onUpKey=function(t){return this._onArrowKey(t,-1)},_.prototype._onArrowKey=function(t,e){var n,s,i;return t.preventDefault()&&t.stopPropagation(),this.$resultList.find("li.selected:first").removeClass("selected"),s=this.selectedModel?this.resultCollection.indexOf(this.selectedModel):-1,i=s+e,0>i&&(i=0),i>=this.resultCollection.length&&(i=this.resultCollection.length-1),this.selectedModel=this.resultCollection.at(i),n=this.$resultList.find("[data-id="+this.selectedModel.id+"]"),n.scrollIntoView(),this.$input.attr("aria-activedescendant",n.addClass("selected").attr("id"))},_.prototype._onResultClick=function(t){var e;if(0===t.button)return t.preventDefault()&&t.stopPropagation(),e=i(t.currentTarget),this.selectedModel=this.resultCollection.get(e.data("id")),this._activateSelected(t.metaKey||t.ctrlKey)},_.prototype._onClearTokens=function(t){for(t.preventDefault();this.tokens.length;)this._removeToken(this.tokens[0],!1);return this.$clearBtn.hide(),this.disabled||this.$input.prop("disabled",!1).focus(),this.trigger("enabled"),this.trigger("changeToken",this.tokenParams())},_.prototype._onRemoveToken=function(t){return t.preventDefault(),this._removeToken(i(t.currentTarget).siblings("input").val())},_.prototype._onSearch=function(){return this.$searchBtn.attr("disabled")?void 0:(this._fetchResults(!0),this.$input.focus())},_.prototype._addToken=function(t,e){return null==e&&(e=!1),this.disabled?void 0:(t.name=this._formatTokenName(t),this.tokens.push(t.id),this.$tokenList.append(u(t)),e||(this.toggleResultList(!1),this.selectedModel=null,this._resetContext()),this.$input.val(""),this.options.single&&(this.$clearBtn.show().focus(),this.$input.prop("disabled",!0),this.$searchBtn.prop("disabled",!0),this.trigger("disabled")),this.trigger("changeToken",this.tokenParams()))},_.prototype._formatTokenName=function(t){var e;return t.everyone?(e=o.head(this.parentContexts))?""+e.name+": "+this.currentContext.name:this.currentContext.name:t.name},_.prototype._removeToken=function(t,e){return null==e&&(e=!1),this.disabled?void 0:(this.$tokenList.find("input[value="+t+"]").parent().remove(),this.tokens.splice(o.indexOf(t),1),this.tokens.length||this.$clearBtn.hide(),this.options.single&&!this.tokens.length&&(this.$input.prop("disabled",!1),this.$searchBtn.prop("disabled",!1),this.trigger("enabled")),e?void 0:this.trigger("changeToken",this.tokenParams()))},_.prototype.tokenParams=function(){return o.map(this.tokens,function(t){return t.match?t:"user_"+t})},_.prototype.tokenModels=function(){return o.map(this.tokens,this._getModel)},_.prototype.setContext=function(t,e){var n;return null==e&&(e=!1),t.id||(t=null),!e||o.include(ENV.current_user_roles,"admin")||this.disabled||this.disable(!t),(null!=t?t.id:void 0)!==(null!=(n=this.currentContext)?n.id:void 0)?(this.currentContext=t,this.hasExternalContext=!!t,this.tokens=[],this.$tokenList.find("li.ac-token").remove()):void 0},_.prototype.disable=function(t){return null==t&&(t=!0),this.$input.prop("disabled",t),this.$searchBtn.prop("disabled",t),this.$inputBox.toggleClass("disabled",t)},_.prototype.setTokens=function(t){var e=this;return o.each(t,function(t){return e._addToModelCache(t),e._addToken(t)})},_}(s.View)})}).call(this);
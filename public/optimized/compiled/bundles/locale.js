(function(){var t=function(t,i){return function(){return t.apply(i,arguments)}};define("compiled/util/Popover",["jquery"],function(i){var e,o,r,n;return n=function(t,e){return i(this).css(t).toggleClass("carat-bottom","bottom"===e.vertical)},r=0,o=[],e=function(){function e(e,o,r){var n=this;this.content=o,this.options=null!=r?r:{},this.position=t(this.position,this),this.outsideClickHandler=t(this.outsideClickHandler,this),this.trigger=i(e.currentTarget),this.el=i(this.content).addClass("carat-bottom").attr("role","dialog").data("popover",this).keyup(function(t){return t.keyCode===i.ui.keyCode.ESCAPE?n.hide():void 0}),this.el.delegate(".popover_close","click",function(t){return t.preventDefault(),n.hide()}),this.show(e)}return e.prototype.show=function(t){for(var e,n,s,l,a,h,c;h=o.pop();)h.hide();return o.push(this),l="popover-"+r++,this.trigger.attr({"aria-haspopup":!0,"aria-owns":l}),this.el.attr({id:l,"aria-hidden":!1,"aria-expanded":!0}).appendTo(document.body).show(),this.el.find(":tabbable").not(".popover_close").first().focus(1),this.position(),this.el.find(".ui-menu-carat").remove(),s=this.trigger.offset().left-this.el.offset().left,e=t.pageX-this.trigger.offset().left,a=Math.max(0,this.trigger.width()/2-this.el.width()/2)+20,c=this.trigger.width()-a,n=Math.min(Math.max(a,e),c)+s,i('<span class="ui-menu-carat"><span /></span>').css("left",n).prependTo(this.el),this.positionInterval=setInterval(this.position,200),i(window).click(this.outsideClickHandler)},e.prototype.hide=function(){var t,e,r,n;for(t=r=0,n=o.length;n>r;t=++r)e=o[t],this===e&&o.splice(t,1);return this.el.detach(),clearInterval(this.positionInterval),i(window).unbind("click",this.outsideClickHandler),this.trigger&&this.trigger.is(":visible")?this.trigger.focus():void 0},e.prototype.ignoreOutsideClickSelector=".ui-dialog",e.prototype.outsideClickHandler=function(t){return i(t.target).closest(this.el.add(this.trigger).add(this.ignoreOutsideClickSelector)).length?void 0:this.hide()},e.prototype.position=function(){return this.el.position({my:"center "+("bottom"===this.options.verticalSide?"top":"bottom"),at:"center "+(this.options.verticalSide||"top"),of:this.trigger,offset:"0 -10px",within:"body",collision:"flipfit "+(this.options.verticalSide?"none":"flipfit"),using:n})},e}()})}).call(this),function(){var t=[].indexOf||function(t){for(var i=0,e=this.length;e>i;i++)if(i in this&&this[i]===t)return i;return-1};require(["jquery","compiled/util/Popover"],function(i){return i(function(){var e,o,r;return e=i("select.locale"),o=i("i.locale-warning"),o.hide(),r=function(){var i;return i=e.val(),t.call(ENV.crowdsourced_locales,i)>=0?o.show():o.hide()},e.change(function(){return r()}),r()})})}.call(this),define("compiled/bundles/locale",function(){});
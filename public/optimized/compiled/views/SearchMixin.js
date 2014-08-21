(function(){define(["i18n!course_users","jquery","compiled/util/mixin","compiled/views/ValidatedMixin","jquery.instructure_forms","vendor/jquery.placeholder"],function(e,t,r,i){return r({},i,{defaults:{paramName:"search_term"},initialize:function(){return this.collection=this.collectionView.collection},attach:function(){return this.inputFilterView.on("input",this.fetchResults,this)},afterRender:function(){return this.$el.placeholder()},fetchResults:function(e){var t,r=this;if(""===e)this.collection.deleteParam(this.options.paramName);else{if(e.length<3)return;this.collection.setParam(this.options.paramName,e)}return null!=(t=this.lastRequest)&&t.abort(),this.lastRequest=this.collection.fetch().fail(function(){return r.onFail()})},onFail:function(r){var i,n,s;if("abort"!==r.statusText)return n=t.parseJSON(r.responseText),i="3 or more characters is required"===(null!=n&&null!=(s=n.errors)?s[0].message:void 0)?e.t("greater_than_three","Please enter a search term with three or more characters"):e.t("unknown_error","Something went wrong with your search, please try again."),this.showErrors({inputFilter:[{message:i}]})}})})}).call(this);
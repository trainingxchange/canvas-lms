(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e={}.hasOwnProperty,o=function(t,o){function i(){this.constructor=t}for(var n in o)e.call(o,n)&&(t[n]=o[n]);return i.prototype=o.prototype,t.prototype=new i,t.__super__=o.prototype,t};define(["Backbone","jquery","compiled/views/PaginatedCollectionView","compiled/views/InputFilterView","compiled/views/accounts/UserView","compiled/views/accounts/admin_tools/UserDateRangeSearchFormView","compiled/collections/AuthLoggingCollection","compiled/views/accounts/admin_tools/AuthLoggingItemView","jst/accounts/admin_tools/authLoggingSearchResults","jst/accounts/usersList","jst/accounts/admin_tools/authLoggingContentPane"],function(e,i,n,s,c,r,l,u,a,h,p){var g;return g=function(e){function i(e){this.options=e,this.onFail=t(this.onFail,this),this.fetch=t(this.fetch,this),this.collection=new l(null),i.__super__.constructor.apply(this,arguments),this.searchForm=new r({formName:"logging",inputFilterView:new s({collection:this.options.users}),usersView:new n({collection:this.options.users,itemView:c,buffer:1e3,template:h}),collection:this.collection}),this.resultsView=new n({template:a,itemView:u,collection:this.collection})}return o(i,e),i.child("searchForm","#authLoggingSearchForm"),i.child("resultsView","#authLoggingSearchResults"),i.prototype.template=p,i.prototype.attach=function(){return this.collection.on("setParams",this.fetch)},i.prototype.fetch=function(){return this.collection.fetch().fail(this.onFail)},i.prototype.onFail=function(){return this.collection.reset(),this.resultsView.detachScroll()},i}(e.View)})}).call(this);
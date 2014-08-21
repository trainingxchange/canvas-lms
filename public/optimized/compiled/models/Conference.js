(function(){var t={}.hasOwnProperty,e=function(e,r){function n(){this.constructor=e}for(var o in r)t.call(r,o)&&(e[o]=r[o]);return n.prototype=r.prototype,e.prototype=new n,e.__super__=r.prototype,e};define(["underscore","Backbone"],function(t,r){var n,o,s;return o=r.Model,n=function(r){function n(){return s=n.__super__.constructor.apply(this,arguments)}return e(n,r),n.prototype.course=function(){var t;return this.options.course_id||(null!=(t=this.collection)?t.course_id:void 0)},n.prototype.urlRoot=function(){return"/courses/"+this.course()+"/conferences"},n.prototype.special_urls=function(){return{edit_url:""+this.urlRoot()+"#conference_"+this.id,join_url:this.get("url")+"/join",close_url:this.get("url")+"/close"}},n.prototype.recordings_data=function(){return{recording:this.get("recordings")[0],recordingCount:this.get("recordings").length,multipleRecordings:this.get("recordings").length>1}},n.prototype.permissions_data=function(){return{has_actions:this.get("permissions").edit||this.get("permissions")["delete"],show_end:this.get("permissions").initiate&&this.get("started_at")&&this.get("long_running")}},n.prototype.schedule_data=function(){return{scheduled:"scheduled_date"in this.get("user_settings"),scheduled_at:this.get("user_settings").scheduled_date}},n.prototype.toJSON=function(){var e,r,o,s,i;for(r=n.__super__.toJSON.apply(this,arguments),i=["special_urls","recordings_data","schedule_data","permissions_data"],o=0,s=i.length;s>o;o++)e=i[o],t.extend(r,this[e]());return r},n}(o)})}).call(this);
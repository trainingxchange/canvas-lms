(function(){var t={}.hasOwnProperty,r=function(r,o){function n(){this.constructor=r}for(var e in o)t.call(o,e)&&(r[e]=o[e]);return n.prototype=o.prototype,r.prototype=new n,r.__super__=o.prototype,r};define(["Backbone","compiled/models/ContentMigrationProgress","compiled/collections/ContentMigrationIssueCollection"],function(t,o,n){var e,i;return e=function(t){function e(){return i=e.__super__.constructor.apply(this,arguments)}return r(e,t),e.prototype.initialize=function(t,r){var o;return e.__super__.initialize.apply(this,arguments),this.course_id=(null!=(o=this.collection)?o.course_id:void 0)||(null!=r?r.course_id:void 0)||this.get("course_id"),this.buildChildren(),this.pollIfRunning(),this.syncProgressUrl()},e.prototype.buildChildren=function(){return this.progressModel=new o({url:this.get("progress_url"),course_id:this.course_id}),this.issuesCollection=new n(null,{course_id:this.course_id,content_migration_id:this.get("id")})},e.prototype.pollIfRunning=function(){return"running"===this.get("workflow_state")?this.progressModel.poll():void 0},e.prototype.syncProgressUrl=function(){var t=this;return this.on("change:progress_url",function(){return t.progressModel.set("url",t.get("progress_url"))})},e}(t.Model)})}).call(this);
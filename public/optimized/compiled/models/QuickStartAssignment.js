(function(){var t={}.hasOwnProperty,n=function(n,e){function o(){this.constructor=n}for(var r in e)t.call(e,r)&&(n[r]=e[r]);return o.prototype=e.prototype,n.prototype=new o,n.__super__=e.prototype,n};define(["Backbone","underscore","jquery"],function(t){var e,o,r;return e=t.Model,o=function(t){function e(){return r=e.__super__.constructor.apply(this,arguments)}return n(e,t),e.prototype.url=function(){return"/api/v1/courses/"+this.get("course_id")+"/assignments"},e.prototype.defaults={name:"No Title",due_at:null,points_possible:null,grading_type:"points",submission_types:"online_upload,online_text_entry",course_id:null},e.prototype.toJSON=function(){return{assignment:e.__super__.toJSON.apply(this,arguments)}},e}(e)})}).call(this);
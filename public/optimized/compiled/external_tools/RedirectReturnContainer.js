(function(){var t=function(t,n){return function(){return t.apply(n,arguments)}};define(["jquery"],function(n){var e;return e=function(){function e(){this._contentCancel=t(this._contentCancel,this),this._contentReady=t(this._contentReady,this)}return e.prototype.attachLtiEvents=function(){return n(window).on("externalContentReady",this._contentReady),n(window).on("externalContentCancel",this._contentCancel)},e.prototype._contentReady=function(t,n){return this.createMigration(n.url)},e.prototype._contentCancel=function(){return location.href="/courses/"+ENV.course_id},e.prototype.createMigration=function(t){var e,r;return e={migration_type:"canvas_cartridge_importer",settings:{file_url:t}},r="/api/v1/courses/"+ENV.course_id+"/content_migrations",n.ajaxJSON(r,"POST",e,this.redirectToMigrationsPage,this.handleError)},e.prototype.redirectToMigrationsPage=function(){return location.href="/courses/"+ENV.course_id+"/content_migrations"},e.prototype.handleError=function(t){return n.flashError(t.message)},e}()})}).call(this);
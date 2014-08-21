(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['jquery'], function($) {
    var RedirectReturnContainer;

    return RedirectReturnContainer = (function() {
      function RedirectReturnContainer() {
        this._contentCancel = __bind(this._contentCancel, this);
        this._contentReady = __bind(this._contentReady, this);
      }

      RedirectReturnContainer.prototype.attachLtiEvents = function() {
        $(window).on('externalContentReady', this._contentReady);
        return $(window).on('externalContentCancel', this._contentCancel);
      };

      RedirectReturnContainer.prototype._contentReady = function(event, data) {
        return this.createMigration(data.url);
      };

      RedirectReturnContainer.prototype._contentCancel = function(event, data) {
        return location.href = "/courses/" + ENV.course_id;
      };

      RedirectReturnContainer.prototype.createMigration = function(file_url) {
        var data, migrationUrl;

        data = {
          migration_type: 'canvas_cartridge_importer',
          settings: {
            file_url: file_url
          }
        };
        migrationUrl = "/api/v1/courses/" + ENV.course_id + "/content_migrations";
        return $.ajaxJSON(migrationUrl, "POST", data, this.redirectToMigrationsPage, this.handleError);
      };

      RedirectReturnContainer.prototype.redirectToMigrationsPage = function() {
        return location.href = "/courses/" + ENV.course_id + "/content_migrations";
      };

      RedirectReturnContainer.prototype.handleError = function(data) {
        return $.flashError(data.message);
      };

      return RedirectReturnContainer;

    })();
  });

}).call(this);

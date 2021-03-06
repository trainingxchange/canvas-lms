(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['i18n!assignments', 'Backbone', 'jquery', 'jst/assignments/EditHeaderView', 'jquery.disableWhileLoading'], function(I18n, Backbone, $, template) {
    var EditHeaderView, _ref;

    return EditHeaderView = (function(_super) {
      __extends(EditHeaderView, _super);

      function EditHeaderView() {
        this.onDelete = __bind(this.onDelete, this);        _ref = EditHeaderView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      EditHeaderView.prototype.template = template;

      EditHeaderView.prototype.events = {
        'click .delete_assignment_link': 'onDelete'
      };

      EditHeaderView.prototype.messages = {
        confirm: I18n.t('confirms.delete_assignment', 'Are you sure you want to delete this assignment?')
      };

      EditHeaderView.prototype.onDelete = function(e) {
        e.preventDefault();
        if (confirm(this.messages.confirm)) {
          return this["delete"]();
        }
      };

      EditHeaderView.prototype["delete"] = function() {
        var destroyDfd, disablingDfd;

        disablingDfd = new $.Deferred();
        if (destroyDfd = this.model.destroy()) {
          destroyDfd.then(this.onSaveSuccess);
          destroyDfd.fail(function() {
            return disablingDfd.reject();
          });
          return $('#content').disableWhileLoading(disablingDfd);
        } else {
          return this.onDeleteSuccess();
        }
      };

      EditHeaderView.prototype.onDeleteSuccess = function() {
        return location.href = ENV.ASSIGNMENT_INDEX_URL;
      };

      EditHeaderView.prototype.toJSON = function() {
        return this.model.toView();
      };

      return EditHeaderView;

    })(Backbone.View);
  });

}).call(this);

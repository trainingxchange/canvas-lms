(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['i18n!outcomes', 'jquery', 'underscore', 'Backbone', 'compiled/models/Outcome', 'compiled/models/OutcomeGroup'], function(I18n, $, _, Backbone, Outcome, OutcomeGroup) {
    var ToolbarView, _ref;

    return ToolbarView = (function(_super) {
      __extends(ToolbarView, _super);

      function ToolbarView() {
        this.resetBackButton = __bind(this.resetBackButton, this);
        this.findDialog = __bind(this.findDialog, this);
        this.addGroup = __bind(this.addGroup, this);
        this.addOutcome = __bind(this.addOutcome, this);
        this.goBack = __bind(this.goBack, this);        _ref = ToolbarView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ToolbarView.prototype.events = {
        'click .go_back': 'goBack',
        'click .add_outcome_link': 'addOutcome',
        'click .add_outcome_group': 'addGroup',
        'click .find_outcome': 'findDialog'
      };

      ToolbarView.prototype.goBack = function(e) {
        e.preventDefault();
        return this.trigger('goBack');
      };

      ToolbarView.prototype.addOutcome = function(e) {
        var model;

        e.preventDefault();
        model = new Outcome({
          title: I18n.t('new_outcome', 'New Outcome')
        });
        return this.trigger('add', model);
      };

      ToolbarView.prototype.addGroup = function(e) {
        var model;

        e.preventDefault();
        model = new OutcomeGroup({
          title: I18n.t('new_outcome_group', 'New Outcome Group')
        });
        return this.trigger('add', model);
      };

      ToolbarView.prototype.findDialog = function(e) {
        e.preventDefault();
        return this.trigger('find');
      };

      ToolbarView.prototype.resetBackButton = function(model, directories) {
        if (!ENV.PERMISSIONS.manage_outcomes) {
          return;
        }
        if (model || directories.length > 1) {
          return this.$('.go_back').show(200);
        } else {
          return this.$('.go_back').hide(200);
        }
      };

      return ToolbarView;

    })(Backbone.View);
  });

}).call(this);

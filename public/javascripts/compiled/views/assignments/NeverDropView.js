(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'underscore', 'i18n!assignments', 'jst/assignments/NeverDrop'], function(Backbone, _, I18n, neverDropTemplate) {
    var NeverDrop, _ref;

    return NeverDrop = (function(_super) {
      __extends(NeverDrop, _super);

      function NeverDrop() {
        this.toJSON = __bind(this.toJSON, this);        _ref = NeverDrop.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      NeverDrop.prototype.className = 'never_drop_rule';

      NeverDrop.prototype.template = neverDropTemplate;

      NeverDrop.prototype.events = {
        'change select': 'setChosen',
        'click .remove_never_drop': 'removeNeverDrop'
      };

      NeverDrop.prototype.setChosen = function(e) {
        var $target;

        $target = this.$(e.currentTarget);
        return this.model.set({
          'chosen_id': $target.val(),
          'focus': true
        });
      };

      NeverDrop.prototype.removeNeverDrop = function(e) {
        e.preventDefault();
        return this.model.collection.remove(this.model);
      };

      NeverDrop.prototype.afterRender = function() {
        var _this = this;

        if (this.model.has('focus')) {
          return _.defer(function() {
            _this.$('select').focus();
            return _this.model.unset('focus');
          });
        }
      };

      NeverDrop.prototype.toJSON = function() {
        var json;

        json = NeverDrop.__super__.toJSON.apply(this, arguments);
        json.buttonTitle = I18n.t('remove_unsaved_never_drop_rule', "Remove unsaved never drop rule");
        if (this.model.has('chosen_id')) {
          json.assignments = this.model.collection.toAssignments(this.model.get('chosen_id'));
        }
        if (json.chosen) {
          json.buttonTitle = I18n.t('remove_never_drop_rule', "Remove never drop rule") + (" " + json.chosen);
        }
        return json;
      };

      return NeverDrop;

    })(Backbone.View);
  });

}).call(this);

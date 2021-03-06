(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone'], function(Backbone) {
    var OutcomeGroup, _ref;

    return OutcomeGroup = (function(_super) {
      __extends(OutcomeGroup, _super);

      function OutcomeGroup() {
        _ref = OutcomeGroup.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      OutcomeGroup.prototype.name = function() {
        return this.get('title');
      };

      OutcomeGroup.prototype.isAbbreviated = function() {
        return !this.has('description');
      };

      OutcomeGroup.prototype.setUrlTo = function(action) {
        return this.url = (function() {
          switch (action) {
            case 'add':
              return this.get('parent_outcome_group').subgroups_url;
            case 'edit':
            case 'delete':
              return this.get('url');
          }
        }).call(this);
      };

      return OutcomeGroup;

    })(Backbone.Model);
  });

}).call(this);

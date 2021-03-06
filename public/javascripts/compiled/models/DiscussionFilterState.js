(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone'], function(_arg) {
    var DiscussionFilterState, Model, _ref;

    Model = _arg.Model;
    return DiscussionFilterState = (function(_super) {
      __extends(DiscussionFilterState, _super);

      function DiscussionFilterState() {
        _ref = DiscussionFilterState.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      DiscussionFilterState.prototype.defaults = {
        unread: false,
        query: null,
        collapsed: false
      };

      DiscussionFilterState.prototype.hasFilter = function() {
        var query, unread, _ref1;

        _ref1 = this.attributes, unread = _ref1.unread, query = _ref1.query;
        if (unread || (query != null)) {
          return true;
        } else {
          return false;
        }
      };

      DiscussionFilterState.prototype.reset = function() {
        this.set({
          unread: false,
          query: null,
          collapsed: false
        });
        return this.trigger('reset');
      };

      return DiscussionFilterState;

    })(Model);
  });

}).call(this);

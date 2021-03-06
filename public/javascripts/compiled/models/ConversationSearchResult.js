(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['underscore', 'Backbone'], function(_, _arg) {
    var ConversationSearchResult, Model, _ref;

    Model = _arg.Model;
    return ConversationSearchResult = (function(_super) {
      __extends(ConversationSearchResult, _super);

      function ConversationSearchResult() {
        _ref = ConversationSearchResult.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ConversationSearchResult.prototype.parse = function(data) {
        return _.extend(data, {
          isContext: data.type === 'context'
        });
      };

      return ConversationSearchResult;

    })(Model);
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['compiled/views/CollectionView', 'compiled/views/conversations/ContextMessageView'], function(CollectionView, ContextMessageView) {
    var ContextMessagesView, _ref;

    return ContextMessagesView = (function(_super) {
      __extends(ContextMessagesView, _super);

      function ContextMessagesView() {
        _ref = ContextMessagesView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ContextMessagesView.prototype.itemView = ContextMessageView;

      return ContextMessagesView;

    })(CollectionView);
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['i18n!quizzes', 'Backbone', 'compiled/models/Quiz'], function(I18n, Backbone, Quiz) {
    var QuizCollection, _ref;

    return QuizCollection = (function(_super) {
      __extends(QuizCollection, _super);

      function QuizCollection() {
        _ref = QuizCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      QuizCollection.prototype.model = Quiz;

      return QuizCollection;

    })(Backbone.Collection);
  });

}).call(this);

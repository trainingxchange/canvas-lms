(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  require(['i18n!quizzes', 'jquery', 'underscore', 'Backbone', 'compiled/views/quizzes/QuizItemGroupView', 'compiled/views/quizzes/NoQuizzesView', 'compiled/views/quizzes/IndexView', 'compiled/collections/QuizCollection', 'compiled/util/vddTooltip'], function(I18n, $, _, Backbone, QuizItemGroupView, NoQuizzesView, IndexView, QuizCollection, vddTooltip) {
    var QuizzesIndexRouter, router, _ref;

    QuizzesIndexRouter = (function(_super) {
      __extends(QuizzesIndexRouter, _super);

      function QuizzesIndexRouter() {
        _ref = QuizzesIndexRouter.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      QuizzesIndexRouter.prototype.routes = {
        '': 'index'
      };

      QuizzesIndexRouter.prototype.translations = {
        assignmentQuizzes: I18n.t('headers.assignment_quizzes', 'Assignment Quizzes'),
        practiceQuizzes: I18n.t('headers.practice_quizzes', 'Practice Quizzes'),
        surveys: I18n.t('headers.surveys', 'Surveys'),
        toggleMessage: I18n.t('toggle_message', 'toggle quiz visibility')
      };

      QuizzesIndexRouter.prototype.initialize = function() {
        this.allQuizzes = ENV.QUIZZES;
        return this.quizzes = {
          assignment: this.createQuizItemGroupView(this.allQuizzes.assignment, this.translations.assignmentQuizzes, 'assignment'),
          open: this.createQuizItemGroupView(this.allQuizzes.open, this.translations.practiceQuizzes, 'open'),
          surveys: this.createQuizItemGroupView(this.allQuizzes.surveys, this.translations.surveys, 'surveys'),
          noQuizzes: new NoQuizzesView
        };
      };

      QuizzesIndexRouter.prototype.index = function() {
        this.view = new IndexView({
          assignmentView: this.quizzes.assignment,
          openView: this.quizzes.open,
          surveyView: this.quizzes.surveys,
          noQuizzesView: this.quizzes.noQuizzes,
          permissions: ENV.PERMISSIONS,
          flags: ENV.FLAGS,
          urls: ENV.URLS
        });
        return this.view.render();
      };

      QuizzesIndexRouter.prototype.createQuizItemGroupView = function(collection, title, type) {
        var options;

        options = this.allQuizzes.options;
        return new QuizItemGroupView({
          collection: new QuizCollection(_.map(collection, function(quiz) {
            return $.extend(quiz, options[quiz.id]);
          })),
          isSurvey: type === 'surveys',
          listId: "" + type + "-quizzes",
          title: title,
          toggleMessage: this.translations.toggleMessage
        });
      };

      return QuizzesIndexRouter;

    })(Backbone.Router);
    router = new QuizzesIndexRouter;
    Backbone.history.start();
    return vddTooltip();
  });

}).call(this);

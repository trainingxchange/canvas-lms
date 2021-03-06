(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'jst/content_migrations/subviews/QuestionBank', 'jquery'], function(Backbone, template, $) {
    var QuestionBankView, _ref;

    return QuestionBankView = (function(_super) {
      __extends(QuestionBankView, _super);

      function QuestionBankView() {
        this.updateNewQuestionName = __bind(this.updateNewQuestionName, this);        _ref = QuestionBankView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      QuestionBankView.prototype.template = template;

      QuestionBankView.optionProperty('questionBanks');

      QuestionBankView.prototype.els = {
        ".questionBank": "$questionBankSelect",
        "#createQuestionInput": "$createQuestionInput"
      };

      QuestionBankView.prototype.events = {
        'change .questionBank': 'setQuestionBankValues',
        'keyup #createQuestionInput': 'updateNewQuestionName'
      };

      QuestionBankView.prototype.updateNewQuestionName = function(event) {
        return this.setQbName();
      };

      QuestionBankView.prototype.setQuestionBankValues = function(event) {
        if (event.target.value === 'new_question_bank') {
          this.$createQuestionInput.show();
          this.$createQuestionInput.focus();
          return this.setQbName();
        } else {
          this.$createQuestionInput.hide();
          return this.setQbId();
        }
      };

      QuestionBankView.prototype.getSettings = function() {
        var settings;

        settings = this.model.get('settings') || {};
        delete settings.question_bank_name;
        delete settings.question_bank_id;
        return settings;
      };

      QuestionBankView.prototype.setQbName = function() {
        var name, settings;

        settings = this.getSettings();
        name = this.$createQuestionInput.val();
        if (name !== "") {
          settings.question_bank_name = name;
        }
        return this.model.set('settings', settings);
      };

      QuestionBankView.prototype.setQbId = function() {
        var id, settings;

        settings = this.getSettings();
        id = this.$questionBankSelect.val();
        if (id !== "") {
          settings.question_bank_id = id;
        }
        return this.model.set('settings', settings);
      };

      QuestionBankView.prototype.toJSON = function() {
        return this.options;
      };

      return QuestionBankView;

    })(Backbone.View);
  });

}).call(this);

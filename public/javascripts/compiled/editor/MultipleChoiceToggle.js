(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'compiled/editor/EditorToggle'], function($, EditorToggle) {
    var MultipleChoiceToggle;

    return MultipleChoiceToggle = (function(_super) {
      __extends(MultipleChoiceToggle, _super);

      function MultipleChoiceToggle(editButton, options) {
        this.editButton = editButton;
        this.cacheElements();
        MultipleChoiceToggle.__super__.constructor.call(this, this.answer.find('.answer_html'), options);
      }

      MultipleChoiceToggle.prototype.cacheElements = function() {
        this.answer = this.editButton.parents('.answer');
        this.answerText = this.answer.find('input[name=answer_text]');
        this.answerText.hide();
        return this.input = this.answer.find('input[name=answer_html]');
      };

      MultipleChoiceToggle.prototype.display = function() {
        MultipleChoiceToggle.__super__.display.apply(this, arguments);
        this.toggleIfEmpty();
        this.input.val(this.content);
        if (this.content === '') {
          return this.answerText.val('');
        }
      };

      MultipleChoiceToggle.prototype.edit = function() {
        MultipleChoiceToggle.__super__.edit.apply(this, arguments);
        this.answerText.hide();
        if (this.content === '') {
          return this.textArea._setContentCode(this.answerText.val());
        } else {
          return this.textArea._setContentCode(this.content);
        }
      };

      MultipleChoiceToggle.prototype.showAnswerText = function() {
        this.answerText.show();
        this.el.hide();
        return this.input.val('');
      };

      MultipleChoiceToggle.prototype.showEl = function() {
        this.answerText.hide();
        return this.el.show();
      };

      MultipleChoiceToggle.prototype.toggleIfEmpty = function() {
        if (this.isEmpty()) {
          return this.showAnswerText();
        } else {
          return this.showEl();
        }
      };

      MultipleChoiceToggle.prototype.isEmpty = function() {
        return $.trim(this.content) === '';
      };

      return MultipleChoiceToggle;

    })(EditorToggle);
  });

}).call(this);

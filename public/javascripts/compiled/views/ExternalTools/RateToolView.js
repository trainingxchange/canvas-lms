(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'jquery', 'i18n!external_tools', 'str/htmlEscape', 'jst/ExternalTools/RateToolView', 'compiled/models/AppReview'], function(Backbone, $, I18n, htmlEscape, template, AppReview) {
    var RateToolView, _ref;

    return RateToolView = (function(_super) {
      __extends(RateToolView, _super);

      function RateToolView() {
        _ref = RateToolView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      RateToolView.prototype.template = template;

      RateToolView.prototype.tagName = 'form';

      RateToolView.prototype.id = 'rate_app_form';

      RateToolView.prototype.els = {
        '#rate-app-star': '$rateAppStar',
        'textarea[name="review_text"]': '$reviewText'
      };

      RateToolView.prototype.afterRender = function() {
        var _this = this;

        this.$reviewText.html(this.model.get('comments'));
        this.$rateAppStar.raty({
          path: '/images/raty/',
          size: 24,
          starOff: 'star-off-big.png',
          starOn: 'star-on-big.png',
          score: this.model.get('rating'),
          click: function(score, evt) {
            return $('.alert-error').remove();
          }
        });
        this.$el.dialog({
          title: I18n.t('dialog_title_rate_tool', 'How do you rate this tool?'),
          width: 520,
          height: "auto",
          resizable: true,
          close: function() {
            return _this.$el.remove();
          },
          buttons: [
            {
              text: I18n.t('buttons.cancel', 'Cancel'),
              click: function() {
                return $(this).dialog('close');
              }
            }, {
              "class": "btn-primary",
              text: I18n.t('submit', 'Submit'),
              'data-text-while-loading': I18n.t('saving', 'Saving...'),
              click: function() {
                return _this.submit();
              }
            }
          ]
        });
        this.$el.submit(function(e) {
          _this.submit();
          return false;
        });
        return this;
      };

      RateToolView.prototype.submit = function() {
        var _this = this;

        $('.alert-error').remove();
        if (this.$rateAppStar.raty('score')) {
          this.model.save({
            id: void 0,
            rating: this.$rateAppStar.raty('score'),
            comments: this.$reviewText.val()
          }, {
            success: function(m, r) {
              if (r.type === 'error') {
                $.flashError(htmlEscape(I18n.t('save_failed', "Unable to save review: %{message}", {
                  message: r.message
                })));
              }
              return m.trigger('sync');
            }
          });
          return this.$el.dialog('close');
        } else {
          return this.showErrorMessage();
        }
      };

      RateToolView.prototype.showErrorMessage = function() {
        var message;

        message = I18n.t('missing_stars', 'You must select a star rating');
        return this.$el.prepend("<div class='alert alert-error'>" + message + "</span>");
      };

      return RateToolView;

    })(Backbone.View);
  });

}).call(this);

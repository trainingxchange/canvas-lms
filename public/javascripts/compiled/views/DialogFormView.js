(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'compiled/views/ValidatedFormView', 'compiled/fn/preventDefault', 'jst/DialogFormWrapper', 'jqueryui/dialog', 'compiled/jquery/fixDialogButtons'], function($, ValidatedFormView, preventDefault, wrapper) {
    var DialogFormView, _ref;

    return DialogFormView = (function(_super) {
      __extends(DialogFormView, _super);

      function DialogFormView() {
        this.onSaveSuccess = __bind(this.onSaveSuccess, this);
        this.renderElAgain = __bind(this.renderElAgain, this);
        this.firstRenderEl = __bind(this.firstRenderEl, this);
        this.toggle = __bind(this.toggle, this);        _ref = DialogFormView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      DialogFormView.prototype.defaults = {
        trigger: false,
        title: null,
        width: null,
        height: null,
        fixDialogButtons: true
      };

      DialogFormView.prototype.$dialogAppendTarget = $('body');

      DialogFormView.prototype.className = 'dialogFormView';

      DialogFormView.prototype.wrapperTemplate = wrapper;

      DialogFormView.prototype.initialize = function() {
        DialogFormView.__super__.initialize.apply(this, arguments);
        this.setTrigger();
        this.open = this.firstOpen;
        return this.renderEl = this.firstRenderEl;
      };

      DialogFormView.prototype.open = null;

      DialogFormView.prototype.close = function() {
        var _ref1, _ref2;

        if ((_ref1 = this.dialog) != null ? _ref1.isOpen() : void 0) {
          this.dialog.close();
        }
        return (_ref2 = this.focusReturnsTo()) != null ? _ref2.focus() : void 0;
      };

      DialogFormView.prototype.toggle = function() {
        var _ref1;

        if ((_ref1 = this.dialog) != null ? _ref1.isOpen() : void 0) {
          return this.close();
        } else {
          return this.open();
        }
      };

      DialogFormView.prototype.remove = function() {
        var _ref1, _ref2;

        DialogFormView.__super__.remove.apply(this, arguments);
        if ((_ref1 = this.$trigger) != null) {
          _ref1.off('.dialogFormView');
        }
        if ((_ref2 = this.$dialog) != null) {
          _ref2.remove();
        }
        this.open = this.firstOpen;
        return this.renderEl = this.firstRenderEl;
      };

      DialogFormView.prototype.firstOpen = function() {
        this.insert();
        this.render();
        this.setupDialog();
        this.openAgain();
        return this.open = this.openAgain;
      };

      DialogFormView.prototype.openAgain = function() {
        this.dialog.open();
        return this.dialog.uiDialog.focus();
      };

      DialogFormView.prototype.insert = function() {
        return this.$el.appendTo(this.$dialogAppendTarget);
      };

      DialogFormView.prototype.setTrigger = function(el) {
        if (el) {
          this.options.trigger = el;
        }
        if (!this.options.trigger) {
          return;
        }
        this.$trigger = $(this.options.trigger);
        return this.attachTrigger();
      };

      DialogFormView.prototype.attachTrigger = function() {
        var _ref1;

        return (_ref1 = this.$trigger) != null ? _ref1.on('click.dialogFormView', preventDefault(this.toggle)) : void 0;
      };

      DialogFormView.prototype.renderEl = null;

      DialogFormView.prototype.firstRenderEl = function() {
        this.$el.html(this.wrapperTemplate(this.toJSON()));
        this.renderElAgain();
        return this.renderEl = this.renderElAgain;
      };

      DialogFormView.prototype.renderElAgain = function() {
        var html;

        html = this.template(this.toJSON());
        return this.$el.find('.outlet').html(html);
      };

      DialogFormView.prototype.getDialogTitle = function() {
        var _ref1;

        return this.options.title || ((_ref1 = this.$trigger) != null ? _ref1.attr('title') : void 0) || this.getAriaTitle();
      };

      DialogFormView.prototype.getAriaTitle = function() {
        var ariaID, _ref1;

        ariaID = (_ref1 = this.$trigger) != null ? _ref1.attr('aria-describedby') : void 0;
        return $("#" + ariaID).text();
      };

      DialogFormView.prototype.setupDialog = function() {
        var opts,
          _this = this;

        opts = {
          autoOpen: false,
          title: this.getDialogTitle(),
          close: function() {
            _this.close();
            return _this.trigger('close');
          },
          open: function() {
            return _this.trigger('open');
          }
        };
        opts.width = this.options.width;
        opts.height = this.options.height;
        this.$el.dialog(opts);
        if (this.options.fixDialogButtons) {
          this.$el.fixDialogButtons();
        }
        return this.dialog = this.$el.data('dialog');
      };

      DialogFormView.prototype.setDimensions = function(width, height) {
        var opts;

        width = width != null ? width : this.options.width;
        height = height != null ? height : this.options.height;
        opts = {
          width: width,
          height: height
        };
        return this.$el.dialog(opts);
      };

      DialogFormView.prototype.onSaveSuccess = function() {
        DialogFormView.__super__.onSaveSuccess.apply(this, arguments);
        return this.close();
      };

      DialogFormView.prototype.focusReturnsTo = function() {
        var id;

        if (!this.$trigger) {
          return null;
        }
        if (id = this.$trigger.data('focusReturnsTo')) {
          return $("#" + id);
        } else {
          return this.$trigger;
        }
      };

      return DialogFormView;

    })(ValidatedFormView);
  });

}).call(this);

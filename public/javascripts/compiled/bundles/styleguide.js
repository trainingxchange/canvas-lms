(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  require(['jquery', 'underscore', 'compiled/fn/preventDefault', 'compiled/views/PublishButtonView', 'compiled/views/PublishIconView', 'jqueryui/accordion', 'jqueryui/tabs', 'jqueryui/button', 'jqueryui/tooltip', 'jquery.instructure_date_and_time'], function($, _, preventDefault, PublishButtonView, PublishIconView) {
    var Publishable, btnView, iconEventsMap, model, _ref;

    (function() {
      var dialog;

      dialog = $('#dialog-buttons-dialog').dialog({
        autoOpen: false,
        height: 200
      }).data('dialog');
      return $('#show-dialog-buttons-dialog').click(function() {
        return dialog.open();
      });
    })();
    iconEventsMap = {
      mouseover: function() {
        return $(this).addClass("hover");
      },
      click: function() {
        return $(this).addClass("active");
      },
      mouseout: function() {
        return $(this).removeClass("hover active");
      }
    };
    $("#content").on(iconEventsMap, ".demo-icons");
    $(".accordion").accordion({
      header: "h3"
    });
    $("#tabs").tabs();
    $("ul#icons li").hover(function() {
      return $(this).addClass("ui-state-hover");
    }, function() {
      return $(this).removeClass("ui-state-hover");
    });
    $(".styleguide-turnIntoUiButton, .styleguide-turnAllIntoUiButton > *").button();
    $("#leftIconButton").button({
      icons: {
        primary: "ui-icon-wrench"
      }
    });
    $("#bothIconButton").button({
      icons: {
        primary: "ui-icon-wrench",
        secondary: "ui-icon-triangle-1-s"
      }
    });
    $("#radio1").buttonset();
    Publishable = (function(_super) {
      __extends(Publishable, _super);

      function Publishable() {
        _ref = Publishable.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Publishable.prototype.defaults = {
        "published": false,
        "publishable": true
      };

      Publishable.prototype.publish = function() {
        var deferred;

        this.set("published", true);
        deferred = $.Deferred();
        setTimeout(deferred.resolve, 1000);
        return deferred;
      };

      Publishable.prototype.unpublish = function() {
        var deferred;

        this.set("published", false);
        deferred = $.Deferred();
        setTimeout(deferred.resolve, 1000);
        return deferred;
      };

      Publishable.prototype.disabledMessage = function() {
        return "Can't unpublish";
      };

      return Publishable;

    })(Backbone.Model);
    model = new Publishable({
      published: false,
      publishable: true
    });
    btnView = new PublishButtonView({
      model: model,
      el: "#publish"
    }).render();
    model = new Publishable({
      published: true,
      publishable: true
    });
    btnView = new PublishButtonView({
      model: model,
      el: "#published"
    }).render();
    model = new Publishable({
      published: true,
      publishable: false
    });
    btnView = new PublishButtonView({
      model: model,
      el: "#published-disabled"
    }).render();
    _.each($('.publish-icon'), function($el) {
      model = new Publishable({
        published: false,
        publishable: true
      });
      return btnView = new PublishIconView({
        model: model,
        el: $el
      }).render();
    });
    $('.element_toggler').click(function(e) {
      return $(e.currentTarget).find('i').toggleClass('icon-mini-arrow-down').toggleClass('icon-mini-arrow-right');
    });
    $("#progressbar").progressbar({
      value: 37
    }).width(500);
    $("#animateProgress").click(preventDefault(function() {
      var randNum;

      randNum = Math.random() * 90;
      return $("#progressbar div").animate({
        width: "" + randNum + "%"
      });
    }));
    $("#tabs2").tabs();
    $("#accordion2").accordion({
      header: "h4"
    });
    $("#play, #shuffle").button();
    $("#repeat").buttonset();
    return $(".styleguide-datetime_field-example").datetime_field();
  });

}).call(this);

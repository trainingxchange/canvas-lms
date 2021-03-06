(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  require(['underscore', 'Backbone', 'jquery', 'i18n!dashboard', 'compiled/util/newCourseForm', 'jst/dashboard/show_more_link', 'jquery.disableWhileLoading'], function(_, _arg, $, I18n, newCourseForm, showMoreTemplate) {
    var DashboardView, View, rightSide, _ref;

    View = _arg.View;
    if (ENV.DASHBOARD_SIDEBAR_URL) {
      rightSide = $('#right-side');
      rightSide.disableWhileLoading($.get(ENV.DASHBOARD_SIDEBAR_URL, function(data) {
        rightSide.html(data);
        return newCourseForm();
      }));
    }
    DashboardView = (function(_super) {
      __extends(DashboardView, _super);

      function DashboardView() {
        _ref = DashboardView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      DashboardView.prototype.el = document.body;

      DashboardView.prototype.events = {
        'click .stream_header': 'toggleDetails',
        'click .stream_header .links a': 'stopPropagation',
        'click .stream-details': 'handleDetailsClick',
        'beforeremove': 'updateCategoryCounts'
      };

      DashboardView.prototype.initialize = function() {
        var _this = this;

        DashboardView.__super__.initialize.apply(this, arguments);
        return $('.stream-category').each(function(idx, elm) {
          return _this.setShowMoreLink($(elm));
        });
      };

      DashboardView.prototype.toggleDetails = function(event) {
        var details, header, isExpanded;

        header = $(event.currentTarget);
        isExpanded = !(header.attr('aria-expanded') === 'true');
        header.attr('aria-expanded', isExpanded);
        details = header.next('.details_container');
        details.toggle(isExpanded);
        if (isExpanded) {
          details.find('a:first').focus();
        }
        return this.setShowMoreLink(header.closest('.stream-category'), isExpanded);
      };

      DashboardView.prototype.setShowMoreLink = function($category) {
        var $link, assistiveText, categoryName, count, isExpanded;

        if (!$category) {
          return;
        }
        isExpanded = $category.find('.details_container').is(':visible');
        categoryName = $category.data('category');
        count = parseInt($category.find('.count:first').text());
        assistiveText = this.getCategoryText(categoryName, count, !isExpanded);
        $link = $category.find('.toggle-details');
        return $link.html(showMoreTemplate({
          expanded: isExpanded,
          assistiveText: assistiveText
        }));
      };

      DashboardView.prototype.getCategoryText = function(category, count, forExpand) {
        if (category === 'Announcement') {
          if (forExpand) {
            return I18n.t("announcements_expand", {
              one: "Expand %{count} announcement",
              other: "Expand %{count} announcements"
            }, {
              count: count
            });
          } else {
            return I18n.t("announcements_collapse", {
              one: "Collapse %{count} announcement",
              other: "Collapse %{count} announcements"
            }, {
              count: count
            });
          }
        } else if (category === 'Conversation') {
          if (forExpand) {
            return I18n.t("conversations_expand", {
              one: "Expand %{count} conversation message",
              other: "Expand %{count} conversation messages"
            }, {
              count: count
            });
          } else {
            return I18n.t("conversations_collapse", {
              one: "Collapse %{count} conversation message",
              other: "Collapse %{count} conversation messages"
            }, {
              count: count
            });
          }
        } else if (category === 'Assignment') {
          if (forExpand) {
            return I18n.t("assignments_expand", {
              one: "Expand %{count} assignment notification",
              other: "Expand %{count} assignment notifications"
            }, {
              count: count
            });
          } else {
            return I18n.t("assignments_collapse", {
              one: "Collapse %{count} assignment notification",
              other: "Collapse %{count} assignment notifications"
            }, {
              count: count
            });
          }
        } else if (category === 'DiscussionTopic') {
          if (forExpand) {
            return I18n.t("discussions_expand", {
              one: "Expand %{count} discussion",
              other: "Expand %{count} discussions"
            }, {
              count: count
            });
          } else {
            return I18n.t("discussions_collapse", {
              one: "Collapse %{count} discussion",
              other: "Collapse %{count} discussions"
            }, {
              count: count
            });
          }
        } else {
          return '';
        }
      };

      DashboardView.prototype.handleDetailsClick = function(event) {
        var link, row;

        row = $(event.target).closest('tr');
        return link = row.find('a');
      };

      DashboardView.prototype.updateCategoryCounts = function(event) {
        var items, parent;

        parent = $(event.target).closest('li[class^=stream-]');
        items = parent.find('tbody tr').filter(':visible');
        if (items.length) {
          parent.find('.count').text(items.length);
        } else {
          parent.remove();
        }
        return this.setShowMoreLink($(event.target).closest('.stream-category'));
      };

      return DashboardView;

    })(View);
    return new DashboardView;
  });

}).call(this);

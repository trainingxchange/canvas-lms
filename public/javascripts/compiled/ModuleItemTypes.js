(function() {
  define(['i18n!module_item_types'], function(I18n) {
    return [
      {
        label: I18n.t("file", "File"),
        type: "File"
      }, {
        label: I18n.t("page", "Page"),
        type: "Page"
      }, {
        label: I18n.t("disuccsion", "Discussion"),
        type: "Discussion"
      }, {
        label: I18n.t("assignment", "Assignment"),
        type: "Assignment"
      }, {
        label: I18n.t("quiz", "Quiz"),
        type: "Quiz"
      }, {
        label: I18n.t("sub_header", "Sub Header"),
        type: "SubHeader"
      }, {
        label: I18n.t("external_url", "External URL"),
        type: "ExternalUrl"
      }, {
        label: I18n.t("external_tool", "External Tool"),
        type: "ExternalTool"
      }
    ];
  });

}).call(this);

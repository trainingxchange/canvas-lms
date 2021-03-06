(function() {
  define(['i18n!roster', 'underscore', 'jquery.disableWhileLoading'], function(I18n, _) {
    var RosterDialogMixin;

    return RosterDialogMixin = {
      disable: function(dfds) {
        return this.$el.disableWhileLoading(dfds, {
          buttons: {
            '.btn-primary .ui-button-text': I18n.t('updating', 'Updating...')
          }
        });
      },
      updateEnrollments: function(addEnrollments, removeEnrollments) {
        var en, enrollments, removeIds, sectionIds, sections, _i, _len;

        enrollments = this.model.get('enrollments');
        for (_i = 0, _len = addEnrollments.length; _i < _len; _i++) {
          en = addEnrollments[_i];
          enrollments.push(en);
        }
        removeIds = _.pluck(removeEnrollments, 'id');
        enrollments = _.reject(enrollments, function(en) {
          return _.include(removeIds, en.id);
        });
        sectionIds = _.pluck(enrollments, 'course_section_id');
        sections = _.select(ENV.SECTIONS, function(s) {
          return _.include(sectionIds, s.id);
        });
        return this.model.set({
          enrollments: enrollments,
          sections: sections
        });
      }
    };
  });

}).call(this);

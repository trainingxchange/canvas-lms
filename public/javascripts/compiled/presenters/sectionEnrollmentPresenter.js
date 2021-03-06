(function() {
  define(['i18n!section', 'underscore', 'compiled/str/underscore'], function(I18n, _, toUnderscore) {
    var keys;

    keys = {
      limited: {
        TeacherEnrollment: I18n.t('enrolled_as_limited_teacher', 'enrolled as a teacher with section-only access'),
        TaEnrollment: I18n.t('enrolled_as_limited_ta', 'enrolled as a TA with section-only access'),
        ObserverEnrollment: I18n.t('enrolled_as_limited_observer', 'enrolled as a observer with section-only access'),
        CourseDesignerEnrollment: I18n.t('enrolled_as_limited_designer', 'enrolled as a designer with section-only access'),
        StudentEnrollment: I18n.t('enrolled_as_limited_student', 'enrolled as a student with section-only access')
      },
      standard: {
        TeacherEnrollment: I18n.t('enrolled_as_teacher', 'enrolled as a teacher'),
        TaEnrollment: I18n.t('enrolled_as_ta', 'enrolled as a TA'),
        ObserverEnrollment: I18n.t('enrolled_as_observer', 'enrolled as a observer'),
        CourseDesignerEnrollment: I18n.t('enrolled_as_designer', 'enrolled as a designer'),
        StudentEnrollment: I18n.t('enrolled_as_student', 'enrolled as a student')
      }
    };
    return function(data) {
      return _.map(data, function(enrollment) {
        var scope;

        scope = enrollment.limit_privileges_to_course_section ? 'limited' : 'standard';
        enrollment.typeLabel = keys[scope][enrollment.type];
        enrollment.permissions = ENV.PERMISSIONS;
        enrollment.typeClass = toUnderscore(enrollment.type);
        return enrollment;
      });
    };
  });

}).call(this);

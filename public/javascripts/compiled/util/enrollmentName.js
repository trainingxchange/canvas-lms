(function() {
  define(['i18n!enrollmentNames'], function(I18n) {
    var enrollmentName, types;

    types = {
      StudentEnrollment: I18n.t("student", "Student"),
      TeacherEnrollment: I18n.t("teacher", "Teacher"),
      TaEnrollment: I18n.t("teacher_assistant", "TA"),
      ObserverEnrollment: I18n.t("observer", "Observer"),
      DesignerEnrollment: I18n.t("course_designer", "Course Designer")
    };
    return enrollmentName = function(type) {
      return types[type] || type;
    };
  });

}).call(this);

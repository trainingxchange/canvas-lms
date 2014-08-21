(function() {
  require(['jquery', 'compiled/collections/UserCollection', 'jst/modules/ProgressionsIndex', 'compiled/views/PaginatedCollectionView', 'compiled/views/modules/ProgressionStudentView'], function($, UserCollection, progressionsIndexTemplate, PaginatedCollectionView, ProgressionStudentView) {
    var indexView, students;

    $(document.body).addClass('context_modules2');
    if (ENV.RESTRICTED_LIST) {
      students = new UserCollection(ENV.VISIBLE_STUDENTS);
      students.urls = null;
    } else {
      students = new UserCollection(null, {
        params: {
          per_page: 50,
          enrollment_type: 'student'
        }
      });
      students.fetch();
    }
    indexView = new PaginatedCollectionView({
      collection: students,
      itemView: ProgressionStudentView,
      template: progressionsIndexTemplate,
      modules_url: ENV.MODULES_URL
    });
    indexView.render();
    if (ENV.RESTRICTED_LIST && ENV.VISIBLE_STUDENTS.length === 1) {
      indexView.$el.find('#progression_students').hide();
    }
    return indexView.$el.appendTo($('#content'));
  });

}).call(this);

(function() {
  require(['jquery', 'compiled/collections/UserCollection', 'compiled/views/RecentStudents/RecentStudentCollectionView'], function($, UserCollection, RecentStudentCollectionView) {
    return $(function() {
      var recentStudentCollection;

      $('#reports-tabs').tabs().show();
      recentStudentCollection = new UserCollection;
      recentStudentCollection.url = ENV.RECENT_STUDENTS_URL;
      recentStudentCollection.course_id = ENV.context_asset_string.split('_')[1];
      recentStudentCollection.fetch();
      window.app = {
        studentsTab: {}
      };
      return window.app.studentsTab = new RecentStudentCollectionView({
        el: '#tab-students .item_list',
        collection: recentStudentCollection
      });
    });
  });

}).call(this);

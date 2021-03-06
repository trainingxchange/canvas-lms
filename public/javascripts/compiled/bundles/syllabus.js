(function() {
  require(['jquery', 'underscore', 'compiled/behaviors/SyllabusBehaviors', 'compiled/collections/SyllabusCollection', 'compiled/collections/SyllabusCalendarEventsCollection', 'compiled/collections/SyllabusAppointmentGroupsCollection', 'compiled/views/courses/SyllabusView'], function($, _, SyllabusBehaviors, SyllabusCollection, SyllabusCalendarEventsCollection, SyllabusAppointmentGroupsCollection, SyllabusView) {
    var acollection, collections, deferreds, view;

    collections = [new SyllabusCalendarEventsCollection([ENV.context_asset_string], 'event'), new SyllabusCalendarEventsCollection([ENV.context_asset_string], 'assignment')];
    if (ENV.current_user_id) {
      collections.push(new SyllabusAppointmentGroupsCollection([ENV.context_asset_string], 'reservable'));
      collections.push(new SyllabusAppointmentGroupsCollection([ENV.context_asset_string], 'manageable'));
    }
    deferreds = _.map(collections, function(collection) {
      var deferred, error, success, _ref;

      deferred = $.Deferred();
      error = function() {
        return deferred.reject();
      };
      success = function() {
        if (collection.canFetch('next')) {
          return collection.fetch({
            page: 'next',
            success: success,
            error: error
          });
        } else {
          return deferred.resolve();
        }
      };
      collection.fetch({
        data: {
          per_page: (_ref = ENV.SYLLABUS_PER_PAGE) != null ? _ref : 50
        },
        success: success,
        error: error
      });
      return deferred;
    });
    acollection = new SyllabusCollection(collections);
    view = new SyllabusView({
      el: '#syllabusContainer',
      collection: acollection,
      can_read: ENV.CAN_READ,
      is_valid_user: ENV.current_user_id ? true : false
    });
    $.when.apply(this, deferreds).then(function() {
      view.render();
      return SyllabusBehaviors.bindToSyllabus();
    });
    $('#loading_indicator').replaceWith('<img src="/images/ajax-reload-animated.gif">');
    return $(function() {
      SyllabusBehaviors.bindToEditSyllabus();
      SyllabusBehaviors.bindToMiniCalendar();
      return $.scrollSidebar();
    });
  });

}).call(this);

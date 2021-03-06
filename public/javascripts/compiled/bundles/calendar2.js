(function() {
  require(['jquery', 'compiled/calendar/Calendar', 'compiled/calendar/MiniCalendar', 'compiled/views/calendar/CalendarHeader', 'compiled/calendar/sidebar', 'compiled/calendar/EventDataSource', 'compiled/calendar/UndatedEventsList', 'compiled/bundles/jquery_ui_menu'], function($, Calendar, MiniCalendar, CalendarHeader, drawSidebar, EventDataSource, UndatedEventsList) {
    this.eventDataSource = new EventDataSource(ENV.CALENDAR.CONTEXTS);
    this.header = new CalendarHeader({
      el: "#calendar_header",
      calendar2Only: ENV.CALENDAR.CAL2_ONLY,
      showScheduler: ENV.CALENDAR.SHOW_SCHEDULER
    });
    this.calendar = new Calendar("#calendar-app", ENV.CALENDAR.CONTEXTS, ENV.CALENDAR.MANAGE_CONTEXTS, this.eventDataSource, {
      activateEvent: ENV.CALENDAR.ACTIVE_EVENT,
      viewStart: ENV.CALENDAR.VIEW_START,
      showScheduler: ENV.CALENDAR.SHOW_SCHEDULER,
      header: this.header
    });
    new MiniCalendar("#minical", this.calendar);
    new UndatedEventsList("#undated-events", this.eventDataSource, this.calendar);
    return drawSidebar(ENV.CALENDAR.CONTEXTS, ENV.CALENDAR.SELECTED_CONTEXTS, this.eventDataSource);
  });

}).call(this);

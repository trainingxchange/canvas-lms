(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['jquery', 'i18n!calendar', 'compiled/util/Popover', 'compiled/calendar/CommonEvent', 'compiled/calendar/EditEventDetailsDialog', 'jst/calendar/eventDetails', 'jst/calendar/deleteItem', 'jst/calendar/reservationOverLimitDialog', 'compiled/calendar/MessageParticipantsDialog', 'compiled/fn/preventDefault', 'underscore', 'vendor/jquery.ba-tinypubsub', 'jquery.ajaxJSON', 'jquery.instructure_misc_helpers', 'jquery.instructure_misc_plugins'], function($, I18n, Popover, CommonEvent, EditEventDetailsDialog, eventDetailsTemplate, deleteItemTemplate, reservationOverLimitDialog, MessageParticipantsDialog, preventDefault, _, _arg) {
    var ShowEventDetailsDialog, destroyArguments, publish,
      _this = this;

    publish = _arg.publish;
    destroyArguments = function(fn) {
      return function() {
        return fn.apply(this, []);
      };
    };
    return ShowEventDetailsDialog = (function() {
      function ShowEventDetailsDialog(event, dataSource) {
        this.dataSource = dataSource;
        this.openShowPage = __bind(this.openShowPage, this);
        this.close = __bind(this.close, this);
        this.show = __bind(this.show, this);
        this.cancelAppointment = __bind(this.cancelAppointment, this);
        this.unreserveEvent = __bind(this.unreserveEvent, this);
        this.reserveEvent = __bind(this.reserveEvent, this);
        this.reserveSuccessCB = __bind(this.reserveSuccessCB, this);
        this.reserveErrorCB = __bind(this.reserveErrorCB, this);
        this.deleteEvent = __bind(this.deleteEvent, this);
        this.showEditDialog = __bind(this.showEditDialog, this);
        this.event = event;
        this.contexts = event.contexts;
      }

      ShowEventDetailsDialog.prototype.showEditDialog = function() {
        this.popover.hide();
        return (new EditEventDetailsDialog(this.event)).show();
      };

      ShowEventDetailsDialog.prototype.deleteEvent = function(event, opts) {
        var url,
          _this = this;

        if (opts == null) {
          opts = {};
        }
        if (event == null) {
          event = this.event;
        }
        if (this.event.isNewEvent()) {
          return;
        }
        url = event.object.url;
        if (event.assignment) {
          url = $.replaceTags(this.event.deleteURL, 'id', this.event.object.id);
        }
        return $("<div />").confirmDelete({
          url: url,
          message: $(deleteItemTemplate({
            message: opts.message || event.deleteConfirmation,
            hide_reason: event.object.workflow_state !== 'locked'
          })),
          dialog: {
            title: opts.dialogTitle || I18n.t('confirm_deletion', "Confirm Deletion")
          },
          prepareData: function($dialog) {
            return {
              cancel_reason: $dialog.find('#cancel_reason').val()
            };
          },
          confirmed: function() {
            _this.popover.hide();
            return $.publish("CommonEvent/eventDeleting", event);
          },
          success: function() {
            return $.publish("CommonEvent/eventDeleted", event);
          }
        });
      };

      ShowEventDetailsDialog.prototype.reserveErrorCB = function(data) {
        var $dialog, error, errorHandled, _i, _len,
          _this = this;

        for (_i = 0, _len = data.length; _i < _len; _i++) {
          error = data[_i];
          if (!(error.message === 'participant has met per-participant limit')) {
            continue;
          }
          errorHandled = true;
          error.reschedulable = error.reservations.length === 1;
          $dialog = $(reservationOverLimitDialog(error)).dialog({
            resizable: false,
            width: 450,
            buttons: error.reschedulable ? [
              {
                text: I18n.t('do_nothing', 'Do Nothing'),
                click: function() {
                  return $dialog.dialog('close');
                }
              }, {
                text: I18n.t('reschedule', 'Reschedule'),
                'class': 'btn-primary',
                click: function() {
                  return $dialog.disableWhileLoading(_this.reserveEvent({
                    cancel_existing: true
                  }).always(function() {
                    return $dialog.dialog('close');
                  }));
                }
              }
            ] : [
              {
                text: I18n.t('ok', 'OK'),
                click: function() {
                  return $dialog.dialog('close');
                }
              }
            ]
          });
        }
        if (!errorHandled) {
          alert("Could not reserve event: " + data);
          return $.publish("CommonEvent/eventSaveFailed", this.event);
        }
      };

      ShowEventDetailsDialog.prototype.reserveSuccessCB = function(data) {
        this.popover.hide();
        return $.publish("CommonEvent/eventSaved", this.event);
      };

      ShowEventDetailsDialog.prototype.reserveEvent = function(params) {
        if (params == null) {
          params = {};
        }
        $.publish("CommonEvent/eventSaving", this.event);
        return $.ajaxJSON(this.event.object.reserve_url, 'POST', params, this.reserveSuccessCB, this.reserveErrorCB);
      };

      ShowEventDetailsDialog.prototype.unreserveEvent = function() {
        var e, _i, _len, _ref, _ref1;

        _ref = this.event.childEvents;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          if ((_ref1 = e.object) != null ? _ref1.own_reservation : void 0) {
            this.deleteEvent(e, {
              dialogTitle: I18n.t('confirm_unreserve', "Confirm Reservation Removal"),
              message: I18n.t('prompts.unreserve_event', "Are you sure you want to delete your reservation to this event?")
            });
            return;
          }
        }
      };

      ShowEventDetailsDialog.prototype.cancelAppointment = function($appt) {
        var event, url, _ref,
          _this = this;

        url = $appt.data('url');
        event = _.detect(this.event.calendarEvent.child_events, function(e) {
          return e.url === url;
        });
        return $("<div/>").confirmDelete({
          url: url,
          message: $(deleteItemTemplate({
            message: I18n.t('cancel_appointment', 'Are you sure you want to cancel your appointment with %{name}?', {
              name: ((_ref = event.user) != null ? _ref.short_name : void 0) || event.group.name
            })
          })),
          dialog: {
            title: I18n.t('confirm_removal', "Confirm Removal"),
            width: '400px',
            resizable: false
          },
          prepareData: function($dialog) {
            return {
              cancel_reason: $dialog.find('#cancel_reason').val()
            };
          },
          success: function() {
            var appointments, in_scheduler;

            _this.event.object.child_events = _(_this.event.object.child_events).reject(function(e) {
              return e.url === $appt.data('url');
            });
            $appt.remove();
            in_scheduler = $('#scheduler').prop('checked');
            appointments = _this.event.calendarEvent.child_events;
            if (!in_scheduler && appointments.length === 0) {
              $.publish("CommonEvent/eventDeleted", _this.event);
              return _this.popover.hide();
            }
          }
        });
      };

      ShowEventDetailsDialog.prototype.show = function(jsEvent) {
        var e, params, reservation, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9,
          _this = this;

        params = $.extend(true, {}, this.event, {
          can_reserve: (_ref = this.event.object) != null ? _ref.reserve_url : void 0
        });
        if (this.event.contextInfo.can_create_appointment_groups) {
          params.can_reserve = false;
        }
        if ((_ref1 = this.event.object) != null ? _ref1.child_events : void 0) {
          if (this.event.object.reserved) {
            params.can_unreserve = true;
            params.can_reserve = false;
          }
          _ref2 = this.event.object.child_events;
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            e = _ref2[_i];
            reservation = {
              id: ((_ref3 = e.user) != null ? _ref3.id : void 0) || e.group.id,
              name: ((_ref4 = e.user) != null ? _ref4.short_name : void 0) || e.group.name,
              event_url: e.url
            };
            ((_ref5 = params.reservations) != null ? _ref5 : params.reservations = []).push(reservation);
            if (e.user) {
              ((_ref6 = params.reserved_users) != null ? _ref6 : params.reserved_users = []).push(reservation);
            }
            if (e.group) {
              ((_ref7 = params.reserved_groups) != null ? _ref7 : params.reserved_groups = []).push(reservation);
            }
          }
        }
        if (((_ref8 = this.event.object) != null ? _ref8.available_slots : void 0) === 0) {
          params.can_reserve = false;
          params.availableSlotsText = "None";
        } else if (((_ref9 = this.event.object) != null ? _ref9.available_slots : void 0) > 0) {
          params.availableSlotsText = this.event.object.available_slots;
        }
        params.showEventLink = params.fullDetailsURL();
        params.showEventLink || (params.showEventLink = params.isAppointmentGroupEvent());
        this.popover = new Popover(jsEvent, eventDetailsTemplate(params));
        this.popover.el.data('showEventDetailsDialog', this);
        this.popover.el.find(".view_event_link").click(preventDefault(this.openShowPage));
        this.popover.el.find(".edit_event_link").click(preventDefault(this.showEditDialog));
        this.popover.el.find(".delete_event_link").click(preventDefault(destroyArguments(this.deleteEvent)));
        this.popover.el.find(".reserve_event_link").click(preventDefault(destroyArguments(this.reserveEvent)));
        this.popover.el.find(".unreserve_event_link").click(preventDefault(this.unreserveEvent));
        this.popover.el.find(".cancel_appointment_link").click(preventDefault(function(e) {
          var $appt;

          $appt = $(e.target).closest('li');
          return _this.cancelAppointment($appt);
        }));
        this.popover.el.find('.message_students').click(preventDefault(function() {
          return new MessageParticipantsDialog({
            timeslot: _this.event.calendarEvent
          }).show();
        }));
        return publish('userContent/change');
      };

      ShowEventDetailsDialog.prototype.close = function() {
        if (this.popover) {
          this.popover.el.removeData('showEventDetailsDialog');
          return this.popover.hide();
        }
      };

      ShowEventDetailsDialog.prototype.openShowPage = function(jsEvent) {
        var pieces;

        pieces = $(jsEvent.target).attr('href').split("#");
        pieces[0] += "?" + $.param({
          'return_to': window.location.href
        });
        return window.location.href = pieces.join("#");
      };

      return ShowEventDetailsDialog;

    })();
  });

}).call(this);

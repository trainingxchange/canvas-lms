(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};define(["jquery","underscore","compiled/calendar/commonEventFactory","jquery.ajaxJSON","vendor/jquery.ba-tinypubsub"],function(e,n,i){return function(){function s(n){this.fetchNextBatch=t(this.fetchNextBatch,this),this.startFetch=t(this.startFetch,this),this.getParticipants=t(this.getParticipants,this),this.getEvents=t(this.getEvents,this),this.getEventsForAppointmentGroup=t(this.getEventsForAppointmentGroup,this),this.processAppointmentData=t(this.processAppointmentData,this),this.getAppointmentGroups=t(this.getAppointmentGroups,this),this.getAppointmentGroupsFromCache=t(this.getAppointmentGroupsFromCache,this),this.getEventsFromCache=t(this.getEventsFromCache,this),this.processNextRequest=t(this.processNextRequest,this),this.getEventsFromCacheForContext=t(this.getEventsFromCacheForContext,this),this.addEventToCache=t(this.addEventToCache,this),this.needUndatedEventsForContexts=t(this.needUndatedEventsForContexts,this),this.requiredDateRangeForContexts=t(this.requiredDateRangeForContexts,this),this.requiredDateRangeForContext=t(this.requiredDateRangeForContext,this),this.clearCache=t(this.clearCache,this),this.eventWithId=t(this.eventWithId,this),this.eventDeleted=t(this.eventDeleted,this),this.eventSaved=t(this.eventSaved,this),this.contexts=n,this.clearCache(),this.inFlightRequest={},this.pendingRequests=[],e.subscribe("CommonEvent/eventDeleted",this.eventDeleted),e.subscribe("CommonEvent/eventSaved",this.eventSaved)}return s.prototype.eventSaved=function(t){return this.addEventToCache(t)},s.prototype.eventDeleted=function(t){var e,n;return e=null!=(n=this.cache.contexts[t.contextCode()])?n.events:void 0,e?delete e[t.id]:void 0},s.prototype.eventWithId=function(t){var e,n,i;i=this.cache.contexts;for(e in i)if(n=i[e],n.events[t])return n.events[t];return null},s.prototype.clearCache=function(){var t,e,n,i,s;for(this.cache={contexts:{},appointmentGroups:{},participants:{},fetchedAppointmentGroups:null},i=this.contexts,s=[],e=0,n=i.length;n>e;e++)t=i[e],s.push(this.cache.contexts[t.asset_string]={events:{},fetchedRanges:[],fetchedUndated:!1});return s},s.prototype.requiredDateRangeForContext=function(t,e,n){var i,s,r,o,a;if(!(i=this.cache.contexts[n]))return[t,e];if(!(r=i.fetchedRanges))return[t,e];for(o=0,a=r.length;a>o;o++)s=r[o],s[0]<=t&&t<=s[1]&&(t=s[1]),s[0]<=e&&e<=s[1]&&(e=s[0]);return[t,e]},s.prototype.requiredDateRangeForContexts=function(t,e,n){var i,s,r,o,a,p,h,c;for(r=e,o=t,p=0,h=n.length;h>p;p++)i=n[p],c=this.requiredDateRangeForContext(t,e,i),a=c[0],s=c[1],r>a&&(r=a),s>o&&(o=s);return[r,o]},s.prototype.needUndatedEventsForContexts=function(t){var e,n,i;for(n=0,i=t.length;i>n;n++)if(e=t[n],!this.cache.contexts[e].fetchedUndated)return!0;return!1},s.prototype.addEventToCache=function(t){var e,n;return e=t.contextCode(),n=this.cache.contexts[e],n.events[t.id]=t},s.prototype.getEventsFromCacheForContext=function(t,e,n){var i,s,r,o,a;i=this.cache.contexts[n],r=[],a=i.events;for(o in a)s=a[o],(!s.originalStart&&!t||s.originalStart>=t&&s.originalStart<=e)&&r.push(s);return r},s.prototype.processNextRequest=function(t){var e,n,i,s,r,o;null==t&&(t="default"),r=this.pendingRequests;for(n in r)if(o=r[n],s=o[0],e=o[1],i=o[2],i===t)return this.pendingRequests.splice(n,1),void s.apply(null,e)},s.prototype.getEventsFromCache=function(t,e,n){var i,s,r,o;for(s=[],r=0,o=n.length;o>r;r++)i=n[r],s=s.concat(this.getEventsFromCacheForContext(t,e,i));return s},s.prototype.getAppointmentGroupsFromCache=function(){var t,e,n,i;n=this.cache.appointmentGroups,i=[];for(e in n)t=n[e],i.push(t);return i},s.prototype.getAppointmentGroups=function(t,e){var n,i,s,r=this;return this.inFlightRequest.appointmentGroups?void this.pendingRequests.push([this.getAppointmentGroups,arguments,"appointmentGroups"]):this.cache.fetchedAppointmentGroups&&this.cache.fetchedAppointmentGroups.manageable===t?(e(this.getAppointmentGroupsFromCache()),void this.processNextRequest("appointmentGroups")):(this.cache.fetchedAppointmentGroups={manageable:t},this.cache.appointmentGroups={},n=function(t,e,n){var i,s,o,a;if(t){for(a=[],s=0,o=t.length;o>s;s++)i=t[s],"manageable"===n.scope?i.is_manageable=!0:i.is_scheduleable=!0,a.push(r.processAppointmentData(i));return a}},i=function(){return e(r.getAppointmentGroupsFromCache())},s=[["/api/v1/appointment_groups",{include:["reserved_times","participant_count"]}]],t&&s.push(["/api/v1/appointment_groups",{scope:"manageable",include:["reserved_times","participant_count"],include_past_appointments:!0}]),this.startFetch(s,n,i,{inFlightCheckKey:"appointmentGroups"}))},s.prototype.processAppointmentData=function(t){var e,n,s,r,o,a,p,h,c,u;if(o=t.id,(null!=(h=this.cache.appointmentGroups[o])?h.is_manageable:void 0)?t.is_manageable=!0:t.is_scheduleable=!0,this.cache.appointmentGroups[o]=t,t.appointments){for(t.appointmentEvents=[],c=t.appointments,u=[],a=0,p=c.length;p>a;a++)r=c[a],s=i(r,this.contexts),s&&"deleted"!==s.object.workflow_state?(t.appointmentEvents.push(s),this.addEventToCache(s),r.child_events?(s.childEvents=[],u.push(function(){var t,o,a,p;for(a=r.child_events,p=[],t=0,o=a.length;o>t;t++)n=a[t],e=i(n,this.contexts),this.addEventToCache(s),p.push(e?s.childEvents.push(e):void 0);return p}.call(this))):u.push(void 0)):u.push(void 0);return u}},s.prototype.getEventsForAppointmentGroup=function(t,e){var n,i,s,r,o=this;return this.inFlightRequest["default"]?void this.pendingRequests.push([this.getEventsForAppointmentGroup,arguments,"default"]):(n=null!=(r=this.cache.appointmentGroups[t.id])?r.appointmentEvents:void 0)?(e(n),void this.processNextRequest()):(i=function(t){return t?o.processAppointmentData(t):void 0},s={include:["reserved_times","participant_count","appointments","child_events"]},this.startFetch([[t.url,s]],i,function(){return e(o.cache.appointmentGroups[t.id].appointmentEvents)}))},s.prototype.getEvents=function(t,s,r,o,a){var p,h,c,u,d,l,v,g=this;return null==a&&(a={}),this.inFlightRequest["default"]?void this.pendingRequests.push([this.getEvents,arguments,"default"]):(d=function(t,n,i){var s,r,o;return o=g.requiredDateRangeForContexts(t,n,i),r=o[0],s=o[1],r>=s?null:{context_codes:i,start_date:e.unfudgeDateForProfileTimezone(r).toISOString(),end_date:e.unfudgeDateForProfileTimezone(s).toISOString()}},l=function(t){return g.needUndatedEventsForContexts(t)?{context_codes:t,undated:"1"}:null},(u=t?d(t,s,r):l(r))?(v={},p=function(t,e,s){var r,o,a,p,h,c;if(t){for(a="type_"+s.type,p=v[a]||{events:[]},p.next=t.next,h=0,c=t.length;c>h;h++)r=t[h],o=i(r,g.contexts),o&&"deleted"!==o.object.workflow_state&&p.events.push(o);return p.maxDate=n.max(p.events,function(t){return t.originalStart}).originalStart,v[a]=p}},h=function(){var e,n,i,p,h,u,d,l,f,m,x,F,C;p=!1;for(h in v)l=v[h],l.next&&(p=!0);if(d=s,p)for(h in v)l=v[h],l.next&&l.maxDate<d&&(d=l.maxDate);d&&d.setHours(0,0,0),u=t;for(h in v)for(l=v[h],C=l.events,f=0,x=C.length;x>f;f++)i=C[f],(!p||i.originalStart<d)&&(g.addEventToCache(i),i.originalStart>u&&(u=i.originalStart));for(p||(u=s),m=0,F=r.length;F>m;m++)e=r[m],n=g.cache.contexts[e],n&&(t?n.fetchedRanges.push([t,u]):n.fetchedUndated=!0);return c=g.getEventsFromCache(t,u,r),c.nextPageDate=p?d:null,c.requestID=a.requestID,o(c)},this.startFetch([["/api/v1/calendar_events",u],["/api/v1/calendar_events",e.extend({type:"assignment"},u)]],p,h,a)):(c=this.getEventsFromCache(t,s,r),c.requestID=a.requestID,o(c),void this.processNextRequest()))},s.prototype.getParticipants=function(t,e,n){var i,s,r,o,a=this;return this.inFlightRequest["default"]?void this.pendingRequests.push([this.getParticipants,arguments,"default"]):(r=""+t.id+"_"+e,this.cache.participants[r]?(n(this.cache.participants[r]),void this.processNextRequest()):(this.cache.participants[r]=[],i=function(t){return t?a.cache.participants[r].push.apply(a.cache.participants[r],t):void 0},s=function(){return n(a.cache.participants[r])},o="Group"===t.participant_type?"groups":"users",this.startFetch([["/api/v1/appointment_groups/"+t.id+"/"+o,{registration_status:e}]],i,s)))},s.prototype.startFetch=function(t,e,n,i){var s,r,o,a,p,h,c,u=this;for(null==i&&(i={}),r=0,s=i.inFlightCheckKey||"default",this.inFlightRequest[s]=!0,a=function(i,o,a,p){return e(i,a,p),o&&(r+=1,r>=t.length)?(n(),u.inFlightRequest[s]=!1,u.processNextRequest(s)):void 0},c=[],p=0,h=t.length;h>p;p++)o=t[p],c.push(function(t){return u.fetchNextBatch(t[0],t[1],function(e,n){return a(e,n,t[0],t[1])},i)}(o));return c},s.prototype.fetchNextBatch=function(t,n,i,s){var r,o=this;return null==s&&(s={}),r=function(t){var e,n,i,s,r,o,a,p;if(!t)return null;for(s={},a=t.split(","),r=0,o=a.length;o>r;r++)e=a[r],p=e.split(";"),n=p[0],i=p[1],n=n.replace(/^</,"").replace(/>$/,""),i=i.split('"')[1],s[i]=n;return s},e.publish("EventDataSource/ajaxStarted"),t.match(/per_page=/)||null!=n.per_page||(n.per_page=50),e.ajaxJSON(t,"GET",n,function(t,n){var a,p;return e.publish("EventDataSource/ajaxEnded"),a="function"==typeof n.getResponseHeader?n.getResponseHeader("Link"):void 0,p=r(a),t.next=null!=p?p.next:void 0,(null!=p?p.next:void 0)&&!s.singlePage?(i(t,!1),void o.fetchNextBatch(p.next,{},i)):i(t,!0)})},s}()})}).call(this);
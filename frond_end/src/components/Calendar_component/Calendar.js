import React, { Component } from "react";
import $ from 'jquery';
import moment from 'moment/min/moment.min.js';
import ICAL from 'ical.js/build/ical.js'
import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar/dist/fullcalendar.js';
import 'fullcalendar/dist/locale/fr.js'
import "./Calendar.css";

import PropTypes from 'prop-types';

class Calendar extends Component {
  componentDidMount(){
    const { calendar } = this.refs;
    var calendarUrl = "calendar/M2_STL-INSTA";
    $.get(calendarUrl).then(function (data) {
      var jcalData = ICAL.parse(data.trim());
      var comp = new ICAL.Component(jcalData);
      var eventComps = comp.getAllSubcomponents("vevent");
      var eventsRec = [];
      var exdates = [];
      var recs = [];
      var allRecs;
      var exdate, r;
      
      for (var i = 0, l = eventComps.length; i < l; i++) {
        exdate = eventComps[i].getFirstPropertyValue("exdate");
        r = eventComps[i].getFirstPropertyValue("recurrence-id");
        if (exdate !== null)
          exdates.push(exdate);
        if (r !== null)
          recs.push(r);
      }
      allRecs = recs.concat(exdates);
      
      var events = $.map(eventComps, function (item) {
        var expand = new ICAL.RecurExpansion({
          component: item,
          dtstart: item.getFirstPropertyValue('dtstart')
        });

        var next;
        var i = 0, max = 100; // Limit for infinite recursion
        var start = item.getFirstPropertyValue("dtstart");
        var end = item.getFirstPropertyValue("dtend");
        var location = item.getFirstPropertyValue("location");
        var title = item.getFirstPropertyValue("summary") + (location ? "\n" + item.getFirstPropertyValue("location") : "");
        
        while (i < max && (next = expand.next())) {
          var timeStart = new ICAL.Time({
            year: next._time.year,
            month: next._time.month,
            day: next._time.day,
            hour: start._time.hour,
            minute: start._time.minute,
          });
          var timeEnd = new ICAL.Time({
            year: next._time.year,
            month: next._time.month,
            day: next._time.day,
            hour: end._time.hour,
            minute: end._time.minute,
          });

          if (start.compare(timeStart) !== 0 && end.compare(timeEnd) !== 0) {
            var test = false;
            for (var j = 0, l = allRecs.length; j < l; j++) {
              if (allRecs[j].compare(next) === 0) {
                test = true;
                break;
              }
            }
            if (!test) {
              eventsRec.push({
                "title": title,
                "start": timeStart.toJSDate(),
                "end": timeEnd.toJSDate()
              });
            }
          }
        }
        
        if (item.getFirstPropertyValue("class") == "PRIVATE") {
          return null;
        }
        else {
          var test = false;
          for (var j = 0, l = exdates.length; j < l; j++) {
            if (exdates[j].compare(start) === 0 && exdates[j].compare(end) === 0) {
              test = true;
              break;
            }
          }
          if (!test) {
            return {
              "title": title,
              "start": start.toJSDate(),
              "end": end.toJSDate()
            };
          }
          else
            return null;
        }
      });
      events = events.concat(eventsRec);
      $(calendar).fullCalendar(
        {
          events: events,
          defaultView: 'agendaWeek',
          displayEventTime: true,
          minTime:"08:30:00",
          maxTime:"23:00:00",
          timeFormat: 'HH:mm',

          allDaySlot: false,
          eventTextColor: "#ffffff"
        }
      );
    });
  }

  render() {
    return (
      <div ref='calendar'></div>
    );
  }
}

export default Calendar;

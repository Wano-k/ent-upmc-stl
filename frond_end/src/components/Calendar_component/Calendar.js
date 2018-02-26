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
      
      var events = $.map(eventComps, function (item) {
        if (item.getFirstPropertyValue("class") == "PRIVATE") {
          return null;
        }
        else {
          var location = item.getFirstPropertyValue("location");
          return {
            "title": item.getFirstPropertyValue("summary") + (location ? "\n" + item.getFirstPropertyValue("location") : ""),
            "start": item.getFirstPropertyValue("dtstart").toJSDate(),
            "end": item.getFirstPropertyValue("dtend").toJSDate()
          };
        }
      });
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

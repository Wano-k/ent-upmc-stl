import React, { Component } from "react";
import $ from 'jquery';
import moment from 'moment/min/moment.min.js';
import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar/dist/fullcalendar.js';
import 'fullcalendar/dist/locale/fr.js'
import "./Calendar.css";

import PropTypes from 'prop-types';

class Calendar extends Component {
  componentDidMount(){
    const { calendar } = this.refs;

    $(calendar).fullCalendar(
      {
        events: this.props.events,
        defaultView: 'agendaWeek',
        displayEventTime: true,
        minTime:"08:30:00",
        maxTime:"23:00:00",
        timeFormat: 'hh:mm',
        displayEventEnd: true,
        allDay: false,
        allDaySlot: false,
        eventTextColor: "#ffffff"
      }
    );
  }

  render() {
    return (
      <div ref='calendar'></div>
    );
  }
}

export default Calendar;

import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Navbar } from '../ui/Navbar';
import { messages } from '../helpers/calendar-messages';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { uiOpenModal } from '../actions/ui';
import { eventSetActive, evetCleanActiveEvent } from '../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

const localizer = momentLocalizer(moment)

export const CalendarScreen = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
  const dispatch = useDispatch();

  const {events, activeEvent} = useSelector( state => state.calendar );


  const onDobleCkick = (e) => {
    dispatch(uiOpenModal());
  }

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e))
  }

  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e);
  }

  const onSelectSlot = (e) => {
    dispatch(evetCleanActiveEvent())  
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367CF7', 
      borderRadius: '0px',
      opacity: 0.8, 
      display: 'block',
      color: 'white'
    }
    return {
      style
    }
  }

 
  return (
    <div className="calendar-screen">
      <Navbar/>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDobleCkick}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable={true}
        onView={onViewChange}
        view={lastView}
        components={{event: CalendarEvent}}
      />
      <CalendarModal/>
      <AddNewFab />
      {activeEvent && <DeleteEventFab />} 
    </div>
  )
}

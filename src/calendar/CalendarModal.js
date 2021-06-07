import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import { customStyles } from '../helpers/center-modal-styles';
import Swal from 'sweetalert2';

import './styles/modal.css';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { uiCloseModal } from '../actions/ui';
import { eventAddNew, eventUpdated, evetCleanActiveEvent } from '../actions/events';

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours')
const dateEnd = now.clone().add(1, 'hours')

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: dateEnd.toDate() 
}
export const CalendarModal = () => {

  const dispatch = useDispatch();  
  const { modalOpen } = useSelector(state => state.ui)
  const { activeEvent } = useSelector(state => state.calendar)

  const [ dateStart, setDateStart ] = useState(now.toDate());
  const [ endDate, setEndDate ] = useState(dateEnd.toDate());

  const [titleValid, setTitleValid] = useState(true);

  const  [ formValues, setFormValues ] = useState(initEvent);

  const {notes, title, start, end} = formValues;

  useEffect(() => {
     if(activeEvent) {
         setFormValues(activeEvent)
     } else {
         setFormValues(initEvent);
     }
  }, [activeEvent, setFormValues]);


  const handleInputChange = ({target}) => {
      setFormValues({
          ...formValues,
          [target.name]: target.value
      })
  }
  const closeModal = () => {

    dispatch(uiCloseModal());
    dispatch(evetCleanActiveEvent());
    setFormValues(initEvent);

  }

  const handleStartDateChange = (e) => {
      setDateStart(e);
      setFormValues({
          ...formValues,
          start: e
      })
  }

  const handleEndDateChange = (e) => {
      setEndDate(e);
      setFormValues({
        ...formValues,
        end: e
    });
  }

  const handleSubmitForm = (e) => {
      e.preventDefault();

      const momentStart = moment(start);
      const momentEnd = moment(end);

      if (momentStart.isSameOrAfter(momentEnd)) {
          return Swal.fire('Error', 'End date must be less than start date', 'error');  
      }

      if (title.trim().length < 2) {
          return setTitleValid(false);
      }

      if ( activeEvent ) { 
          dispatch(eventUpdated(formValues));
      } else {
          
        dispatch(eventAddNew({
            ...formValues, 
            id: new Date().getTime(),
            user: {
                _id: '123',
                name: 'Fernando'
            }
        }))
      }

      

      setTitleValid(true); 
      closeModal();
  }
  return (
      <Modal
          isOpen={modalOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          closeTimeoutMS={200}
          className="modal"
          overlayClassName="modal-fondo"
          contentLabel="Example Modal"
        >
        <h1> { (activeEvent) ? 'Edit event' : ' New event'} </h1>
        <hr />
        <form 
            className="container"
            onSubmit={handleSubmitForm}
        >

            <div className="form-group">
                <label>Start date and hour </label>
                <DateTimePicker
                    onChange={handleStartDateChange}
                    value={dateStart}
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label>Final date and hour </label>
                <DateTimePicker
                    onChange={handleEndDateChange}
                    value={endDate}
                    minDate={dateStart}
                    className="form-control"
                />
            </div>

            <hr />
            <div className="form-group">
                <label> Title and notes </label>
                <input 
                    type="text" 
                    className={`form-control ${!titleValid && 'is-invalid'}`}
                    placeholder="Event title"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                    autoComplete="off"
                />
                <small id="emailHelp" className="form-text text-muted"> Shortly Description </small>
            </div>

            <div className="form-group">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notes"
                    rows="5"
                    name="notes"
                    value={notes}
                    onChange={handleInputChange}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Aditional information </small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Save </span>
            </button>

        </form>

      </Modal>
  )

}

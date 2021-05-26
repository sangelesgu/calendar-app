import React, { useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import { customStyles } from '../helpers/center-modal-styles';

import './styles/modal.css';
import moment from 'moment';

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours')
const end = now.clone().add(1, 'hours')
export const CalendarModal = () => {

  const [ dateStart, setDateStart ] = useState(now.toDate());
  const [ endDate, setEndDate ] = useState(end.toDate());

  const  [ formValues, setFormValues ] = useState({
    title: 'Event',
    notes: '',
    start: now.toDate(),
    end: end.toDate() 
  });

  const {notes, title} = formValues;
  const handleInputChange = ({target}) => {
      setFormValues({
          ...formValues,
          [target.name]: target.value
      })
  }
  const closeModal = () => {
    // setIsOpen(false)
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
      console.log(formValues)
  }
  return (
      <Modal
          isOpen={true}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          closeTimeoutMS={200}
          className="modal"
          overlayClassName="modal-fondo"
          contentLabel="Example Modal"
        >
        <h1> New event </h1>
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
                <label>Title and notes </label>
                <input 
                    type="text" 
                    className="form-control"
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

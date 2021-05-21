import React from 'react';
import Modal from 'react-modal';
import { customStyles } from '../helpers/center-modal-styles';

import './styles/modal.css';

Modal.setAppElement('#root');
export const CalendarModal = () => {


  const closeModal = () => {
    // setIsOpen(false)
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
        <form className="container">

            <div className="form-group">
                <label>Start date and hour </label>
                <input className="form-control" placeholder="Start date" />
            </div>

            <div className="form-group">
                <label>Final date and hour </label>
                <input className="form-control" placeholder="Final date" />
            </div>

            <hr />
            <div className="form-group">
                <label>Title and notes </label>
                <input 
                    type="text" 
                    className="form-control"
                    placeholder="Event title"
                    name="title"
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

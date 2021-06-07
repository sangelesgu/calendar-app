import React from 'react'
import { useDispatch } from 'react-redux';
import { eventDeleted } from '../actions/events';

export const DeleteEventFab = () => {
  const dispatch = useDispatch();
  
  const hanldeDelete = () => {
    dispatch(eventDeleted())
  }
  return (
    <button
      className="btn btn-danger fab-danger" 
      onClick={hanldeDelete}  
    >
      <i className="fas fa-trash"></i>
      <span> Delete </span>
    </button>
  )
}

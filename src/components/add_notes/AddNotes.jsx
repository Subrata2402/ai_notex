import React, { useState } from 'react';
import './AddNotes.scss';
import { FaRegCircleXmark } from "react-icons/fa6";
import { Button, Container, IconButton, Tooltip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useNotes } from '../../store/NotesContext';
import customSnackBar from '../snackbar/CustomSnackBar';

function AddNotes() {
  const { addNote } = useNotes();
  const [note, setNote] = useState({
    id: Math.random().toString(12).substring(2),
    title: '',
    description: '',
    images: [],
    audio: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    isFavourite: false,
  });
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!note.title.trim()) {
      customSnackBar('Title is required');
    } else if (!note.description.trim()) {
      customSnackBar('Description is required');
    } else {
      addNote(note);
      navigate('/');
      customSnackBar('Note added successfully');
    }
  }

  return (
    <div className="add-notes-wrapper w-100">
      <Container maxWidth='md'>
        <div className="header">
          <h2 className="form-title m-0">Add Notes</h2>
          <div className="back-button">
            <Tooltip title='Back' placement='left'>
              <Link to='/'>
                <IconButton>
                  <FaRegCircleXmark size={30} color='var(--text-color)' />
                </IconButton>
              </Link>
            </Tooltip>
          </div>
        </div>
        <div className="form-wrapper">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter title"
              onChange={(e) => setNote({ ...note, title: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              rows="5"
              placeholder="Enter description"
              onChange={(e) => setNote({ ...note, description: e.target.value })}
              required
            >
            </textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Image</label>
            <input type="file" className="form-control" id="image" />
          </div>
          <div className="mb-3">
            <label htmlFor="audio" className="form-label">Audio</label>
            <input type="file" className="form-control" id="audio" />
          </div>
          <Button variant='contained' className='submit-button' onClick={handleSubmit}>Submit</Button>
        </div>
      </Container>
    </div>
  )
}

export default AddNotes;
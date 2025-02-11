import React, { useEffect, useRef, useState } from 'react';
import './NoteCard.scss';
import { IoMdImage } from "react-icons/io";
import { Button, IconButton, Tooltip } from '@mui/material';
import { FaCheckCircle, FaPlayCircle, FaPauseCircle, FaRegEdit, FaRegStar, FaStar, FaRegCopy } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import StyledMenu from '../menu/StyledMenu';
import { useNotes } from '../../store/NotesContext';
import customSnackBar from '../snackbar/CustomSnackBar';

function NoteCard(props) {
  const { deleteNote, updateNote, getNotes } = useNotes();
  const [isCopied, setIsCopied] = useState(false);
  const [tooltipText, setTooltipText] = useState('Copy to clipboard');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();
  const [duration, setDuration] = useState(0);
  const [note, setNote] = useState(props.note);

  const menuList = [
    { icon: <FaRegEdit size={20} />, text: 'Edit' },
    { icon: <RiDeleteBin6Line size={20} />, text: 'Delete' }
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFavorite = () => {
    const updatedNote = { ...note, isFavourite: !note.isFavourite };
    updateNote(updatedNote, note.id);
    setNote(updatedNote);
    getNotes();
    customSnackBar(`Note ${updatedNote.isFavourite ? 'added to' : 'removed from'} favourites`);
  };

  const copyNote = (note) => {
    window.navigator.clipboard.writeText(note);
    setIsCopied(true);
    setTooltipText('Copied');
    customSnackBar('Note copied to clipboard');
    setTimeout(() => {
      setIsCopied(false);
      setTooltipText('Copy to clipboard');
    }, 3000);
  }

  const playAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  const formatTime = (time) => {
    if (!time && time !== 0) return '00:00';
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  const onMenuItemClick = (menuItemIndex) => {
    if (menuItemIndex === 0) {
      console.log(`Edit note at index ${note.id}`);
    } else {
      deleteNote(note.id);
      customSnackBar('Note deleted successfully');
    }
    handleClose();
  }

  useEffect(() => {
    const updateDuration = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration - audioRef.current.currentTime);
      }
    };

    let intervalId;
    if (isPlaying) {
      intervalId = setInterval(updateDuration, 1000);
    } else {
      clearInterval(intervalId);
    }

    audioRef.current.addEventListener('ended', () => {
      setIsPlaying(false);
      clearInterval(intervalId);
    });

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying]);

  return (
    <div className="note-card">
      <div className="card-header">
        <div className="date-time">
          <span>
            {/* Jan 30, 2025 */}
            {new Date(note?.createdAt).toDateString().slice(4)}
          </span>
          <div className='dot'></div>
          <span>
            {new Date(note?.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
          </span>
        </div>
        <audio src="https://dl.prokerala.com/downloads/ringtones/files/mp3/new-romantic-ringtone-2024-new-ringtonehindi-ringtone-love-story-ringtone-b-65903.mp3" controls preload="none" ref={audioRef}>
          Your browser does not support the
          <code>audio</code> element.
        </audio>
        <Button className="audio-wrapper" size='small' onClick={playAudio}>
          {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
          {duration ? formatTime(duration) : formatTime(audioRef.current?.duration)}
        </Button>
      </div>
      <div className="card-title">
        {note?.title}
      </div>
      <div className="card-body">
        {note?.description}
      </div>
      <div className="card-footer">
        <div className="card-image">
          <IoMdImage color='var(--grey-100)' /> 1 Image
        </div>
        <div className="d-flex">
          <Tooltip title={`${!note?.isFavourite ? 'Add to' : 'Remove from'} favourite list`} placement='top'>
            <IconButton
              aria-label="favourite"
              size="small"
              onClick={handleFavorite}
            >
              {
                note?.isFavourite ?
                  <FaStar color='var(--nav-item-color)' />
                  :
                  <FaRegStar color='var(--nav-item-color)' />
              }
            </IconButton>
          </Tooltip>
          <Tooltip title={tooltipText} placement='top'>
            <IconButton
              aria-label="copy"
              size="small"
              onClick={() => copyNote(note?.description)}
            >
              {
                isCopied ?
                  <FaCheckCircle color='var(--nav-item-color)' />
                  :
                  <FaRegCopy color='var(--nav-item-color)' />
              }
            </IconButton>
          </Tooltip>
          <Tooltip title='More' placement='top'>
            <IconButton
              aria-label="more"
              size="small"
              onClick={handleClick}
            >
              <BsThreeDotsVertical color='var(--nav-item-color)' />
            </IconButton>
          </Tooltip>
          <StyledMenu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            id="note-card-menu"
            menuList={menuList}
            onMenuItemClick={onMenuItemClick}
          />
        </div>
      </div>
    </div>
  )
}

export default NoteCard;
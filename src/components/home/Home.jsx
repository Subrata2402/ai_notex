import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import NoteCard from '../note_card/NoteCard';
import './Home.scss';
import { useNotes } from '../../store/NotesContext';

function Home() {
  const { notes } = useNotes();
  const [searchText, setSearchText] = useState('');
  const [sortedNotes, setSortedNotes] = useState(notes);
  const [sortedType, setSortedType] = useState('Date');

  useEffect(() => {
    let filteredNotes = notes;
    if (searchText.trim()) {
      filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchText.toLowerCase()) ||
        note.description.toLowerCase().includes(searchText.toLowerCase()));
    }
    if (sortedType.toLowerCase() === 'favourite') {
      filteredNotes = filteredNotes.filter(note => note.isFavourite);
    } else if (sortedType.toLowerCase() === 'size') {
      filteredNotes = [...filteredNotes].sort((a, b) => b.description.length - a.description.length);
    } else if (sortedType.toLowerCase() === 'date') {
      filteredNotes = [...filteredNotes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setSortedNotes(filteredNotes);
  }, [searchText, sortedType, notes]);

  return (
    <div className="home-wrapper">
      <Header setSearchText={setSearchText} searchText={searchText} setSortedType={setSortedType} />
      {
        sortedNotes.length === 0
          ? <div className="no-notes">There are no notes found...</div>
          :
          <div className="cards-container">
            <div className="note-cards">
              {
                sortedNotes.map(note => <NoteCard key={note.id} note={note} />)
              }
            </div>
          </div>
      }
    </div>
  )
}

export default Home;
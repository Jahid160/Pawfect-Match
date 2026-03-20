"use client";
import React, { useState, useEffect } from "react";

const SaveButton = ({ petId }) => {
  const [isSaved, setIsSaved] = useState(false);

  // On mount, check if petId is already saved in session storage
  useEffect(() => {
    const savedPets = JSON.parse(sessionStorage.getItem('savedPets')) || [];
    setIsSaved(savedPets.includes(petId));
  }, [petId]);

  // Handle button click to toggle save state
  const handleSaveToggle = () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    saveToSessionStorage(petId, newSavedState);
  };

  return (
    <button
      onClick={handleSaveToggle}
      className={`px-4 py-2 rounded bg-${isSaved ? 'orange-400' : 'gray-300'} text-white`}
    >
      {isSaved ? "Saved" : "Save"}
    </button>
  );
};

const saveToSessionStorage = (petId, isSaved) => {
  let savedPets = JSON.parse(sessionStorage.getItem('savedPets')) || [];
  if (isSaved) {
    if (!savedPets.includes(petId)) {
      savedPets.push(petId);
    }
  } else {
    savedPets = savedPets.filter(id => id !== petId);
  }
  sessionStorage.setItem('savedPets', JSON.stringify(savedPets));
};

// This function will sync data with the server when user logs out
const syncWithServerOnLogout = async () => {
  const savedPets = JSON.parse(sessionStorage.getItem('savedPets')) || [];
  if (savedPets.length > 0) {
    try {
      await fetch('/api/updateSavedPets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ savedPets }),
      });
      console.log('Saved pets synced with server on logout!');
    } catch (error) {
      console.error('Failed to sync with server:', error);
    }
  }
};

export default SaveButton;
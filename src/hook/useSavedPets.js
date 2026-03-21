"use client";
import { useEffect, useState } from "react";

export const useSavedPets = () => {
  const [savedPets, setSavedPets] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("savedPets")) || [];
    setSavedPets(data);
  }, []);

  const toggleSave = (petId) => {
    setSavedPets((prev) => {
      const isAlreadySaved = prev.includes(petId);
      const updated = isAlreadySaved
        ? prev.filter((id) => id !== petId)
        : [...prev, petId];
      
      localStorage.setItem("savedPets", JSON.stringify(updated));
      return updated;
    });
  };

  return { savedPets, toggleSave };
};
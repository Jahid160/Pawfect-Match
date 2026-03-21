import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

export const useSavedState = (pet, toggleAction) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isSaved, setIsSaved] = useState(false);
  const [count, setCount] = useState(pet?.saveCount || 0);

  // একটা রেফারেন্স রাখছি যাতে আগের টাইমারটা ট্র্যাক করা যায়
  const debounceTimer = useRef(null);

  useEffect(() => {
    if (userId && pet?.savedBy) {
      setIsSaved(pet.savedBy.includes(userId));
      setCount(pet.saveCount || 0);
    }
  }, [userId, pet]);

  const handleToggle = () => {
    if (!userId) {
      alert("Please login to save pets!");
      return;
    }

    const newSavedStatus = !isSaved;
    setIsSaved(newSavedStatus);
    setCount((prev) => (newSavedStatus ? prev + 1 : Math.max(0, prev - 1)));

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        const result = await toggleAction(pet._id);
        if (!result.success) {
          setIsSaved(!newSavedStatus);
          setCount((prev) =>
            !newSavedStatus ? prev + 1 : Math.max(0, prev - 1),
          );
        }
      } catch (error) {
        console.error("Failed to toggle:", error);
      }
    }, 800);
  };

  return { isSaved, count, handleToggle };
};

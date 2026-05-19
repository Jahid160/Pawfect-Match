"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaw, FaTrophy, FaRedo, FaBone, FaPaperPlane } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";

const NewsletterGame = () => {
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [treats, setTreats] = useState([]);

  const router = useRouter();
  const { data: session, status } = useSession();

  const PET_IMAGE = "https://cdn-icons-png.flaticon.com/512/616/616408.png";

  useEffect(() => {
    if (!gameActive || score >= 5) return;

    const interval = setInterval(() => {
      const newTreat = {
        id: Date.now(),
        left: Math.random() * 80 + 10 + "%",
      };
      setTreats((prev) => [...prev, newTreat]);

      setTimeout(() => {
        setTreats((prev) => prev.filter((t) => t.id !== newTreat.id));
      }, 5000);
    }, 1800);

    return () => clearInterval(interval);
  }, [gameActive, score]);

  const handleCatch = (id) => {
    setScore((prev) => prev + 1);
    setTreats((prev) => prev.filter((t) => t.id !== id));
    if (score + 1 >= 5) setGameActive(false);
  };

  const handleAction = () => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f97316", "#ffffff", "#0f172a"],
      });

      Swal.fire({
        title: "Success!",
        html: `You've joined the pack with <br/><b>${session?.user?.email}</b>`,
        icon: "success",
        iconColor: "#f97316",
        confirmButtonText: "Great!",
        confirmButtonColor: "#0f172a",
        background: "#ffffff",
        customClass: {
          popup: "rounded-[2.5rem] p-8",
          title: "font-black text-slate-900 text-3xl",
          confirmButton:
            "rounded-full px-10 py-3 font-bold uppercase tracking-widest",
        },
        buttonsStyling: true,
        showClass: {
          popup: "animate__animated animate__fadeInUp",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown",
        },
      });
    }
  };

  return (
    <section className="bg-[#FDFCFB] py-24 overflow-hidden font-sans text-center mt-[-90px]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="relative bg-gradient-to-br from-orange-500 via-orange-550 to-orange-600 shadow-[0_50px_100px_-30px_rgba(249,115,22,0.5)] p-1 md:p-2 rounded-[3.5rem]">
          <div className="relative flex flex-col justify-center items-center bg-orange-500 px-8 md:px-20 py-16 md:py-24 border border-white/20 rounded-[3.2rem] min-h-[600px] overflow-hidden">
            <div className="top-[-10%] right-[-5%] absolute text-[20rem] text-white/5 -rotate-12 pointer-events-none select-none">
              <FaPaw />
            </div>

            <div className="z-10 w-full max-w-3xl">
              {score < 5 ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md mb-6 px-6 py-2 border border-white/10 rounded-full font-black text-[10px] text-white uppercase tracking-[0.2em]"
                  >
                    <span className="bg-white shadow-[0_0_10px_white] rounded-full w-2 h-2 animate-pulse"></span>
                    Interactive Challenge
                  </motion.div>

                  <h2 className="mb-4 font-black text-white text-5xl md:text-7xl leading-none tracking-tighter">
                    Feed the{" "}
                    <span className="text-orange-200">Hungry Pet!</span>
                  </h2>
                  <p className="opacity-90 mb-10 font-bold text-orange-50 text-xl">
                    Catch 5 Treats to Join the Pack:{" "}
                    <span className="bg-white/20 px-4 py-1 rounded-full">
                      {score} / 5
                    </span>
                  </p>

                  <div className="relative bg-white/5 backdrop-blur-sm border-2 border-white/20 border-dashed rounded-[3rem] w-full h-[400px] overflow-hidden cursor-crosshair">
                    <AnimatePresence>
                      {treats.map((treat) => (
                        <motion.button
                          key={treat.id}
                          initial={{ y: -60, opacity: 0, rotate: 0 }}
                          animate={{ y: 450, opacity: 1, rotate: 360 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 5, ease: "linear" }}
                          onClick={() => handleCatch(treat.id)}
                          style={{ left: treat.left }}
                          className="absolute p-3 hover:scale-125 active:scale-90 transition-transform"
                        >
                          <div className="bg-white shadow-xl p-4 border-orange-200 border-b-4 rounded-2xl">
                            <FaBone className="text-orange-500 text-3xl" />
                          </div>
                        </motion.button>
                      ))}
                    </AnimatePresence>

                    <motion.div
                      animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                      }}
                      className="bottom-6 left-1/2 absolute w-32 md:w-44 h-32 md:h-44 -translate-x-1/2"
                    >
                      <img
                        src={PET_IMAGE}
                        alt="Pet"
                        className="drop-shadow-2xl w-full h-full object-contain"
                      />
                    </motion.div>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white/10 shadow-2xl backdrop-blur-2xl p-10 md:p-16 border border-white/30 rounded-[4rem]"
                >
                  <div className="inline-block relative mb-8">
                    <FaTrophy className="drop-shadow-[0_0_30px_rgba(253,224,71,0.5)] text-yellow-300 text-8xl" />
                  </div>

                  <h2 className="mb-6 font-black text-white text-5xl md:text-6xl leading-none tracking-tight">
                    You're a True Pet Lover!
                  </h2>
                  <p className="mx-auto mb-10 max-w-lg font-medium text-orange-50 text-xl leading-relaxed">
                    {status === "authenticated"
                      ? "Your email is ready! Just one click to join the inner circle."
                      : "Login and join our pack to get exclusive rescue stories and expert tips!"}
                  </p>

                  <div className="flex flex-col items-center gap-6">
                    <div className="flex sm:flex-row flex-col gap-4 w-full max-w-md">
                      <input
                        type="email"
                        readOnly
                        value={
                          status === "authenticated" ? session?.user?.email : ""
                        }
                        placeholder="Enter your email"
                        className="flex-1 bg-white disabled:bg-orange-50 shadow-xl px-8 py-5 rounded-[2rem] outline-none focus:outline-none focus:ring-4 focus:ring-white/30 font-bold text-slate-900 transition-all"
                      />
                      <button
                        onClick={handleAction}
                        className="flex justify-center items-center gap-3 bg-slate-900 hover:bg-black shadow-xl px-10 py-5 rounded-[2rem] font-black text-[11px] text-white uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
                      >
                        {status === "authenticated"
                          ? "Subscribe"
                          : "Login to Join"}{" "}
                        <FaPaperPlane />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setScore(0);
                        setGameActive(true);
                      }}
                      className="mt-4 font-bold text-[10px] text-white/70 hover:text-white underline uppercase tracking-[0.2em] transition-colors"
                    >
                      <FaRedo className="inline mr-2" /> Play Again
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterGame;

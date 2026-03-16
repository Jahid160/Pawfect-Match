"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 1240, label: "Pets Rescued", suffix: "+" },
  { value: 870, label: "Happy Adoptions", suffix: "+" },
  { value: 35, label: "Partner Shelters", suffix: "" },
  { value: 98, label: "Satisfaction Rate", suffix: "%" },
];

const values = [
  {
    icon: "🐾",
    title: "Every Life Matters",
    description:
      "We believe every animal deserves a safe home, proper care, and unconditional love — regardless of breed, age, or background.",
  },
  {
    icon: "🤝",
    title: "Community First",
    description:
      "We connect adopters, shelters, and volunteers into one caring network, building a community where animals and people thrive together.",
  },
  {
    icon: "🏠",
    title: "Forever Homes",
    description:
      "Our careful matching process ensures pets find families who are truly ready, creating lifelong bonds rather than temporary placements.",
  },
  {
    icon: "💚",
    title: "Transparent Care",
    description:
      "From health records to shelter conditions, we maintain full transparency so you can adopt with complete confidence and trust.",
  },
];

const team = [
  {
    name: "Nadia Rahman",
    role: "Founder & Director",
    emoji: "👩‍💼",
    bio: "Animal welfare advocate with 10+ years rescuing strays across Dhaka.",
  },
  {
    name: "Arif Hossain",
    role: "Shelter Operations",
    emoji: "👨‍⚕️",
    bio: "Veterinarian ensuring every pet is healthy before and after adoption.",
  },
  {
    name: "Sumaiya Akter",
    role: "Community Manager",
    emoji: "👩‍💻",
    bio: "Connects adopters with the right pets through our platform daily.",
  },
  {
    name: "Tanvir Islam",
    role: "Shelter Partner Lead",
    emoji: "🧑‍🤝‍🧑",
    bio: "Builds relationships with shelters and rescue centers nationwide.",
  },
];

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null); 
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1800;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function MissionPage() {
  return (
    <main className="min-h-screen bg-base-100 overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* warm organic background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 40%, oklch(92% 0.08 45 / 0.55) 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 80% 70%, oklch(88% 0.06 50 / 0.4) 0%, transparent 55%), oklch(100% 0 0)",
          }}
        />
        {/* floating paw prints */}
        {[
          "top-[12%] left-[8%]",
          "top-[20%] right-[12%]",
          "bottom-[25%] left-[15%]",
          "bottom-[15%] right-[8%]",
          "top-[55%] left-[5%]",
        ].map((pos, i) => (
          <span
            key={i}
            className={`absolute ${pos} text-4xl select-none pointer-events-none`}
            style={{
              opacity: 0.12,
              transform: `rotate(${[15, -20, 10, -15, 25][i]}deg)`,
              fontSize: `${[2.5, 2, 3, 1.8, 2.2][i]}rem`,
            }}
          >
            🐾
          </span>
        ))}

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-8 tracking-widest uppercase"
            style={{
              background: "oklch(70% 0.19 45 / 0.12)",
              color: "oklch(55% 0.19 45)",
              border: "1px solid oklch(70% 0.19 45 / 0.25)",
              letterSpacing: "0.15em",
            }}
          >
            <span>🐶</span> Our Mission
          </div>

          <h1
            className="text-6xl md:text-8xl font-black leading-[0.9] mb-8"
            style={{
              fontFamily: "'Georgia', serif",
              color: "oklch(22% 0.03 45)",
              letterSpacing: "-0.03em",
            }}
          >
            Every Paw
            <br />
            <span style={{ color: "oklch(70% 0.19 45)" }}>Deserves</span>
            <br />a Home.
          </h1>

          <p
            className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-12"
            style={{
              color: "oklch(45% 0.04 50)",
              fontFamily: "'Georgia', serif",
              fontStyle: "italic",
            }}
          >
            We're on a mission to end pet abandonment in Bangladesh — one
            rescue, one adoption, one loving family at a time.
          </p>

          <a
            href="/adopt"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: "oklch(70% 0.19 45)",
              color: "white",
              boxShadow: "0 8px 32px oklch(70% 0.19 45 / 0.35)",
            }}
          >
            Adopt a Pet Today
            <span className="text-xl">→</span>
          </a>
        </div>

        {/* bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 40 C360 80 1080 0 1440 40 L1440 80 L0 80 Z"
              fill="oklch(98% 0.01 60)"
            />
          </svg>
        </div>
      </section>

      {/* ── IMPACT STATS ── */}
      <section
        className="py-20 px-6"
        style={{ background: "oklch(98% 0.01 60)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-3xl p-8 text-center group hover:scale-105 transition-transform duration-300"
                style={{
                  background:
                    i % 2 === 0 ? "oklch(70% 0.19 45)" : "oklch(100% 0 0)",
                  boxShadow:
                    i % 2 === 0
                      ? "0 12px 40px oklch(70% 0.19 45 / 0.3)"
                      : "0 4px 24px oklch(0% 0 0 / 0.06)",
                  border: i % 2 !== 0 ? "1px solid oklch(92% 0.04 50)" : "none",
                }}
              >
                <div
                  className="text-5xl font-black mb-1"
                  style={{
                    fontFamily: "'Georgia', serif",
                    color: i % 2 === 0 ? "white" : "oklch(70% 0.19 45)",
                  }}
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div
                  className="text-sm font-semibold tracking-wide uppercase"
                  style={{
                    color:
                      i % 2 === 0
                        ? "rgba(255,255,255,0.8)"
                        : "oklch(50% 0.04 50)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="py-28 px-6 bg-base-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* text */}
            <div>
              <p
                className="text-sm font-bold uppercase tracking-widest mb-4"
                style={{ color: "oklch(70% 0.19 45)", letterSpacing: "0.18em" }}
              >
                Our Story
              </p>
              <h2
                className="text-5xl font-black leading-tight mb-8"
                style={{
                  fontFamily: "'Georgia', serif",
                  color: "oklch(22% 0.03 45)",
                }}
              >
                Born from a
                <br />
                <em style={{ color: "oklch(70% 0.19 45)" }}>single stray</em>
                <br />
                on a rainy night.
              </h2>
              <div
                className="space-y-5 text-lg leading-relaxed"
                style={{ color: "oklch(40% 0.04 50)" }}
              >
                <p>
                  It started in 2019 when our founder Nadia found a malnourished
                  puppy outside her apartment in Dhaka. Unable to find a
                  shelter, she spent weeks calling vets, posting on Facebook,
                  and asking neighbours for help.
                </p>
                <p>
                  That frustrating experience revealed a broken system:
                  thousands of animals were suffering, shelters were
                  overwhelmed, and good-hearted people had no reliable place to
                  turn.{" "}
                  <strong style={{ color: "oklch(30% 0.03 45)" }}>
                    PawHome was born to fix that.
                  </strong>
                </p>
                <p>
                  Today we run a full platform connecting rescue shelters,
                  caring adopters, and dedicated volunteers — with a pet supply
                  shop that funds our rescue operations.
                </p>
              </div>
            </div>

            {/* visual card */}
            <div className="relative">
              <div
                className="rounded-3xl p-10 relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(70% 0.19 45) 0%, oklch(65% 0.18 38) 100%)",
                  minHeight: "420px",
                }}
              >
                <div className="absolute top-6 right-6 text-8xl opacity-20">
                  🐕
                </div>
                <div className="absolute bottom-10 left-6 text-7xl opacity-15">
                  🐈
                </div>
                <div className="relative z-10 space-y-6">
                  {[
                    {
                      year: "2019",
                      text: "Founded after rescuing our first stray",
                    },
                    { year: "2021", text: "Launched online adoption platform" },
                    {
                      year: "2023",
                      text: "Partnered with 35+ shelters nationwide",
                    },
                    {
                      year: "2025",
                      text: "1,000+ successful adoptions milestone",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-5">
                      <span
                        className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-black"
                        style={{
                          background: "rgba(255,255,255,0.2)",
                          color: "white",
                        }}
                      >
                        {item.year}
                      </span>
                      <p className="text-white/90 font-medium leading-snug pt-2">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {/* decorative offset shadow */}
              <div
                className="absolute -bottom-3 -right-3 w-full h-full rounded-3xl -z-10"
                style={{ background: "oklch(88% 0.08 45)", opacity: 0.4 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR VALUES ── */}
      <section
        className="py-28 px-6"
        style={{ background: "oklch(98% 0.01 60)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-sm font-bold uppercase tracking-widest mb-4"
              style={{ color: "oklch(70% 0.19 45)", letterSpacing: "0.18em" }}
            >
              What Drives Us
            </p>
            <h2
              className="text-5xl font-black"
              style={{
                fontFamily: "'Georgia', serif",
                color: "oklch(22% 0.03 45)",
              }}
            >
              Our Core Values
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="rounded-3xl p-8 group hover:-translate-y-2 transition-all duration-300 cursor-default"
                style={{
                  background: "white",
                  boxShadow: "0 4px 24px oklch(0% 0 0 / 0.06)",
                  border: "1px solid oklch(92% 0.04 50)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "oklch(70% 0.19 45 / 0.1)" }}
                >
                  {v.icon}
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{
                    color: "oklch(22% 0.03 45)",
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  {v.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(48% 0.04 50)" }}
                >
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-28 px-6 bg-base-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-sm font-bold uppercase tracking-widest mb-4"
              style={{ color: "oklch(70% 0.19 45)", letterSpacing: "0.18em" }}
            >
              The Process
            </p>
            <h2
              className="text-5xl font-black"
              style={{
                fontFamily: "'Georgia', serif",
                color: "oklch(22% 0.03 45)",
              }}
            >
              How PawHome Works
            </h2>
          </div>

          <div className="relative">
            {/* connector line */}
            <div
              className="hidden md:block absolute top-10 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-0.5"
              style={{ background: "oklch(70% 0.19 45 / 0.2)" }}
            />

            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              {[
                {
                  step: "01",
                  icon: "🔍",
                  title: "Browse Pets",
                  desc: "Explore hundreds of pets from verified shelters across Bangladesh.",
                },
                {
                  step: "02",
                  icon: "📋",
                  title: "Apply to Adopt",
                  desc: "Fill out a simple form. We match you with the right companion.",
                },
                {
                  step: "03",
                  icon: "🏥",
                  title: "Vet Check",
                  desc: "Every pet gets a health check and vaccinations before placement.",
                },
                {
                  step: "04",
                  icon: "🏠",
                  title: "Welcome Home",
                  desc: "Bring your new family member home with our full support.",
                },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div
                    className="w-20 h-20 rounded-3xl flex items-center justify-center text-3xl mb-5 shadow-lg"
                    style={{
                      background: "oklch(70% 0.19 45)",
                      boxShadow: "0 8px 28px oklch(70% 0.19 45 / 0.35)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    className="text-xs font-black tracking-widest mb-2"
                    style={{
                      color: "oklch(70% 0.19 45)",
                      letterSpacing: "0.15em",
                    }}
                  >
                    STEP {item.step}
                  </span>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{
                      color: "oklch(22% 0.03 45)",
                      fontFamily: "'Georgia', serif",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(48% 0.04 50)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section
        className="py-28 px-6"
        style={{ background: "oklch(98% 0.01 60)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-sm font-bold uppercase tracking-widest mb-4"
              style={{ color: "oklch(70% 0.19 45)", letterSpacing: "0.18em" }}
            >
              The People
            </p>
            <h2
              className="text-5xl font-black"
              style={{
                fontFamily: "'Georgia', serif",
                color: "oklch(22% 0.03 45)",
              }}
            >
              Meet Our Team
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div
                key={i}
                className="rounded-3xl p-7 text-center group hover:-translate-y-1 transition-all duration-300"
                style={{
                  background: "white",
                  boxShadow: "0 4px 24px oklch(0% 0 0 / 0.06)",
                  border: "1px solid oklch(92% 0.04 50)",
                }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "oklch(70% 0.19 45 / 0.1)" }}
                >
                  {member.emoji}
                </div>
                <h3
                  className="text-lg font-bold mb-1"
                  style={{
                    color: "oklch(22% 0.03 45)",
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-xs font-semibold uppercase tracking-wide mb-3"
                  style={{
                    color: "oklch(70% 0.19 45)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {member.role}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(48% 0.04 50)" }}
                >
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-[2.5rem] p-16 text-center relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, oklch(70% 0.19 45) 0%, oklch(63% 0.17 35) 100%)",
              boxShadow: "0 24px 80px oklch(70% 0.19 45 / 0.4)",
            }}
          >
            <div className="absolute top-4 left-8 text-6xl opacity-10 select-none">
              🐾
            </div>
            <div className="absolute bottom-4 right-8 text-7xl opacity-10 select-none">
              🐾
            </div>

            <h2
              className="text-5xl font-black text-white mb-5 relative z-10"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Ready to change
              <br />a life — and yours?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto relative z-10">
              Join thousands of families who found their perfect companion
              through PawHome.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <a
                href="/adopt"
                className="px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105"
                style={{ background: "white", color: "oklch(60% 0.19 45)" }}
              >
                Adopt a Pet
              </a>
              <a
                href="/shelter/apply"
                className="px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "white",
                  border: "2px solid rgba(255,255,255,0.4)",
                }}
              >
                Become a Shelter
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

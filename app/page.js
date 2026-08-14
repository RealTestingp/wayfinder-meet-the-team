"use client";

import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-sans",
});

// Edit this array with real bios / achievements whenever you're ready.
// Drop matching photos into /public/team/ using the filenames below
// (square images, ~800x800, work best).
//
// `website` is optional — if set, an extra link shows next to LinkedIn.
const team = [
  {
    no: "001",
    name: "Verity Boyd",
    role: "Project Manager, Backend Developer",
    tag: "DATABASE",
    photo: "/team/verity_pf.png",
    blurb:
      "Kept the backend roadmap honest, tracking tickets, timelines, and making sure the pieces landed in the right order.",
    bio:
      "Kept the backend roadmap honest, tracking tickets, timelines, and making sure the pieces landed in the right order.\n\nI'm a software developer graduating from SAIT in August 2026, transitioning into tech after building a career across financial services, non-profit arts, and client-experience roles. That path shaped how I work today: with strong communication, collaboration, time-management, and stakeholder-focused problem-solving at the core.\n\nIn development, I bring solid technical fundamentals in object-oriented programming, front and backend development, relational databases, SQL, cloud computing, DevOps practices, IoT concepts, and modern AI workflows — including responsible AI and agentic AI. I'm especially interested in enterprise applications and building solutions that improve reliability, clarity, and the human experience overall.\n\nCurious, adaptable, and detail-driven, I'm excited to grow my career in environments where technology, teamwork, and thoughtful design come together to create meaningful impact.",
    linkedin: "https://www.linkedin.com/in/verityb/",
    website: "https://verityboyd.vercel.app/",
  },
  {
    no: "002",
    name: "Aurora Choban",
    role: "Frontend Developer",
    tag: "INTERFACE",
    photo: "/team/aurora.jpg",
    blurb:
      "Shaped what the archive looked and felt like for users, from the screens and search functionality to the overall day-to-day experience of the archive.",
    bio:
      "Shaped what the archive looked and felt like for users, from the screens and search functionality to the overall day-to-day experience of the archive.",
    linkedin: "https://www.linkedin.com/in/aurora-choban-818a2334a/",
    website: null,
  },
  {
    no: "003",
    name: "Dylan Khuu",
    role: "Backend Developer",
    tag: "SERVICES",
    photo: "/team/dylan_pf.jpg",
    blurb:
      "Developed the gateway and Reports Service, implementing the necessary models, controllers, DTOs, and supporting backend components.",
    bio:
      "Developed the gateway and Reports Service, implementing the necessary models, controllers, DTOs, and supporting backend components.",
    linkedin: "https://www.linkedin.com/in/dylan-khuu/",
    website: null,
  },
  {
    no: "004",
    name: "Jenna Hackett",
    role: "Cloud & AI Architect",
    tag: "CLOUD / AI",
    photo: "/team/jenna_pf.jpg",
    blurb:
      "Designed how the kiosk looked and felt, from its on-screen states to the physical enclosure it lives in.",
    bio:
      "Designed how the kiosk looked and felt, from its on-screen states to the physical enclosure it lives in.\n\nI'm a software developer graduating from SAIT in August 2026, transitioning into tech after building a career in banking, following a background in the service industry. That path shaped how I approach problems today: with strong client-facing communication, attention to detail under pressure, and a practical sense of how systems need to actually work for the people using them.\n\nIn development, I bring solid technical fundamentals in frontend development with React, TypeScript, and Tailwind CSS, UI/UX design, cloud deployment on Azure, and CAD design for physical fabrication.\n\nOn the Wayfinder Kiosk — a voice-activated, multilingual wayfinding kiosk for large venues — I built the kiosk's frontend interface in Next.js and TypeScript, designing the animated states that show the kiosk idle, listening, thinking, and displaying a QR code, all styled to match the team's poster colour palette. I also designed the kiosk's physical enclosure from scratch for 3D printing, working through the full model including mic and speaker cutouts, cable routing, ventilation, and a mounting bracket for the display, built to fit within the print bed's size constraints.\n\nMy specialization is cloud infrastructure and applied AI, and this project was a chance to step outside that and work hands-on with interface and physical design instead. I'm looking to join a team where I can keep building on that range, alongside the cloud and AI work that's my core focus.",
    linkedin: "https://www.linkedin.com/in/jenna-hackett-673981161/",
    website: null,
  },
];

function MemberPhoto({ member, className, fallbackClassName }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={member.photo}
        alt={member.name}
        className={className}
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.nextSibling.style.display = "flex";
        }}
      />
      <div className={fallbackClassName}>
        {member.name
          .split(" ")
          .map((w) => w[0])
          .join("")}
      </div>
    </>
  );
}

function TeamCard({ member, onOpen }) {
  return (
    <article className={styles.card}>
      <div className={styles.photoFrame}>
        <MemberPhoto
          member={member}
          className={styles.photo}
          fallbackClassName={styles.photoFallback}
        />
      </div>

      <div className={styles.cardBody}>
        <span className={styles.tag}>{member.tag}</span>
        <h2 className={styles.name}>{member.name}</h2>
        <p className={styles.role}>{member.role}</p>
        <p className={styles.blurb}>{member.blurb}</p>

        <button
          type="button"
          className={styles.readMore}
          onClick={() => onOpen(member)}
        >
          More about {member.name.split(" ")[0]} ↗
        </button>

        <div className={styles.cardFooter}>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkedin}
            onClick={(e) => e.stopPropagation()}
          >
            LinkedIn ↗
          </a>

          {member.website && (
            <a
              href={member.website}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkedin}
              onClick={(e) => e.stopPropagation()}
            >
              Website ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function MemberModal({ member, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className={styles.modalBackdrop}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={member.name}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div className={styles.modalPhotoFrame}>
          <MemberPhoto
            member={member}
            className={styles.modalPhoto}
            fallbackClassName={styles.modalPhotoFallback}
          />
        </div>

        <div className={styles.modalBody}>
          <span className={styles.tag}>{member.tag}</span>
          <h2 className={styles.modalName}>{member.name}</h2>
          <p className={styles.role}>{member.role}</p>

          {member.bio ? (
            <div className={styles.modalBio}>
              {member.bio.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          ) : (
            <p className={styles.modalBlurb}>{member.blurb}</p>
          )}

          <div className={styles.cardFooter}>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkedin}
            >
              LinkedIn ↗
            </a>

            {member.website && (
              <a
                href={member.website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkedin}
              >
                Website ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [activeMember, setActiveMember] = useState(null);

  return (
    <main className={`${styles.page} ${inter.variable}`}>
      <header className={styles.hero}>
        <h1 className={styles.title}>
          <span className={styles.titleAccent}>WAYFINDER KIOSK</span>
        </h1>
        <p className={styles.subtitle}>Meet the team</p>
      </header>

      <section className={styles.grid} aria-label="Team members">
        {team.map((member) => (
          <TeamCard key={member.no} member={member} onOpen={setActiveMember} />
        ))}
      </section>

      <footer className={styles.footer}>
        <p>Wayfinder Kiosk</p>
        <p>Developed by Team WAYFINDER</p>
      </footer>

      {activeMember && (
        <MemberModal member={activeMember} onClose={() => setActiveMember(null)} />
      )}
    </main>
  );
}
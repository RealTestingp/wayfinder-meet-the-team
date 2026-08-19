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
    role: "Backend Developer",
    tag: "PYTHON",
    photo: "/team/verity_pf.png",
    blurb:
      "Developed backend logic, integrated Vosk and Piper speech models, and added cloud logging for responsible AI review.",
    bio: "On the Wayfinder Kiosk project, Verity developed backend features that power the kiosk's multilingual interactions. This included integrating local Vosk speech models on a Raspberry Pi, implementing the Python-based intent-processing workflow, mapping campus navigation data, and adding Azure cloud logging to support responsible AI review.\n\nVerity is a software developer graduating from SAIT in August 2026, transitioning into tech after building a career across financial services, non-profit arts, and client-experience roles. That path shaped her approach to work: with clear communication, strong collaboration, reliable time-management, and stakeholder-focused problem-solving at the core.\n\nIn development, she brings solid technical fundamentals in object-oriented programming, front and backend development, relational databases, SQL, cloud computing, DevOps practices, IoT concepts, and modern AI workflows — including responsible AI and agentic AI. She is especially interested in enterprise applications and building solutions that improve reliability, clarity, and the human experience overall.\n\nCurious, adaptable, and detail-driven, Verity is excited to grow her career in environments where technology, teamwork, and thoughtful design come together to create meaningful impact.",
    linkedin: "https://www.linkedin.com/in/verityb/",
    website: "https://verityboyd.vercel.app/",
  },
  {
    no: "002",
    name: "Aurora Choban",
    role: "Frontend Developer",
    tag: "INTERFACE",
    photo: "/team/aurora_pf.png",
    blurb:
      "Developed the Raspberry Pi integration, connecting hardware peripherals with the kiosk's voice and navigation systems.",
    bio: "Developed the Raspberry Pi integration, connecting hardware peripherals with the kiosk's voice and navigation systems.\n\nI'm a software developer graduating from SAIT in August 2026, transitioning into tech after building a career in insurance. That work developed the strengths I rely on now: precision with complex information, clear communication with clients and stakeholders, and the judgment to translate detailed requirements into something people can act on with confidence.\n\nIn development, I bring solid technical fundamentals in object-oriented programming, front and backend development, relational databases and SQL, cloud computing on Azure, containerization with Docker, DevOps practices, version control and agile delivery, and modern AI workflows including retrieval-augmented generation.",
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
      "Integrated the Raspberry Pi, microphone, speaker, and kiosk hardware to bring the physical and software components together.",
    bio: "Integrated the Raspberry Pi, microphone, speaker, and kiosk hardware to bring the physical and software components together.\n\nOn the Wayfinder Kiosk project, I focused on the IoT and hardware integration that connects the physical kiosk to its software. This included configuring the Raspberry Pi as the central device, connecting and working with the microphone and speaker, and ensuring the hardware could support the kiosk's voice-activated interactions. I also worked on connecting the device-side components with the rest of the system so that user input could be captured, processed, and returned through the kiosk.\n\nBefore moving into development, I worked in accounting and financial operations, which gave me a solid grounding in accuracy, process, and translating real-world business requirements into technical solutions, which is something I now bring directly into how I approach backend and system design.",
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
    bio: "Designed how the kiosk looked and felt, from its on-screen states to the physical enclosure it lives in.\n\nI'm a software developer graduating from SAIT in August 2026, transitioning into tech after building a career in banking, following a background in the service industry. That path shaped how I approach problems today: with strong client-facing communication, attention to detail under pressure, and a practical sense of how systems need to actually work for the people using them.\n\nIn development, I bring solid technical fundamentals in frontend development with React, TypeScript, and Tailwind CSS, UI/UX design, cloud deployment on Azure, and CAD design for physical fabrication.\n\nOn the Wayfinder Kiosk — a voice-activated, multilingual wayfinding kiosk for large venues — I built the kiosk's frontend interface in Next.js and TypeScript, designing the animated states that show the kiosk idle, listening, thinking, and displaying a QR code, all styled to match the team's poster colour palette. I also designed the kiosk's physical enclosure from scratch for 3D printing, working through the full model including mic and speaker cutouts, cable routing, ventilation, and a mounting bracket for the display, built to fit within the print bed's size constraints.\n\nMy specialization is cloud infrastructure and applied AI, and this project was a chance to step outside that and work hands-on with interface and physical design instead. I'm looking to join a team where I can keep building on that range, alongside the cloud and AI work that's my core focus.",
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
    <div className={styles.modalBackdrop} onClick={onClose} role="presentation">
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
        <MemberModal
          member={activeMember}
          onClose={() => setActiveMember(null)}
        />
      )}
    </main>
  );
}

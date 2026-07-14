"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  Menu,
  X,
  Github,
  ExternalLink,
  Moon,
  Sun,
  ArrowUp,
  Briefcase,
  GraduationCap,
  Trophy,
  Users,
} from "lucide-react";
import Contact from "./components/contact";
import { NeuralBridge } from "./components/Neuralbridge";
import { StatsRow } from "./components/Counter";
import { useTheme } from "./ThemeProvider";
import { useActiveSection } from "./hooks/useActiveSection";
import { useMousePosition } from "./hooks/useMousePosition";

/* ---------------------------------------------------------------- */
/* Data                                                              */
/* ---------------------------------------------------------------- */

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "Next.js", "Tailwind"],
  },
  {
    id: "backend",
    label: "Backend",
    skills: ["Python", "Django", "C# WPF (MVVM)"],
  },
  {
    id: "ai",
    label: "AI / ML",
    skills: ["Machine Learning", "Deep Learning", "AI for Documents"],
  },
];

const techPills = [
  "Python",
  "Django",
  "FastAPI",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "PostgreSQL",
  "C# / WPF",
  "Git",
  "Figma",
];

type Project = {
  id: number;
  title: string;
  category: "Full-Stack" | "Web" | "Data";
  desc: string;
  tags: string[];
  live: string;
  repo: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Ticketing Platform",
    category: "Full-Stack",
    desc: "Web-based ticketing system with event management, ticket booking, QR-code validation, and an admin dashboard for real-time tracking.",
    tags: ["Next.js", "PostgreSQL", "React", "Tailwind CSS"],
    live: "https://ticketing-platform-nu.vercel.app/",
    repo: "https://github.com/alaasek/TicketingPlatform.git",
  },
  {
    id: 2,
    title: "Analytics Dashboard",
    category: "Data",
    desc: "Responsive dashboard with charts, filters, and CSV export. Performance-focused and accessible.",
    tags: ["React", "FastAPI", "Recharts"],
    live: "#",
    repo: "#",
  },
  {
    id: 3,
    title: "International Bank Guarantee Management",
    category: "Full-Stack",
    desc: "Internal system for managing and tracking international bank guarantees, built during my time at Banque Nationale d'Algérie.",
    tags: ["Django", "Python", "SQL"],
    live: "#",
    repo: "#",
  },
  {
    id: 4,
    title: "HR Management",
    category: "Web",
    desc: "HR management tool for tracking employee records and internal workflows.",
    tags: ["HTML", "Tailwind", "JavaScript"],
    live: "#",
    repo: "#",
  },
];

const FILTERS = ["All", "Full-Stack", "Web", "Data"] as const;

const experience = [
  {
    company: "Banque Nationale d'Algérie",
    role: "Software Engineer",
    dates: "2024 — Present",
    points: [
      "Built and maintained internal tools for bank guarantee tracking.",
      "Worked across the stack from database design to UI delivery.",
    ],
    tech: ["Python", "Django", "SQL"],
  },
  {
    company: "Djezzy",
    role: "Web Developer",
    dates: "2023",
    points: [
      "Developed and maintained web features for internal platforms.",
      "Collaborated with cross-functional teams on delivery timelines.",
    ],
    tech: ["JavaScript", "HTML", "CSS"],
  },
];

const achievements = [
  {
    icon: Users,
    title: "Data Science Club — Founder",
    desc: "Founded and lead a student club focused on applied data science and ML learning at USTHB.",
  },
  {
    icon: Trophy,
    title: "Ideathon Participant",
    desc: "Competed in an Ideathon, developing and pitching a product concept under time constraints.",
  },
  {
    icon: GraduationCap,
    title: "Huawei AI Certification",
    desc: "Certified in AI fundamentals through Huawei's certification program.",
  },
  {
    icon: Briefcase,
    title: "Mentorship Certification",
    desc: "Certified in mentorship, supporting peers in technical and academic growth.",
  },
];

const aboutStats = [
  { to: 4, label: "Projects shipped" },
  { to: 10, suffix: "+", label: "Technologies" },
  { to: 2, label: "Companies" },
  { to: 2, suffix: "+", label: "Years learning AI" },
];

/* ---------------------------------------------------------------- */
/* Navbar                                                            */
/* ---------------------------------------------------------------- */

function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_ITEMS.map((n) => n.id));
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });

  return (
    <header className="fixed top-0 w-full z-50">
      <motion.div
        className="h-[2px] origin-left"
        style={{ scaleX: progress, background: "var(--gradient-primary)" }}
      />
      <div className="glass border-b border-border">
        <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center">
          <Link href="#home" className="font-display text-xl font-bold text-gradient">
            AS.
          </Link>

          <nav className="hidden md:flex gap-8 text-sm font-medium absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative py-1 transition-colors ${
                  active === item.id ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
                {active === item.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: "var(--gradient-primary)" }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg hover:bg-surface transition"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-surface transition"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <div className="flex flex-col px-6 py-4 gap-4">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="text-muted hover:text-foreground transition"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------- */
/* Hero                                                               */
/* ---------------------------------------------------------------- */

function Hero() {
  const mouse = useMousePosition();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-6 md:px-16 pt-28 overflow-hidden"
    >
      {/* Mouse-following spotlight, contained to hero */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(500px circle at ${mouse.x}px ${mouse.y}px, rgba(139,92,246,0.10), transparent 70%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full glass text-xs text-muted mb-6"
          >
            AI Engineering • Full-Stack • Algiers
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-bold leading-[1.1]"
          >
            AI Engineer &amp;
            <br />
            <span className="text-gradient">Full-Stack Developer</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-lg text-muted max-w-lg"
          >
            Master's student in Artificial Intelligence at USTHB, building intelligent
            applications, clean interfaces, and reliable backend systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl font-medium text-white transition hover:opacity-90"
              style={{ background: "var(--gradient-primary)" }}
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              className="px-6 py-3 rounded-xl font-medium glass hover:border-blue transition"
            >
              Download Resume
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl font-medium text-muted hover:text-foreground transition"
            >
              Contact Me →
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative flex justify-center"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-70">
            <NeuralBridge />
          </div>
          <div className="relative rounded-3xl overflow-hidden glass p-2">
            <Image
              src="/profile.png"
              alt="Alaa Sekiou"
              width={340}
              height={420}
              priority
              className="rounded-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* About                                                              */
/* ---------------------------------------------------------------- */

function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl font-bold">About Me</h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              I love turning ideas into elegant, scalable applications — blending
              interface design, backend architecture, and AI-powered workflows. Currently
              pursuing a Master's in Artificial Intelligence at USTHB, Algiers, after
              completing a Licence in Computer Science.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid gap-5"
          >
            <div className="glass rounded-2xl p-6">
              <h4 className="text-blue font-semibold mb-3 flex items-center gap-2">
                <Briefcase size={16} /> Experience
              </h4>
              <ul className="space-y-2 text-sm text-muted list-disc list-inside">
                <li>Software Engineer at Banque Nationale d'Algérie</li>
                <li>Web Developer at Djezzy</li>
              </ul>
            </div>
            <div className="glass rounded-2xl p-6">
              <h4 className="text-purple font-semibold mb-3 flex items-center gap-2">
                <GraduationCap size={16} /> Education
              </h4>
              <ul className="space-y-2 text-sm text-muted list-disc list-inside">
                <li>Master 1 — Artificial Intelligence, USTHB</li>
                <li>Licence — Informatique</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <StatsRow stats={aboutStats} />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Skills                                                             */
/* ---------------------------------------------------------------- */

function Skills() {
  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h3 className="font-display text-4xl font-bold">Skills</h3>
          <p className="mt-3 text-muted max-w-xl">Stack, tools, and areas of focus.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6"
            >
              <h4 className="font-display font-semibold text-lg mb-4">{cat.label}</h4>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-full border border-border text-muted hover:border-blue hover:text-foreground transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech pill marquee */}
        <div className="mt-16 overflow-hidden">
          <div className="flex gap-3 marquee-track w-max">
            {[...techPills, ...techPills].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="shrink-0 px-4 py-2 rounded-full glass text-sm text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Projects                                                           */
/* ---------------------------------------------------------------- */

function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-end justify-between gap-6 mb-10"
        >
          <div>
            <h3 className="font-display text-4xl font-bold">Projects</h3>
            <p className="mt-3 text-muted">Selected work across AI, data, and the web.</p>
          </div>

          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm transition ${
                  filter === f
                    ? "text-white"
                    : "text-muted glass hover:text-foreground"
                }`}
                style={filter === f ? { background: "var(--gradient-primary)" } : undefined}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4 }}
                className="glass rounded-2xl p-7 flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-xl font-semibold font-display">{p.title}</h4>
                  <span className="text-xs px-2.5 py-1 rounded-full border border-border text-muted shrink-0 ml-3">
                    {p.category}
                  </span>
                </div>
                <p className="text-sm text-muted mb-5 flex-1">{p.desc}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-full text-white"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <ExternalLink size={14} /> Live
                  </a>
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-full border border-border hover:border-blue transition"
                  >
                    <Github size={14} /> Code
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Experience timeline                                                */
/* ---------------------------------------------------------------- */

function Experience() {
  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl font-bold mb-14"
        >
          Experience
        </motion.h3>

        <div className="relative pl-8 border-l border-border space-y-12">
          {experience.map((job, i) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <span
                className="absolute -left-[38px] top-1 w-3 h-3 rounded-full"
                style={{ background: "var(--gradient-primary)" }}
              />
              <div className="glass rounded-2xl p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h4 className="font-display font-semibold text-lg">{job.role}</h4>
                  <span className="text-xs text-muted">{job.dates}</span>
                </div>
                <p className="text-sm text-blue mb-3">{job.company}</p>
                <ul className="space-y-1.5 text-sm text-muted list-disc list-inside mb-4">
                  {job.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {job.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full border border-border text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Achievements                                                       */
/* ---------------------------------------------------------------- */

function Achievements() {
  return (
    <section id="achievements" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl font-bold mb-14"
        >
          Achievements
        </motion.h3>

        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 flex gap-4"
              >
                <div
                  className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white"
                  style={{ background: "var(--gradient-secondary)" }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{a.title}</h4>
                  <p className="text-sm text-muted">{a.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Footer                                                              */
/* ---------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-display font-bold text-gradient">Alaa Sekiou</span>
        <p className="text-sm text-muted">© 2026 · Designed &amp; built by Alaa Sekiou</p>
        <a
          href="#home"
          className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition"
        >
          Back to top <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------- */
/* Page                                                                */
/* ---------------------------------------------------------------- */

export default function Portfolio() {
  return (
    <div className="min-h-screen text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  );
}
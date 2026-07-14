"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Wire this up to your email service / API route of choice.
    setSent(true);
  }

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h3 className="font-display text-4xl md:text-5xl font-bold">
            Let's build something <span className="text-gradient">amazing</span> together.
          </h3>
          <p className="mt-4 text-muted max-w-xl mx-auto">
            Open to internships and collaborations in AI, Machine Learning, and full-stack
            engineering.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3 glass rounded-2xl p-8 space-y-4"
          >
            <div>
              <label className="text-sm text-muted" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                required
                className="mt-1 w-full rounded-lg bg-transparent border border-border px-4 py-3 outline-none focus:border-blue transition"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm text-muted" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 w-full rounded-lg bg-transparent border border-border px-4 py-3 outline-none focus:border-blue transition"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="text-sm text-muted" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                className="mt-1 w-full rounded-lg bg-transparent border border-border px-4 py-3 outline-none focus:border-blue transition resize-none"
                placeholder="Tell me about the opportunity or project..."
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 rounded-lg py-3 font-medium text-white"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Send size={16} />
              {sent ? "Message sent" : "Send message"}
            </motion.button>
          </motion.form>

          {/* Direct links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 glass rounded-2xl p-8 flex flex-col justify-center gap-6"
          >
            <a
              href="https://github.com/alaasek"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-foreground hover:text-blue transition"
            >
              <Github size={20} /> github.com/alaasek
            </a>
            <a
              href="https://www.linkedin.com/in/sekiou-alaa-4057b8267/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-foreground hover:text-blue transition"
            >
              <Linkedin size={20} /> LinkedIn
            </a>
            <a
              href="mailto:hello@example.com"
              className="flex items-center gap-3 text-foreground hover:text-blue transition"
            >
              <Mail size={20} /> hello@example.com
            </a>
            <div className="flex items-center gap-3 text-muted">
              <MapPin size={20} /> Algiers, Algeria
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
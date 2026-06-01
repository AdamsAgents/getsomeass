"use client";

import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  company: "",
  service: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [notice, setNotice] = useState("");

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setStatus("idle");
    setNotice("");
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setNotice("Sending your message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not send your message.");
      setForm(initialState);
      setStatus("success");
      setNotice("Message sent. I’ll get back to you soon.");
    } catch (error) {
      setStatus("error");
      setNotice(error instanceof Error ? error.message : "Could not send your message. Email adam@getsomeass.com directly.");
    }
  }

  return (
    <form className="contact-card" onSubmit={submit}>
      <label>Name<input name="name" value={form.name} onChange={(e) => update("name", e.target.value)} required /></label>
      <label>Email<input name="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required /></label>
      <label>Company <small>optional</small><input name="company" value={form.company} onChange={(e) => update("company", e.target.value)} /></label>
      <label>What do you need help with?<select name="service" value={form.service} onChange={(e) => update("service", e.target.value)} required><option value="" disabled>Choose one</option><option>AI Product Development</option><option>Web Design</option><option>Social Media & Advertising</option><option>Not sure yet</option></select></label>
      <label>Message<textarea name="message" value={form.message} onChange={(e) => update("message", e.target.value)} required /></label>
      <button className="btn full" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send the idea"}</button>
      {notice && <p className={status === "error" ? "form-status error" : "form-status"}>{notice}</p>}
    </form>
  );
}

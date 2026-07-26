"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { contactSchema } from "@/lib/validation/contactSchema";
import { sendContactRequest } from "@/lib/api/contact";
import type { ContactRequest } from "@/types/contact";

export default function Contact() {
  const [formDisplayedAt] = useState(() => new Date().toISOString());

  const [requestType, setRequestType] = useState<"general" | "artwork request" | "commission">("general");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [size, setSizePref] = useState("");
  const [colors, setColorPref] = useState("");
  const [budget, setBudget] = useState("");

  const [agreed, setAgreed] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    if (!hash) return;

    const [anchor, queryString] = hash.split("?");
    if (!queryString) return;

    try {
      const params = new URLSearchParams(queryString);
      const title = params.get("title");
      const year = params.get("year");
      const id = params.get("id");

      if (!title) return;

      setRequestType("artwork request");

      if (!subject) {
        setSubject(`Anfrage zum Kunstwerk: ${title}`);
      }

      if (!message) {
        const artLink = id ? `${window.location.origin}/shop/${id}` : "";
        setMessage(`Hallo,

ich interessiere mich für folgendes Kunstwerk:

Titel: ${title}
Jahr: ${year ?? "-"}${artLink ? `\nLink: ${artLink}` : ""}

Meine Frage:
`);
      }

      try {
        const el = document.querySelector(anchor);
        if (el && typeof (el as HTMLElement).scrollIntoView === "function") {
          (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } catch { }

      try {
        history.replaceState(null, "", anchor);
      } catch { }
    } catch { }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    setErrors({});

    const newErrors: Record<string, string | undefined> = {};

    // ⭐ 1️⃣ Commission Validation
    if (requestType === "commission") {
      if (!size) newErrors.size = "Bitte Größe angeben";
      if (!colors) newErrors.colors = "Bitte Farbwelt / Stil angeben";
      if (!budget) newErrors.budget = "Bitte Budgetrahmen angeben";
    }

    // ⭐ 2️⃣ Schema Validation
    const validationPayload =
      requestType === "commission"
        ? { name, email, subject, size, colors, budget, message, agreed }
        : { name, email, subject, message, agreed };

    const result = contactSchema.safeParse(validationPayload);

    if (!result.success) {
      const formatted = result.error.format();

      newErrors.name = formatted.name?._errors[0];
      newErrors.email = formatted.email?._errors[0];
      newErrors.subject = formatted.subject?._errors[0];
      newErrors.message = formatted.message?._errors[0];
      newErrors.agreed = formatted.agreed?._errors[0];
    }

    // ⭐ 3️⃣ Wenn Fehler existieren → anzeigen
    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    if (honeypot) return;

    setErrors({});
    setIsSending(true);

    let finalMessage = message;

    if (requestType === "commission") {
      finalMessage += `

--- Auftragsdetails ---
Größe: ${size || "-"}
Farbwelt: ${colors || "-"}
Budget: ${budget || "-"}
`;
    }

    const request: ContactRequest = {
      name,
      email,
      subject,
      requestType,
      message: finalMessage,
      honeypot,
      formDisplayedAt,
    };

    const response = await sendContactRequest(request);

    if (response.success) {
      setName("");
      setEmail("");
      setSubject("");
      setSizePref("");
      setColorPref("");
      setBudget("");
      setMessage("");
      setAgreed(false);
      setStatus({ type: "success", text: "Nachricht erfolgreich gesendet!" });
    } else {
      setStatus({ type: "error", text: `Fehler beim Senden: ${response.message}` });
    }

    setIsSending(false);
  };

  return (
    <section className="section">
      <h2 className="section-title section-title-light">Kontakt</h2>

      <div className="contact-container">
        <p className="contact-info">
          <span>Hast du Fragen zu einem Werk oder Interesse an einer Auftragsarbeit?</span>
          <br />
          <span>Schreib mir!</span>
        </p>

        {status && (
          <div className={`contact-status ${status.type === "success" ? "contact-status--success" : "contact-status--error"
            }`} role="status">
            {status.text}
          </div>
        )}

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="contact-honeypot">
            <label>
              Do not fill this out if you're human:
              <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} autoComplete="off" />
            </label>
          </div>

          <div className="form-group">
            <input type="text" placeholder="Dein Name" value={name} onChange={(e) => setName(e.target.value)} required aria-invalid={!!errors.name} />
            {errors.name && <p className="meta-contact">{errors.name}</p>}
          </div>

          <div className="form-group">
            <input type="email" placeholder="Deine E-Mail-Adresse" value={email} onChange={(e) => setEmail(e.target.value)} required aria-invalid={!!errors.email} />
            {errors.email && <p className="meta-contact">{errors.email}</p>}
          </div>

          <div className="form-group">
            <input type="text" placeholder="Betreff" value={subject} onChange={(e) => setSubject(e.target.value)} required aria-invalid={!!errors.subject} />
            {errors.subject && <p className="meta-contact">{errors.subject}</p>}
          </div>

          <div className="form-group form-group--select">
            <select name="requestType" value={requestType} onChange={(e) => setRequestType(e.target.value as any)}>
              <option value="general">Allgemeine Frage</option>
              <option value="artwork">Interesse am Kunstwerk</option>
              <option value="commission">Auftragsarbeit</option>
            </select>
          </div>

          {requestType === "commission" && (
            <>
              <div className="form-group">
                <input placeholder="Gewünschte Größe" value={size} onChange={(e) => setSizePref(e.target.value)} required aria-invalid={!!errors.size} />
                {errors.size && <p className="meta-contact">{errors.size}</p>}
              </div>

              <div className="form-group">
                <input placeholder="Farbwelt / Stil" value={colors} onChange={(e) => setColorPref(e.target.value)} required aria-invalid={!!errors.colors} />
                {errors.colors && <p className="meta-contact">{errors.colors}</p>}
              </div>

              <div className="form-group">
                <input placeholder="Budgetrahmen" value={budget} onChange={(e) => setBudget(e.target.value)} required aria-invalid={!!errors.budget} />
                {errors.budget && <p className="meta-contact">{errors.budget}</p>}
              </div>
            </>
          )}

          <div className="form-group">
            <textarea rows={6} placeholder="Deine Nachricht" value={message} onChange={(e) => setMessage(e.target.value)} required aria-invalid={!!errors.message} />
            {errors.message && <p className="meta-contact">{errors.message}</p>}
          </div>

          <div className="form-group form-group--privacy">
            <label className="form-privacy-label">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="form-privacy-checkbox" aria-invalid={!!errors.agreed} />
              <span className="form-privacy-text">
                Ich stimme der Verarbeitung meiner Daten gemäß{" "}
                <Link href="/imprint" className="form-privacy-link">
                  Datenschutzerklärung
                </Link>{" "}
                zu.
              </span>
            </label>
            {errors.agreed && <p className="meta-contact">{errors.agreed}</p>}
          </div>

          <button type="submit" className="btn-chip btn-chip--shine" disabled={isSending}>
            <span>{isSending ? "Sende..." : "Nachricht senden"}</span>
          </button>
        </form>
      </div>
    </section>
  );
}
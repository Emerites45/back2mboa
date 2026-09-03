"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

const STEPS: Record<number, string> = {
  1: "Qui etes-vous ?",
  2: "Votre objectif",
  3: "Action",
  4: "Prochaine etape",
};

type QuickItem = {
  id?: string;
  label: string;
  primary?: boolean;
  ghost?: boolean;
};

function ChatbotInner() {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [step, setStep] = useState(1);
  const [persona, setPersona] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ html: string; who: "bot" | "user" }[]>([]);
  const [quickItems, setQuickItems] = useState<QuickItem[]>([]);
  const [typing, setTyping] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector("section");
      if (hero) setShowBtn(hero.getBoundingClientRect().bottom < window.innerHeight);
      else setShowBtn(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 180);
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, quickItems, typing]);

  const now = () => new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  const addMsg = useCallback((html: string, who: "bot" | "user") => {
    setMessages((p) => [...p, { html, who }]);
  }, []);

  const setStepVal = useCallback((n: number) => setStep(Math.min(4, Math.max(1, n))), []);

  const say = useCallback(
    (html: string, quick?: QuickItem[], stepTo?: number) => {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        addMsg(html, "bot");
        if (quick) setQuickItems(quick);
        if (stepTo) setStepVal(stepTo);
      }, 380 + Math.random() * 220);
    },
    [addMsg, setStepVal]
  );

  const afterPersona = useCallback(
    (p: string) => {
      setStepVal(2);
      const intros: Record<string, string> = {
        entrepreneur: "Vous avez une solution ou du capital. L\u2019enjeu : rencontrer des territoires <strong>d\u00e9j\u00e0 cadr\u00e9s</strong>.",
        mairie: "Vous portez un besoin territorial. L\u2019enjeu : le rendre <strong>cr\u00e9dible et matchable</strong>.",
        curieux: "Vous voulez comprendre vite si \u00e7a vaut le d\u00e9placement.",
        autre: "Pas de souci \u2014 on avance par objectif.",
      };
      say(
        (intros[p] || intros.autre) + '<br/><span class="b2m-bl"><strong>Que voulez-vous faire ?</strong></span>',
        [
          { id: "o_inscrire", label: "Voir les billets", primary: true },
          { id: "o_comprendre", label: "Comprendre le concept" },
          { id: "o_territoires", label: "Les 6 mairies" },
          { id: "o_contact", label: "Parler \u00e0 l\u2019\u00e9quipe", ghost: true },
        ],
        2
      );
    },
    [say, setStepVal]
  );

  const handle = useCallback(
    (id: string) => {
      const t = (id || "").toLowerCase();

      if (/^(p_entrepreneur|entrepreneur|diaspora|solution)/.test(t)) { setPersona("entrepreneur"); return afterPersona("entrepreneur"); }
      if (/^(p_mairie|mairie|collectivite|commune|maire)/.test(t)) { setPersona("mairie"); return afterPersona("mairie"); }
      if (/^(p_curieux|decouvre|curieux|decouverte)/.test(t)) { setPersona("curieux"); return afterPersona("curieux"); }
      if (/^(p_autre|autre profil)/.test(t)) { setPersona("autre"); return afterPersona("autre"); }

      if (/^(o_inscrire|voir les billets)|billet|ticket|particip|inscri|tarif|prix/.test(t)) {
        setStepVal(3);
        return say(
          "3 billets individuels :<br/><br/>" +
          "\u2022 <strong>Early Bird 49\u20ac</strong> \u2248 32 150F \u2014 jusqu\u2019au 30 sept.<br/>" +
          "\u2022 <strong>Standard 99\u20ac</strong> \u2248 65 000F \u2014 + speed-meeting<br/>" +
          "\u2022 <strong>VIP 199\u20ac</strong> \u2248 130 500F \u2014 + RDV pr\u00e9-book\u00e9<br/>" +
          '<span class="b2m-bl"><strong>Early Bird</strong> = meilleur prix. <strong>VIP</strong> = pas au hasard.</span>',
          [
            { id: "t_early", label: "Early Bird", primary: true },
            { id: "t_std", label: "Standard" },
            { id: "t_vip", label: "VIP" },
            { id: "o_contact", label: "Aide", ghost: true },
          ],
          3
        );
      }
      if (/^(t_early|early|49)/.test(t)) {
        setStepVal(4);
        return say(
          "<strong>Early Bird \u2014 49\u20ac</strong><br/>" +
          "Acc\u00e8s 2 jours, ateliers, networking, Deal Rooms ouverts.<br/>" +
          '<span class="b2m-bl"><strong>Pour qui ?</strong> D\u00e9cision avant le 30 septembre.</span>',
          [{ id: "act_inscrire", label: "Je m\u2019inscris", primary: true }, { id: "t_std", label: "Comparer Standard" }, { id: "back_obj", label: "Autre besoin", ghost: true }],
          4
        );
      }
      if (/^(t_std|standard|99)/.test(t)) {
        setStepVal(4);
        return say(
          "<strong>Standard \u2014 99\u20ac</strong><br/>" +
          "Tout Early Bird + <strong>1 speed-meeting</strong> + comptes-rendus.<br/>" +
          '<span class="b2m-bl"><strong>Pour qui ?</strong> Un cr\u00e9neau nomm\u00e9.</span>',
          [{ id: "act_inscrire", label: "Je m\u2019inscris", primary: true }, { id: "t_vip", label: "Voir VIP" }, { id: "back_obj", label: "Autre besoin", ghost: true }],
          4
        );
      }
      if (/^(t_vip|vip|199)/.test(t)) {
        setStepVal(4);
        return say(
          "<strong>VIP \u2014 199\u20ac</strong><br/>" +
          "Deal Rooms ferm\u00e9s, d\u00eener, <strong>1 RDV pr\u00e9-book\u00e9</strong>, suivi 90j.<br/>" +
          '<span class="b2m-bl"><strong>Pour qui ?</strong> Fil de suite \u00e9crit. Places limit\u00e9es.</span>',
          [{ id: "act_inscrire", label: "Je m\u2019inscris", primary: true }, { id: "t_early", label: "Revoir Early Bird" }, { id: "back_obj", label: "Autre besoin", ghost: true }],
          4
        );
      }
      if (/^(act_inscrire|je m.inscris)/.test(t)) {
        setStepVal(4);
        return say(
          "Utilisez le bouton <strong>Voir les billets</strong> ci-dessous.<br/><br/>" +
          "500 places \u00b7 cl\u00f4ture Early Bird <strong>30 septembre 2026</strong> \u00b7 <strong>16\u201317 d\u00e9cembre</strong>.<br/>" +
          '<span class="b2m-bl"><strong>Astuce :</strong> pr\u00e9parez profil + secteur en 2 lignes.</span>',
          [{ id: "o_territoires", label: "Les 6 mairies" }, { id: "o_contact", label: "Besoin d\u2019aide", ghost: true }],
          4
        );
      }
      if (/^(o_comprendre|comprendre|concept)/.test(t)) {
        setStepVal(3);
        return say(
          "Back2Mboa relie <strong>besoins de territoires</strong> et <strong>solutions</strong>. " +
          "Filtre <strong>CAP</strong> avant chaque mise en relation. " +
          "Rendez-vous <strong>16\u201317 d\u00e9cembre</strong> \u00e0 Yaound\u00e9.",
          [{ id: "o_inscrire", label: "Voir les billets", primary: true }, { id: "o_territoires", label: "Les 6 mairies" }, { id: "o_contact", label: "Contact", ghost: true }],
          3
        );
      }
      if (/^(o_territoires|6 mair|mairies|babadjou|douala|territoire)/.test(t)) {
        setStepVal(3);
        return say(
          "6 mairies \u00d7 6 secteurs :<br/>" +
          "\u2022 <strong>Babadjou</strong> \u2014 agri<br/>" +
          "\u2022 <strong>Douala III</strong> \u2014 finance & digital<br/>" +
          "\u2022 <strong>Mbalmayo</strong> \u2014 foncier<br/>" +
          "\u2022 <strong>Limb\u00e9 I</strong> \u2014 tourisme<br/>" +
          "\u2022 <strong>Fundong</strong> \u2014 eau & \u00e9nergie<br/>" +
          "\u2022 <strong>Guider</strong> \u2014 sant\u00e9",
          [{ id: "o_inscrire", label: "Voir les billets", primary: true }, { id: "o_cap", label: "Filtre CAP" }, { id: "back_obj", label: "Retour", ghost: true }],
          3
        );
      }
      if (/^(o_cap|cap|credibl|filtre)/.test(t)) {
        setStepVal(3);
        return say(
          "3 questions : <strong>Cr\u00e9dible</strong> ? <strong>Accessible</strong> ? <strong>Possible</strong> ?<br/>" +
          "Si 3 verts \u2192 pipeline. Sinon \u2192 on retravaille.",
          [{ id: "o_inscrire", label: "Voir les billets", primary: true }, { id: "back_obj", label: "Retour", ghost: true }],
          3
        );
      }
      if (/^(o_contact|contact|equipe|parler|aide inscription)/.test(t)) {
        setStepVal(4);
        return say(
          "L\u2019\u00e9quipe r\u00e9pond sous <strong>48h ouvr\u00e9es</strong>.<br/>" +
          "Indiquez : <em>profil + ce que vous cherchez</em>.",
          [{ id: "o_inscrire", label: "Voir les billets", primary: true }, { id: "back_obj", label: "Autre question", ghost: true }],
          4
        );
      }
      if (/partenaire|sponsor|pack/.test(t)) {
        setStepVal(4);
        return say(
          "Offres partenaires construites avec l\u2019\u00e9quipe. Contactez-nous avec votre secteur.",
          [{ id: "o_contact", label: "Contacter l\u2019\u00e9quipe", primary: true }, { id: "o_inscrire", label: "Billet individuel" }, { id: "back_obj", label: "Retour", ghost: true }],
          4
        );
      }
      if (/^(back_obj|autre|retour)/.test(t)) return afterPersona(persona || "autre");

      say(
        "Je peux vous guider sur les <strong>billets</strong>, le <strong>concept</strong>, les <strong>6 mairies</strong> ou un <strong>contact</strong>.",
        [
          { id: "o_inscrire", label: "Voir les billets", primary: true },
          { id: "o_comprendre", label: "Comprendre" },
          { id: "o_territoires", label: "Les 6 mairies" },
          { id: "o_contact", label: "Contact", ghost: true },
        ],
        step
      );
    },
    [afterPersona, persona, say, setStepVal, step]
  );

  const send = useCallback(() => {
    const v = inputVal.trim();
    if (!v) return;
    setInputVal("");
    addMsg(v, "user");
    handle(v);
  }, [inputVal, addMsg, handle]);

  const openChat = useCallback(() => {
    setOpen(true);
    if (!started) {
      setStarted(true);
      setStepVal(1);
      addMsg(
        "Bonjour \ud83d\udc4b En <strong>2 minutes</strong>, je vous oriente.<br/><br/>" +
        "Back2Mboa = <strong>16\u201317 d\u00e9cembre 2026</strong>, Yaound\u00e9.<br/>" +
        '<span class="b2m-bl"><strong>D\u2019abord :</strong> qui \u00eates-vous ?</span>',
        "bot"
      );
      setQuickItems([
        { id: "p_entrepreneur", label: "Entrepreneur / diaspora", primary: true },
        { id: "p_mairie", label: "Mairie / collectivit\u00e9" },
        { id: "p_curieux", label: "Je d\u00e9couvre" },
        { id: "p_autre", label: "Autre profil", ghost: true },
      ]);
    }
  }, [started, addMsg, setStepVal]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <div className="b2m-root">
      {/* Panel */}
      <div className={`b2m-panel ${open ? "b2m-panel-open" : ""}`}>
        <div className="b2m-head">
          <div className="b2m-avatar">
            <img src="/images/Back2Mboa_Portail_Terre_Cuite.webp" alt="" width="36" height="36" />
          </div>
          <div className="b2m-head-info">
            <strong>Assistant Back2Mboa</strong>
            <span className="b2m-status"><span className="b2m-status-dot" /> En ligne</span>
          </div>
          <button className="b2m-close" onClick={() => setOpen(false)} aria-label="Fermer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="b2m-body" ref={bodyRef}>
          {messages.map((m, i) => (
            <div key={i} className={`b2m-msg ${m.who === "user" ? "b2m-user" : "b2m-bot"}`}>
              {m.who === "bot" && (
                <div className="b2m-msg-avatar">
                  <img src="/images/Back2Mboa_Portail_Terre_Cuite.webp" alt="" width="26" height="26" />
                </div>
              )}
              <div className="b2m-msg-bubble" dangerouslySetInnerHTML={{ __html: m.html }} />
            </div>
          ))}
          {typing && (
            <div className="b2m-msg b2m-bot">
              <div className="b2m-msg-avatar">
                <img src="/images/Back2Mboa_Portail_Terre_Cuite.webp" alt="" width="26" height="26" />
              </div>
              <div className="b2m-msg-bubble b2m-typing"><span /><span /><span /></div>
            </div>
          )}
          {quickItems.length > 0 && !typing && (
            <div className="b2m-quick">
              {quickItems.map((it, i) => (
                <button key={i} className={`b2m-qbtn ${it.primary ? "b2m-qbtn-p" : ""} ${it.ghost ? "b2m-qbtn-g" : ""}`} onClick={() => { addMsg(it.label, "user"); setQuickItems([]); handle(it.id || it.label); }}>{it.label}</button>
              ))}
            </div>
          )}
        </div>

        {step >= 3 && (
          <div className="b2m-cta">
            <a href="#billets" className="b2m-cta-go">Voir les billets</a>
            <a href="#contact" className="b2m-cta-soft">Contacter l&apos;&eacute;quipe</a>
          </div>
        )}

        <div className="b2m-foot">
          <input ref={inputRef} type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ecrivez un message..." autoComplete="off" className="b2m-input" />
          <button className="b2m-send" onClick={send} aria-label="Envoyer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
      </div>

      {/* Launcher */}
      {showBtn && (
        <button className="b2m-launcher" onClick={() => (open ? setOpen(false) : openChat())} aria-label="Ouvrir le chat">
          <img src="/images/Back2Mboa_Portail_Terre_Cuite.webp" alt="Back2Mboa" width="48" height="48" />
          {!open && <span className="b2m-badge">1</span>}
        </button>
      )}
    </div>,
    document.body
  );
}

export function ChatbotWidget() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <ChatbotInner />;
}

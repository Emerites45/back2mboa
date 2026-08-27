import "./TicketDesign.css";

export function TicketDesign() {
  return (
    <div className="b2m-ticket">
      <div className="stage">
        <p className="label">Back2Mboa 2026 — Billet d’invitation · Design</p>

        <article className="ticket" aria-label="Billet d'invitation Back2Mboa">
          <span className="notch tl" />
          <span className="notch bl" />
          <span className="notch tm" />
          <span className="notch bm" />

          <div className="stub">
            <span className="brand">BACK2MBOA</span>
            <span className="code">B2M-2026</span>
          </div>

          <div className="mid">
            <div className="eyebrow">Invitation officielle</div>
            <div className="tier">SUR INVITATION</div>
            <div className="amount">0 F</div>
            <div className="note">Accès qualifié · non cessible</div>
            <div className="status">VALIDÉ</div>
          </div>

          <div className="right">
            <div>
              <h3>Opportunity Boulevard</h3>
              <div className="chips">
                <span className="chip">Deal Rooms</span>
                <span className="chip">6 mairies</span>
                <span className="chip">500 décideurs</span>
              </div>
              <div className="meta">
                <div>
                  Lieu<strong>Musée National, Yaoundé</strong>
                </div>
                <div>
                  Dates<strong>16–17 déc. 2026</strong>
                </div>
                <div>
                  Ouverture<strong>08:30</strong>
                </div>
                <div>
                  Profil<strong>Solutionneur</strong>
                </div>
              </div>
            </div>
            <div>
              <div className="qr">
                <svg viewBox="0 0 100 100" aria-hidden="true">
                  <rect width="100" height="100" fill="#fff" />
                  <rect x="5" y="5" width="30" height="30" fill="#0A2B21" />
                  <rect x="9" y="9" width="22" height="22" fill="#fff" />
                  <rect x="13" y="13" width="14" height="14" fill="#0A2B21" />
                  <rect x="65" y="5" width="30" height="30" fill="#0A2B21" />
                  <rect x="69" y="9" width="22" height="22" fill="#fff" />
                  <rect x="73" y="13" width="14" height="14" fill="#0A2B21" />
                  <rect x="5" y="65" width="30" height="30" fill="#0A2B21" />
                  <rect x="9" y="69" width="22" height="22" fill="#fff" />
                  <rect x="13" y="73" width="14" height="14" fill="#0A2B21" />
                  <rect x="42" y="8" width="7" height="7" fill="#0A2B21" />
                  <rect x="52" y="8" width="7" height="7" fill="#0A2B21" />
                  <rect x="42" y="18" width="7" height="7" fill="#0A2B21" />
                  <rect x="50" y="20" width="10" height="10" fill="#0A2B21" />
                  <rect x="40" y="40" width="10" height="10" fill="#0A2B21" />
                  <rect x="54" y="42" width="7" height="7" fill="#0A2B21" />
                  <rect x="66" y="40" width="12" height="7" fill="#0A2B21" />
                  <rect x="82" y="42" width="7" height="7" fill="#0A2B21" />
                  <rect x="40" y="56" width="7" height="12" fill="#0A2B21" />
                  <rect x="52" y="58" width="14" height="7" fill="#0A2B21" />
                  <rect x="72" y="56" width="10" height="10" fill="#0A2B21" />
                  <rect x="42" y="78" width="7" height="7" fill="#0A2B21" />
                  <rect x="54" y="74" width="10" height="10" fill="#0A2B21" />
                  <rect x="68" y="78" width="7" height="12" fill="#0A2B21" />
                  <rect x="80" y="74" width="10" height="7" fill="#0A2B21" />
                  <rect x="8" y="42" width="7" height="10" fill="#0A2B21" />
                  <rect x="18" y="50" width="12" height="7" fill="#0A2B21" />
                  <rect x="42" y="68" width="7" height="7" fill="#119D63" />
                </svg>
              </div>
              <div className="qr-cap">SCAN · CHECK-IN</div>
            </div>
            <div className="seat">
              <span>
                N° <b>B2M-2026-0142</b>
              </span>
              <span>
                Porte <b>A · Deal Room</b>
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

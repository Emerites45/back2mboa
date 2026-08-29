"use client";

export function PlatformSection() {
  const capCards = [
    {
      letter: "C",
      title: "CRÉDIBLE",
      titleColor: "text-slate-900",
      letterColor: "text-slate-200/80",
      borderColor: "border-gray-200",
      description:
        "Compréhensible, documentée, portée par des acteurs identifiés et reliée à des données, des responsabilités et des résultats attendus.",
    },
    {
      letter: "A",
      title: "ACCESSIBLE",
      titleColor: "text-amber-500",
      letterColor: "text-amber-100",
      borderColor: "border-gray-200",
      description:
        "Découverte, comprise et rejointe par les acteurs pertinents. Accès au décideur, au régulateur, au financement, au marché.",
    },
    {
      letter: "P",
      title: "POSSIBLE",
      titleColor: "text-emerald-600",
      letterColor: "text-emerald-100",
      borderColor: "border-emerald-500", // Bordure accentuée comme sur le design
      description:
        "Un chemin crédible vers l'exécution — de l'idée au partenariat, du financement à l'impact durable.",
    },
  ];

  return (
    <section id="plateforme" className="relative py-24 px-6 lg:px-16 bg-white text-slate-900 overflow-hidden">
      {/* Mot "CAP" géant en arrière-plan (Watermark CSS) */}
      <div className="absolute top-4 right-4 lg:right-12 z-0 pointer-events-none select-none">
        <span className="text-[180px] sm:text-[260px] lg:text-[340px] font-black leading-none text-slate-100/80 tracking-tighter">
          CAP
        </span>
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl">
        {/* En-tête de section */}
        <div className="space-y-4 max-w-3xl mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            LA PLATEFORME
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-none tracking-tight">
            LA PROSPÉRITÉ CIRCULE<br />
            <span className="text-emerald-600">DÉJÀ.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
            <p>
              Back2Mboa ASAP™ est une{" "}
              <strong className="text-slate-900 font-bold">
                plateforme de prospérité territoriale
              </strong>{" "}
              qui identifie, structure, rend visibles et connecte des opportunités économiques réelles avec les personnes capables de les transformer en projets concrets.
            </p>
            <p>
              Là où les problèmes rencontrent leurs Solutionneurs.™ Nous ouvrons les voies, levons les obstacles, connectons les bonnes personnes et accompagnons les projets jusqu’à la prospérité durable.
            </p>
          </div>
        </div>

        {/* Cartes C - A - P */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {capCards.map((card, index) => (
            <div
              key={index}
              className={`relative bg-white p-8 rounded-2xl border ${card.borderColor} shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group`}
            >
              {/* Lettre géante en fond de carte */}
              <span
                className={`absolute top-2 left-6 text-7xl font-black ${card.letterColor} select-none transition-transform duration-300 group-hover:scale-110`}
              >
                {card.letter}
              </span>

              <div className="relative z-10 pt-12 space-y-4">
                <h3 className={`text-xl font-black uppercase tracking-wider ${card.titleColor}`}>
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bloc Citation Sombre / Dark Banner */}
        <div className="bg-[#051124] text-white rounded-2xl p-8 sm:p-12 text-center shadow-xl border border-slate-800 space-y-6">
          <blockquote className="text-lg sm:text-2xl font-bold max-w-3xl mx-auto leading-snug">
            « Du besoin à la solution, de la solution au partenariat, du partenariat à l’investissement, de l’investissement à l’impact. »
          </blockquote>

          <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-black text-amber-400 uppercase tracking-widest">
            <span>Build</span>
            <span className="text-amber-400/50">•</span>
            <span>Operate</span>
            <span className="text-amber-400/50">•</span>
            <span>Transfer</span>
          </div>
        </div>
      </div>
    </section>
  );
}

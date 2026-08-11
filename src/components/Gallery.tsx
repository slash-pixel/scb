import ScrollReveal from "./ScrollReveal";

// Remplace ces chemins par les vraies photos de l'établissement
const PHOTOS = [
  { src: "/galerie/campus-1.jpg", alt: "Cour principale du collège", grand: true },
  { src: "/galerie/classe-1.jpg", alt: "Évaluations" },
  { src: "/galerie/rassemblement.jpg", alt: "Rassemblement" },
  { src: "/galerie/evenement-1.jpg", alt: "Événement extra-académique" },
  { src: "/galerie/chapelle.jpg", alt: "Chapelle du collège" },
  { src: "/galerie/excellence.jpg", alt: "Excellence scolaire" },
];

export default function Gallery() {
  return (
    <section id="galerie" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal className="max-w-2xl mb-14">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-navy/75 mb-4">
            Galerie
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ink leading-[1.1]">
            La vie au collège, en images
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {PHOTOS.map((photo, i) => (
            <ScrollReveal
              key={photo.src}
              delay={0.08 * i}
              className={`group relative overflow-hidden rounded-xl md:rounded-2xl ${
                photo.grand ? "col-span-2 row-span-2" : ""
              }`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-navy-deep/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute bottom-3 left-4 text-sm text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                {photo.alt}
              </span>
            </ScrollReveal>
          ))}
        </div>

        {/* --- NOUVEAU BOUTON AJOUTÉ ICI --- */}
        <ScrollReveal delay={0.4} className="mt-12 flex justify-center">
          <a
            href="/galerie-interactive"
            className="group relative inline-flex items-center gap-2 rounded-full bg-navy-deep px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-gold hover:text-navy-deep hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <span>voir plus</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
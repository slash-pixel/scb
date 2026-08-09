import ScrollReveal from "./ScrollReveal";

// Remplace ces chemins par les vraies photos de l'établissement
// (placées par exemple dans /public/galerie/).
const PHOTOS = [
  { src: "/galerie/campus-1.jpg", alt: "Cour principale du collège", grand: true },
  { src: "/galerie/classe-1.jpg", alt: "Évaluations" },
  { src: "/galerie/rassemblement.jpg", alt: "rassemblement" },
  { src: "/galerie/evenement-1.jpg", alt: "Événement extra-académique" },
  { src: "/galerie/chapelle.jpg", alt: "Chapelle du collège" },
  { src: "/galerie/excellence.jpg", alt: "excellence scolaire" },
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
      </div>
    </section>
  );
}

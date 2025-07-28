import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import Illustration from "../../assets/images/illustration.jpg";

// Votre composant principal
const FeaturesSections = () => {
  return (
    <>
      {/* Section "Pour qui ?" */}
      <section className="py-16 md:py-20 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-700">
              Pour qui est TerraOhada ?
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                  Professionnels du droit OHADA
                </h3>
                <p className="text-gray-700">
                  La plateforme s'adresse à tous les praticiens du droit en
                  Afrique francophone : avocats, juristes d'entreprise,
                  notaires, magistrats, greffiers, experts-comptables ou
                  fiscalistes.
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                  Étudiants en droit et en spécialisation OHADA
                </h3>
                <p className="text-gray-700">
                  Pensée comme un outil d'accompagnement, la solution offre aux
                  étudiants un accès simplifié aux textes juridiques,
                  jurisprudences et ressources essentielles.
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                  Enseignants-chercheurs et experts
                </h3>
                <p className="text-gray-700">
                  Les universitaires, doctorants et passionnés du droit OHADA
                  peuvent s'appuyer sur la plateforme pour enrichir leurs
                  travaux de recherche, préparer leurs cours ou partager des
                  références.
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                  Entreprises, institutions et ONG
                </h3>
                <p className="text-gray-700">
                  Dans un environnement où la sécurité juridique est cruciale,
                  notre solution permet aux organisations implantées dans les 17
                  États membres de mieux comprendre le cadre légal unifié.
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                  Cabinets de recrutement et structures RH
                </h3>
                <p className="text-gray-700">
                  À mesure que la plateforme évolue, elle intégrera des
                  fonctionnalités à forte valeur ajoutée pour les cabinets
                  spécialisés dans le recrutement juridique en Afrique.
                </p>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Section "Pourquoi TerraOhada ?" */}
      <section className="py-16 md:py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-700">
              Pourquoi choisir TerraOhada ?
            </h2>
          </AnimatedSection>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <AnimatedSection delay={0.2}>
              <motion.div className="md:w-2/3 lg:w-3/4 text-lg leading-relaxed space-y-4">
                <p>
                  TerraOhada, c'est bien plus qu'une base de données juridiques.
                  C'est un véritable écosystème conçu pour faciliter l'accès au
                  droit OHADA.
                </p>
                <ul className="list-none list-inside space-y-2 text-ohada-blue-for">
                  <motion.li whileHover={{ x: 5 }}>
                    Interface claire et moderne
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }}>
                    Gain de temps significatif
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }}>
                    Information fiable et continue
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }}>
                    Conçue en Afrique, pour l'Afrique
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }}>
                    Démarche collaborative
                  </motion.li>
                </ul>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="md:w-1/3 lg:w-3/4 flex justify-center md:justify-end"
              >
                <div className="bg-blue-200 rounded-full flex items-center justify-center text-blue-700 text-center p-4 overflow-hidden">
                  <img
                    src={Illustration}
                    alt="illustration"
                    className="rounded-full w-full h-auto"
                  />
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Section "Quelles fonctionnalités ?" */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-700">
              Fonctionnalités Clés de TerraOhada
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Recherche simplifiée de jurisprudence",
                desc: "Tapez un mot-clé, un pays, une juridiction ou un thème pour retrouver les décisions pertinentes.",
              },
              {
                title: "Espace personnel sécurisé",
                desc: "L'historique de vos recherches et enregistrer vos contenus favoris.",
              },
              {
                title: "Annuaire OHADA des professionnels",
                desc: "Boostez votre visibilité, crédibilité et réseau en rejoignant un annuaire dédié.",
              },
              {
                title: "Job board juridique",
                desc: "Accédez à des offres d'emploi, de stage ou de collaboration dans le domaine juridique.",
              },
              {
                title: "Quiz juridiques interactifs",
                desc: "Testez vos connaissances sur le droit OHADA grâce à des quiz ludiques.",
              },
            ].map((feature, index) => (
              <AnimatedSection key={index} delay={0.1 * (index + 1)}>
                <motion.div
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                  className="p-6 border border-gray-200 rounded-lg shadow-sm transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold mb-3 text-blue-600">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700">{feature.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesSections;

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  questions: FAQItem[];
}

const faqs: FAQCategory[] = [
  {
    "category": "À propos de Miscoch IT",
    "questions": [
      {
        "question": "Qu'est-ce que Miscoch IT ?",
        "answer": "Miscoch IT est une entreprise spécialisée dans le développement de solutions technologiques avancées, notamment en Blockchain, Intelligence Artificielle, UX/UI, DevOps, SEO, publicité en ligne, conseil en solutions informatiques, et développement d’applications web et mobiles. Nous accompagnons les entreprises africaines dans leur transformation digitale."
      },
      {
        "question": "Où est basée votre entreprise ?",
        "answer": "Nous sommes implantés au Gabon, avec une vision globale et un engagement local pour booster l’innovation technologique sur le continent."
      },
      {
        "question": "Pourquoi choisir Miscoch IT ?",
        "answer": "✅ Expertise technique de haut niveau\n✅ Approche sur-mesure pour chaque client\n✅ Respect des standards de sécurité et d’innovation\n✅ Expérience dans divers secteurs (finance, e-commerce, santé, etc.)\n✅ Solutions évolutives et optimisées pour l’Afrique"
      }
    ]
  },
  {
    "category": "Services proposés",
    "questions": [
      {
        "question": "Quels services proposez-vous ?",
        "answer": "Nous proposons des services en :\n🔹 Blockchain & Smart Contracts : Sécurisation des transactions, traçabilité, certification numérique.\n🔹 Intégration de l'IA : Automatisation, analyse de données, machine learning.\n🔹 UX/UI Design : Conception d’interfaces modernes et ergonomiques.\n🔹 DevOps & Cloud : Automatisation des déploiements, gestion de serveurs.\n🔹 SEO & Publicité en ligne : Référencement, campagnes marketing digitales.\n🔹 Développement Web & Mobile : Sites, applications, plateformes SaaS.\n🔹 Applications d’entreprise : ERP, CRM, outils collaboratifs."
      },
      {
        "question": "Travaillez-vous avec des startups et des PME ?",
        "answer": "Oui ! 🚀 Nous accompagnons aussi bien les startups que les grandes entreprises en adaptant nos solutions à leurs besoins spécifiques."
      }
    ]
  },
  {
    "category": "Tarification et devis",
    "questions": [
      {
        "question": "Comment sont fixés vos tarifs ?",
        "answer": "Nos tarifs dépendent de la complexité du projet, du temps de développement, et des technologies utilisées. Chaque devis est personnalisé."
      },
      {
        "question": "Proposez-vous des formules d’abonnement ?",
        "answer": "Oui ! Nous avons des forfaits de maintenance et d’optimisation continue pour garantir la pérennité de vos projets numériques."
      },
      {
        "question": "Comment obtenir un devis ?",
        "answer": "Vous pouvez nous contacter via 📩 Email : <a href='mailto:contact@miscoch-it.ga' target='_blank'>contact@miscoch-it.ga</a>\n📞 Téléphone : <a href='tel:+24162436087' target='_blank'>+24162436087</a>\n🌍 Site Web : <a href='https://www.miscoch-it.ga' target='_blank'>www.miscoch-it.ga</a> et nous répondrons sous 24 à 48 heures."
      }      
    ]
  },
  {
    "category": "Développement et intégration",
    "questions": [
      {
        "question": "Utilisez-vous des technologies spécifiques ?",
        "answer": "Oui, nous travaillons avec :\n🔹 Next.js / React.js pour le front-end\n🔹React Native, pour une interface web fluide et des applications mobiles natives exceptionnelles 🔹Node.js, Python, Laravel et Symfony pour le back-end\n🔹 Solidity pour les smart contracts\n🔹 Docker, Kubernetes, AWS, GCP pour l’infrastructure cloud, \n🔹Base de données : SQL & NoSQL, pour une gestion optimisée des données structurées et non structurées, \n🔹n8n pour l'automatisation des workflows, \n🔹Modèles de langage (LLM) pour des applications d'intelligence artificielle avancées"
      },
      {
        "question": "Puis-je suivre l’évolution de mon projet ?",
        "answer": "Absolument ! Nous utilisons une méthodologie Agile avec des sprints hebdomadaires et des démonstrations régulières."
      },
      {
        "question": "Intégrez-vous vos solutions avec des systèmes existants ?",
        "answer": "Oui, nous faisons de l’intégration API et des migrations pour assurer une compatibilité parfaite."
      }
    ]
  },
  {
    "category": "Support et maintenance",
    "questions": [
      {
        "question": "Offrez-vous un support après livraison ?",
        "answer": "Oui, nous proposons des contrats de maintenance pour assurer la sécurité, la mise à jour et l’évolution de votre solution."
      },
      {
        "question": "Quels sont vos délais d’intervention en cas de problème ?",
        "answer": "Selon l’urgence, nous garantissons une prise en charge en moins de 24 heures pour les incidents critiques."
      }
    ]
  },
  {
    "category": "Sécurité et confidentialité",
    "questions": [
      {
        "question": "Comment assurez-vous la sécurité des projets ?",
        "answer": "Nous appliquons :\n🔹 Chiffrement des données\n🔹 Tests de sécurité rigoureux\n🔹 Protection contre les cyberattaques (DDoS, injections SQL, etc.)\n🔹 Respect des normes RGPD et réglementations locales"
      },
      {
        "question": "Mes données sont-elles protégées ?",
        "answer": "Oui, nous garantissons la confidentialité et la sécurité de toutes les données traitées."
      }
    ]
  },
  {
    "category": "Engagement et délais",
    "questions": [
      {
        "question": "Quels sont vos délais moyens de réalisation ?",
        "answer": "Cela dépend du projet :\n✅ Site vitrine : 2 à 4 semaines\n✅ Application web/mobile : 2 à 6 mois\n✅ Solutions sur-mesure (IA, Blockchain, etc.) : à définir après étude"
      },
      {
        "question": "Que se passe-t-il si un projet prend du retard ?",
        "answer": "Nous avons une gestion proactive des risques et communiquons avec le client pour ajuster le planning en cas d’imprévu."
      }
    ]
  },
  {
    "category": "Autres questions générales",
    "questions": [
      {
        "question": "Travaillez-vous avec des entreprises hors d'Afrique ?",
        "answer": "Oui, nous avons des clients internationaux et nous adaptons à chaque marché."
      },
      {
        "question": "Proposez-vous des formations ?",
        "answer": "Oui, nous formons des équipes sur l’IA, le développement web, la cybersécurité et la blockchain."
      },
      {
        "question": "Comment puis-je contacter Miscoch IT ?",
        "answer": "📩 Email : contact@miscoch-it.ga\n📞 Téléphone : +24162436087\n🌍 Site Web : www.miscoch-it.ga"
      }
    ]
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFAQ = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-[#facc14] py-20">
      <h2 className=" text-center mb-6 text-md uppercase md:text-[20px]">Foire Aux Questions</h2>
      {faqs.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-[#ec3c28]">{section.category}</h3>
          {section.questions.map((faq, index) => {
            const isOpen = openIndex === `${sectionIndex}-${index}`;
            return (
              <div key={index} className="border-b border-gray-300 py-3 transition-all duration-300 transform hover:scale-105">
                <button
                  onClick={() => toggleFAQ(`${sectionIndex}-${index}`)}
                  className="flex justify-between text-white items-center w-full text-left text-lg font-medium transition-all duration-300 hover:text-[#ec3c28]"
                >
                  <span className="hover:tracking-wider">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#ec3c28]" : "text-[#ec3c28]"}`} />
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, transform: "scaleY(0)" }}
                    animate={{ opacity: 1, height: "auto", transform: "scaleY(1)" }}
                    exit={{ opacity: 0, height: 0, transform: "scaleY(0)" }}
                    className="mt-2 text-md text-white"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

import { useState, useRef, MouseEventHandler, ReactNode } from "react";
import { TiLocationArrow } from "react-icons/ti";
import ButtonCta from "./ButtonCta";

interface BentoTiltProps {
  children: ReactNode;
  className?: string;
}

export const BentoTilt = ({ children, className = "" }: BentoTiltProps) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef<HTMLDivElement | null>(null);


  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  src: string;
  title: ReactNode;
  description?: string;
  isComingSoon: boolean;
}

export const BentoCard = ({ src, title, description, isComingSoon }: BentoCardProps) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        {/* Voile semi-transparent */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-blue-900/80 opacity-50"></div>
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-blue-90 px-5 py-2 text-xs uppercase text-[#a0eea7]"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">voir plus</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-gradient pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="text-lg text-blue-50">
            L&#39;excellence à votre service pour booster votre succès
        </p>
        <p className="max-w-md text-lg text-[#facc14] opacity-50 pb-8">
          Nous ne sommes pas juste une agence de développement web : nous sommes vos partenaires stratégiques en transformation digitale. En combinant expertise technique et immersion dans votre secteur d&#39;activité, nous créons des solutions digitales sur-mesure qui boostent votre productivité, réduisent vos coûts et optimisent l&#39;expérience client. Nos équipes sont à la pointe des dernières technologies (Next.js, IA, automatisation...) pour garantir des plateformes performantes et évolutives adaptées aux défis de votre marché.        
        </p>
        <ButtonCta 
          title="Contactez-nous" 
          containerClass="mt-10 cursor-pointer" 
        />
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh] ">
        
        <BentoCard
          src="videos/design.mp4"
          title={
            <>
              desi<b>g</b>n&nbsp;&&nbsp;d<b>e</b>v
            </>
          }
          description="Nous combinons des designs élégants et une technologie de pointe pour offrir des solutions numériques qui ne sont pas seulement visuellement attrayantes mais aussi fonctionnelles et intuitives. Chaque projet que nous réalisons est conçu pour offrir une expérience utilisateur exceptionnelle tout en répondant à vos objectifs business."
          isComingSoon
        />
        
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/seo.mp4"
            title={
              <>
                a<b>d</b>s
              </>
            }
            description="Nous concevons des campagnes publicitaires adaptées à vos besoins et à votre marché. Que ce soit via le SEO, les réseaux sociaux ou la publicité payante, nous vous offrons des solutions personnalisées pour augmenter votre visibilité et générer des résultats concrets."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
        {/* Voile semi-transparent */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>
          <BentoCard
            src="videos/ia.mp4"
            title={
              <>
                auto<b>mati</b>sation
              </>
            }
            description="Grâce à l'automatisation et à l'intelligence artificielle, nous vous aidons à optimiser vos processus métiers, réduire les coûts et améliorer la productivité. Laissez l'IA s'occuper des tâches répétitives pour que vous puissiez vous concentrer sur des activités à plus forte valeur ajoutée."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/audit.mp4"
            title={
              <>
                con<b>se</b>il
              </>
            }
            description="La sécurité des données est primordiale. Nous vous aidons à mettre en place des systèmes de protection informatique robustes pour assurer la confidentialité et l'intégrité de vos informations."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between p-5 bg-[#facc14] rounded-lg shadow-[4px_4px_8px_#b6bbd0, -4px_-4px_8px_#ffffff]">
                <h1 className="bento-title-2 max-w-64 text-black">
                EN<b></b> Sa<b>vo</b>ir p<b>lu</b>s.
                </h1>

                <TiLocationArrow className="m-5 scale-[5] self-end text-black" />
            </div>
        </BentoTilt>


        <BentoTilt className="bento-tilt_2">
          <video
            src="videos/security.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;

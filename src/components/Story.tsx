import gsap from "gsap";
import { useRef, MouseEvent } from "react";
import Image from "next/image"; // Importation du composant Image de Next.js

import AnimatedTitle from "./AnimatedTitle";
import ButtonCta from "./ButtonCta";

// Le type pour la référence de l'image est HTMLDivElement (car Image ne prend pas directement de ref)
const FloatingImage = () => {
  const frameRef = useRef<HTMLDivElement | null>(null); // Utilisation d'un conteneur div pour gérer la ref

  // Fonction pour gérer le mouvement de la souris
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  // Fonction pour réinitialiser la rotation lorsque la souris quitte l'image
  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <div id="story" className="min-h-dvh w-screen bg-gradient text-[#facc14] -mt-20">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="text-md uppercase md:text-[20px]">
            Le futur, c’est maintenant.
        </p>

        <div className="relative size-full lg:mt-10">
          <AnimatedTitle
            title="passons à&nbsp;la&nbsp;vitesse&nbsp;supérieur."
            containerClass="mx-auto pointer-events-none mix-blend-difference z-10 w-1/2 special-font !font-black !leading-[.9] text-center"
          />


          <div className="story-img-container mt-6 opacity-75">
            <div className="story-img-mask">
              <div className="story-img-content" ref={frameRef}>
                {/* Utilisation de Image de Next.js */}
                <Image
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src="/img/coding.jpg"
                  alt="entrance.webp"
                  className="object-contain"
                  width={1280} // Remplacez par la taille réelle de votre image
                  height={853} // Remplacez par la taille réelle de votre image
                />
              </div>
            </div>

            {/* Pour les coins arrondis */}
            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:me-40 md:justify-end">
          <div className="flex  h-full w-[80%] flex-col items-center md:items-start">
            <p className=" max-w-sm text-center bg-gradient-to-r from-blue-900 via-[#14A741] to-blue-900 text-justify text-violet-50 md:text-start p-4">
                Ne laissez pas la technologie vous dépasser ! 
                Nous révolutionnons votre entreprise en intégrant les solutions digitales 
                les plus performantes pour optimiser votre productivité
                et offrir une expérience client inégalée.
            </p>

            <ButtonCta
              id="realm-btn"
              title="Prendre rendez-nous"
              containerClass="mt-5 ml-4 justify-center md:justify-start"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;


import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

type AnimatedTitleProps = {
  title: string;
  containerClass?: string;
  className?: string;
};

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ title, containerClass, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;
      
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      // Animation qui fait apparaître le texte du bas vers le haut, sans sortir de la vue
      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,
          transform: "translateY(0)", // Faire remonter à la position d'origine
          ease: "power2.inOut",
          stagger: 0.02,
        },
        0
      );
      
    }, containerRef);

    return () => ctx.revert(); // Nettoyage lors du démontage
  }, []);

  return (
    <div ref={containerRef} className={clsx("animated-title", containerClass, className)}>
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-2 md:w-1/4"
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
              style={{ opacity: 0, transform: "translateZ(10px)" }} // Début avec un léger décalage vers le bas
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;

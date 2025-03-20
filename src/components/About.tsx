import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { FC } from "react";
import Image from "next/image";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About: FC = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  }, []);

  return (
    <div id="about" className="min-h-screen w-screen lg:mt-10">
      <div className="relative mb-8 lg:mt-34 mt-10 flex flex-col items-center gap-5 text-[#facc14]">
        <p className="text-sm uppercase md:text-[20px]">
          Bienvenue chez Miscoch It
        </p>

        <AnimatedTitle
          title="Des&nbsp;services&nbsp;adaptés<br>&nbsp;vos&nbsp;ambitions."
          containerClass="mx-auto items-center pointer-events-none mix-blend-difference z-10 w-1/2 text-center special-font !font-black !leading-[.9]"
        />


        <div className="about-subtext">
          <p>Construisons des solutions durables, inspirées par l&#39;Afrique.</p>
          <p className="text-gray-500">
            Créons, innovons, excellons en ligne – ensemble.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path lg:mt-10 about-image md:w-1/2 ">
          <Image
            src="/img/image-5.webp"
            alt="Background"
            fill
            className="absolute left-0 top-0 object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default About;

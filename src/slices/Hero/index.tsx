"use client";
import { useEffect, useRef, useState } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { Shapes } from "@/slices/Hero/Shapes";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import VideoPreview from "../../components/VideoPreview";
import About from "@/components/About";
import Features from "@/components/Features";
import Story from "@/components/Story";
import Contact from "@/components/Contact";
import Partner from "@/components/Partner";
import  FaQ  from "@/components/Faq";



/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

gsap.registerPlugin(ScrollTrigger);


/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {

  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadedVideos, setLoadedVideos] = useState<number>(0);
  const component = useRef(null);

  const totalVideos = 5;

const nextVdRef = useRef<HTMLVideoElement>(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  useGSAP(() => {
    if (hasClicked) {
      gsap.set("#next-video", { visibility: "visible" });
      gsap.to("#next-video", {
        transformOrigin: "center center",
        scale: 1,
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power1.inOut",
        onStart: () => {
          if (nextVdRef.current) {
            const playPromise = nextVdRef.current.play();
            if (playPromise !== undefined) {
              playPromise.catch((error) =>
                console.error("Erreur lors de la lecture de la vidéo:", error)
              );
            }
          }
        },
      });
      gsap.from("#current-video", {
        transformOrigin: "center center",
        scale: 0,
        duration: 1.5,
        ease: "power1.inOut",
      });
    }
  }, {
    dependencies: [currentIndex],
    revertOnUpdate: true,
  });

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index: number): string => `videos/video-${index}.mp4`;

  useEffect(() => {
    let ctx = gsap.context(() => {
      // create as many GSAP animations and/or ScrollTriggers here as you want...
      gsap
        .timeline()
        .fromTo(
          ".name-animation",
          { x: -100, opacity: 0, rotate: -10 },
          {
            x: 0,
            opacity: 1,
            rotate: 0,

            ease: "elastic.out(1,0.3)",
            duration: 1,
            transformOrigin: "bottom top",
            delay:0.6,
            stagger: { each: 0.1, from: "random" },
          },
        )
        .fromTo(
          ".job-title",
          {
            y: 20,
            opacity: 0,
            scale: 1.2,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scale: 1,
            ease: "elastic.out(1,0.3)",
          },
        );
    }, component);
    return () => ctx.revert(); // cleanup!
  }, []);
  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key}-index inline-block opacity-0 transition-all duration-300`}
        style={{
          color: index % 2 === 0 ? "#B22222" : "#8B0000", // Alternance or et argent
          textShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", // Ombre portée pour effet 3D
        }}
      >
        {letter}
      </span>
    ));
  };
  
  return (
  <div> 
  <div
    id="video-frame"
    className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
  >
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      {/* Conteneur vidéo */}
      <div>
        <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
          <VideoPreview>
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVdRef}
                src={getVideoSrc((currentIndex % totalVideos) + 1)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </VideoPreview>
        </div>

        <video
          ref={nextVdRef}
          src={getVideoSrc(currentIndex)}
          loop
          muted
          id="next-video"
          className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          onLoadedData={handleVideoLoad}
        />
        <video
          src={getVideoSrc(
            currentIndex === totalVideos - 1 ? 1 : currentIndex
          )}
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 size-full object-cover object-center"
          onLoadedData={handleVideoLoad}
        />
      </div>
    
      <div className="relative top-0 left-0 w-full h-full bg-blue-500/50 z-30 pointer-events-none"></div>
      {/* ✅ Ajout de l'overlay toujours visible */}
      <div className="relative top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
        <div className="relative z-50 grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
          <Shapes />
          <div className="col-start-1 md:row-start-1 pl-4">
            <h1 className="mb-8 text-[clamp(3rem,18vmin,20rem)] font-extrabold leading-none tracking-tighter"
                aria-label={
                  slice.primary.company_name + " " + slice.primary.second_company_name
                }
            >
                <span className="text-red-500">{renderLetters(slice.primary.company_name, "first")}</span>
                <span className="-mt-[.2em] block text-[#a0eea7] ">{renderLetters(slice.primary.second_company_name, "last")}</span>
            </h1>
            <span className="job-title block bg-gradient-to-r from-blue-900 via-[#14A741] to-blue-900 bg-clip-text text-3xl font-bold uppercase tracking-widest text-transparent opacity-0 md:text-5xl hover:text-[#ffd700] transition-all duration-300">
            {slice.primary.tag_line}
            </span>
          </div>
        </div>
      </div>
    </Bounded>

    

  </div>
    <About />
    <Features />
    <Story />
    <Partner />
    <FaQ />
    <div className="pt-16 lg:pt-2">
      <Contact />
    </div>


  </div>
  );
};

export default Hero;

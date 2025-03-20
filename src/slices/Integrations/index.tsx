"use client";
import { FC, useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import Bounded from "@/components/Bounded";
import StylizedLogoMark from "./StylizedLogoMark";

import {
  FaNpm,
  FaGithub,
  FaFigma,
  FaDocker,
  FaCloudflare,
  FaDigitalOcean,
} from "react-icons/fa6";
import React from "react";
import Heading from "@/components/Heading";
import AnimatedTitle from "@/components/AnimatedTitle";
import ButtonCta from "@/components/ButtonCta";
import Contact from "@/components/Contact";

// Définir les icônes
const icons: Record<string, JSX.Element> = {
  digitalocean: <FaDigitalOcean />,
  cloudflare: <FaCloudflare />,
  npm: <FaNpm />,
  github: <FaGithub />,
  figma: <FaFigma />,
  docker: <FaDocker />,
};

type ImageClipBoxProps = {
  src: string;
  clipClass?: string;
};

const ImageClipBox: React.FC<ImageClipBoxProps> = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} alt="Image" />
  </div>
);

export type IntegrationsProps = SliceComponentProps<Content.IntegrationsSlice>;

const Integrations: FC<IntegrationsProps> = ({ slice }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut" } });

    tl.to(".pulsing-logo", {
      keyframes: [
        { filter: "brightness(2)", opacity: 1, duration: 0.4, ease: "power2.in" },
        { filter: "brightness(1)", opacity: 0.7, duration: 0.9 },
      ],
    });

    tl.to(
      ".signal-line",
      {
        keyframes: [
          { backgroundPosition: "0% 0%" },
          { backgroundPosition: "100% 100%", stagger: { from: "center", each: 0.3 }, duration: 1 },
        ],
      },
      "-=1.4"
    );

    tl.to(
      ".pulsing-icon",
      {
        keyframes: [
          { opacity: 1, duration: 1, stagger: { from: "center", each: 0.3 } },
          { opacity: 0.4, duration: 1, stagger: { from: "center", each: 0.3 } },
        ],
      },
      "-=2"
    );
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (

    <div>
      <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="relative overflow-hidden flex flex-col items-center justify-center text-center px-4 md:px-8">
      <div className="relative flex flex-col items-center justify-center">
        <Heading as="h2">
          <PrismicRichText field={slice.primary.heading} />
        </Heading>

        <div className="mx-auto mt-6 max-w-md text-center text-gray-300">
          <PrismicRichText field={slice.primary.body} />
        </div>

        <div className="mt-20 flex flex-col justify-center items-center md:flex-row">
          {slice.primary.content.map((item, index) => (
            <React.Fragment key={index}>
              {index === Math.floor(slice.primary.content.length / 2) && (
                <>
                  <StylizedLogoMark />
                  <div className="signal-line rotate-180 hidden md:block"></div>
                </>
              )}
              <div className="pulsing-icon flex md:flex-col aspect-square shrink-0 items-center justify-center rounded-full border border-violet-50/30 bg-violet-50/25 p-3 text-5xl text-violet-100 opacity-40 md:text-3xl lg:text-5xl">
                {item.icon && icons[item.icon]}
              </div>
              {index !== slice.primary.content.length - 1 && (
                <div className={clsx("signal-line", "md:flex-row ", index >= Math.floor(slice.primary.content.length / 2) ? "rotate-180" : "rotate-0")} ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      
    </Bounded>

    <div >
      <br />
      <br />
      <br />
      <Contact />
    </div>
    </div>

  );
};

export default Integrations;
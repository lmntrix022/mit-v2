"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import clsx from "clsx";
import { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { formatDate } from "@/utils/formatDate";

export default function ContentBody({
  page,
}: {
  page: Content.ServicesDetailsDocument | Content.PortfolioDocument | Content.BlogDocument;
}) {
  const formattedDate = formatDate(page.data.date);
  const hoverImage = page.data.hover_image?.url ?? '';
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".animated-image",
        {
          opacity: 0,
          scale: 1.2,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.3,
          ease: "power3.inOut",
        },
      );
    }, component);
    return () => ctx.revert(); // cleanup!
  }, []);

  return (
    <Bounded as="article">
      <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
        <Heading as="h1">{page.data.title}</Heading>
        <div className="flex gap-4 text-[#343634] mt-8 font-bold">
          {page.tags.map((tag, index) => (
            <span key={index} className="text-xl h-full rounded bg-[#a0eea7] transition-transform duration-300 ease-in-out group-hover:translate-y-0 p-1">
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-8 border-b border-slate-600 text-xl font-medium text-slate-300">
          {formattedDate}
        </p>
        <div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20 text-justify text-white flex gap-2 md:gap-10">
          <SliceZone slices={page.data.slices} components={components}/>
             
          <div
            ref={component}
            className={clsx("relative h-full w-full")}
          >
            <div
              className="animated-image aspect-square overflow-hidden rounded-3xl border-2 border-gray-400 opacity-0"
              style={{ perspective: "500px", perspectiveOrigin: "150% 150%" }}
            >
              {/* Supprimez la classe "animated-image" de l'élément Image */}
              <Image
                src={hoverImage}
                alt="Hover Image"
                width={500}
                height={300}
                className="h-full w-full object-cover" // Retirez la classe "animated-image"
                priority
              />
              <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 md:block"></div>
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
}

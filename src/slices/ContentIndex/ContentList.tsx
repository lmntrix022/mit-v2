"use client";

import React, { useRef, useState, useEffect } from "react";
import { asImageSrc, isFilled } from "@prismicio/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward } from "react-icons/md";
import { Content } from "@prismicio/client";
import AnimatedTitle from "@/components/AnimatedTitle";
import ButtonCta from "@/components/ButtonCta";
import { FaLocationArrow } from "react-icons/fa6";
import { PinContainer } from "@/components/ui/Pin";

gsap.registerPlugin(ScrollTrigger);

type ContentListProps = {
  items: Content.ServicesDetailsDocument[] | Content.PortfolioDocument[] | Content.BlogDocument[];
  contentType: string;
  fallbackItemImage: any;
  viewMoreText: string;
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

export default function ContentList({
  items,
  contentType,
  fallbackItemImage,
  viewMoreText = "Read More",
}: ContentListProps) {
  const component = useRef(null);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);

  const revealRef = useRef(null);
  const [currentItem, setCurrentItem] = useState<null | number>(null);
  const [hovering, setHovering] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const [isClient, setIsClient] = useState(false); // Add this state to check if we're on the client

  useEffect(() => {
    setIsClient(true); // Update the state after component mount
  }, []);

  const urlPrefix = contentType === "Services" ? "/services" : 
                    contentType === "Portfolio" ? "/portfolio" : "/blog";

  useEffect(() => {
    let ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: "elastic.out(1,0.3)",
            stagger: 0.2,
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=100px",
              end: "bottom center",
              toggleActions: "play none none none",
            },
          }
        );
      });

      return () => ctx.revert();
    }, component);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mousePos = { x: e.clientX, y: e.clientY + window.scrollY };
      const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2));

      let ctx = gsap.context(() => {
        if (currentItem !== null) {
          const maxY = window.scrollY + window.innerHeight - 350;
          const maxX = window.innerWidth - 250;

          gsap.to(revealRef.current, {
            x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
            y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
            rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1),
            ease: "back.out(2)",
            duration: 1.3,
          });
          gsap.to(revealRef.current, {
            opacity: hovering ? 1 : 0,
            visibility: "visible",
            ease: "power3.out",
            duration: 0.4,
          });
        }
        lastMousePos.current = mousePos;
        return () => ctx.revert();
      }, component);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hovering, currentItem]);

  const onMouseEnter = (index: number) => {
    setCurrentItem(index);
    if (!hovering) setHovering(true);
  };

  const onMouseLeave = () => {
    setHovering(false);
    setCurrentItem(null);
  };

  const contentImages = items.map((item) => {
    const image = isFilled.image(item.data.hover_image)
      ? item.data.hover_image
      : fallbackItemImage;
    return asImageSrc(image, {
      fit: "crop",
      w: 220,
      h: 320,
      exp: -10,
    });
  });

  useEffect(() => {
    if (contentImages.length > 0) {
      contentImages.forEach((url) => {
        if (url) {
          const img = new Image();
          img.src = url;
        }
      });
    }
  }, [contentImages]);

  if (!isClient) {
    return null; // Return null until the client-side rendering has finished
  }

  return (
    <>
      <ul
        ref={component}
        className="grid border-b border-b-slate-100"
        onMouseLeave={onMouseLeave}
      >
        <div
          className="hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[220px] w-[220px] rounded-full bg-cover bg-center opacity-0 transition-[background] duration-300"
          style={{
            backgroundImage:
              currentItem !== null ? `url(${contentImages[currentItem]})` : "",
          }}
          ref={revealRef}
        ></div>
      </ul>

      <div className="py-20">
        <h1 className="heading">
          Découvrez notre expertise et nos réalisations.
        </h1>
        <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
          {items.map((item, index) => (
            <a
              href={`${urlPrefix}/${item.uid}`}
              className="flex flex-col justify-between border-t border-t-slate-100 py-10  text-slate-200 md:flex-row "
              aria-label={item.data.title || ""}
              key={index}
            >
              <div className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]">
                <PinContainer title={item?.data?.title || ""} href={item?.data?.meta_title || "#"}>
                  <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                    <div
                      className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                      style={{ backgroundColor: "#13162D" }}
                    >
                      <img src="/bg.png" alt="background" />
                    </div>
                    <img
                      src={item?.data.hover_image.url || fallbackItemImage}
                      alt="cover"
                      className="z-10 absolute bottom-0"
                    />
                  </div>

                  <h1 className="font-bold text-[#ef4444] lg:text-2xl md:text-xl text-base line-clamp-1">
                    {item?.data?.title}
                  </h1>
                  <div className="flex gap-3 text-yellow-400">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="text-lg font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p
                    className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                    style={{
                      color: "#BEC1DD",
                      margin: "1vh 0",
                    }}
                  >
                    {item?.data?.meta_description}
                  </p>

                  <div className="flex items-center justify-between mt-7 mb-3">
                    <div className="flex items-center"></div>

                    <div className="flex justify-center items-center">
                      <p className="flex lg:text-xl md:text-xs text-[#a0eea7] text-sm ">
                        {viewMoreText}
                      </p>
                      <FaLocationArrow className="ms-3" color="#b0d5f8" />
                    </div>
                  </div>
                </PinContainer>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div id="contact" className="my-20 min-h-96 flex justify-center">
        <div className="relative rounded-lg bg-gradient-to-b from-[#4778eb8] to-[#a0eea1] py-24 text-blue-50 sm:overflow-hidden w-2/4 ">
          <div className="absolute top-0 hidden h-full w-72 overflow-hidden sm:block lg:w-96">
            <ImageClipBox
              src="/img/geekgirl2.webp"
              clipClass="contact-clip-path-1"
            />
            <ImageClipBox
              src="/img/contact-2.webp"
              clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
            />
          </div>

          <div className="absolute hidden sm:block -top-40 left-20 w-60 sm:top-3/4 md:left-auto md:right-10 lg:top-20 lg:w-80">
            <ImageClipBox
              src="/img/geekgirl.jpg"
              clipClass="sword-man-clip-path md:scale-125"
            />
          </div>

          <div className="flex flex-col items-center text-center text-white">
            <p className="mb-10 text-[10px] uppercase">Miscoch IT</p>

            <AnimatedTitle
              title="Réinventons&nbsp;<br>l&#39;Afrique,<br /> un&nbsp;pixel<br />a&nbsp;la&nbsp;fois."
              className="special-font !md:text-[6.2rem] w-full special-font !text-5xl !font-black !leading-[.9]"
            />

            <ButtonCta title="contacter nous" containerClass="mt-10 cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
}

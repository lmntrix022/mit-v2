import { gsap } from "gsap";
import { useState, useRef, useEffect, MouseEvent } from "react";

interface VideoPreviewProps {
  children: React.ReactNode;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ children }) => {
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationFrame = useRef<number | null>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current || !contentRef.current) return;

    const { clientX, clientY, currentTarget } = event;
    const rect = currentTarget.getBoundingClientRect();
    const xOffset = clientX - (rect.left + rect.width / 2);
    const yOffset = clientY - (rect.top + rect.height / 2);

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    animationFrame.current = requestAnimationFrame(() => {
      gsap.to(sectionRef.current, {
        x: xOffset * 0.2,
        y: yOffset * 0.2,
        rotationY: xOffset / 20,
        rotationX: -yOffset / 20,
        transformPerspective: 800,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(contentRef.current, {
        x: -xOffset * 0.1,
        y: -yOffset * 0.1,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  };

  useEffect(() => {
    if (!isHovering && sectionRef.current && contentRef.current) {
      gsap.to([sectionRef.current, contentRef.current], {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }, [isHovering]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative z-0 size-full overflow-hidden rounded-lg"
      style={{ perspective: "800px" }}
    >
      <div
        ref={contentRef}
        className="origin-center rounded-lg"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </section>
  );
};

export default VideoPreview;

import AnimatedTitle from "./AnimatedTitle";
import ButtonCta from "./ButtonCta";

interface ImageClipBoxProps {
  src: string;
  clipClass?: string;
}

const ImageClipBox: React.FC<ImageClipBoxProps> = ({ src, clipClass = "" }) => (
  <div className={clipClass}>
    <img src={src} alt="Decorative" />
  </div>
);

const Contact: React.FC = () => {
  return (
    <div id="contact" className="my-20 min-h-80 flex justify-center">
        <div className="relative rounded-lg bg-gradient-to-b from-[#4778eb8] to-[#a0eea1] py-24 text-blue-50 sm:overflow-hidden w-[800px] ">
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
  );
};

export default Contact;

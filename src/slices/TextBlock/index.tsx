import ButtonCta from "@/components/ButtonCta";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock = ({ slice }: TextBlockProps): JSX.Element => {
  return (
    <div className="max-w-prose">
      {/* Affichage du titre */}
    <div className="pb-8 text-[#d9eeda]">
        {slice.primary.title && <h2 className="text-2xl font-bold">{slice.primary.title}</h2>}
      </div>

      {/* Affichage du contenu principal */}
      {slice.primary.text && <PrismicRichText field={slice.primary.text} />}
      <br />
      {/* Bouton avec lien dynamique */}
      {slice.primary.cta && (
        
        <ButtonCta 
          title={slice.primary.cta} 
          containerClass="mt-10 cursor-pointer" 
        />
      )}
    </div>
  );
};

export default TextBlock;

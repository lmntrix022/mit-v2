import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FaqBlock`.
 */
export type FaqBlockProps = SliceComponentProps<Content.FaqBlockSlice>;

/**
 * Component for "FaqBlock" Slices.
 */
const FaqBlock: FC<FaqBlockProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for faq_block (variation: {slice.variation}) Slices
    </section>
  );
};

export default FaqBlock;

import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import ContentList from "./ContentList";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
/**
 * Props for `BlogPostIndex`.
 */
export type BlogPostIndexProps =
  SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "BlogPostIndex" Slices.
 */
const ContentIndex = async ({
  slice,
}: BlogPostIndexProps): Promise<JSX.Element> => {
  const client = createClient();
  const services = await client.getAllByType("services_details");
  const portfolio = await client.getAllByType("portfolio");
  const blog = await client.getAllByType("blog");

  const items = slice.primary.content_type === "Services" ? services : 
  slice.primary.content_type === "Portfolio" ? portfolio : 
  slice.primary.content_type === "Blog" ? blog : [];

  const contentType = slice.primary.content_type ? slice.primary.content_type : "DefaultContentType";

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading size="xl" className="mb-8">
        {slice.primary.heading}
      </Heading>
      {isFilled.richText(slice.primary.description) && (
        <div className="prose prose-xl prose-invert mb-10 text-[#b0d5f8] text-xl font-bold">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}
      <ContentList
        items={items}
        contentType={contentType}  // Using the variable with the default value
        viewMoreText={slice.primary.view_more_text ? slice.primary.view_more_text : "Default Text"}
        fallbackItemImage={slice.primary.fallback_item_image}
      />
    </Bounded>
  );
};

export default ContentIndex;

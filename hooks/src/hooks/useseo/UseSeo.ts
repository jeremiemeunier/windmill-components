import { useEffect } from "react";
import { SeoProps } from "./UseSeo.types";

const useSeo = ({
  title,
  description,
  keywords,
  color,
  type,
  image,
}: SeoProps) => {
  useEffect(() => {
    const meta = {
      title: document.querySelectorAll("meta[data-seo-title]"),
      image: document.querySelectorAll("meta[data-seo-image]"),
      description: document.querySelectorAll("meta[data-seo-description]"),
      color: document.querySelectorAll("meta[data-seo-theme]"),
    };

    // making title
    if (title) document.title = title;

    // making theme
    if (color) {
      for (let i = 0; i < meta.color.length; i++) {
        meta.color[i].setAttribute("content", color);
      }
    }

    // making description
    if (description) {
      for (let i = 0; i < meta.description.length; i++) {
        meta.description[i].setAttribute("content", description);
      }
    }

    // making image
    if (image) {
      for (let i = 0; i < meta.image.length; i++) {
        meta.image[i].setAttribute("content", image);
      }
    }
  }, [title, description, keywords, color, type, image]);
};

export default useSeo;

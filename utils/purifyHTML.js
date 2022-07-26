import DOMPurify from "isomorphic-dompurify";

export const purifyHTML = (htmlString) => {
  const cleanHtmlString = DOMPurify.sanitize(htmlString, {
    USE_PROFILES: { html: true },
    ADD_TAGS: ["iframe", "embed", "img", "script"],
  });
  return cleanHtmlString;
};

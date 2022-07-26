import { gql } from "@apollo/client";
import { client } from "../lib/apollo";

export const getTaxonomy = async (type, slug) => {
  const tag = await client.query({
    query: gql`
      query GET_TAG_OR_CATEGORY($slug: ID!) {
        ${type}(id: $slug, idType: SLUG,) {
          name
          seo{ 
            title
            metaDesc
            opengraphDescription
            opengraphType
            opengraphTitle
            focuskw
            metaKeywords
            opengraphImage {
              mediaItemUrl
            }
            opengraphSiteName
            opengraphImage {
              mediaItemUrl
            }
            metaKeywords
          }
          music(first: 30) {
            nodes {
              slug
              title
              modified
              postType {
                type
              }
              featuredImage {
                node {
                  mediaItemUrl
                  altText
                }
              }
            }
          }
          posts(first: 30) {
            nodes {
              slug
              title
              modified
              postType {
                type
              }
              featuredImage {
                node {
                  mediaItemUrl
                  altText
                }
              }
            }
          }
        }
      }
    `,
    variables: { slug },
    fetchPolicy: "no-cache",
  });

  return tag.data[`${type}`];
};

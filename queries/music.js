import { gql } from "@apollo/client";
import { client } from "../lib/apollo";

export const getAllMusic = async (size, offset, search) => {
  const result = await client.query({
    query: gql`
      query GET_PAGINATED_POSTS($size: Int, $offset: Int, $search: String) {
        allMusic(
          where: {
            search: $search
            offsetPagination: { size: $size, offset: $offset }
          }
        ) {
          edges {
            node {
              excerpt
              title
              slug
              date
              postType {
                type
              }
              featuredImage {
                node {
                  mediaItemUrl
                  title
                  altText
                }
              }
            }
          }
          pageInfo {
            offsetPagination {
              total
              hasPrevious
              hasMore
            }
          }
        }
      }
    `,
    variables: { size, offset, search },
    fetchPolicy: "no-cache",
  });

  return result.data.allMusic;
};

export const getMusicGenres = async () => {
  const result = await client.query({
    query: gql`
      query getGenres {
        categories {
          nodes {
            name
            slug
          }
        }
      }
    `,
    fetchPolicy: "no-cache",
  });

  return result.data.categories.nodes;
};

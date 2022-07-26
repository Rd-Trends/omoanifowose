import { gql } from "@apollo/client";
import { client } from "../lib/apollo";

export const getNews = async (size, offset, search) => {
  const post = await client.query({
    query: gql`
      query GET_PAGINATED_POSTS($size: Int, $offset: Int, $search: String) {
        posts(
          where: {
            search: $search
            offsetPagination: { size: $size, offset: $offset }
          }
        ) {
          pageInfo {
            offsetPagination {
              total
              hasPrevious
              hasMore
            }
          }
          edges {
            cursor
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
              seo {
                readingTime
              }
            }
          }
        }
      }
    `,
    variables: { size, offset, search },
    fetchPolicy: "no-cache",
  });

  return post.data.posts;
};

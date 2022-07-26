import { gql } from "@apollo/client";
import { client } from "../lib/apollo";

export const getQuotes = async (size, offset) => {
  const quotes = await client.query({
    query: gql`
      query GET_PAGINATED_QUOTES($size: Int, $offset: Int) {
        quotes(where: { offsetPagination: { size: $size, offset: $offset } }) {
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
              image {
                quoteImage {
                  mediaItemUrl
                  title
                  altText
                }
              }
            }
          }
        }
      }
    `,
    variables: { size, offset },
    fetchPolicy: "no-cache",
  });

  return quotes.data.quotes;
};

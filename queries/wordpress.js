import { gql } from "@apollo/client";
import { client } from "../lib/apollo";

export const getPosts = async () => {
  const result = await client.query({
    query: gql`
      query getMusicAndPostsAndQuotes {
        posts(first: 8, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            title
            slug
            date
            excerpt
            postType {
              type
            }
            seo {
              readingTime
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
        allMusic(first: 8, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
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
        quotes(first: 8, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
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
    `,
    fetchPolicy: "no-cache",
  });

  return {
    recentNews: result.data.posts.nodes,
    recentMusic: result.data.allMusic.nodes,
    recentQuotes: result.data.quotes.nodes,
  };
};

export const getPost = async (type, slug) => {
  switch (type) {
    case "post":
      const post = await client.query({
        query: gql`
          query getPostBySlug($slug: String) {
            postBy(slug: $slug) {
              content
              date
              id
              modified
              title
              postId
              commentCount
              tags {
                nodes {
                  name
                  tagId
                }
              }
              comments {
                nodes {
                  content
                  author {
                    node {
                      name
                    }
                  }
                  date
                  commentedOn {
                    node {
                      date
                    }
                  }
                }
              }
              excerpt(format: RAW)
              featuredImage {
                node {
                  sizes
                  altText
                  mediaDetails {
                    height
                    width
                  }
                  mediaItemUrl
                }
              }
              date
              categories {
                nodes {
                  uri
                  name
                }
              }
              tags {
                nodes {
                  name
                  uri
                }
              }
              seo {
                title
                metaDesc
                metaKeywords
                focuskw
                readingTime
                opengraphAuthor
                opengraphDescription
                opengraphType
                opengraphModifiedTime
                opengraphPublishedTime
                opengraphPublisher
                opengraphTitle
                opengraphImage {
                  mediaItemUrl
                }
                opengraphSiteName
                opengraphImage {
                  mediaItemUrl
                }
              }
            }
          }
        `,
        variables: { slug },
        fetchPolicy: "no-cache",
      });

      return post.data.postBy;
      break;

    case "music":
      const music = await client.query({
        query: gql`
          query getPostBySlug($slug: String) {
            musicBy(slug: $slug) {
              content
              date
              id
              modified
              title
              musicId
              postType {
                type
              }
              commentCount
              comments {
                nodes {
                  content
                  author {
                    node {
                      name
                    }
                  }
                  date
                  commentedOn {
                    node {
                      date
                    }
                  }
                }
              }
              artistName {
                artist
              }
              releaseDate {
                releasedate
              }
              runTime {
                runtime
              }
              categories {
                nodes {
                  uri
                  name
                }
              }
              tags {
                nodes {
                  name
                  uri
                }
              }
              excerpt(format: RAW)
              featuredImage {
                node {
                  sizes
                  altText
                  mediaDetails {
                    height
                    width
                  }
                  mediaItemUrl
                }
              }
              seo {
                title
                metaDesc
                opengraphDescription
                opengraphType
                opengraphTitle
                opengraphImage {
                  mediaItemUrl
                }
                opengraphSiteName
                opengraphImage {
                  mediaItemUrl
                }
                metaKeywords
              }
            }
          }
        `,
        variables: { slug },
        fetchPolicy: "no-cache",
      });

      return music.data.musicBy;
  }
};

export const getMediaItemById = async (id) => {
  const result = await client.query({
    query: gql`
      query getMediaItemById($id: ID) {
        mediaItemBy(id: $id) {
          mediaItemUrl
        }
      }
    `,
    variables: { id },
  });

  return result.data.mediaItemBy.mediaItemUrl;
};

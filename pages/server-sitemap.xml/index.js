import { getServerSideSitemap } from "next-sitemap";
import { gql } from "@apollo/client";
import { client } from "../../lib/apollo";

//return an empty page, so next.js won't complain
export default () => {};

const getPosts = async () => {
  const result = await client.query({
    query: gql`
      query getMusicAndPosts {
        allMusic(first: 1000) {
          nodes {
            slug
            modified
          }
        }
        posts(first: 1000) {
          nodes {
            slug
            modified
          }
        }
      }
    `,
  });

  return [...result.data.posts.nodes, ...result.data.allMusic.nodes];
};

export async function getServerSideProps(context) {
  const posts = await getPosts();

  const fields = posts.map((post) => ({
    loc:
      post.__typename === "Music"
        ? `https://omoanifowose.com/music/${post.slug}`
        : `https://omoanifowose.com/posts/${post.slug}`,
    lastmod: new Date(post.modified).toISOString(),
    priority: 0.9,
  }));
  return getServerSideSitemap(context, fields);
}

import { useState, useEffect } from "react";
import randomColor from "randomcolor";
import S from "@/styles/Comment.module.scss";

import { makeDateReadable } from "@/utils/makeDateReadable";
import CommentForm from "./CommentForm";

const Comments = ({ data, numberOfComments, postId }) => {
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(numberOfComments);

  useEffect(() => {
    const arr = normalizecommentsArr(data);
    setComments(arr);
  }, []);

  // useEffect(() => {
  //   if (comments) {
  //     console.log(comments);
  //   }
  // }, [comments]);

  const normalizecommentsArr = (commentsArr) => {
    return commentsArr.map((item) => {
      let content = item?.content;
      let date = item?.commentedOn?.node?.date;
      let name = item?.author?.node?.name;

      console.log(date);

      return {
        content,
        date,
        name,
      };
    });
  };

  return (
    <>
      <h3 className={S.title}>Comment ( {commentCount ? commentCount : 0} )</h3>
      <CommentForm
        setComments={setComments}
        setCommentCount={setCommentCount}
        postId={postId}
      />
      <div className={S.comments_container}>
        {comments?.map((item, index) => {
          const fancyDisplayedAuthorId = Array.from(
            item.name
              .split(" ")
              .map((item) => item.substring(0, 1))
              .join(" ")
          );
          const color = randomColor({ hue: "#2088e9", count: 1 });

          return (
            <div key={index} className={S.wrapper}>
              <div className={S.image}>
                <p
                  style={{ backgroundColor: color[0] }}
                  className="d-flex align-items-center justify-content-center"
                >
                  {fancyDisplayedAuthorId}
                </p>
              </div>
              <div className={`d-flex-column ${S.content_wrapper}`}>
                <div className={`d-flex align-items-center ${S.meta}`}>
                  <h3 className={S.user_name}>{item?.name}</h3>
                  <p className={S.date}>
                    {new Date(item?.date).toDateString()}
                  </p>
                </div>
                <div
                  className={S.comments_text}
                  dangerouslySetInnerHTML={{ __html: item?.content }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </>
    //
  );
};

export default Comments;

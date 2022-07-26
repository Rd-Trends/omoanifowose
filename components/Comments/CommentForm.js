import { useState } from "react";
import PropTypes from "prop-types";

//  * mutation
import { createComment } from "mutations/comment";

//  * custom components
import Input from "../FormFields/Input";
import Button from "../Button";

import S from "@/styles/Comment.module.scss";

const CommentForm = ({ setComments, setCommentCount, postId }) => {
  const [email, setEmail] = useState("");
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "author":
        setAuthor(e.target.value);
        break;
      case "comment":
        setComment(e.target.value);
        break;
    }
  };

  const reset = () => {
    setAuthor("");
    setComment("");
    setEmail("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && author && comment) {
      const newComment = await createComment({
        author,
        authorEmail: email,
        content: comment,
        commentOn: postId,
      });

      if (newComment) {
        const data = {
          email,
          name: author,
          content: comment,
          date: new Date(),
        };
        setComments((prevComments) => [data, ...prevComments]);
        setCommentCount((prevCount) => prevCount + 1);
        reset();
      }
    }

    return;
  };

  return (
    <form className={S.form} onSubmit={handleSubmit}>
      <div>
        <Input
          type="email"
          placeholder="Your Email"
          arial-label="Email Address"
          required
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Your Name"
          arial-label="Your Name"
          required
          id="author"
          name="author"
          value={author}
          onChange={handleChange}
        />
      </div>
      <Input
        type="textarea"
        rows="3"
        name="comment"
        id="comment"
        arial-label="Your comment"
        required
        value={comment}
        placeholder="Your Comment"
        onChange={handleChange}
      />
      <Button type="submit">Add Comment</Button>
    </form>
  );
};

CommentForm.propTypes = {};

export default CommentForm;

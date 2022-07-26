import PropTypes from "prop-types";

import S from "@/styles/Formelement.module.scss";

const Input = ({ type, ...attributes }) => {
  const Tag = type === "textarea" ? "textarea" : "input";
  return (
    <Tag
      className={S.input}
      type={type !== "textarea" ? type : undefined}
      {...attributes}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string
};

export default Input;

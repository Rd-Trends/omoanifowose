import React from "react";
import PropTypes from "prop-types";

const Title = ({ Tag, title }) => {
  return <Tag>{title}</Tag>;
};

Title.defaultProps = {
  tag: h2,
};

Title.propTypes = {};

export default Title;

import React from "react";
import PropTypes from "prop-types";

//  ** custom styles
import S from "@/styles/card.module.scss";

const Card = ({ children, Attrib }) => {
  return <div className={S.card}>{children}</div>;
};

// Card.propTypes = {
//   children: PropTypes.node.isRequired || PropTypes.element.isRequired,
// };

export default Card;

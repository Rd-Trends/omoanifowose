import PropTypes from "prop-types";

import S from "@/styles/Button.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(S);

const Button = ({
  children,
  borderRadius,
  className,
  color,
  ...attributes
}) => {
  const classname = cx({
    btn: true,
    primary: color === "primary",
    default: color === "default"
  });

  return (
    <button
      className={`${classname} ${className ? className : ""}`}
      {...attributes}
    >
      {children}
      <style jsx>{`
        button {
          border-radius: ${borderRadius};
        }
      `}</style>
    </button>
  );
};

Button.defaultProps = {
  color: "primary",
  borderRadius: "5px",
};

Button.propTypes = {
  color: PropTypes.string,
  borderRadius: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};

export default Button;

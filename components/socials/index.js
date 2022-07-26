import PropTypes from "prop-types";
import {
  AiOutlineMail,
  AiOutlineWhatsApp,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineFacebook,
} from "react-icons/ai";

const SocialHandles = ({ iconSize, color }) => {
  return (
    <div className="social_handles_wrapper">
      <a
        href="https://www.facebook.com/bigtymakele"
        aria-label="link to Anifowose facebook page"
        target="_blank"
        rel="noreferrer"
      >
        <AiOutlineFacebook color={color} />
      </a>
      <a
        href="https://instagram.com/oomoanifowose?r=nametag"
        aria-label="link to Anifowose instagram profile"
        target="_blank"
        rel="noreferrer"
      >
        <AiOutlineInstagram color={color} />
      </a>
      <a
        href="https://mobile.twitter.com/oomoanifowose"
        aria-label="link to twitter handle"
        target="_blank"
        rel="noreferrer"
      >
        <AiOutlineTwitter color={color} />
      </a>
      <a
        href="https://wa.me/+2348060268576"
        aria-label="link to chat Anifowose on whatsapp"
        target="_blank"
        rel="noreferrer"
      >
        <AiOutlineWhatsApp color={color} />
      </a>
      <a
        href="mailto:contact@omoanifowose.com"
        aria-label="link to Anifowose instagram profile"
        target="_blank"
        rel="noreferrer"
      >
        <AiOutlineMail color={color} />
      </a>
    </div>
  );
};

SocialHandles.defaultProps = {
  color: "white",
};

SocialHandles.prototype = {
  color: PropTypes.string,
  iconSize: PropTypes.number,
};

export default SocialHandles;

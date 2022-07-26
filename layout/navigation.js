import { BiMusic, BiNews, BiHome } from "react-icons/bi";
import { BsChatLeftQuote, BsQuestionCircle } from "react-icons/bs";

const navigation = [
  {
    id: 1,
    title: "Home",
    navLink: "/",
    icon: <BiHome />,
  },
  {
    id: 2,
    title: "About",
    navLink: "/about",
    icon: <BsQuestionCircle />,
  },

  {
    id: 3,
    title: "Music",
    navLink: "/music",
    icon: <BiMusic />,
  },

  {
    id: 4,
    title: "Blog",
    navLink: "/posts",
    icon: <BiNews />,
  },
  {
    id: 5,
    title: "Quotes",
    navLink: "/quotes",
    icon: <BsChatLeftQuote />,
  },
];

export default navigation;

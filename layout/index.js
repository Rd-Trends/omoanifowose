import BlankLayout from "./BlankLayout";
import LayoutWithNavigation from "./LayoutWithNavigation";

const Layout = ({ layout }) => {
  {
    if (layout === "Blank") {
      return <BlankLayout />;
    } else {
      return <LayoutWithNavigation />;
    }
  }
};

export default Layout;

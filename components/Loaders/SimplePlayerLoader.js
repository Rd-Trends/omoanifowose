import React from "react";
import ContentLoader from "react-content-loader";

const SimplePlayerSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={476}
    height={124}
    viewBox="0 0 476 124"
    backgroundColor="#0d0202"
    foregroundColor="#5e5555"
    {...props}
  >
    <rect x="27" y="41" rx="0" ry="0" width="0" height="1" />
    <rect x="13" y="21" rx="0" ry="0" width="1" height="9" />
    <rect x="2" y="2" rx="5" ry="5" width="121" height="154" />
    <rect x="140" y="15" rx="0" ry="0" width="0" height="1" />
    <rect x="139" y="3" rx="5" ry="5" width="326" height="15" />
    <rect x="140" y="27" rx="5" ry="5" width="326" height="15" />
    <rect x="218" y="110" rx="0" ry="0" width="1" height="1" />
    <rect x="157" y="105" rx="0" ry="0" width="1" height="0" />
    <rect x="141" y="71" rx="5" ry="5" width="326" height="53" />
  </ContentLoader>
);

export default SimplePlayerSkeleton;

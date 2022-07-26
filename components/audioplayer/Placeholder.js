import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

import {
  TextBlock,
  MediaBlock,
  TextRow,
  RectShape,
  RoundShape,
} from "react-placeholder/lib/placeholders";

export const ImagePlaceholder = ({ children, imageSrc }) => {
  const imageSkeleton = <RectShape color="grey" />;
  return (
    <ReactPlaceholder
      showLoadingAnimation={true}
      ready={imageSrc}
      customPlaceholder={imageSkeleton}
    >
      {children}
    </ReactPlaceholder>
  );
};

export const WaveFormPlaceHolder = ({ isPlayerReady }) => {
  const waveformSkeleton = <RectShape color="grey" />;
  return (
    <ReactPlaceholder
      showLoadingAnimation={true}
      ready={isPlayerReady}
      customPlaceholder={waveformSkeleton}
    >
      <></>
    </ReactPlaceholder>
  );
};

export const MetaPlaceholder = ({ children, isReady, rows }) => {
  const metaPlaceholder = <TextBlock rows={rows} color="grey" />;

  return (
    <ReactPlaceholder
      showLoadingAnimation={true}
      ready={isReady}
      customPlaceholder={metaPlaceholder}
    >
      {children}
    </ReactPlaceholder>
  );
};

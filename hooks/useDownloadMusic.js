import { useState, useEffect } from "react";

import { getAudioFormat } from "@/utils/getAudioFormat";
import jsmediatags from "../lib/jsmediatags/jsmediatags";

const useDownloadMusic = () => {
  const [downloadUrl, setDownloadUrl] = useState(false);

  useEffect(async () => {
    let mounted = true
    let downloadURL;
    let title;
    if (downloadUrl) {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      downloadURL = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadURL;
      jsmediatags.read(downloadUrl, {
        onSuccess: function (tag) {
          title = tag.tags.title ? tag.tags.title : "Unknown";
          a.download = `${title}.${getAudioFormat(downloadUrl)}`;
          a.click();
          a.remove();
        },
        onError: function (error) {
          title = "Unknown";
          a.download = `${title}.${getAudioFormat(downloadUrl)}`;
          a.click();
          a.remove();
        },
      });
      // a.download = `${title}.${getAudioFormat(downloadUrl)}`;
      // a.click();
      // a.remove();
      setDownloadUrl("");
    }

    return () => {
      URL.revokeObjectURL(downloadURL);
    };
  }, [downloadUrl]);

  const downloadMusic = (src) => {
    setDownloadUrl(src);
  };

  return downloadMusic;
};

export default useDownloadMusic;

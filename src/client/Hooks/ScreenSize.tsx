import React, { useState, useEffect } from "react";
import _ from "lodash";

const ScreenSize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener("resize", debounced(handleResize));
    return () => window.removeEventListener("resize", debounced(handleResize));
  });

  const debounced = (f: Function) => _.debounce(() => f(), 300);

  return { width, height };
};

export default ScreenSize;

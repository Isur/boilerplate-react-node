import { useState } from "react";

const useForceUpdate = () => {
  const [update, setUpdate] = useState<number>(0);
  return () => setUpdate(update => ++update);
};

export default useForceUpdate;

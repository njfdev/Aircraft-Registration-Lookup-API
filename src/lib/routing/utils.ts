"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

/* NOT my code. This is taken from:
 * https://github.com/vercel/next.js/discussions/49465#discussioncomment-7968587
 */

const getHash = () =>
  typeof window !== "undefined" ? window.location.hash : undefined;

const useHash = () => {
  const [isClient, setIsClient] = useState(false);
  const [hash, setHash] = useState(getHash());
  const params = useParams();

  useEffect(() => {
    setIsClient(true);
    setHash(getHash());
  }, [params]);

  return isClient ? hash : null;
};

export default useHash;

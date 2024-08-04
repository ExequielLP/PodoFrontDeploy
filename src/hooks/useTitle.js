import { useEffect, useRef } from "react";

export default function useTitle({ title }) {
  const prevTitle = useRef(document.title);

  useEffect(() => {
    const previusTitle = prevTitle.current;
    document.title = `${title} | Podo Estética LP`;

    return () => (document.title = previusTitle);
  }, [title]);
}

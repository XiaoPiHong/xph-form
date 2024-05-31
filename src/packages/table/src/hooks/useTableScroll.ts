import { useRef, useState, useEffect, useMemo } from "react";
import { TTableProps } from "../types";

export default function useTableScroll(tableProps: TTableProps) {
  const { scroll } = tableProps.table!;

  const divRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (divRef.current) {
        setHeight(divRef.current.offsetHeight);
      }
    };

    // Initialize height
    handleResize();

    // Create a ResizeObserver to monitor the div's size changes
    const observer = new ResizeObserver(handleResize);
    if (divRef.current) {
      observer.observe(divRef.current);
    }

    // Clean up observer on component unmount
    return () => {
      if (observer && divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);

  const newScroll = useMemo(() => {
    return {
      x: "max-content",
      y: height - 70,
      ...scroll,
    };
  }, [height]);
  return {
    divRef,
    scroll: newScroll,
  };
}

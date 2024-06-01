import { useRef, useState, useEffect, useMemo } from "react";
import { TTableProps } from "../types";

export default function useTableScroll(
  tableProps: TTableProps,
  fullHeight?: boolean
) {
  const { scroll, virtual } = tableProps.table!;

  const divRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (divRef.current) {
        setWidth(divRef.current.offsetWidth);
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
    if (fullHeight) {
      /** 官方文档开启虚拟滚动时候，x和y必须是number */
      if (virtual) return { x: width, y: height - 70, ...scroll };
      return { x: "max-content", y: height - 70, ...scroll };
    }
    /** 自适应高度 */
    return {
      x: "max-content",
      ...scroll,
    };
  }, [height]);
  return {
    divRef,
    scroll: newScroll,
  };
}

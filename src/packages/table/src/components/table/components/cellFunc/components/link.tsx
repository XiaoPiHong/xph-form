import React from "react";
import { ICurCellFuncProps } from "../types";

const Link = (
  Comp: React.ReactElement,
  curCellFuncProps: ICurCellFuncProps<"link">,
  mainProps: any
) => {
  const { curComponentProps, cellFuncProps } = curCellFuncProps;

  if (curComponentProps) {
    const { url } = curComponentProps;
    console.log(url);
  }

  return (
    <a>
      <Comp></Comp>
    </a>
  );
};

export default Link;

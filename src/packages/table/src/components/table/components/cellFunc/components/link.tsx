import React from "react";
import { ICurCellFuncProps } from "../types";

const Link = (
  Comp: React.ReactElement,
  curCellFuncProps: ICurCellFuncProps<"link">,
  mainProps: any
) => {
  const { curComponentProps, cellFuncProps } = curCellFuncProps;

  const { url, onClick } = curComponentProps!;
  console.log(url);
  return <Comp></Comp>;
};

export default Link;

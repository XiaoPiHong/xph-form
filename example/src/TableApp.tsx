import React from "react";

import XphTable from "@xph-form/table/src/table";
import { TTableProps as TXphTableProps } from "@xph-form/table/src/types";

const ReactApp: React.FC = () => {
  const props: TXphTableProps = {
    columns: [],
  };
  return <XphTable {...props} />;
};

export default ReactApp;

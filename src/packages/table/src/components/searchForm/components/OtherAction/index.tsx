import React from "react";
const OtherAction = ({
  renderActions,
}: {
  renderActions?: () => React.ReactElement;
}) => {
  return <div style={{ flex: 1, width: 0 }}>{renderActions?.()}</div>;
};
export default OtherAction;

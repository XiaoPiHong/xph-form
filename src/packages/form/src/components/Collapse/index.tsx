import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import { Button, theme } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import style from "./index.module.css";

const { useToken } = theme;

const Collapse = forwardRef(
  (
    {
      collapsible,
      onClickExpand,
      onClickFold,
    }: {
      collapsible: boolean;
      onClickExpand: () => void;
      onClickFold: () => void;
    },
    ref
  ) => {
    const { token } = useToken();
    /** 是否折叠 */
    const [collapseState, setCollapseState] = useState(collapsible);

    const collapse = useMemo(() => {
      return collapseState;
    }, [collapseState]);

    /** 点击折叠 */
    const handleCollapseChangeTrue = () => {
      onClickFold();
      setCollapseState(true);
    };

    /** 点击展开 */
    const handleCollapseChangeFalse = () => {
      onClickExpand();
      setCollapseState(false);
    };

    useImperativeHandle(ref, () => ({
      handleCollapseChangeFalse,
    }));

    return (
      <div className={style["collapse-wrapper"]}>
        {collapse ? (
          <Button
            onClick={handleCollapseChangeFalse}
            type={"link"}
            icon={<DownOutlined />}
            style={{ color: token.colorPrimary }}
          >
            展开
          </Button>
        ) : (
          <Button
            onClick={handleCollapseChangeTrue}
            type={"link"}
            icon={<UpOutlined />}
            style={{ color: token.colorPrimary }}
          >
            折叠
          </Button>
        )}
      </div>
    );
  }
);

export default Collapse;

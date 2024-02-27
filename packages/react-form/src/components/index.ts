import React from "react";
import { Input, Select, InputNumber } from "antd";
import { TComponentPropsMap } from "../types";

const componentMap = new Map<keyof TComponentPropsMap, React.FC>();

componentMap.set("Input", Input);
componentMap.set("Select", Select);
componentMap.set("InputNumber", InputNumber);

export { componentMap };

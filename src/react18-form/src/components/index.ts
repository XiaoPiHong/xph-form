import { Input, Select, InputNumber } from "antd";
import { TComponentPropsMap } from "@/react18-form";

const componentMap = new Map<keyof TComponentPropsMap, React.FC>();

componentMap.set("Input", Input);
componentMap.set("Select", Select);
componentMap.set("InputNumber", InputNumber);

export { componentMap };

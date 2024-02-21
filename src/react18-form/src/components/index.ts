import { Input, Select } from "antd";
import { TComponentPropsMap } from "@/react18-form";

const componentMap = new Map<keyof TComponentPropsMap, React.FC>();

componentMap.set("Input", Input);
componentMap.set("Select", Select);

export { componentMap };

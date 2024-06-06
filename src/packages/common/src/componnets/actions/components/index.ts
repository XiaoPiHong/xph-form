import React from "react";
import Button from "./button";
import Dropdown from "./dropdown";
import { TComponentType } from "../types";

const componentMap = new Map<keyof TComponentType, React.FC<any>>();

componentMap.set("Button", Button);
componentMap.set("Dropdown", Dropdown);

export { componentMap };

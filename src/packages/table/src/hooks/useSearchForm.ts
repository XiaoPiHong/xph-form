import { useRef, Ref } from "react";
import { IXphFormActionType } from "@xph-form/form";
import { TTableProps } from "../types";

export default function useSearchForm({ searchForm }: TTableProps) {
  const searchFormRef: Ref<IXphFormActionType> = useRef();

  return {
    searchFormRef,
    searchFormProps: searchForm,
  };
}

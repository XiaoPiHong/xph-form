import { TTableProps, TDataSourceItem } from "../types";
import { useState, useRef, Ref, useEffect } from "react";
import { IPagination, IReturnPagination } from "./usePagination";
import { IXphFormActionType } from "@xph-form/form";
import { isEqual } from "lodash-es";

export interface ITable {
  loading: boolean;
  dataSource: TDataSourceItem[];
  selection: TDataSourceItem[];
}

export default function useTable(
  props: TTableProps,
  pager: {
    pagination: IReturnPagination;
    lastPaginationState: React.MutableRefObject<IPagination | boolean>;
  },
  searchFormRef: Ref<IXphFormActionType>
) {
  const { api, formatDataSource, apiPagination, onChange } = props.table!;
  const onWholeChange = props.onChange;
  const { pagination } = pager;

  const [tableState, setTableState] = useState<ITable>({
    loading: false,
    dataSource: [],
    selection: [],
  });
  /** 上一次update的数据，解决state异步问题 */
  const lastTableState = useRef<ITable>({
    loading: false,
    dataSource: [],
    selection: [],
  });

  const table = {
    model: tableState,
    update: (props: Partial<ITable>) => {
      const newModel = { ...lastTableState.current, ...props };
      setTableState(newModel);
      lastTableState.current = newModel;
    },
  };

  /** 首次请求 */
  const firstGetTableData = async () => {
    useEffect(() => {
      const { autoRequest } = props.table!;
      const { validator } = searchFormRef.current;
      if (autoRequest)
        validator().then((res) => {
          getTableData({ searchFormParams: res });
        });
    }, []);
  };

  const getTableData = async ({
    searchFormParams,
    paginationParams,
  }: {
    searchFormParams: Record<string, any>;
    paginationParams?: Partial<IPagination>;
  }) => {
    table.update({ loading: true, selection: [] });

    /** 接口支持分页 */
    if (api && apiPagination) {
      /** 最终提交的参数 */
      const params = {
        ...searchFormParams,
        ...{
          /** 没传paginationParams默认就是上一次 */
          current: pagination.model.current,
          pageSize: pagination.model.pageSize,
          ...paginationParams,
        },
      };
      return api(params)
        .then((res) => {
          const { data, current, total } = res;
          table.update({
            dataSource: formatDataSource ? formatDataSource(data) : data,
          });
          pagination.update({
            total,
            current,
          });
        })
        .finally(() => {
          table.update({ loading: false });
        });
    }

    /** 接口不支持分页则根据用户是否需要前端分页 */
    if (api && !apiPagination) {
      const params = {
        ...searchFormParams,
      };
      if (paginationParams) {
        const { current, pageSize } = paginationParams;
        pagination.update({
          current,
          pageSize,
        });
        return table.update({ loading: false });
      } else {
        return api(params)
          .then((data) => {
            table.update({
              dataSource: formatDataSource ? formatDataSource(data) : data,
            });
            pagination.update({
              current: 1,
              total: data.length,
            });
          })
          .finally(() => {
            table.update({ loading: false });
          });
      }
    }

    return table.update({ loading: false });
  };

  /** 分页改变 */
  const onPaginationChange = ({ current, pageSize }) => {
    const { validator } = searchFormRef.current;
    return new Promise((resolve, reject) => {
      if (!lastTableState.current) resolve(true);
      if (
        !isEqual(
          { current, pageSize },
          {
            current: lastTableState.current.current,
            pageSize: lastTableState.current.pageSize,
          }
        )
      ) {
        reject(false);
        validator().then((res) => {
          getTableData({
            searchFormParams: res,
            paginationParams: { current, pageSize },
          });
        });
      }
      resolve(true);
    });
  };

  const onAllChange = (...args) => {
    const [pagination, filters, sorter, extra] = args;

    onPaginationChange(pagination).finally(() => {
      if (onChange) onChange(pagination, filters, sorter, extra);
      if (onWholeChange) onWholeChange(pagination, filters, sorter, extra);
    });
  };

  return {
    table,
    firstGetTableData,
    getTableData,
    onAllChange,
  };
}

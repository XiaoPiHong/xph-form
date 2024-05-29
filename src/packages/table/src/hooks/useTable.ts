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
    lastPaginationState: React.MutableRefObject<IPagination | false>;
  },
  searchFormRef: Ref<IXphFormActionType>
) {
  const { api, formatDataSource, apiPagination, onChange } = props.table!;
  const onBindTablePaginationChange = props.onPaginationChange;
  const { pagination, lastPaginationState } = pager;

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

    /** 接口支持分页=================================================== */
    if (api && apiPagination) {
      const params = {
        ...searchFormParams,
        ...{
          /** 没传paginationParams默认就是上一次 */
          current: (lastPaginationState.current as IPagination).current,
          pageSize: (lastPaginationState.current as IPagination).pageSize,
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
    /** 接口不支持分页则根据用户是否需要前端分页==================================== */
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

    /** 其余情况================================================================ */
    return table.update({ loading: false });
  };

  /** 分页改变 */
  const onPaginationChange = (pagination) => {
    const { validator } = searchFormRef.current;
    const { current, pageSize } = pagination;
    if (!lastPaginationState.current) return;
    if (
      !isEqual(
        { current, pageSize },
        {
          current: lastPaginationState.current.current,
          pageSize: lastPaginationState.current.pageSize,
        }
      )
    ) {
      validator().then((res) => {
        getTableData({
          searchFormParams: res,
          paginationParams: { current, pageSize },
        });
      });
      if (onBindTablePaginationChange) onBindTablePaginationChange(pagination);
      return true;
    }
  };

  /** 分页、排序、筛选变化时触发 */
  const onAllChange = async (...args) => {
    const [pagination, filters, sorter, extra] = args;

    const processArr: Function[] = [() => onPaginationChange(pagination)];

    for (let i = 0; i < processArr.length; i++) {
      if (processArr[i]()) {
        break;
      }
    }

    if (onChange) onChange(pagination, filters, sorter, extra);
  };

  return {
    table,
    firstGetTableData,
    getTableData,
    onAllChange,
  };
}

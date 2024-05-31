import { TTableProps, TDataSourceItem } from "../types";
import { useState, useRef, Ref, useEffect } from "react";
import usePagination, { IPagination } from "./usePagination";
import { IXphFormActionType } from "@xph-form/form";
import { cloneDeep, isBoolean } from "lodash-es";

export interface ITable {
  loading: boolean;
  dataSource: TDataSourceItem[];
  selection: TDataSourceItem[];

  /** 存储一份备用数据（只有前端做分页时才使用到） */
  backupsDataSource?: TDataSourceItem[];
}

export interface IUseTable {
  model: ITable;
  update: (props: Partial<ITable>) => void;
}

interface IGetTableDataParams {
  searchFormParams: Record<string, any>;
  paginationParams?: Partial<IPagination>;
}

export default function useTable(
  props: TTableProps,
  searchFormRef: Ref<IXphFormActionType>
) {
  const { api, formatDataSource, autoPagination, onChange } = props.table!;
  const onBindTablePaginationChange = props.onPaginationChange;
  const { pagination, lastPaginationState } = usePagination(props);

  const [tableState, setTableState] = useState<ITable>({
    loading: false,
    dataSource: [],
    selection: [],
    backupsDataSource: [],
  });
  /** 上一次update的数据，解决state异步问题 */
  const lastTableState = useRef<ITable>({
    loading: false,
    dataSource: [],
    selection: [],
    backupsDataSource: [],
  });

  const table: IUseTable = {
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

  /** 接口分页 */
  const handleGetApiPageTableData = async ({
    searchFormParams,
    paginationParams,
  }: IGetTableDataParams) => {
    const params = {
      ...searchFormParams,
      ...{
        /** 没传paginationParams默认就是上一次 */
        current: (lastPaginationState.current as IPagination).current,
        pageSize: (lastPaginationState.current as IPagination).pageSize,
        ...paginationParams,
      },
    };
    return api!(params)
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
  };

  /** 不分页 */
  const handleGetTableListData = async ({
    searchFormParams,
    paginationParams,
  }: IGetTableDataParams) => {
    const params = { ...searchFormParams };
    return api!(params)
      .then((data) => {
        const dataSource = formatDataSource ? formatDataSource(data) : data;
        table.update({
          selection: [],
          dataSource,
        });
        pagination.update({
          current: 1,
          total: data.length,
        });
      })
      .finally(() => {
        table.update({ loading: false });
      });
  };

  /** 前端分页 */
  const handleGetAutoPageTableData = async ({
    searchFormParams,
    paginationParams,
  }: IGetTableDataParams) => {
    const params = { ...searchFormParams };
    if (paginationParams) {
      const { current, pageSize } = paginationParams as {
        current: number;
        pageSize: number;
      };
      pagination.update({
        current,
        pageSize,
      });

      /** 前端自己分页 */
      const start = (current - 1) * pageSize;
      const end = start + pageSize;
      const currentPageData = lastTableState.current.backupsDataSource.slice(
        start,
        end
      );

      return table.update({
        loading: false,
        selection: [],
        dataSource: currentPageData,
      });
    } else {
      return api!(params)
        .then((data) => {
          let dataSource = formatDataSource ? formatDataSource(data) : data;
          let backupsDataSource = cloneDeep(dataSource);

          const start = 0;
          const end =
            start + (lastPaginationState.current as IPagination).pageSize;
          dataSource = dataSource.slice(start, end);

          table.update({
            selection: [],
            dataSource,
            backupsDataSource,
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
  };

  const getTableData = async ({
    searchFormParams,
    paginationParams,
  }: IGetTableDataParams) => {
    table.update({ loading: true, selection: [] });

    /** 接口不支持分页则根据用户是否需要前端分页==================================== */
    if (api) {
      const flag = !!lastPaginationState.current;
      switch (flag) {
        case true:
          /** 前端分页 */
          if (autoPagination === true) {
            return handleGetAutoPageTableData({
              searchFormParams,
              paginationParams,
            });
          } else {
            /** 不分页 */
            if (autoPagination === false) {
              return handleGetTableListData({
                searchFormParams,
                paginationParams,
              });
            } else {
              /** 接口分页 */
              return handleGetApiPageTableData({
                searchFormParams,
                paginationParams,
              });
            }
          }
        case false:
          return handleGetTableListData({
            searchFormParams,
            paginationParams,
          });
      }
    }
    /** 其余情况================================================================ */
    return table.update({ loading: false });
  };

  /** 分页改变时触发 */
  const onPaginationChange = (page: number, pageSize: number) => {
    const { validator } = searchFormRef.current;
    validator().then((res) => {
      getTableData({
        searchFormParams: res,
        paginationParams: { current: page, pageSize },
      });
    });
    if (onBindTablePaginationChange)
      onBindTablePaginationChange(page, pageSize);
  };

  /** 排序、筛选变化时触发 */
  const onAllChange = async (...args) => {
    const [_, filters, sorter, extra] = args;

    const processArr: Function[] = [];

    for (let i = 0; i < processArr.length; i++) {
      if (processArr[i]()) {
        break;
      }
    }

    if (onChange) onChange(filters, sorter, extra);
  };

  return {
    table,
    pagination,
    firstGetTableData,
    onPaginationChange,
    onAllChange,
  };
}

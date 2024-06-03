import { TTableProps, TDataSourceItem } from "../types";
import { useState, useRef, Ref, useEffect } from "react";
import usePagination, { IPagination } from "./usePagination";
import { IXphFormActionType } from "@xph-form/form";

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
          /**
           * 这里一定要新数组（防止分页切换时改变了dataSource的引用），且一定要注意backupsDataSource内部元素引用需和dataSource的元素引用一致（后期可能用于做分页缓存选中）
           */
          let backupsDataSource = [...dataSource];

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

  /** 重置事件（重置页码、表单后重新请求） */
  const resetAllData = async () => {
    const { resetFields, validator } = searchFormRef.current;
    return resetFields().then(async () => {
      const params: any = {};
      /** 只有接口分页时才传分页参数 */
      if (lastPaginationState.current) {
        const { pageSize } = lastPaginationState.current;
        /** 接口分页 */
        autoPagination === void 0 &&
          (params.paginationParams = { current: 1, pageSize });
      }
      params.searchFormParams = await validator();
      return getTableData(params);
    });
  };

  /** 重置事件（重置表单后重新请求） */
  const resetData = async () => {
    const { resetFields, validator } = searchFormRef.current;
    return resetFields().then(async () => {
      const searchFormParams = await validator();
      return getTableData({ searchFormParams });
    });
  };

  /** 刷新数据 */
  const reloadData = async () => {
    const { validator } = searchFormRef.current;
    return validator().then((res) => {
      return getTableData({
        searchFormParams: res,
      });
    });
  };

  return {
    table,
    pagination,
    firstGetTableData,
    onPaginationChange,
    onAllChange,

    resetData,
    resetAllData,
    reloadData,
  };
}

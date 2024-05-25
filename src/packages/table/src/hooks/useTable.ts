import { TTableProps, TDataSourceItem } from "../types";
import { useState } from "react";
import { IPagination, IReturnPagination } from "./usePagination";

export interface ITable {
  loading: boolean;
  dataSource: TDataSourceItem[];
  selection: TDataSourceItem[];
}

export default function useTable(
  props: TTableProps,
  pagination: IReturnPagination
) {
  const { api, formatDataSource, apiPagination, autoRequest } = props.table!;

  const [tableState, setTableState] = useState<ITable>({});

  const table = {
    model: tableState,
    update: (props: Partial<ITable>) => {
      const newModel = { ...props, ...tableState };
      setTableState(newModel);
    },
  };

  const getTableData = ({
    searchFormParams,
    paginationParams = {
      current: pagination.model.current,
      pageSize: pagination.model.pageSize,
    },
  }: {
    searchFormParams: any;
    paginationParams?: IPagination;
  }) => {
    table.update({ loading: true, selection: [] });

    /** 接口支持分页 */
    if (api && apiPagination) {
      /** 最终提交的参数 */
      const params = {
        ...searchFormParams,
        ...paginationParams,
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
        table.update({ loading: false });
      } else {
        return api(params)
          .then((res) => {
            const { data } = res;
            table.update({
              dataSource: formatDataSource ? formatDataSource(data) : data,
            });
            pagination.update({
              total: data.length,
            });
          })
          .finally(() => {
            table.update({ loading: false });
          });
      }
    }

    table.update({ loading: false });
  };

  return {
    table,
    getTableData,
  };
}

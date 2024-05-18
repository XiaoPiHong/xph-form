import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable, TableDropdown } from "@ant-design/pro-components";
import { Button, Dropdown, Space, Tag } from "antd";
import { useRef } from "react";
const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const requestTest = async (params: any): Promise<any> => {
  console.log(params);
  return {
    data: [
      {
        id: 624748504,
        number: 6689,
        title: "🐛 [BUG]yarn install命令 antd2.4.5会报错",
        labels: [
          {
            name: "bug",
            color: "error",
          },
        ],
        state: "open",
        locked: false,
        comments: 1,
        created_at: "2020-05-26T09:42:56Z",
        updated_at: "2020-05-26T10:03:02Z",
        closed_at: null,
        author_association: "NONE",
        user: "chenshuai2144",
        avatar:
          "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
      },
      {
        id: 624691229,
        number: 6688,
        title: "🐛 [BUG]无法创建工程npm create umi",
        labels: [
          {
            name: "bug",
            color: "error",
          },
        ],
        state: "open",
        locked: false,
        comments: 0,
        created_at: "2020-05-26T08:19:22Z",
        updated_at: "2020-05-26T08:19:22Z",
        closed_at: null,
        author_association: "NONE",
        user: "chenshuai2144",
        avatar:
          "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
      },
      {
        id: 624674790,
        number: 6685,
        title: "🧐 [问题] build 后还存在 es6 的代码（Umi@2.13.13）",
        labels: [
          {
            name: "question",
            color: "success",
          },
        ],
        state: "open",
        locked: false,
        comments: 0,
        created_at: "2020-05-26T07:54:25Z",
        updated_at: "2020-05-26T07:54:25Z",
        closed_at: null,
        author_association: "NONE",
        user: "chenshuai2144",
        avatar:
          "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
      },
      {
        id: 624620220,
        number: 6683,
        title: "2.3.1版本如何在业务页面修改头部状态",
        labels: [
          {
            name: "question",
            color: "success",
          },
        ],
        state: "open",
        locked: false,
        comments: 2,
        created_at: "2020-05-26T05:58:24Z",
        updated_at: "2020-05-26T07:17:39Z",
        closed_at: null,
        author_association: "NONE",
        user: "chenshuai2144",
        avatar:
          "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
      },
      {
        id: 624592471,
        number: 6682,
        title: "hideChildrenInMenu设置后，子路由找不到了",
        labels: [
          {
            name: "bug",
            color: "error",
          },
        ],
        state: "open",
        locked: false,
        comments: 2,
        created_at: "2020-05-26T04:25:59Z",
        updated_at: "2020-05-26T08:00:51Z",
        closed_at: null,
        author_association: "NONE",
        user: "chenshuai2144",
        avatar:
          "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
      },
    ],
    page: 1,
    success: true,
    total: 30,
  };
};

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: "index",
    valueType: "indexBorder",
    width: 48,
  },
  {
    title: "标题",
    dataIndex: "title",
    copyable: true,
    ellipsis: true,
    tooltip: "标题过长会自动收缩",
    formItemProps: {
      rules: [
        {
          required: true,
          message: "此项为必填项",
        },
      ],
    },
  },
  {
    disable: true,
    title: "状态",
    dataIndex: "state",
    filters: true,
    search: false,
    onFilter: true,
    ellipsis: true,
    valueType: "select",
    valueEnum: {
      all: { text: "超长".repeat(50) },
      open: {
        text: "未解决",
        status: "Error",
      },
      closed: {
        text: "已解决",
        status: "Success",
        disabled: true,
      },
      processing: {
        text: "解决中",
        status: "Processing",
      },
    },
  },
  {
    disable: true,
    title: "标签",
    dataIndex: "labels",
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: "创建时间",
    key: "showTime",
    dataIndex: "created_at",
    valueType: "date",
    sorter: true,
    hideInSearch: true,
  },
  {
    title: "创建时间",
    dataIndex: "created_at",
    valueType: "dateRange",
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: "操作",
    valueType: "option",
    key: "option",
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: "copy", name: "复制" },
          { key: "delete", name: "删除" },
        ]}
      />,
    ],
  },
];

const TableApp = () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        await waitTime(2000);
        return requestTest(params);
      }}
      editable={{
        type: "multiple",
      }}
      columnsState={{
        persistenceKey: "pro-table-singe-demos",
        persistenceType: "localStorage",
        defaultValue: {
          option: { fixed: "right", disable: true },
        },
        onChange(value) {
          console.log("value: ", value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: "auto",
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === "get") {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      /** 表格顶部标题 */
      headerTitle="高级表格"
      /** 表格顶部的操作按钮 */
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
        >
          新建
        </Button>,
        <Dropdown
          key="menu"
          menu={{
            items: [
              {
                label: "1st item",
                key: "1",
              },
              {
                label: "2nd item",
                key: "1",
              },
              {
                label: "3rd item",
                key: "1",
              },
            ],
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
};

/**
 * interface ITableProps {
 *   // 唯一索引（ 默认'id'）
 *   rowKey: string;
 *   // 操作项配置
 *   toolbarConfig: IToolbarConfig;
 *
 * }
 *
 * 一、表格顶部的操作按钮：新增、删除等
 *
 * 需实现：
 * 1、封装一个ToolBarItem组件，传入可配置属性items，item加个属性支持自定义渲染
 * 2、将ToolBarItem传递给配置项的（toolBarRender）属性，这个属性会自动增加margin-right
 *
 * 注意事项：
 * 1、（toolBarRender）同级的（headerTitle）可以配置表格的标题
 * 2、（toolBarRender）只是中间的操作按钮，如果想要自定义整个表格顶部，得使用（toolbar）这个属性
 * 3、（options）表格配置按钮和（toolBarRender）、（toolbar）会同一行显示，（options）设置为false时候不显示表格配置按钮
 * 4、（tableAlertRender）和（tableAlertOptionRender）是（toolBarRender）下方的一个提示区域，可以获取到选中的值做一些操作
 *
 *
 */

export default TableApp;

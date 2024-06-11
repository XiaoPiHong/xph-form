### 执行流程解析

```ts
const tableProps = {
  columns: [
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
      cellFunc: ({ record }) => [
        { component: "A", },
        { component: "B", },
        { component: "C", },
      ]
    }
  ]
}

这时将寻找各自对应的组件(A, B, C), 然后开始嵌套执行. (注: BottomCellFunc 为最底层组件, 只渲染当前的文案和执行点击事件)

执行流程:
  C.bind(B.bind(A.bind(BottomCellFunc)))
  C()

也就是说 最后配置的那个功能项会是第一个执行 上面例子C会是第一个执行.

这也是为什么在上面需要强调在组件内部需要手动渲染 <Comp />
看上面的执行流程, 所有的函数式组件都是 .bind 出来的, 本质上它并没有执行渲染.
所以需要手动触发渲染上一个组件.

```

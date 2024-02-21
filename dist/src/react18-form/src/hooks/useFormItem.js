"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_es_1 = require("lodash-es");
function useFormItemShow(item, model) {
    const { show, ifShow } = item;
    let isShow = true;
    let isIfShow = true;
    if ((0, lodash_es_1.isBoolean)(show)) {
        isShow = show;
    }
    if ((0, lodash_es_1.isBoolean)(ifShow)) {
        isIfShow = ifShow;
    }
    if ((0, lodash_es_1.isFunction)(show)) {
        isShow = show(model);
    }
    if ((0, lodash_es_1.isFunction)(ifShow)) {
        isIfShow = ifShow(model);
    }
    return { isShow, isIfShow };
}
function default_1({ props, model }) {
    const { items } = props;
    const formItems = items
        .map((item) => {
        const { isIfShow, isShow } = useFormItemShow(item, model);
        return Object.assign(Object.assign({}, item), { show: isShow, ifShow: isIfShow });
    })
        .filter((item) => item.ifShow); /** 过滤出要渲染的项 */
    return {
        formItems,
    };
}
exports.default = default_1;

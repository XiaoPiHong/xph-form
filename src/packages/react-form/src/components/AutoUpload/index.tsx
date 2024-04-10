import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Upload, UploadProps, message } from "antd";
import { buildUUID } from "../../helper";

type IFileList = Array<{
  uid: string;
  url: string;
  status: string;
  name: string;
}>;

const returnTypeMap = {
  ["String"]: "String",
  ["String[]"]: "String[]",
  ["File[]"]: "File[]",
  ["FileList"]: "FileList",
};

export interface IAutoUploadProps extends UploadProps {
  /** 上传服务器的api，有api证明默认是上传服务器，否者默认返回File[] */
  api?: (...args) => Promise<IFileList>;
  /** 上传的最大数量 */
  maxCount?: number;
  /** 上传的最大大小，单位为M */
  maxSize?: number;
  /** 返回类型(也就是表单获取到的类型) */
  returnType?: keyof typeof returnTypeMap;
  /** 是否开启裁剪 */
  openCrop?: boolean;
  /** 改变表单值事件 */
  onChange?: (...args) => void;
}

const AutoUpload: React.FC<IAutoUploadProps> = forwardRef(
  (autoUploadProps: IAutoUploadProps, ref) => {
    const [canOnChange, setCanOnChange] = useState<boolean>(false);
    const baseDefaultFileList: any = ""; // 用于覆盖defaultFileList的类型
    const {
      api,
      maxCount = 1, // 默认只能上传一个文件
      maxSize = 2, // 默认最大2M
      listType = "picture-card", // 默认展示文件列表
      openCrop = false, // 默认不开启裁剪
      data, // 默认带上的参数
      returnType = returnTypeMap["String"], // 默认返回String(如果多文件默认","拼接)
      fileList: defaultFileList = baseDefaultFileList, // 默认文件列表
      onChange = undefined /** onChange事件调用后会改变Form的值 */,
    } = autoUploadProps;

    let uploadQty = 0; // 记录每次本地上传的数量（注意这个不能使用state，state赋值是异步赋值）

    const [fileList, setFileList] = useState<IFileList>([]);
    const [emitData, setEmitData] = useState<any>(defaultFileList);

    /** 把扩展的属性排除掉 */
    const getAutoUploadProps = () => {
      /** beforeUpload、fileList也需要排除，防止传入了影响原业务 */
      const {
        api,
        maxCount,
        maxSize,
        openCrop,
        beforeUpload,
        fileList,
        returnType,
        ...rest
      } = autoUploadProps;
      return rest;
    };

    /** 上传前校验 */
    const beforeUpload = (file: File) => {
      const limit = file.size / 1024 / 1024 < maxSize;
      if (!limit) {
        message.error(`文件大小超过:${maxSize}M, 请重试`);
      }

      const count = fileList.length + uploadQty < maxCount;
      if (!count) {
        message.error(`文件数量不能超过${maxCount}个`);
      }

      const result = limit && count;
      // 此处如果需要开启裁剪需要判断 result
      result && handleCrop(file);

      return Upload.LIST_IGNORE;
    };

    // 处理裁剪
    const handleCrop = (file: File) => {
      // 不开启裁剪直接上传
      if (!openCrop) {
        customRequest({ file });
      } else {
        message.success("暂时不支持裁剪功能，后续兼容。。。。");
        customRequest({ file });
      }
    };

    /** 自定义上传 */
    const customRequest = (config) => {
      if (api) {
        api({ file: config.file, ...data })
          .then((res: IFileList) => {
            setFileList([...fileList, ...res]);
          })
          .finally(() => {
            uploadQty--;
          });
      } else {
        // 创建本地url用于下载/预览
        Object.assign(config.file, {
          status: "done",
          url: URL.createObjectURL(config.file),
        });
        setFileList([...fileList, config.file]);
        uploadQty--;
      }
    };

    const handleChange = (info) => {
      const { file, fileList: newFileList } = info;
      const { status } = file;
      switch (status) {
        case "removed": {
          setFileList([...newFileList]);
          break;
        }
      }
    };

    // 将url处理成file
    const handleUrlToFile = (url): IFileList[number] => {
      const getName = (url) => {
        const list = url.split("/");
        const last = list[list.length - 1];
        const [name] = last.split("?");
        return name;
      };
      // url存在fileList中的uid无需重新生成
      const getUid = (url) => {
        const lastItem = fileList.find((item) => item.url === url);
        if (lastItem) return lastItem.uid;
        return buildUUID();
      };
      return { uid: getUid(url), name: getName(url), url: url, status: "done" };
    };

    /**
     * 监听初始值变化，赋值fileList
     */
    useEffect(() => {
      let list: IFileList[] = [];
      switch (returnType) {
        case returnTypeMap["String"]: {
          list = (defaultFileList || "")
            .split(",")
            .filter((url) => url)
            .map((url) => handleUrlToFile(url));
          break;
        }
        case returnTypeMap["String[]"]: {
          list = (defaultFileList || []).map((url) => handleUrlToFile(url));
          break;
        }
        case returnTypeMap["File[]"]: {
          list = (defaultFileList || []).map((item) => item);
          break;
        }
        case returnTypeMap["FileList"]: {
          list = (defaultFileList || []).map((item) => item);
          break;
        }
      }
      setFileList(list);
      setCanOnChange(true);
    }, [defaultFileList]);

    /**
     * 监听fileList变化，赋值emitData（canOnChange是排除useEffect首次触发的情况）
     */
    useEffect(() => {
      if (canOnChange) {
        switch (returnType) {
          case returnTypeMap["String"]: {
            setEmitData(fileList.map((item) => item.url).join(","));
            onChange?.(fileList.map((item) => item.url).join(","));
            break;
          }
          case returnTypeMap["String[]"]: {
            setEmitData(fileList.map((item) => item.url));
            onChange?.(fileList.map((item) => item.url));
            break;
          }
          case returnTypeMap["File[]"]: {
            setEmitData([...fileList]);
            onChange?.([...fileList]);
            break;
          }
          case returnTypeMap["FileList"]: {
            setEmitData([...fileList]);
            onChange?.([...fileList]);
            break;
          }
        }
      }
    }, [fileList, canOnChange]);

    useImperativeHandle(ref, () => ({
      fileList: emitData,
    }));

    return (
      <Upload
        listType={listType}
        {...getAutoUploadProps()}
        fileList={fileList}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        上传
      </Upload>
    );
  }
);

export default AutoUpload;

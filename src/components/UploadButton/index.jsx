import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { UploadFileToServer } from "../../services/Api";

const UploadBtn = ({ title, getDocumentLink }) => {
  const [fileList, setFileList] = useState([]);
  const handleOnChange = ({ file, fileList }) => {
    setFileList(fileList);
    if (file.status !== "uploading") {
      //   UploadFileToServer({ file, fileList });
      setFileList(fileList);
    }
    if (file.status === "done") {
      // const url = file.response && file.response.url;
      const linkDocument = `http://localhost:1337${fileList[0].response[0].url}`;
      getDocumentLink(linkDocument);
      setFileList([
        {
          ...fileList[0],
          url: linkDocument,
        },
      ]);
    }
  };
  const onDataReceive = (data) => {
    return data;
  };
  return (
    <Upload
      fileList={fileList}
      accept=".docx,.pptx"
      onChange={handleOnChange}
      maxCount={1}
      // customRequest={UploadFileToServer}
      customRequest={(options) =>
        UploadFileToServer({ ...options, onData: onDataReceive })
      }
      onRemove={() => getDocumentLink("")}
    >
      <Button icon={<UploadOutlined />}>{title || "Upload"}</Button>
    </Upload>
  );
};

export default UploadBtn;

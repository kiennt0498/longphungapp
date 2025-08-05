import React from "react";
import { Form, Radio, Upload, Input, message, Typography, Divider } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { max } from "moment";
import { toast } from "react-toastify";
import { API_FILE } from "../../../services/constans";

const { Dragger } = Upload;
const { TextArea } = Input;
const { Title, Text } = Typography;

const KeychainDesignInfo = ({ sanPhams }) => {
  console.log(sanPhams);

  const uploadProps = {
    name: "file",
    multiple: false,
    accept: "image/*,.pdf",
    action: API_FILE + "/upload/image",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        toast.success(`${info.file.name} nhập file thành công.`);

        return info.file.response;
      } else if (status === "error") {
        toast.error(`${info.file.name} nhập file thất bại.`);
      }
    },
  };

  if (!sanPhams || sanPhams.length === 0) return null;

  return (
    <>
      {sanPhams.map((sp, index) => (
        <div key={index} style={{ marginBottom: 32 }}>
          <Divider orientation="left">
            <Text strong>
              Thiết kế cho: {sp?.tenSanPham || `Sản phẩm #${index + 1}`}
            </Text>
          </Divider>

          <Form.Item
            name={["designs", index, "hasDesignFile"]}
            label="Có sẵn file thiết kế không?"
            rules={[{ required: true, message: "Vui lòng chọn!" }]}
          >
            <Radio.Group>
              <Radio value={true}>Có</Radio>
              <Radio value={false}>Không</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prev, curr) =>
              prev.designs?.[index]?.hasDesignFile !==
              curr.designs?.[index]?.hasDesignFile
            }
          >
            {({ getFieldValue }) =>
              getFieldValue(["designs", index, "hasDesignFile"]) === true ? (
                <Form.Item
                  name={["designs", index, "fileUpload"]}
                  label="Upload file thiết kế"
                >
                  <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Kéo thả hoặc click chọn file
                    </p>
                    <p className="ant-upload-hint">
                      Hỗ trợ JPG, PNG, PDF (≤10MB)
                    </p>
                  </Dragger>
                </Form.Item>
              ) : null
            }
          </Form.Item>

          <Form.Item
            name={["designs", index, "noiDungThietKe"]}
            label="Mô tả ý tưởng thiết kế"
            rules={[
              { required: true, message: "Vui lòng mô tả ý tưởng thiết kế!" },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Nội dung cần in, màu sắc, phong cách..."
            />
          </Form.Item>

          <Form.Item
            name={["designs", index, "yeuCauDacBiet"]}
            label="Yêu cầu đặc biệt (nếu có)"
          >
            <TextArea
              rows={3}
              placeholder="Ví dụ: in 2 mặt, gắn số ĐT, LED..."
            />
          </Form.Item>
        </div>
      ))}
    </>
  );
};

export default KeychainDesignInfo;

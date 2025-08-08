import React from "react";
import { Button, Form } from "antd";
import SingleProductCard from "./productFormComponents/SingleProductCard";
import { v4 as uuidv4 } from "uuid";

const KeychainProductInfo = ({
  loaiSP,
  setGia,
  formList,
  setFormList,
  onFormReady,
  sanPhams,
  form
}) => {
  const handleAdd = () => {
    setFormList([...formList, { id: uuidv4(), form: null }]);
  };

  const handleRemove = (id) => {
    setFormList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      {formList.map(({ id, initialValues }, index) => (
        <SingleProductCard
          key={id}
          id={id}
          loaiSP={loaiSP}
          index={index} // ✅ Truyền đúng index thực tế
          setGia={setGia}
          onRemove={handleRemove}
          onFormReady={onFormReady}
          sanPhams={sanPhams}
          initialValues={initialValues}
          form={form}
        />
      ))}
     
      <Button onClick={handleAdd} type="dashed" block>
        + Thêm sản phẩm
      </Button>
    </>
  );
};

export default KeychainProductInfo;

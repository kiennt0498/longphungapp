import React, { useState, useMemo, useEffect } from "react";
import { Col, Row, Table, Input, Button, Select } from "antd";
import { FaArrowRight } from "react-icons/fa";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ImBin2 } from "react-icons/im";

const QuyTrinhSX = ({ congDoan, setQuyTrinh, quyTrinh }) => {
  const [data, setData] = useState(congDoan);
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [taget, setTaget] = useState([]);

  const listLoai = [
    { value: 1, label: "Móc kháo khuôn laze đóng xích" },
    { value: 2, label: "Móc khóa khuôn bế đóng xích" },
    { value: 3, label: "Móc khóa kim loại" },
    { value: 4, label: "Móc khóa mica" },
    { value: 5, label: "Tem nhãn logo đổ keo" },
    { value: 6, label: "Huy hiệu mica 2mm in tại CTY(chưa có ghim cài)" },
    { value: 7, label: "Huy hiệu nhôm bọc nhựa" },
    { value: 8, label: "Biển xe điện ALU" },
  ];

  // useEffect(() => {
  //   if (quyTrinh.length === 0) return;
  //   const newData = data.filter(
  //     (item) => !quyTrinh.some((t) => t.id === item.id)
  //   );
  //   setData(newData);
  // }, []);

  useEffect(() => {
    if (!congDoan || congDoan.length === 0) return;

    const remaining = congDoan.filter(
      (item) => !quyTrinh.some((q) => q.id === item.id)
    );
    setData(remaining);
  }, [quyTrinh, congDoan]);

  const filteredData = data.filter((item) =>
    item.tenCongDoan.toLowerCase().includes(searchText.toLowerCase())
  );

  const handlleSetDefault = (defaultIds) => {
  if (!Array.isArray(defaultIds) || defaultIds.length === 0) return;

  const defaultSteps = defaultIds
    .map((id, index) => {
      const item = congDoan.find((i) => i.id === id);
      if (!item) return null;
      return {
        ...item,
        thuTu: index + 1,
      };
    })
    .filter(Boolean);

  setQuyTrinh(defaultSteps);
};

  const onChangeLoai = (value) => {
    handlleSetDefault([]);
    let defaultIds = [];
    switch (value) {
      case 1:
        defaultIds = [2, 31, 53, 34, 35, 37, 38, 39, 41, 42, 44, 48, 50, 135];
        break; // Móc khóa
      case 2:
        defaultIds = [2, 31, 33, 34, 35, 37, 38, 39, 41, 42, 44, 48, 50, 135];
        break;
      case 3:
        defaultIds = [2, 34, 35, 37, 39, 41, 42, 26, 50, 135];
        break;
      case 4:
        defaultIds = [138,106,90,15,16,17,18,45,50,135];
        break;
      case 5:
        defaultIds = [2, 34, 35, 37, 42, 137, 135];
        break;
      case 6:
        defaultIds = [138, 105, 89, 135];
        break;
      case 7:
        defaultIds = [2, 9, 11, 50, 135];
        break;
      case 8:
        defaultIds = [2, 101, 118, 120, 135];
        break;
      default:
        break;
    }
    handlleSetDefault(defaultIds);
  };

  const columns = [
    { title: "id", dataIndex: "id", key: "id" },
    { title: "Công đoạn", dataIndex: "tenCongDoan", key: "tenCongDoan" },
  ];

  const columnsDR = [
    {
      title: "Thứ tự thực hiện",
      dataIndex: "thuTu",
      key: "thuTu",
      width: "30%",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Công đoạn",
      dataIndex: "tenCongDoan",
      key: "tenCongDoan",
      width: "50%",
    },
    {
      title: "",
      key: "action",
      width: "10%",
      align: "right",
      render: (_, record) => (
        <Button
          icon={<ImBin2 />}
          onClick={() => confirmDelete(record.id)}
          color="default"
          variant="link"
        />
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
      setTaget(rows);
    },
  };

  const onClickChange = () => {
    if (taget.length === 0) return;

    const newSelections = taget
      .filter((item) => !quyTrinh.some((t) => t.id === item.id))
      .map((item) => ({
        ...item,
        thuTu: quyTrinh.length + 1 + taget.findIndex((t) => t.id === item.id),
      }));

    setQuyTrinh([...quyTrinh, ...newSelections]);
    setData(
      data.filter((item) => !newSelections.some((t) => t.id === item.id))
    );

    // Clear selections
    setSelectedRowKeys([]);
    setTaget([]);
  };

  const confirmDelete = (key) => {
    const deletedItem = quyTrinh.find((item) => item.id === key);
    if (deletedItem) {
      const newTo = quyTrinh.filter((item) => item.id !== key);
      const newData = [...data, deletedItem];

      // Cập nhật lại thứ tự
      const reIndexed = newTo.map((item, index) => ({
        ...item,
        thuTu: index + 1,
      }));

      setQuyTrinh(reIndexed);
      setData(newData);

      setSelectedRowKeys((prevKeys) => prevKeys.filter((k) => k !== key));
      setTaget((prev) => prev.filter((item) => item.id !== key));
    }
  };

  const RowDR = (props) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: props["data-row-key"],
    });

    const style = {
      ...props.style,
      transform: CSS.Translate.toString(transform),
      transition,
      cursor: "move",
      ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
    };

    return (
      <tr
        {...props}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      />
    );
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 1 } })
  );

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setQuyTrinh((prev) => {
        const activeIndex = prev.findIndex((i) => i.id === active.id);
        const overIndex = prev.findIndex((i) => i.id === over?.id);
        const newOrder = arrayMove(prev, activeIndex, overIndex);

        // Gán lại thuTu theo thứ tự mới
        return newOrder.map((item, index) => ({ ...item, thuTu: index + 1 }));
      });
    }
  };

  useEffect(() => {
    if (quyTrinh.length === 0) return;
    setQuyTrinh(quyTrinh);
  }, [quyTrinh]);

  return (
    <Row gutter={16}>
      <Col span={10}>
        <Input
          placeholder="Tìm kiếm công đoạn"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Table
          rowSelection={rowSelection}
          rowKey="id"
          columns={columns}
          dataSource={filteredData}
          scroll={filteredData.length > 10 ? { y: 400 } : undefined}
          pagination={false}
        />
      </Col>
      <Col
        span={2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button type="primary" onClick={onClickChange}>
          <FaArrowRight />
        </Button>
      </Col>
      <Col
        span={10}
        style={{
          position: "relative",
          zIndex: 1,
          overflow: "visible",
        }}
      >
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 16 }}
        >
          <Col style={{ width: "100%" }}>
            <Select
              style={{ width: "100%" }}
              allowClear
              options={listLoai}
              placeholder="Lọai sản phẩm"
              onChange={onChangeLoai}
              getPopupContainer={() => document.body}
            />
          </Col>
        </Row>
        <DndContext
          sensors={sensors}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={quyTrinh.map((i) => i.id)}
            strategy={verticalListSortingStrategy}
          >
            <Table
              components={{ body: { row: RowDR } }}
              rowKey="id"
              columns={columnsDR}
              dataSource={quyTrinh}
              scroll={quyTrinh.length > 10 ? { y: 400 } : undefined}
              onRow={(record) => ({
                "data-row-key": record.id,
              })}
              pagination={false}
            />
          </SortableContext>
        </DndContext>
      </Col>
    </Row>
  );
};

export default QuyTrinhSX;

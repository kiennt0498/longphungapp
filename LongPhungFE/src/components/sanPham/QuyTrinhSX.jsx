import React, { useState, useMemo, useEffect } from "react";
import { Col, Row, Table, Input, Button } from "antd";
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

const QuyTrinhSX = ({ congDoan,setQuyTrinh,quyTrinh }) => {
  const [data, setData] = useState(congDoan);
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [taget, setTaget] = useState([]);


  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.tenCongDoan.toLowerCase().includes(searchText.toLowerCase())
    ).sort((a, b) => a.id - b.id);
  }, [searchText, data]);

  useEffect(()=>{
    if(quyTrinh.length === 0) return;
    const newData = data.filter((item) => !quyTrinh.some((t) => t.id === item.id));
    setData(newData);
  },[])
  

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
        <Button icon={<ImBin2 />} onClick={() => confirmDelete(record.id)} color="default" variant="link" />
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
    setData(data.filter((item) => !newSelections.some((t) => t.id === item.id)));
  
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

  useEffect(()=>{
    if(quyTrinh.length === 0) return;
    setQuyTrinh(quyTrinh)
  },[quyTrinh])

  return (
    <Row gutter={16}>
      <Col span={10}>
        <Input
          placeholder="Tìm kiếm công đoạn"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBotquyTrinhm: 16 }}
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
      <Col span={10}>
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

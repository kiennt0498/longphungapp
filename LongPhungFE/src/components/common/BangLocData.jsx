import React from "react";
import {
  Input,
  Divider,
  Checkbox,
  Collapse,
  DatePicker,
  ConfigProvider,
} from "antd";
import { MdFilterListAlt } from "react-icons/md";
import { useFilters } from "../../contexts/FilterContext";
import { useSelector } from "react-redux";
import viVN from "antd/es/locale/vi_VN";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import "dayjs/locale/vi";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.locale("vi");

const { RangePicker } = DatePicker;

const BangLocData = ({ dynamicKeys = [] }) => {
  const { filters, updateFilters } = useFilters();

  const boPhans = useSelector((state) => state.NhanVien.boPhans);
  const chucVus = useSelector((state) => state.NhanVien.chucVus);
  const tacVus = useSelector((state) => state.NhanVien.tacVus);

  const showStatus = dynamicKeys.includes("trangThai");
  const showCategory = dynamicKeys.includes("category");
  const showTime =
    dynamicKeys.includes("dateRange") || dynamicKeys.includes("month");
  const showBoPhan = dynamicKeys.includes("boPhan");
  const showChucVu = dynamicKeys.includes("chucVu");
  const showTacVu = dynamicKeys.includes("tacVu");

  const items = [
    showBoPhan && {
      key: "boPhan",
      label: "Bộ phận",
      children: (
        <Checkbox.Group
          value={filters.boPhan}
          onChange={(vals) => updateFilters({ boPhan: vals })}
        >
          {boPhans.map((bp) => (
            <Checkbox key={bp.name} value={bp.name}>
              {bp.description || bp.name}
            </Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
    showChucVu && {
      key: "chucVu",
      label: "Chức vụ",
      children: (
        <Checkbox.Group
          value={filters.chucVu}
          onChange={(vals) => updateFilters({ chucVu: vals })}
        >
          {chucVus.map((cv) => (
            <Checkbox key={cv.name} value={cv.name}>
              {cv.description || cv.name}
            </Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
    showTacVu && {
      key: "tacVu",
      label: "Tác vụ",
      children: (
        <Checkbox.Group
          value={filters.tacVu}
          onChange={(vals) => updateFilters({ tacVu: vals })}
        >
          {tacVus.map((tv) => (
            <Checkbox key={tv.name} value={tv.name}>
              {tv.description || tv.name}
            </Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
    showStatus && {
      key: "status",
      label: "Trạng thái",
      children: (
        <Checkbox.Group
          value={filters.status}
          onChange={(vals) => updateFilters({ status: vals })}
        >
          <Checkbox value="hoanThanh">Hoàn thành</Checkbox>
          <Checkbox value="daNhan">Đã nhận</Checkbox>
          <Checkbox value="huy">Hủy</Checkbox>
        </Checkbox.Group>
      ),
    },
    showCategory && {
      key: "category",
      label: "Mặt hàng",
      children: (
        <Checkbox.Group
          value={filters.category}
          onChange={(vals) => updateFilters({ category: vals })}
        >
          <Checkbox value="mocKhoa">Móc khóa</Checkbox>
          <Checkbox value="bangTen">Bảng tên</Checkbox>
          <Checkbox value="bienSo">Biển số</Checkbox>
          <Checkbox value="binhGiuNhiet">Bình giữ nhiệt</Checkbox>
        </Checkbox.Group>
      ),
    },
    showTime && {
      key: "time",
      label: "Thời gian",
      children: (
        <>
          <label style={{ display: "block", marginTop: 8 }}>
            Lọc theo ngày:
          </label>
          <DatePicker
            format="DD/MM/YYYY"
            style={{ width: "100%" }}
            value={filters.day ? dayjs(filters.day) : null}
            onChange={(val) =>
              updateFilters({ day: val ? val.format("YYYY-MM-DD") : null })
            }
          />
          <label style={{ display: "block", marginTop: 8 }}>
            Lọc theo tháng:
          </label>
          <DatePicker
            picker="month"
            format="MM/YYYY"
            style={{ width: "100%" }}
            value={filters.month ? dayjs(filters.month) : null}
            onChange={(val) =>
              updateFilters({ month: val ? val.format("YYYY-MM") : null })
            }
          />
        </>
      ),
    },
  ].filter(Boolean);

  return (
    <ConfigProvider locale={viVN}>
      <div
        style={{ padding: 16, width: 280, background: "#fff", borderRadius: 8 }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
          }}
        >
          <MdFilterListAlt style={{ marginRight: 8 }} />
          Filters
        </div>

        <Divider />

        <Input
          placeholder="Tìm kiếm"
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
        />

        <Divider />

        <Collapse bordered={false} ghost items={items} />
      </div>
    </ConfigProvider>
  );
};

export default BangLocData;

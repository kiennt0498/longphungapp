// utils/filterData.js
import dayjs from "dayjs";

export function filterData(data, filters, fieldMapping = {}, dynamicKeys = []) {
  const filterMonth = filters.month
    ? dayjs(filters.month).format("YYYY-MM")
    : null;
  const filterDay = filters.day
    ? dayjs(filters.day).format("DD-MM-YYYY")
    : null;
  return data.filter((item) => {
    const getField = (key, fallback) =>
      item[fieldMapping[key] || fallback || key];

    const matchSearch =
      !filters.search ||
      getField("search", "tenKhachHang")
        ?.toLowerCase()
        .includes(filters.search.toLowerCase());

    const matchBoPhan =
      !filters.boPhan?.length || filters.boPhan.includes(getField("boPhan"));
    const matchChucVu =
      !filters.chucVu?.length || filters.chucVu.includes(getField("chucVu"));
    const matchTacVu =
      !filters.tacVu?.length || filters.tacVu.includes(getField("tacVu"));

    const matchMonth =
      !filterMonth ||
      dayjs(getField("ngayTao", "ngayTao")).format("YYYY-MM") === filterMonth;

    const matchDay =
      !filterDay ||
      dayjs(getField("ngayTao", "ngayTao")).format("DD-MM-YYYY") === filterDay;

    const matchDynamic = dynamicKeys.every((key) => {
      const values = filters[key];
      if (!values?.length) return true;
      return values.includes(getField(key));
    });

    return (
      matchSearch &&
      matchMonth &&
      matchDynamic &&
      matchBoPhan &&
      matchChucVu &&
      matchDay &&
      matchTacVu
    );
  });
}

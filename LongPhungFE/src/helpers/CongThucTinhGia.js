export const tinhGiaNguyenLieuItem = (item, chieuDai, chieuRong , heSoThuMua) => {
  const giaNhap = item.giaNhap || 0;
  const heSoMua = heSoThuMua || 0;
  const heSoBu = item.heSoBu || 0;
  console.log("Item:", item, "Chieu Dai:", chieuDai, "Chieu Rong:", chieuRong, "He So Thu Mua:", heSoThuMua);

  if(item.loaiVatTu === "PHU_KIEN") return giaNhap;
  
  var giaNL =  giaNhap + heSoMua * (chieuDai + heSoBu) * (chieuRong + heSoBu);  
  return giaNL;
};

export const giaNguyenLieu = (list, chieuDai, chieuRong, heSoThuMua) => {
  if (!Array.isArray(list)) return 0;
  return list.reduce((total, item) => {
    var gia =  total + tinhGiaNguyenLieuItem(item, chieuDai, chieuRong, heSoThuMua);
    
    return gia
  }, 0)
  
};

export const giaCongDoan = (list, chieuDai, chieuRong) => {

  
  if (!Array.isArray(list)) return 0;
  return list.reduce((total, cd) => {
    const giaNguyenLieu = cd.giaMuaNguyenLieu || 0;
    const heSoThuMua = cd.heSoThuMua || 0;
    const gia = total + giaNguyenLieu + heSoThuMua * chieuDai * chieuRong;
    
    return gia
  }, 0);
    
};

export const tinhGiaBan = (product, chieuDai, chieuRong) => {
  
  const giaNguyenLieuTotal = giaNguyenLieu(product.nguyenVatLieus || [], chieuDai, chieuRong, product.heSoThuMua);
  const giaCongDoanTotal = giaCongDoan(product.quyTrinh.congDoans || [], chieuDai, chieuRong);
  
  const giaGoc = giaNguyenLieuTotal + giaCongDoanTotal;
  console.log("Gia Goc:", giaGoc, "Nguyen Vat Lieu:", giaNguyenLieuTotal, "Cong Doan:", giaCongDoanTotal);
  
  return giaGoc
};

export const getGiaTheoSL = (giaGoc, soLuongNhap, loiNhuans) => {
  
  let upper = null;
  let lower = null;

  for (const item of loiNhuans) {
    if (item.soLuong === soLuongNhap) return (giaGoc * item.loiNhuan) / 100;
    if (item.soLuong < soLuongNhap) lower = item;
    if (item.soLuong > soLuongNhap && upper === null) {
      upper = item;
      break;
    }
  }

  if (!lower) lower = upper;
  if (!upper) upper = lower;

  const delta = lower.soLuong - upper.soLuong;
  const loiNhuanTB =
    delta === 0
      ? lower.loiNhuan
      : lower.loiNhuan +
        ((lower.loiNhuan - upper.loiNhuan) / delta) *
          (soLuongNhap - lower.soLuong);
  
  return (giaGoc * loiNhuanTB) / 100;
};

export const getLoiNhuans = (soLuongNhap, loiNhuans) => {
  let upper = null;
  let lower = null;

  for (const item of loiNhuans) {
    if (item.soLuong === soLuongNhap) return item.loiNhuan/100;
    if (item.soLuong < soLuongNhap) lower = item;
    if (item.soLuong > soLuongNhap && upper === null) {
      upper = item;
      break;
    }
  }

  if (!lower) lower = upper;
  if (!upper) upper = lower;

  const delta = lower.soLuong - upper.soLuong;
  const loiNhuanTB =
    delta === 0
      ? lower.loiNhuan
      : lower.loiNhuan +
        ((lower.loiNhuan - upper.loiNhuan) / delta) *
          (soLuongNhap - lower.soLuong);
  
  return loiNhuanTB/100;
};

export const capNhatGia = (product, newProps = {}) => {
  const { chieuDai = product.chieuDai, chieuRong = product.chieuRong, soLuong = product.soLuong } = newProps;
  
  
  const giaCoBan = tinhGiaBan(product, chieuDai, chieuRong);
  return getGiaTheoSL(giaCoBan, soLuong, product.loiNhuan);
};

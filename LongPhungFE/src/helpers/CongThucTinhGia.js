export const giaCongDoan = (list, chieuDai, chieuRong) => {
    let total = 0;
    list.forEach((cd) => {
      const giaNguyenLieu = cd.giaMuaNguyenLieu || 0;
      const heSoThuMua = cd.heSoThuMua || 0;
      const tongChiPhi = giaNguyenLieu + heSoThuMua * chieuDai * chieuRong;
      total += tongChiPhi;
    });
    return total;
  };
  
  export const giaNguyenLieu = (list, chieuDai, chieuRong) => {
    let total = 0;
    list.forEach((item) => {
      const giaNhap = item.giaNhap || 0;
      const heSoThuMua = item.heSoThuMua || 1;
      const heSoBu = item.heSoBu || 1;
  
      const thanhTien =
        giaNhap + heSoThuMua * (chieuDai + heSoBu) * (chieuRong + heSoBu);
      total += thanhTien;
    });
    return total;
  };
  
  export const tinhGiaBan = (product, chieuDai, chieuRong) => {
    return (
      giaCongDoan(product.quyTrinh?.congDoans || [], chieuDai, chieuRong) +
      giaNguyenLieu(product.nguyenVatLieus || [], chieuDai, chieuRong)
    );
  };
  
  export const getGiaTheoSL = (giaGoc, soLuongNhap, loiNhuans) => {
    let upper = null;
    let lower = null;
  
    for (let i = 0; i < loiNhuans.length; i++) {
      const item = loiNhuans[i];
      if (item.soLuong === soLuongNhap) {
        return (giaGoc * item.loiNhuan) / 100;
      }
      if (item.soLuong < soLuongNhap) lower = item;
      if (item.soLuong > soLuongNhap && upper === null) {
        upper = item;
        break;
      }
    }
  
    if (lower === null) lower = upper;
    if (upper === null) upper = lower;
  
    const deltaSL = lower.soLuong - upper.soLuong;
    const TB =
      deltaSL === 0
        ? lower.loiNhuan
        : lower.loiNhuan +
          ((lower.loiNhuan - upper.loiNhuan) / deltaSL) *
            (soLuongNhap - lower.soLuong);
    return (giaGoc * TB) / 100;
  };
  
  export const capNhatGia = (product, newProps = {}) => {
    const {
      chieuDai = product.chieuDai,
      chieuRong = product.chieuRong,
      soLuong = product.soLuong,
    } = newProps;
  
    const giaCoBan = tinhGiaBan(product, chieuDai, chieuRong);
  
    return getGiaTheoSL(giaCoBan, soLuong, product.loiNhuan);
  };
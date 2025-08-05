import KhoService from "../services/KhoService";

export const getListNL = (listSP) => {
  if (!listSP || listSP.length === 0) return [];

  const map = new Map();

  listSP.forEach((sp) => {
    
    const soLuongSP = sp.soLuong || 0;
    const dienTich = (sp.chieuDai || 1) * (sp.chieuRong || 1);
    console.log("dienTich", dienTich);
    

    (sp.nguyenVatLieus || []).forEach((vl) => {
      let tongSoLuong;
      
      if (vl.doViTinh.id === 4) {
        tongSoLuong = soLuongSP * dienTich;
        console.log(`Tổng số lượng vật liệu ${vl.ten} cần: ${tongSoLuong}`);
      } else if (vl.doViTinh.id === 5) {
        tongSoLuong = dienTich * 0.0014 * soLuongSP;
        console.log(`Tổng số lượng vật liệu ${vl.ten} cần: ${tongSoLuong}`);
      } else {
        tongSoLuong = soLuongSP;
      }

      if (map.has(vl.id)) {
        const existing = map.get(vl.id);
        map.set(vl.id, {
          ...existing,
          soLuong: existing.soLuong + tongSoLuong,
        });
      } else {
        map.set(vl.id, {
          ...vl,
          soLuong: tongSoLuong,
        });
      }
    });
  });

  return Array.from(map.values());
};

export const kiemTraHangTonKho = async (list) => {
  const khoService = new KhoService();
  const listNL = getListNL(list); // tổng vật liệu cần
  const listId = listNL.map((vl) => vl.id);
  const res = await khoService.getListTonKho(listId); 

  console.log(listId);
  
  console.log("res", res.data);
  // tồn kho hiện tại

  const tonKhoMap = new Map();
  Object.entries(res.data).forEach(([id, soLuongTon]) => {
    tonKhoMap.set(Number(id), soLuongTon || 0); // tạo Map để tra nhanh
  });

  const nguyenLieuThieu = listNL.filter((vl) => {
    const soLuongTon = tonKhoMap.get(vl.id) || 0;
    return soLuongTon < vl.soLuong;
  });

  return {
    du: nguyenLieuThieu.length === 0,
    thieu: nguyenLieuThieu,
  };
};

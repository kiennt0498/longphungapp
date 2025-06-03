import { IoBriefcaseOutline } from "react-icons/io5";
import { CiClock2, CiInboxIn } from "react-icons/ci";
import { FiCheckCircle } from "react-icons/fi";

export const getStatusColor = (status) => {
  switch (status) {
    case "available": return "green";
    case "pending": return "orange";
    case "accepted": return "blue";
    case "completed": return "purple";
    default: return "default";
  }
};

export const getStatusIcon = (status) => {
  switch (status) {
    case "available": return <IoBriefcaseOutline size={16} />;
    case "pending": return <CiClock2 size={16} />;
    case "accepted": return <CiInboxIn size={16} />;
    case "completed": return <FiCheckCircle size={16} />;
    default: return null;
  }
};

export const getStatusText = (status) => {
  switch (status) {
    case "THIET_KE": return "Thiết kế";
    case "SAN_XUAT": return "Sản xuất";
    case "accepted": return "Accepted";
    case "completed": return "Completed";
    default: return null;
  }
};



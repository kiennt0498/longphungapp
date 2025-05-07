import moment from "moment";

    export const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(amount);
      };
    export  const formatDate = (date) => {
        return moment(date).format("DD/MM/YYYY");
      };
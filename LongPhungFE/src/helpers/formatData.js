import moment from "moment";

    export const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(amount);
      };

      export const formatNumber = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(amount);
      };
    export  const formatDate = (date) => {
        return moment(date).format("DD/MM/YYYY");
      };
import moment from "moment";

export const formatDate = (dateString) => {
  const date = moment(dateString, "DDMMYYYY");
  return date.format("DD MMM YYYY");
};

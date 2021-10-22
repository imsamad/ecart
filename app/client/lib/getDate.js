const getDate = (val) => {
  let date = new Date(orders[0]?.createdAt);
  date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  return date;
};
export default getDate;

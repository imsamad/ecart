const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
const format = (val) => currencyFormatter.format(Number(val).toFixed(2));
export default format;

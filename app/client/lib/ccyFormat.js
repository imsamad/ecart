const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
const format = (val) => currencyFormatter.format(val);
export default format;

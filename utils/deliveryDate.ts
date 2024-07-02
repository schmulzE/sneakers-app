export default function deliveryDate (interval: number) {
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + interval);
  const exactDay = tomorrow.toString().slice(3, 10)
  return exactDay;
}

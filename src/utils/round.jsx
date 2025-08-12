export default function round(value) {
  const num = Number(value);
  if (isNaN(num)) return "";
  return Math.round(num * 100) / 100;
}

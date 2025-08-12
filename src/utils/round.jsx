export default function round(val) {
  Number(val).toLocaleString("en-PK", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

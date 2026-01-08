// const timeFormat = (minutes) => {
//   const hours = Math.floor(minutes / 60);
//   const mintuesRemainder = minutes % 60;
//   return `${hours}h ${mintuesRemainder}m`;
// };

// export default timeFormat;


export default function timeformat(minutes) {
  if (!minutes) return "0h 0m";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

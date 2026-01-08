const timeFormat = (minutes) => {
  if (!minutes && minutes !== 0) return "N/A";

  const hours = Math.floor(minutes / 60);
  const minutesRemainder = minutes % 60;

  return hours > 0
    ? `${hours}h ${minutesRemainder}m`
    : `${minutesRemainder}m`;
};

export default timeFormat;

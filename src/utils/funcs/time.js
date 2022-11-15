function getFormatTime(time = Date.now) {
  return dayjs(time).format('YYYY-MM-DD dddd HH:mm');
}

import isSameDate from "./isSameDate";

export default function (
  vodDate: Date,
  onlineIntends: Date[],
  today: Date = new Date()
): boolean {
  for (const onlineIntend of onlineIntends) {
    // if there was a stream was today and he intends to stream tomorrow
    if (isSameDate(vodDate, today)) {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return isSameDate(onlineIntend, tomorrow);
    }

    return isSameDate(onlineIntend, today);
  }

  return false;
}

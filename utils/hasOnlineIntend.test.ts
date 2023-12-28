import { expect, test } from "vitest";
import hasOnlineIntend from "./hasOnlineIntend";

test("stream was yesterday, stream is today will return true", () => {
  const streamDate = new Date("2023-12-28T14:00:00.000Z");
  const onlineIntendDate = new Date("2023-12-29T14:00:00.000Z");
  const today = new Date("2023-12-29T10:00:00.000Z");

  const comesOnline = hasOnlineIntend(streamDate, [onlineIntendDate], today);

  expect(comesOnline).toBe(true);
});

test("stream was today, stream is tomorrow will return true", () => {
  const streamDate = new Date("2023-12-28T14:00:00.000Z");
  const onlineIntendDate = new Date("2023-12-29T14:00:00.000Z");
  const today = new Date("2023-12-28T10:00:00.000Z");

  const comesOnline = hasOnlineIntend(streamDate, [onlineIntendDate], today);

  expect(comesOnline).toBe(true);
});

test("stream was today, stream is next 2 days will return true", () => {
  const streamDate = new Date("2023-12-28T14:00:00.000Z");
  const onlineIntendDates = [
    new Date("2023-12-29T14:00:00.000Z"),
    new Date("2023-12-30T14:00:00.000Z"),
  ];
  const today = new Date("2023-12-29T10:00:00.000Z");
  const tomorrow = new Date("2023-12-29T10:00:00.000Z");

  const comesOnlineToday = hasOnlineIntend(
    streamDate,
    onlineIntendDates,
    today
  );
  const comesOnlineTomorrow = hasOnlineIntend(
    streamDate,
    onlineIntendDates,
    tomorrow
  );

  expect(comesOnlineToday).toBe(true);
  expect(comesOnlineTomorrow).toBe(true);
});

test("stream was today, no planned stream will return false", () => {
  const streamDate = new Date("2023-12-28T14:00:00.000Z");
  const today = new Date("2023-12-29T10:00:00.000Z");

  const comesOnline = hasOnlineIntend(streamDate, [], today);

  expect(comesOnline).toBe(false);
});

/*
Iterator-forEach 패턴은 리스트 프로세싱에서 이터레이터를 만들어둔 후 지연 평가를 통해 데이터를 소비하며 부수적인 효과(forEach)
를 발생시키는 패턴이다.
*/

import { pipe, flat, range, chunk, toArray, map, join } from "@fxts/core";

const getMonthEndDate = (monthEnd: Date) => {
  return monthEnd.getDate() === 6
    ? []
    : range(
      monthEnd.getDate() - monthEnd.getDay(),
      monthEnd.getDate() + 1,
    )
}

const generateCalendar = (prevMonthEnd: Date, currentMonthEnd: Date) => {
  return pipe(
    flat([
      getMonthEndDate(prevMonthEnd),
      range(1, currentMonthEnd.getDate() + 1),
      range(1, 6 - currentMonthEnd.getDay() + 1),
    ]),
    chunk(7),
    toArray,
  )
}

const formatCalendar = (calendar: number[][]) => {
  return pipe(
    calendar,
    map(map(day => (day < 10 ? ` ${day}` : day))),
    map(join(" ")),
    join("\n"),
  )
}

const renderCalendar = (year: number, month: number) => {
  pipe(
    generateCalendar(new Date(year, month - 1, 0), new Date(year, month, 0)),
    formatCalendar,
    console.log,
  )
}

renderCalendar(2025, 6);

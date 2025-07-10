export class Calendar {
  private today: Date;
  private currentYear: number;
  private currentMonth: number;

  constructor(date?: { year: number; month: number; day: number }) {
    this.today = date ? new Date(date.year, date.month, date.day) : new Date();
    this.currentYear = this.today.getFullYear();
    this.currentMonth = this.today.getMonth();
  }

  // getter
  getFirstDayOfMonth(year: number, month: number): Date {
    return new Date(year, month, 1);
  }

  getLastDayOfMonth(year: number, month: number): Date {
    return new Date(year, month + 1, 0);
  }

  generateCalendar(): (number | string)[][] {
    const firstDay = this.getFirstDayOfMonth(
      this.currentYear,
      this.currentMonth
    );
    const lastDay = this.getLastDayOfMonth(this.currentYear, this.currentMonth);

    const firstWeekDay = firstDay.getDay() - 1;
    const daysInMonth = lastDay.getDate();

    const calendarMatrix: (number | string)[][] = [];
    let week: (number | string)[] = [];

    const prevMonthLastDay = new Date(
      this.currentYear,
      this.currentMonth,
      0
    ).getDate();
    for (let i = firstWeekDay - 1; i >= 0; i--) {
      week.push(prevMonthLastDay - i);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        calendarMatrix.push(week);
        week = [];
      }
    }

    let nextMonthDay = 1;
    while (week.length < 7) {
      week.push(nextMonthDay++);
    }
    calendarMatrix.push(week);

    return calendarMatrix;
  }
}

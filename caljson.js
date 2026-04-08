const Calendar = Application("Calendar");
const now = new Date();

const result = [];

Calendar.calendars().forEach(cal => {
  cal.events().forEach(ev => {
    const start = ev.startDate();
    if (start >= now) {
      result.push({
        calendar: cal.name(),
        title: ev.summary(),
        start: start.toISOString(),
        end: ev.endDate().toISOString()
      });
    }
  });
});

JSON.stringify(result, null, 2);
const Calendar = Application("Calendar");
const result = [];

const cal = Calendar.calendars.byName("Agenda Perso");
const events = cal.events();

for (let i = 0; i < Math.min(events.length, 20); i++) {
  const ev = events[i];
  result.push({
    title: ev.summary(),
    startRaw: String(ev.startDate())
  });
}

JSON.stringify(result, null, 2);
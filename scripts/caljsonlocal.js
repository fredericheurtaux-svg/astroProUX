#!/usr/bin/osascript -l JavaScript

ObjC.import("Foundation");

const app = Application.currentApplication();
app.includeStandardAdditions = true;

const Calendar = Application("Calendar");
const now = new Date();

// Réglages
const wantedCalendars = ["Travail","frederic.heurtaux@freshdata.fr"];
const slotDurationMinutes = 30;
const numberOfDays = 21;

const workingHours = {
  start: "09:00",
  end: "18:00"
};

// Paramètres du POST
const postUrl = "http://localhost:3001/api/admin/availability";
const syncToken = "eigFz9x3qYr5jrByLbLfqpFfFd99ngxFMDMHPLct";

// -------- Helpers dates --------

function pad(n) {
  return String(n).padStart(2, "0");
}

function cloneDate(date) {
  return new Date(date.getTime());
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

function formatDateLocal(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function formatTimeLocal(date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function setTime(date, hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = cloneDate(date);
  d.setHours(h, m, 0, 0);
  return d;
}

function overlaps(start1, end1, start2, end2) {
  return start1 < end2 && end1 > start2;
}

function shellQuoteSingle(str) {
  return "'" + String(str).replace(/'/g, "'\"'\"'") + "'";
}

// -------- Extraction événements --------

const horizonEnd = new Date(now.getTime() + numberOfDays * 24 * 60 * 60 * 1000);
const events = [];

Calendar.calendars().forEach(cal => {
  const calName = cal.name();
  if (!wantedCalendars.includes(calName)) return;

  const evs = cal.events();

  for (let i = 0; i < evs.length; i++) {
    const ev = evs[i];

    const start = new Date(ev.startDate());
    const end = new Date(ev.endDate());

    if (end > now && start < horizonEnd) {
      events.push({
        start: start,
        end: end,
        allDay: ev.alldayEvent()
      });
    }
  }
});

// -------- Construction du JSON final --------

const result = {
  generatedAt: new Date().toISOString(),
  timezone: "Europe/Paris",
  slotDurationMinutes: slotDurationMinutes,
  days: {}
};

for (let i = 0; i < numberOfDays; i++) {
  const day = cloneDate(now);
  day.setHours(0, 0, 0, 0);
  day.setDate(day.getDate() + i);

  const dayKey = formatDateLocal(day);
  const dayStart = setTime(day, workingHours.start);
  const dayEnd = setTime(day, workingHours.end);

  result.days[dayKey] = { slots: {} };

  for (
    let slotStart = cloneDate(dayStart);
    slotStart < dayEnd;
    slotStart = addMinutes(slotStart, slotDurationMinutes)
  ) {
    const slotEnd = addMinutes(slotStart, slotDurationMinutes);
    const slotKey = formatTimeLocal(slotStart);

    let status = "free";

    if (slotEnd <= now) {
      status = "busy";
    } else {
      for (let j = 0; j < events.length; j++) {
        const ev = events[j];

        if (ev.allDay) {
          const evDayStart = cloneDate(ev.start);
          evDayStart.setHours(0, 0, 0, 0);

          const evDayEnd = cloneDate(ev.end);
          evDayEnd.setHours(0, 0, 0, 0);

          if (day >= evDayStart && day < evDayEnd) {
            status = "busy";
            break;
          }
        } else if (overlaps(slotStart, slotEnd, ev.start, ev.end)) {
          status = "busy";
          break;
        }
      }
    }

    result.days[dayKey].slots[slotKey] = status;
  }
}

// -------- POST vers le serveur Node.js --------

const json = JSON.stringify(result, null, 2);
const tmpFile = "/tmp/availability.json";

try {
  const nsString = $.NSString.alloc.initWithUTF8String(json);
  nsString.writeToFileAtomicallyEncodingError(
    $(tmpFile),
    true,
    $.NSUTF8StringEncoding,
    null
  );

  const cmd = `/usr/bin/curl -i -X POST ${postUrl}  \
-H "Content-Type: application/json" \
-H "x-sync-token: ${syncToken}" \
--data-binary @${tmpFile}`;

  const response = app.doShellScript(cmd);
  response;
} catch (e) {
  JSON.stringify({
    ok: false,
    error: String(e),
    tmpFile: tmpFile,
    payloadPreview: result.generatedAt
  }, null, 2);
}
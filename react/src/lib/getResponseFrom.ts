const getResponseFrom = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(url, options);

    if (response.ok) return await response.json();

    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  } catch (error) {
    console.table({ error });
    throw error;
  }
};

export default getResponseFrom;

// export const getWeekEvents = async (week: Week): Promise<CalendarEvent[]> => {
//   const referenceSundayValue = new Date(
//     new Date(week[0]).setHours(0, 0, 0),
//   ).toISOString();

//   const referenceSaturdayValue = new Date(
//     new Date(week[6]).setHours(0, 0, 0),
//   ).toISOString();

//   const queryString = `?start_gte=${referenceSundayValue}&start_lte=${referenceSaturdayValue}`;

//   try {
//     const response = await fetch(new URL(queryString, EVENTS_BASE_URL));
//     if (response.ok) return await response.json();

//     throw new Error('Error fetching events');
//   } catch (error) {
//     console.table({ error });
//     throw error;
//   }
// };

// export const postEvent = async (
//   event: CalendarEvent,
// ): Promise<CalendarEvent> => {
//   try {
//     const response = await fetch(EVENTS_BASE_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         ...event,
//         start: event.start.toISOString(),
//         end: event.end.toISOString(),
//       }),
//     });

//     if (response.ok) return await response.json();

//     throw new Error('Error posting event');
//   } catch (error) {
//     console.table({ error });
//     throw error;
//   }
// };

// export const deleteEventById = async (eventId: string): Promise<null> => {
//   try {
//     const response = await fetch(`${EVENTS_BASE_URL}/${eventId}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) return null;

//     throw new Error('Error deleting event');
//   } catch (error) {
//     console.table({ error });
//     throw error;
//   }
// };

export const groupByMonth = (events, locale = 'sv-SE') => {
  const groups = new Map();

  events.forEach((event) => {
    const date = new Date(event.eventDateTime);
    const monthYear = date.toLocaleString(locale, {
      month: 'long',
      year: 'numeric',
    });

    if (!groups.has(monthYear)) {
      groups.set(monthYear, []);
    }
    groups.get(monthYear).push(event);
  });

  // Sort by date
  const sortedGroups = new Map(
    Array.from(groups.entries()).sort(([a], [b]) => {
      const [monthA, yearA] = a.split(' ');
      const [monthB, yearB] = b.split(' ');
      const dateA = new Date(`${monthA} 1, ${yearA}`);
      const dateB = new Date(`${monthB} 1, ${yearB}`);
      return dateA - dateB;
    })
  );

  return sortedGroups;
};

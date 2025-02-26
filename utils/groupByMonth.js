const groupByMonth = (items) => {
  const itemsByMonth = {};

  items.forEach((item) => {
    if (!item.eventDateTime || !Array.isArray(item.eventDateTime)) return;

    // Group all event dates by month to avoid duplicate items in the same month
    const monthGroups = {};

    item.eventDateTime.forEach((dateString) => {
      const date = new Date(dateString);
      if (isNaN(date)) return;

      const monthYear = date.toLocaleDateString('sv-SE', {
        month: 'long',
        year: 'numeric',
      });

      if (!monthGroups[monthYear]) {
        monthGroups[monthYear] = [];
      }
      monthGroups[monthYear].push(dateString);
    });

    // Store the item only once per month
    Object.entries(monthGroups).forEach(([monthYear, dates]) => {
      if (!itemsByMonth[monthYear]) {
        itemsByMonth[monthYear] = [];
      }

      // Check if item already exists in that month
      const existingItem = itemsByMonth[monthYear].find(
        (i) => i._id === item._id
      );

      if (existingItem) {
        // Merge dates into the existing item
        existingItem.eventDates = [
          ...new Set([...existingItem.eventDates, ...dates]),
        ];
      } else {
        // Add the item with its event dates
        itemsByMonth[monthYear].push({
          ...item,
          eventDates: dates,
        });
      }
    });
  });

  return Object.entries(itemsByMonth)
    .sort(([a], [b]) => new Date(a) - new Date(b)) // Sort months chronologically
    .reduce((acc, [month, items]) => {
      acc[month] = items;
      return acc;
    }, {});
};

export default groupByMonth;

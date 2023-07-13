const formatDate = (date: Date) => {
  const format = new Date(date);
  return format.toLocaleDateString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export default formatDate;

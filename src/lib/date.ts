export const formatDate = (date: string)=> {
  const value = new Date(date);
  // Return date in format: DD/MM/YYYY
  return value.toLocaleDateString('en-GB');
}
export const formatDate = (date: string)=> {
  const value = new Date(date);
  return value.toLocaleDateString('es-ES');
}
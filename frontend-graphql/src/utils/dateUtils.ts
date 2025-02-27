import { formatDistance, format } from 'date-fns';

export const formatDate = (date: string | Date): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  return format(parsedDate, 'MMM d, yyyy');
};

export const formatRelativeTime = (date: string | Date): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  return formatDistance(parsedDate, new Date(), { addSuffix: true });
};
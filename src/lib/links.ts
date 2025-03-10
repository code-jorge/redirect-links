import type { ShortLink } from '../types';
import { getToken } from './auth';

export const getBaseURL = (): string=> {
  return window.location.origin;
}

export const createLink = async (targetUrl: string, shortCode: string = ''): Promise<ShortLink> => {
  const response = await fetch('/api/links', {
    method: 'POST',
    headers: { 'Authorization': getToken() },
    body: JSON.stringify({ targetUrl, shortCode }),
  });
  if (!response.ok) throw new Error('Failed to create link');
  return response.json();
}

export const getLinks = async (): Promise<ShortLink[]> => {
  const response = await fetch('/api/links', {
    headers: { 'Authorization': getToken() },
  });
  if (!response.ok) throw new Error('Failed to fetch links');
  return response.json();
}

export const updateLink = async (id: string, targetUrl: string): Promise<ShortLink> => {
  const response = await fetch(`/api/links/${id}`, {
    method: 'PUT',
    headers: { 'Authorization': getToken() },
    body: JSON.stringify({ targetUrl }),
  });
  
  if (!response.ok) throw new Error('Failed to update link');
  return response.json();
}

export const deleteLink = async (id: string): Promise<void> => {
  const response = await fetch(`/api/links/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': getToken() },
  });
  if (!response.ok) throw new Error('Failed to delete link');
  return Promise.resolve();
}
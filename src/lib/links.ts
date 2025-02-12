import type { ShortLink } from '../types';

export async function createLink(targetUrl: string): Promise<ShortLink> {
  const response = await fetch('/api/links', {
    method: 'POST',
    body: JSON.stringify({ targetUrl }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create link');
  }
  
  return response.json();
}

export async function getLinks(): Promise<ShortLink[]> {
  const response = await fetch('/api/links');
  
  if (!response.ok) {
    throw new Error('Failed to fetch links');
  }
  
  return response.json();
}

export async function updateLink(id: string, targetUrl: string): Promise<ShortLink> {
  const response = await fetch(`/api/links/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ targetUrl }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update link');
  }
  
  return response.json();
}

export async function deleteLink(id: string): Promise<void> {
  const response = await fetch(`/api/links/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete link');
  }
}
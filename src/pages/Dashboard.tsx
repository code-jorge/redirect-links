import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';
import { getLinks, createLink, updateLink, deleteLink } from '../lib/links';
import type { ShortLink } from '../types';

export default function Dashboard() {
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [newUrl, setNewUrl] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState('');

  useEffect(() => {
    loadLinks();
  }, []);

  async function loadLinks() {
    const data = await getLinks();
    setLinks(data);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newUrl) return;

    try {
      await createLink(newUrl);
      setNewUrl('');
      await loadLinks();
    } catch (error) {
      console.error('Failed to create link:', error);
    }
  }

  async function handleUpdate(id: string) {
    try {
      await updateLink(id, editUrl);
      setEditingId(null);
      await loadLinks();
    } catch (error) {
      console.error('Failed to update link:', error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this link?')) return;

    try {
      await deleteLink(id);
      await loadLinks();
    } catch (error) {
      console.error('Failed to delete link:', error);
    }
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleCreate} className="flex gap-4 mb-6">
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Enter URL to shorten"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Link
          </button>
        </form>

        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Short Link</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Target URL</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Created</th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {links.map((link) => (
                    <tr key={link.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        <a
                          href={`/${link.shortCode}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          me.co/{link.shortCode}
                        </a>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {editingId === link.id ? (
                          <input
                            type="url"
                            value={editUrl}
                            onChange={(e) => setEditUrl(e.target.value)}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        ) : (
                          <a
                            href={link.targetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-900 hover:text-gray-600"
                          >
                            {link.targetUrl}
                          </a>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {link.createdAt}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        {editingId === link.id ? (
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => handleUpdate(link.id)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Save className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => {
                                setEditingId(link.id);
                                setEditUrl(link.targetUrl);
                              }}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(link.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import DeleteLinkModal from '../../components/DeleteLinkModal/DeleteLinkModal';
import CreateLinkModal from '../../components/CreateLinkModal/CreateLinkModal';
import LinksTable from '../../components/LinksTable/LinksTable';
import { getLinks, createLink, updateLink, deleteLink } from '../../lib/links';
import type { ShortLink } from '../../types';
import css from './Dashboard.module.css';

const Dashboard = ()=> {
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [newUrl, setNewUrl] = useState<string>('');
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async ()=> {
    const data = await getLinks();
    setLinks(data);
  }

  const handleCreate = async (e: React.FormEvent)=> {
    e.preventDefault();
    if (!newUrl) {
      setShowCreateModal(true);
      return;
    }
    try {
      await createLink(newUrl);
      setNewUrl('');
      await loadLinks();
    } catch (error) {
      console.error('Failed to create link:', error);
    }
  }

  const handleCreateLink = async (targetUrl: string, shortCode: string)=> {
    setShowCreateModal(false);
    await createLink(targetUrl, shortCode);
    await loadLinks();
  }

  const handleUpdate = async (id: string, editUrl: string)=> {
    await updateLink(id, editUrl);
    await loadLinks();
  }

  const handleDelete = async (id: string)=> {
    setShowConfirmDelete(true);
    setDeletingId(id);
  }

  const handleCancelDelete = ()=> {
    setShowConfirmDelete(false);
    setDeletingId(null);
  }

  const handleConfirmDelete = async (id: string)=> {
    setShowConfirmDelete(false);
    setDeletingId(null);
    try {
      await deleteLink(id);
      await loadLinks();
    } catch (error) {
      console.error('Failed to delete link:', error);
    }
  }

  return (
    <div className={css.container}>
      <div className={css.content}>
        <form onSubmit={handleCreate} className={css.form}>
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Escribe una URL para acortar"
            className={css.input}
          />
          <button
            type="submit"
            className={css.submit}
          >
            <Plus className={css.submitIcon} />
            Crear link
          </button>
        </form>
        <div className={css.links}>
          <div className={css.linksContent}>
            <div className={css.linksTableWrapper}>
              <LinksTable
                links={links}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
      <CreateLinkModal
        isOpen={showCreateModal}
        onClose={()=> setShowCreateModal(false)}
        onCreate={handleCreateLink}
      />
      <DeleteLinkModal
        isOpen={showConfirmDelete}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        link={links.find((link) => link.id === deletingId)}
      />
    </div>
  );
}

export default Dashboard;
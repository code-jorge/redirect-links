import { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import DeleteLinkModal from '../../components/DeleteLinkModal/DeleteLinkModal';
import CreateLinkModal from '../../components/CreateLinkModal/CreateLinkModal';
import LinksTable from '../../components/LinksTable/LinksTable';
import { getLinks, createLink, updateLink, deleteLink } from '../../lib/links';
import type { ShortLink } from '../../types';
import css from './Dashboard.module.css';

const Dashboard = ()=> {
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async ()=> {
    setLoading(true);
    try {
      const data = await getLinks();
      setLinks(data);
    } catch (error) {
      console.error('Failed to load links:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleCreate = ()=> {
    setShowCreateModal(true);
  }

  const handleCreateLink = async (targetUrl: string, shortCode: string)=> {
    setShowCreateModal(false);
    try {
      await createLink(targetUrl, shortCode);
      await loadLinks();
    } catch (error) {
      console.error('Failed to create link:', error);
    }
  }

  const handleUpdate = async (id: string, editUrl: string)=> {
    try {
      await updateLink(id, editUrl);
      await loadLinks();
    } catch (error) {
      console.error('Failed to update link:', error);
    }
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
        <button
          onClick={handleCreate}
          className={css.submit}
        >
          <Plus className={css.submitIcon} />
          Crear link
        </button>
        <div className={css.links}>
          <div className={css.linksContent}>
            <div className={css.linksTableWrapper}>
              {loading ? (
                <div className={css.loading}>
                  <Loader2 className={css.loadingIcon} />
                  <span>Cargando enlaces...</span>
                </div>
              ) : links.length === 0 ? (
                <div className={css.empty}>
                  <span>No hay enlaces todavía. Crea tu primer enlace.</span>
                </div>
              ) : (
                <LinksTable
                  links={links}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              )}
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
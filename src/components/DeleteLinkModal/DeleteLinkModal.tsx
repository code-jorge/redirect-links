import { getBaseURL } from '../../lib/links';
import { ShortLink } from '../../types';
import css from './DeleteLinkModal.module.css';

interface DeleteLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  link?: ShortLink;
}

const DeleteLinkModal = ({
  isOpen,
  onClose,
  onConfirm,
  link,
}: DeleteLinkModalProps)=> {
  if (!isOpen) return null;
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <div className={css.header}>
          <h3 className={css.title}>Delete Link</h3>
        </div>
        <div className={css.content}>
          {link ? (
            <p>
              Are you sure you want to delete <strong>{getBaseURL()}/r/{link.shortCode}</strong>?
              This action cannot be undone.
            </p>
          ) : (
            <p>
              Are you sure you want to delete this link? This action cannot be undone.
            </p>
          )}
        </div>
        <div className={css.footer}>
          <button onClick={onClose} className={css.buttonSecondary}>
            Cancel
          </button>
          <button
            disabled={!link}
            onClick={()=> onConfirm(link?.id || '')} 
            className={css.buttonDanger}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteLinkModal;
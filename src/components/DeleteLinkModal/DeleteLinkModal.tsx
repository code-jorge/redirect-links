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
          <h3 className={css.title}>Borrar enlace</h3>
        </div>
        <div className={css.content}>
          {link ? (
            <p>
              ¿Estás seguro de que deseas borrar <strong>{getBaseURL()}/r/{link.shortCode}</strong>?
              Esta acción no se puede deshacer.
            </p>
          ) : (
            <p>
              ¿Estás seguro de que deseas borrar este enlace? Esta acción no se puede deshacer.
            </p>
          )}
        </div>
        <div className={css.footer}>
          <button onClick={onClose} className={css.buttonSecondary}>
            Cancelar
          </button>
          <button
            disabled={!link}
            onClick={()=> onConfirm(link?.id || '')}
            className={css.buttonDanger}
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteLinkModal;
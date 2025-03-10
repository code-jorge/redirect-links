import { useState } from 'react';
import { Pencil, Trash2, Save, X, Copy, Check } from 'lucide-react';
import { getBaseURL } from '../../lib/links';
import type { ShortLink } from '../../types';
import { formatDate } from '../../lib/date';
import css from './LargeLinksTable.module.css';

interface LargeLinksTableProps {
  links: ShortLink[];
  onUpdate: (id: string, url: string) => void;
  onDelete: (id: string) => void;
}

const LargeLinksTable = ({ links=[], onUpdate, onDelete }: LargeLinksTableProps)=> {

  const [editingId, setEditingId] = useState<string>('');
  const [editUrl, setEditUrl] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string>('');

  const copyToClipboard = async (shortCode: string, id: string)=> {
    try {
      await navigator.clipboard.writeText(`${getBaseURL()}/r/${shortCode}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(''), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }

  const handleUpdate = async ()=> {
    if (!editingId || !editUrl) return;
    try {
      onUpdate(editingId, editUrl);
      setEditingId('');
    }
    catch (error) {
      console.error('Failed to update link:', error);
    }
  }

  return (
    <table className={css.table}>
      <thead className={css.tableHead}>
        <tr>
          <th scope="col" className={css.linkCol}>Link</th>
          <th scope="col" className={css.targetCol}>URL</th>
          <th scope="col" className={css.creationCol}>Fecha</th>
          <th scope="col" className={css.actionsCol} />
        </tr>
      </thead>
      <tbody className={css.tableBody}>
        {links.map((link) => (
          <tr key={link.id} className={css.row}>
            <td className={css.linkCell}>
              <div className={css.linkCellContent}>
                <a
                  href={`/r/${link.shortCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css.linkCellLink}
                >
                  {getBaseURL()}/r/{link.shortCode}
                </a>
                <button
                  onClick={() => copyToClipboard(link.shortCode, link.id)}
                  className={css.linkCellCopy}
                  title="Copiar enlace"
                >
                  {copiedId === link.id ? (
                    <Check className={css.successIcon} />
                  ) : (
                    <Copy className={css.icon} />
                  )}
                </button>
              </div>
            </td>
            <td className={css.targetCell}>
              {editingId === link.id ? (
                <input
                  type="url"
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  className={css.targetCellInput}
                />
              ) : (
                <a
                  href={link.targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css.targetCellLink}
                >
                  {link.targetUrl}
                </a>
              )}
            </td>
            <td className={css.creationCell}>
              {formatDate(link.createdAt)}
            </td>
            <td className={css.actionsCell}>
              {editingId === link.id ? (
                <div className={css.actions}>
                  <button
                    onClick={handleUpdate}
                    className={css.actionEdit}
                    title="Guardar"
                  >
                    <Save className={css.icon} />
                  </button>
                  <button
                    onClick={() => setEditingId('')}
                    className={css.actionCancel}
                    title="Cancelar"
                  >
                    <X className={css.icon} />
                  </button>
                </div>
              ) : (
                <div className={css.actions}>
                  <button
                    onClick={() => {
                      setEditingId(link.id);
                      setEditUrl(link.targetUrl);
                    }}
                    className={css.actionEdit}
                    title="Editar"
                  >
                    <Pencil className={css.icon} />
                  </button>
                  <button
                    onClick={() => onDelete(link.id)}
                    className={css.actionDelete}
                    title="Borrar"
                  >
                    <Trash2 className={css.icon} />
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default LargeLinksTable;
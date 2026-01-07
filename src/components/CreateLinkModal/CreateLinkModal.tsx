import React, { useState, useEffect, useCallback } from 'react';
import { getBaseURL, checkShortCodeExists } from '../../lib/links';
import css from './CreateLinkModal.module.css';

interface CreateLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (targetUrl: string, shortCode: string) => Promise<void>;
}

const CreateLinkModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateLinkModalProps)=> {
  const [targetUrl, setTargetUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  const checkDuplicate = useCallback(async (code: string) => {
    if (!code) {
      setWarning('');
      return;
    }
    try {
      const exists = await checkShortCodeExists(code);
      if (exists) {
        setWarning('Este código corto ya existe. Si continúas, se sobrescribirá el enlace existente.');
      } else {
        setWarning('');
      }
    } catch {
      setWarning('');
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkDuplicate(shortCode);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [shortCode, checkDuplicate]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!targetUrl || !shortCode) {
      setError('Es necesario completar todos los campos');
      return;
    }

    try {
      await onCreate(targetUrl, shortCode);
      setTargetUrl('');
      setShortCode('');
      setWarning('');
      onClose();
    } catch (err) {
      setError('Error al crear el código.');
    }
  }

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <form onSubmit={handleSubmit}>
          <div className={css.header}>
            <h3 className={css.title}>Crear link personalizado</h3>
          </div>
          <div className={css.content}>
            {error && (
              <div className={css.error}>
                {error}
              </div>
            )}
            <div className={css.form}>
              <div className={css.field}>
                <label
                  htmlFor="targetUrl"
                  className={css.label}
                >
                  Escribe una URL para acortar
                </label>
                <input
                  type="url"
                  id="targetUrl"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className={css.urlInput}
                  placeholder="https://example.com"
                />
              </div>
              <div className={css.field}>
                <label
                  htmlFor="shortCode"
                  className={css.label}
                >
                  Código corto
                </label>
                <div className="flex items-center">
                  <span className={css.prefix}>{getBaseURL()}/r/</span>
                  <input
                    type="text"
                    id="shortCode"
                    value={shortCode}
                    onChange={(e) => setShortCode(e.target.value)}
                    className={css.codeInput}
                    placeholder="codigo"
                  />
                </div>
                {warning && (
                  <div className={css.warning}>
                    {warning}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={css.footer}>
            <button
              type="button"
              onClick={onClose}
              className={css.buttonSecondary}
            >
              Cancelar
            </button>
            <button type="submit" className={css.buttonPrimary}>
              Crear Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateLinkModal;
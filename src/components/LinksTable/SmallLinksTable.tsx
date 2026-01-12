import { useState } from "react";
import { ShortLink } from "../../types";
import css from "./SmallLinksTable.module.css";
import { getBaseURL } from "../../lib/links";
import { copyToClipboard } from "../../lib/clipboard";
import { Check, Copy } from "lucide-react";

interface SmallLinksTableProps {
  links: ShortLink[];
}

const SmallLinksTable = ({ links=[] }: SmallLinksTableProps)=> {

  const [copiedId, setCopiedId] = useState<string>('');

  const handleCopy = async (shortCode: string, id: string)=> {
    const success = await copyToClipboard(`${getBaseURL()}/r/${shortCode}`);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(''), 2000);
    }
  }

  return (
    <div className={css.main}>
      <div className={css.title}>
        <h2 className={css.titleText}>Enlaces</h2>
      </div>
      <ul className={css.list}>
        {links.map((link) => (
          <li key={link.id} className={css.row}>
            <div className={css.shortLink}>
              <a
                href={`/r/${link.shortCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className={css.link}
              >
                {getBaseURL()}/r/{link.shortCode}
              </a>
              <button
                onClick={() => handleCopy(link.shortCode, link.id)}
                className={css.copy}
                aria-label="Copiar enlace"
              >
                {copiedId === link.id ? (
                  <Check className={css.successIcon} />
                ) : (
                  <Copy className={css.icon} />
                )}
              </button>
            </div>
            <div className={css.target}>
              <span className={css.targetLink}>
                {link.targetUrl}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SmallLinksTable;
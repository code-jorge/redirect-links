import { ShortLink } from "../../types";
import LargeLinksTable from "./LargeLinksTable";
import SmallLinksTable from "./SmallLinksTable";

interface LinksTableProps {
  links: ShortLink[];
  onUpdate: (id: string, url: string) => void;
  onDelete: (id: string) => void;
}

const LinksTable = ({ links=[], onUpdate, onDelete }: LinksTableProps)=> (
  <>
    <LargeLinksTable links={links} onUpdate={onUpdate} onDelete={onDelete} />
    <SmallLinksTable links={links} />
  </>
)

export default LinksTable;
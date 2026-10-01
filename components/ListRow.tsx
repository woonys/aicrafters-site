import Link from "next/link";
import { Icon, type IconName } from "./Icon";

const Chevron = () => (
  <svg className="chev" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M7.5 4.5 13 10l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function ListRow({ href, icon, title, desc, soon }: { href?: string; icon: IconName; title: string; desc: string; soon?: boolean }) {
  const inner = (
    <>
      <span className="icon"><Icon name={icon} /></span>
      <span className="body">
        <span className="t4" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {title}
          {soon && <span className="badge soon">준비 중</span>}
        </span>
        <span className="caption" style={{ display: "block" }}>{desc}</span>
      </span>
      {href && <Chevron />}
    </>
  );
  return href ? (
    <Link className="list-row" href={href}>{inner}</Link>
  ) : (
    <div className="list-row disabled" aria-disabled="true">{inner}</div>
  );
}

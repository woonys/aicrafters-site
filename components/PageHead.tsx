import Link from "next/link";

export function PageHead({
  title,
  caption,
  crumb,
}: {
  title: string;
  caption?: string;
  crumb?: { href: string; label: string };
}) {
  return (
    <div className="page-head">
      {crumb && (
        <div className="crumbs">
          <Link href={crumb.href}>{crumb.label}</Link> ›
        </div>
      )}
      <h1 className="t1">{title}</h1>
      {caption && <p className="caption">{caption}</p>}
    </div>
  );
}

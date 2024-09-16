import Link from "next/link";

export default function CommunityNavItem({ title, description, className = "", url = "" }: { title: string; description: string; className?: string; url?: string }) {
  const Component = url ? Link : "div";

  return (
    <Component href={url} className={`grid gap-4 ${className}`}>
      <div className="font-semibold text-xs leading-3.3 uppercase tracking-3">{title}</div>
      <div className="text-sm font-light lg:w-full lg:pr-7 ">{description} </div>
    </Component>
  );
}

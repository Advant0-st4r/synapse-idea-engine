// src/components/forum/ForumList.tsx
import React from "react";
import ForumItem from "./ForumItem";

export default function ForumList({ items }: { items: any[] }) {
  if (!items?.length) return <div className="py-12 text-center text-muted-foreground">No ideas shared yet — be the first.</div>;

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <ForumItem key={item.id} item={item} />
      ))}
    </div>
  );
}

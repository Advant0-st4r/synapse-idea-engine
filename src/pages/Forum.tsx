import React, { useEffect, useState } from "react";
import ForumList from "../components/forum/ForumList";
import { Button } from "../components/ui/button";
import { getSharedIdeas } from "../lib/api";

export default function Forum() {
  const [ideas, setIdeas] = useState<any[]>([]);
  const [sort, setSort] = useState<"top" | "new">("top");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getSharedIdeas({ sort, page: 1, limit: 20 });
        setIdeas(res.items ?? []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [sort]);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Community Ideas</h1>
        <div className="flex gap-2">
          <Button variant={sort === "top" ? "default" : "ghost"} onClick={() => setSort("top")}>Top</Button>
          <Button variant={sort === "new" ? "default" : "ghost"} onClick={() => setSort("new")}>New</Button>
        </div>
      </div>

      <div>{loading ? <div className="text-center py-8">Loading…</div> : <ForumList items={ideas} />}</div>
    </div>
  );
}


import React, { useEffect, useState } from "react";
import ForumList from "../components/forum/ForumList";
import { Button } from "@/components/ui/button";
import { getSharedIdeas } from "@/lib/api";

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
        <div>
          <Button onClick={() => setSort("top")}>Top</Button>
          <Button onClick={() => setSort("new")}>New</Button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ForumList ideas={ideas} />
      )}
    </div>
  );
}

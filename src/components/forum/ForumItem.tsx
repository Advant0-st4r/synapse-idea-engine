import React, { useState } from "react";
import VoteButton from "./VoteButton";
import { Button } from "../ui/button";
import { Mail, Linkedin, Twitter } from "lucide-react";

export default function ForumItem({ item }: { item: any }) {
  const [counts, setCounts] = useState({ up: item.upvote_count ?? 0, down: item.downvote_count ?? 0 });
  const [userVote, setUserVote] = useState<number | null>(item.userVote ?? null);
  const [busy, setBusy] = useState(false);

  const onVote = async (v: 1 | -1) => {
    if (busy) return;
    setBusy(true);
    const prev = { ...counts, userVote };
    if (v === 1) {
      setCounts((c) => ({ ...c, up: userVote === 1 ? c.up - 1 : c.up + 1, down: userVote === -1 ? Math.max(c.down - 1, 0) : c.down }));
      setUserVote(userVote === 1 ? null : 1);
    } else {
      setCounts((c) => ({ ...c, down: userVote === -1 ? c.down - 1 : c.down + 1, up: userVote === 1 ? Math.max(c.up - 1, 0) : c.up }));
      setUserVote(userVote === -1 ? null : -1);
    }

    try {
      const res = await fetch(`/api/forum/${item.id}/vote`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ vote: v }),
      }).then((r) => r.json());

      setCounts({ up: res.upvote_count ?? 0, down: res.downvote_count ?? 0 });
      setUserVote(res.userVote ?? null);
    } catch (e) {
      setCounts({ up: prev.up, down: prev.down });
      setUserVote(prev.userVote ?? null);
      console.error(e);
    } finally {
      setBusy(false);
    }
  };

  const openContact = (type: "email" | "linkedin" | "twitter") => {
    if (type === "email" && item.contact_email) window.location.href = `mailto:${item.contact_email}`;
    if (type === "linkedin" && item.linkedin_url) window.open(item.linkedin_url, "_blank");
    if (type === "twitter" && item.twitter_url) window.open(item.twitter_url, "_blank");
  };

  return (
    <div className="bg-card p-4 rounded-2xl shadow-sm flex gap-4 items-start">
      <div className="flex flex-col items-center pt-1">
        <VoteButton active={userVote === 1} onClick={() => onVote(1)} ariaLabel="upvote" count={counts.up} />
        <div className="h-2" />
        <VoteButton active={userVote === -1} down onClick={() => onVote(-1)} ariaLabel="downvote" count={counts.down} />
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sm text-muted-foreground">{item.shared_by_display ?? "Anonymous"}</div>
            <h3 className="text-lg font-medium truncate">{item.title}</h3>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={() => openContact("email")} title="Email">
              <Mail size={16} />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => openContact("linkedin")} title="LinkedIn">
              <Linkedin size={16} />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => openContact("twitter")} title="Twitter">
              <Twitter size={16} />
            </Button>
          </div>
        </div>

        <p className="mt-2 text-sm text-muted-foreground overflow-hidden" style={{ WebkitLineClamp: 3, display: "-webkit-box", WebkitBoxOrient: "vertical" }}>
          {item.body}
        </p>
        <div className="mt-3 text-xs text-muted-foreground">Shared {new Date(item.created_at).toLocaleString()}</div>
      </div>
    </div>
  );
}


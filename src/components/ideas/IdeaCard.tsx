// src/components/IdeaCard.tsx
import React, { useMemo, useState } from "react";
import ShareModal from "./forum/ShareModal"; // relative path based on file location
import { Button } from "./ui/button";
import { Share2, MoreHorizontal } from "lucide-react";

type Idea = {
  id: string;
  title?: string;
  name?: string;
  description?: string;
  prompt?: string;
};

type IdeaCardProps = {
  idea: Idea;
  onOpen?: () => void;
  className?: string;
};

export default function IdeaCard({ idea, onOpen, className = "" }: IdeaCardProps) {
  const [shareOpen, setShareOpen] = useState(false);

  const ideaForShare = useMemo(
    () => ({
      id: idea.id,
      title: idea.title ?? idea.name ?? "Untitled idea",
      body: idea.description ?? idea.prompt ?? "",
    }),
    [idea]
  );

  return (
    <>
      <ShareModal open={shareOpen} onOpenChange={setShareOpen} idea={ideaForShare} />
      <div className={`bg-card p-4 rounded-2xl shadow-sm ${className}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sm text-muted-foreground">{/* author/tag */}</div>
            <h3 className="text-lg font-medium truncate">{idea.title ?? idea.name ?? "Untitled"}</h3>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" aria-label="share-to-community" onClick={() => setShareOpen(true)} title="Share to community">
              <Share2 size={16} />
            </Button>

            <Button size="sm" variant="ghost" aria-label="more" onClick={() => onOpen?.()}>
              <MoreHorizontal size={16} />
            </Button>
          </div>
        </div>

        <p className="mt-3 text-sm text-muted-foreground overflow-hidden" style={{ WebkitLineClamp: 4, display: "-webkit-box", WebkitBoxOrient: "vertical" }}>
          {idea.description ?? idea.prompt ?? "No description"}
        </p>

        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <div>{/* metadata */}</div>
        </div>
      </div>
    </>
  );
}

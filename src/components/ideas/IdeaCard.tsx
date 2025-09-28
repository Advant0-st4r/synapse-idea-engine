import React, { useMemo, useState } from "react";
import ShareModal from "@/components/forum/ShareModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"; // optional: if your project exports Card; otherwise adjust wrapper
import { Share2, MoreHorizontal } from "lucide-react";

type Idea = {
  id: string;
  title?: string;
  name?: string;
  description?: string;
  prompt?: string;
  // add other fields your app uses
};

type IdeaCardProps = {
  idea: Idea;
  // optional callbacks or props your existing card expects
  onOpen?: () => void;
  className?: string;
};

export default function IdeaCard({ idea, onOpen, className = "" }: IdeaCardProps) {
  const [shareOpen, setShareOpen] = useState(false);

  // shape a small object to pass to the Share modal
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
      {/* Share modal (keeps theme consistent) */}
      <ShareModal open={shareOpen} onOpenChange={setShareOpen} idea={ideaForShare} />

      {/* Card wrapper — replace with your project's Card component if different */}
      <div className={`bg-card p-4 rounded-2xl shadow-sm ${className}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sm text-muted-foreground">{/* optional: author or tag */}</div>
            <h3 className="text-lg font-medium truncate">{idea.title ?? idea.name ?? "Untitled"}</h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Keep existing action buttons — this Share button is the only required addition */}
            <Button
              size="sm"
              variant="ghost"
              aria-label="share-to-community"
              onClick={() => setShareOpen(true)}
              title="Share to community"
            >
              <Share2 size={16} />
            </Button>

            {/* Example placeholder for other actions you may have (edit, more, etc.) */}
            <Button size="sm" variant="ghost" aria-label="more" onClick={() => onOpen?.()}>
              <MoreHorizontal size={16} />
            </Button>
          </div>
        </div>

        {/* Body / description */}
        <p
          className="mt-3 text-sm text-muted-foreground overflow-hidden"
          style={{
            WebkitLineClamp: 4,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
        >
          {idea.description ?? idea.prompt ?? "No description"}
        </p>

        {/* Optional footer area — keep any existing buttons/metadata here */}
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <div>{/* e.g. created/updated timestamp or tags */}</div>
          <div className="flex items-center gap-2">
            {/* If you want a lightweight copy-paste share (not required), keep here */}
            {/* <Button size="sm" variant="outline">Use</Button> */}
          </div>
        </div>
      </div>
    </>
  );
}

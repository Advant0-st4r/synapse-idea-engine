import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Twitter } from "lucide-react";
import VoteButton from "./VoteButton";

interface IdeaItemProps {
  item: {
    shared_by_display?: string;
    title: string;
    body: string;
    created_at: string;
  };
  userVote: number;
  counts: { up: number; down: number };
  onVote: (vote: 1 | -1) => void;
  openContact: (type: "email" | "linkedin" | "twitter") => void;
}

export default function IdeaItem({ item, userVote, counts, onVote, openContact }: IdeaItemProps) {
  return (
    <div className="flex gap-4">
      {/* Vote buttons */}
      <div className="flex flex-col items-center pt-1">
        <VoteButton
          active={userVote === 1}
          onClick={() => onVote(1)}
          ariaLabel="upvote"
          count={counts.up}
        />
        <div className="h-2" />
        <VoteButton
          active={userVote === -1}
          down
          onClick={() => onVote(-1)}
          ariaLabel="downvote"
          count={counts.down}
        />
      </div>

      {/* Idea content */}
      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sm text-muted-foreground">
              {item.shared_by_display ?? "Anonymous"}
            </div>
            <h3 className="text-lg font-medium truncate">{item.title}</h3>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={() => openContact("email")} title="Email">
              <Mail size={16} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => openContact("linkedin")}
              title="LinkedIn"
            >
              <Linkedin size={16} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => openContact("twitter")}
              title="Twitter"
            >
              <Twitter size={16} />
            </Button>
          </div>
        </div>

        <p
          className="mt-2 text-sm text-muted-foreground overflow-hidden"
          style={{ WebkitLineClamp: 3, display: "-webkit-box", WebkitBoxOrient: "vertical" }}
        >
          {item.body}
        </p>
        <div className="mt-3 text-xs text-muted-foreground">
          Shared {new Date(item.created_at).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

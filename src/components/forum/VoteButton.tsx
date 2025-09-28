import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";

interface VoteButtonProps {
  active?: boolean;
  down?: boolean;
  onClick: () => void;
  count: number;
  ariaLabel?: string;
}

export default function VoteButton({
  active,
  down,
  onClick,
  count,
  ariaLabel,
}: VoteButtonProps) {
  return (
    <div className="flex flex-col items-center select-none">
      <Button
        size="sm"
        variant={active ? "default" : "ghost"}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {down ? <ArrowBigDown size={14} /> : <ArrowBigUp size={14} />}
      </Button>
      <div className="text-xs mt-1">{count}</div>
    </div>
  );
}

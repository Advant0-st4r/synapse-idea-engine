import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onShareIdea: (data: {
    title: string;
    body?: string;
    email?: string;
    linkedin?: string;
    twitter?: string;
  }) => Promise<void>;
}

export default function ShareModal({ open, onOpenChange, onShareIdea }: ShareModalProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [loading, setLoading] = useState(false);

  const onShare = async () => {
    setLoading(true);
    try {
      await onShareIdea({ title, body, email, linkedin, twitter });
      onOpenChange(false); // close modal after sharing
    } catch (e) {
      console.error(e);
      // TODO: show toast error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <div className="p-4 w-[min(720px,calc(100vw-32px))]">
        <h3 className="text-lg font-semibold mb-3">Share to community</h3>
        <div className="space-y-3">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Short title" />
          <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Describe this idea (optional)" />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Contact email (optional)" />
          <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="LinkedIn URL (optional)" />
          <Input value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="Twitter URL (optional)" />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onShare} disabled={loading}>
            {loading ? "Sharing..." : "Share"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

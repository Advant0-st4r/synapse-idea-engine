import React, { useEffect, useState } from "react";
// Use relative imports so Vite won't fail resolving aliases
import Modal from "../ui/modal";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { shareIdea } from "../../lib/api";

export default function ShareModal({ open, onOpenChange, idea }: any) {
  const [title, setTitle] = useState(idea?.title ?? "");
  const [body, setBody] = useState(idea?.body ?? "");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(idea?.title ?? "");
    setBody(idea?.body ?? "");
  }, [idea]);

  const onShare = async () => {
    setLoading(true);
    try {
      await shareIdea({ ideaId: idea?.id, title, body, contactEmail: email, linkedin, twitter });
      // TODO: show toast success (use your toast)
      onOpenChange(false);
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
          <Button onClick={onShare} disabled={loading}>{loading ? "Sharing..." : "Share"}</Button>
        </div>
      </div>
    </Modal>
  );
}

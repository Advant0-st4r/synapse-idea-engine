// Small client helpers to centralize calls used by the forum UI

export interface SharedIdeasParams {
  sort?: "top" | "new";
  page?: number;
  limit?: number;
}

export interface IdeaPayload {
  title: string;
  body?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
}

export async function getSharedIdeas({ sort = "top", page = 1, limit = 20 }: SharedIdeasParams = {}) {
  const qs = new URLSearchParams({ sort, page: String(page), limit: String(limit) });
  const res = await fetch(`/api/forum?${qs.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch shared ideas");
  return res.json();
}

export async function shareIdea(payload: IdeaPayload) {
  const res = await fetch(`/api/forum/share`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to share idea");
  return res.json();
}

export async function voteIdea(id: string, vote: 1 | -1) {
  const res = await fetch(`/api/forum/${id}/vote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ vote }),
  });
  if (!res.ok) throw new Error("Failed to vote");
  return res.json();
}

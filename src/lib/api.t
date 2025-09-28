export async function getSharedIdeas({ sort = "top", page = 1, limit = 20 } = {}) {
  const qs = new URLSearchParams({ sort, page: String(page), limit: String(limit) });
  const res = await fetch(`/api/forum?${qs.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch shared ideas");
  return res.json();
}

export async function shareIdea(payload: any) {
  const res = await fetch(`/api/forum/share`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to share idea");
  return res.json();
}

export async function voteIdea(id: string, vote: 1 | -1) {
  const res = await fetch(`/api/forum/${id}/vote`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ vote }),
  });
  if (!res.ok) throw new Error("Failed to vote");
  return res.json();
}


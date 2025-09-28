// src/lib/api.ts
// Small client helpers used by the forum UI.
// The UI expects these endpoints to exist on the backend: 
// GET /api/forum, POST /api/forum/share, POST /api/forum/:id/vote

export async function getSharedIdeas({ sort = "top", page = 1, limit = 20 } = {}) {
  const qs = new URLSearchParams({ sort, page: String(page), limit: String(limit) });
  const res = await fetch(`/api/forum?${qs.toString()}`);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to fetch shared ideas: ${res.status} ${text}`);
  }
  return res.json();
}

export async function shareIdea(payload: any) {
  const res = await fetch(`/api/forum/share`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to share idea: ${res.status} ${text}`);
  }
  return res.json();
}

export async function voteIdea(id: string, vote: 1 | -1) {
  const res = await fetch(`/api/forum/${id}/vote`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ vote }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to vote: ${res.status} ${text}`);
  }
  return res.json();
}

    headers: { "content-type": "application/json" },
    body: JSON.stringify({ vote }),
  });
  if (!res.ok) throw new Error("Failed to vote");
  return res.json();
}


// src/components/ideas/IdeaCard.tsx
interface IdeaCardProps {
  title: string;
  description?: string;
  createdAt?: string;
}

export default function IdeaCard({ title, description, createdAt }: IdeaCardProps) {
  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      <h3 className="font-medium text-lg">{title}</h3>
      {description && <p className="mt-1 text-gray-700">{description}</p>}
      {createdAt && <p className="mt-2 text-xs text-gray-500">{new Date(createdAt).toLocaleString()}</p>}
    </div>
  );
}

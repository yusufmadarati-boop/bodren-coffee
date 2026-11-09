// Skeleton loader for loading states

export interface Props {
  count?: number;
}

export function SkeletonGrid({ count = 8 }: Props) {
  const items = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((key) => (
        <div
          key={key}
          className="animate-pulse rounded-2xl border border-[#3d332a]/50 bg-[#1a1512] p-4"
        >
          <div className="aspect-square w-full rounded-xl bg-[#2b221a]" />
          <div className="mt-4 h-3 w-1/3 rounded bg-[#2b221a]" />
          <div className="mt-2 h-5 w-3/4 rounded bg-[#2b221a]" />
          <div className="mt-4 flex gap-1.5">
            <div className="h-4 w-12 rounded-full bg-[#2b221a]" />
            <div className="h-4 w-16 rounded-full bg-[#2b221a]" />
          </div>
          <div className="mt-6 flex items-center justify-between pt-4">
            <div className="h-5 w-16 rounded bg-[#2b221a]" />
            <div className="h-9 w-20 rounded-lg bg-[#2b221a]" />
          </div>
        </div>
      ))}
    </div>
  );
}

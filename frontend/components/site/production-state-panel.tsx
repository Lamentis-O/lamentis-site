type ProductionStatePanelProps = {
  label?: string;
};

export function ProductionStatePanel({
  label = "IN PRODUCTION",
}: ProductionStatePanelProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50">
      <h1 className="text-5xl font-black tracking-tight text-zinc-900">{label}</h1>
    </main>
  );
}



export function AppPage({ children }: { children: React.ReactNode }) {
	return (
    <div className="px-8 py-16">
      <section className="mx-auto w-full max-w-[900px]">{children}</section>
    </div>
	)
}
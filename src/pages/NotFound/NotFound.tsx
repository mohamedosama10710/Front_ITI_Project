import { Button } from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-16 px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <a href="/" className="hover:text-foreground">
          Home
        </a>{" "}
        / <span className="font-medium text-foreground">404 Error</span>
      </nav>

      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <h1 className="text-6xl font-bold sm:text-7xl">404 Not Found</h1>
        <p className="text-sm text-muted-foreground">
          Your visited page not found. You may go home page.
        </p>
        <Button
          render={<a href="/" />}
          className="bg-brand px-8 text-brand-foreground hover:bg-brand/90"
        >
          Back to home page
        </Button>
      </div>
    </main>
  );
}

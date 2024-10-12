import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="bg-card p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-4xl font-bold mb-4 text-card-foreground">ChatBot</h2>
        <p className="text-muted-foreground mb-6">
          ChatBot is a tool that you ask for any question and it will answer you.
        </p>
        <Link target="_blank" href="https://ui.shadcn.com/">
          <span className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-md hover:bg-primary/80 transition duration-300 cursor-pointer">
            Get Started
          </span>
        </Link>
      </div>
    </div>
  );
}
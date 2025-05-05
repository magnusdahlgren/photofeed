import { SpinnerIcon } from "@/components/SpinnerIcon";

export function LoadingScreen() {
  return (
    <main className="loading-screen">
      <div className="loading-content">
        <SpinnerIcon />
        <p>Loading...</p>
      </div>
    </main>
  );
}

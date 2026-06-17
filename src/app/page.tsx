"use client";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container-max section-spacing">
        <h5 className="mb-6">Market Intelligence</h5>
        <h1 className="mb-4">Intelligence Lab</h1>
        <p className="text-base text-muted mb-8">
          System operational. Testing basic render.
        </p>

        <div className="border border-subtle rounded-lg p-8 bg-white">
          <h3 className="mb-4">System Status</h3>
          <p className="text-sm text-muted mb-4">
            ✓ Design system loaded
          </p>
          <p className="text-sm text-muted mb-4">
            ✓ Typography system working
          </p>
          <p className="text-sm text-muted mb-4">
            ✓ Layout system loaded
          </p>
          <a href="/admin" className="btn-primary inline-block mt-4">
            View Dashboard →
          </a>
        </div>
      </div>
    </div>
  );
}

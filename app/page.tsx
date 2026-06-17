"use client";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container-max section-spacing">
        <h5 className="mb-6">Welcome</h5>
        <h1 className="mb-4">Intelligence Lab</h1>
        <p className="text-base text-muted mb-12 max-w-3xl leading-relaxed">
          Operational pressure detection system. Identifies businesses experiencing
          friction in money, service, growth, movement, prescriptions, deliveries,
          appointments, and customer experience. Uses psychology, commerce, and
          logistics fit to qualify opportunities.
        </p>

        <div className="border border-subtle rounded-lg p-12 mb-12">
          <h3 className="mb-6">System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <p className="text-label mb-3">Core Engine</p>
              <p className="text-base font-semibold">✓ Operational</p>
              <p className="text-sm text-muted mt-2">Claude agent detects pressures</p>
            </div>
            <div>
              <p className="text-label mb-3">Design System</p>
              <p className="text-base font-semibold">✓ Active</p>
              <p className="text-sm text-muted mt-2">Saint & Story brand applied</p>
            </div>
            <div>
              <p className="text-label mb-3">Pressure Library</p>
              <p className="text-base font-semibold">✓ 46 Types</p>
              <p className="text-sm text-muted mt-2">100+ industry scenarios</p>
            </div>
          </div>
        </div>

        <div className="border-t border-subtle pt-12">
          <a href="/admin" className="btn-primary py-3 px-6 inline-block">
            View Dashboard →
          </a>
        </div>
      </div>
    </div>
  );
}

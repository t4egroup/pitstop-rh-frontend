import { useState } from "react";
import AppSidebar from "@/components/AppSidebar";
import { ZoomIn, ZoomOut, Menu } from "lucide-react";

const ZOOM_STEP = 0.1;
const ZOOM_MIN  = 0.5;
const ZOOM_MAX  = 1.5;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [zoom, setZoom] = useState(() => {
    const saved = localStorage.getItem("dashZoom");
    return saved ? parseFloat(saved) : 1.1;
  });

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const change = (delta: number) => {
    setZoom((prev) => {
      const next = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, parseFloat((prev + delta).toFixed(2))));
      localStorage.setItem("dashZoom", String(next));
      return next;
    });
  };

  const reset = () => {
    setZoom(1);
    localStorage.setItem("dashZoom", "1");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <AppSidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <main className="flex-1 overflow-y-auto bg-blue-50 relative">
        {/* Mobile header */}
        <div className="lg:hidden sticky top-0 z-20 flex items-center gap-3 bg-white border-b px-4 py-3 shadow-sm">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Menu size={20} className="text-slate-600" />
          </button>
          <span className="text-sm font-bold text-[#243c7e]">PitStop RH</span>
        </div>

        <div style={{ zoom }}>
          {children}
        </div>

        {/* Zoom control */}
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-0.5 rounded-xl border border-blue-300 bg-white shadow-lg px-1.5 py-1">
          <button
            onClick={() => change(-ZOOM_STEP)}
            disabled={zoom <= ZOOM_MIN}
            className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 transition-colors"
            title="Diminuir zoom"
          >
            <ZoomOut size={13} className="text-slate-600" />
          </button>
          <button
            onClick={reset}
            className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 px-1.5 py-1 rounded-lg hover:bg-slate-100 transition-colors min-w-[44px] text-center tabular-nums"
            title="Resetar zoom"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            onClick={() => change(+ZOOM_STEP)}
            disabled={zoom >= ZOOM_MAX}
            className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 transition-colors"
            title="Aumentar zoom"
          >
            <ZoomIn size={13} className="text-slate-600" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

import { useState } from "react";
import AppSidebar from "@/components/AppSidebar";
import { ZoomIn, ZoomOut } from "lucide-react";

const ZOOM_STEP = 0.1;
const ZOOM_MIN  = 0.5;
const ZOOM_MAX  = 1.5;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [zoom, setZoom] = useState(() => {
    const saved = localStorage.getItem("dashZoom");
    return saved ? parseFloat(saved) : 1.1;
  });

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
      <AppSidebar />
      <main className="flex-1 overflow-y-auto bg-blue-50 relative">
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

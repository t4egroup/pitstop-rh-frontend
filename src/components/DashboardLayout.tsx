import AppSidebar from "@/components/AppSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen overflow-hidden">
    <AppSidebar />
    <main className="flex-1 overflow-y-auto bg-slate-50">
      {children}
    </main>
  </div>
);

export default DashboardLayout;

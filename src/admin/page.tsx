import { useLocation } from "react-router-dom";
import UploadForm from "../components/ui/UploadForm";
import AdminTable from "../components/ui/AdminTable";

export default function AdminPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const key = params.get("key");

  // simple secret check (use a hardcoded value or import from config)
  if (key !== "my-admin-123") {
    return <p>Unauthorized</p>;
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboardsasas</h1>
      <UploadForm />
      <AdminTable />
    </main>
  );
}

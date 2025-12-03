export default function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    PENDING: "bg-yellow-100 text-yellow-800",
    RUNNING: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-green-100 text-green-800",
    FAILED: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        styles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status === "RUNNING" && (
        <span className="w-1.5 h-1.5 mr-1.5 bg-blue-500 rounded-full animate-pulse"></span>
      )}
      {status}
    </span>
  );
}

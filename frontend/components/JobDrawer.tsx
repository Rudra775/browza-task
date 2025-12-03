import { X, Copy, ExternalLink } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { updateStatus } from "@/lib/api";

export default function JobDrawer({ job, onClose, onUpdate }: any) {
  if (!job) return null;

  const handleStatusChange = async (newStatus: string) => {
    await updateStatus(job._id, newStatus);
    onUpdate(); // Refresh parent
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white shadow-2xl h-full p-6 flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Job Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <span>ID: #{job._id.slice(-6).toUpperCase()}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
            <span className="text-sm font-medium text-gray-500">
              Current Status
            </span>
            <StatusBadge status={job.status} />
          </div>
        </div>

        {/* Details List */}
        <div className="space-y-4 flex-1 overflow-y-auto">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              Target URL
            </label>
            <div className="flex items-center gap-2 group">
              <a
                href={job.targetUrl}
                target="_blank"
                className="text-blue-600 hover:underline truncate text-sm flex-1"
              >
                {job.targetUrl}
              </a>
              <ExternalLink size={14} className="text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Budget
              </label>
              <div className="text-gray-900 font-medium">
                ${job.budget.toLocaleString()}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Created
              </label>
              <div className="text-gray-900 font-medium">
                {new Date(job.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              Notes
            </label>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md border border-gray-100">
              {job.notes || "No notes provided."}
            </p>
          </div>
        </div>

        {/* Status Actions Footer */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Update Status
          </h3>
          <div className="flex gap-3">
            {job.status === "PENDING" && (
              <button
                onClick={() => handleStatusChange("RUNNING")}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium text-sm"
              >
                Start Job
              </button>
            )}
            {job.status === "RUNNING" && (
              <>
                <button
                  onClick={() => handleStatusChange("COMPLETED")}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium text-sm"
                >
                  Mark Completed
                </button>
                <button
                  onClick={() => handleStatusChange("FAILED")}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-medium text-sm"
                >
                  Mark Failed
                </button>
              </>
            )}
            {(job.status === "COMPLETED" || job.status === "FAILED") && (
              <p className="text-sm text-gray-500 italic w-full text-center">
                No further actions available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";

import {
  getSellerApplications,
  approveSellerApplication,
  rejectSellerApplication,
  deleteSellerApplication,
} from "../../services/adminSellerService";

import { showSuccess, showError } from "../../utils/toast";

const SellerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await getSellerApplications();
      setApplications(data.applications);
    } catch (err) {
      showError(
        err?.response?.data?.message || "Failed to load applications."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      setProcessingId(id);
      await approveSellerApplication(id);
      showSuccess("Seller approved successfully.");
      loadApplications();
    } catch (err) {
      showError(
        err?.response?.data?.message || "Failed to approve application."
      );
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id) => {
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;

    try {
      setProcessingId(id);
      await rejectSellerApplication(id, reason);
      showSuccess("Application rejected.");
      loadApplications();
    } catch (err) {
      showError(
        err?.response?.data?.message || "Failed to reject application."
      );
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );
    if (!confirmDelete) return;

    try {
      await deleteSellerApplication(id);
      setApplications((prev) => prev.filter((app) => app._id !== id));
      showSuccess("Application deleted.");
    } catch (err) {
      showError(
        err?.response?.data?.message || "Failed to delete application."
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#101014]">
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg text-gray-300">
            Loading seller applications...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-display text-white">
          Seller Applications
        </h1>
        <p className="text-gray-400 mt-2">
          Review and manage seller applications.
        </p>
      </div>

      <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#17181d] shadow-[0_25px_60px_rgba(0,0,0,.55)]">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-[#6f4e37] to-[#d4af37] text-white">
            <tr>
              <th className="px-6 py-5 text-left">Applicant</th>
              <th className="px-6 py-5 text-left">Business</th>
              <th className="px-6 py-5 text-left">Phone</th>
              <th className="px-6 py-5 text-left">City</th>
              <th className="px-6 py-5 text-left">Status</th>
              <th className="px-6 py-5 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr
                key={app._id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="px-6 py-5 text-white">
                  {app.user?.firstName} {app.user?.lastName}
                </td>
                <td className="px-6 py-5 text-gray-300">{app.businessName}</td>
                <td className="px-6 py-5 text-gray-300">{app.phone}</td>
                <td className="px-6 py-5 text-gray-300">{app.city}</td>

                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      app.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : app.status === "approved"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedApplication(app)}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                      View
                    </button>

                    {app.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleApprove(app._id)}
                          disabled={processingId === app._id}
                          className={`px-4 py-2 rounded-xl text-white transition ${
                            processingId === app._id
                              ? "bg-green-500/50 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                        >
                          {processingId === app._id ? "Processing..." : "Approve"}
                        </button>

                        <button
                          onClick={() => handleReject(app._id)}
                          disabled={processingId === app._id}
                          className={`px-4 py-2 rounded-xl text-white transition ${
                            processingId === app._id
                              ? "bg-red-500/50 cursor-not-allowed"
                              : "bg-red-600 hover:bg-red-700"
                          }`}
                        >
                          Reject
                        </button>

                        <button
                          onClick={() => handleDelete(app._id)}
                          className="px-4 py-2 rounded-xl bg-red-800 text-white hover:bg-red-900 transition"
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <span className="text-sm text-gray-500 italic">
                        Processed
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===========================
          View Details Modal
      ============================ */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#18181d] border border-white/10 shadow-[0_35px_80px_rgba(0,0,0,.7)]">
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
              <div>
                <h2 className="text-3xl font-display text-white">
                  Seller Application
                </h2>
                <p className="text-gray-400 mt-1">Complete application details</p>
              </div>
              <button
                onClick={() => setSelectedApplication(null)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-500 transition flex items-center justify-center text-xl text-gray-300 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="p-8 space-y-10">
              {/* Applicant Information */}
              <div>
                <h3 className="text-xl font-semibold text-[#d4af37] mb-6">
                  Applicant Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <p className="text-gray-400 text-sm">Full Name</p>
                    <p className="text-white font-medium mt-1">
                      {selectedApplication.user?.firstName}{" "}
                      {selectedApplication.user?.lastName}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white mt-1">
                      {selectedApplication.user?.email}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white mt-1">{selectedApplication.phone}</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <p className="text-gray-400 text-sm">Status</p>
                    <span
                      className={`inline-flex mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedApplication.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : selectedApplication.status === "approved"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {selectedApplication.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div>
                <h3 className="text-xl font-semibold text-[#d4af37] mb-6">
                  Business Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <p className="text-gray-400 text-sm">Business Name</p>
                    <p className="text-white mt-1">
                      {selectedApplication.businessName}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <p className="text-gray-400 text-sm">Business Type</p>
                    <p className="text-white mt-1">
                      {selectedApplication.businessType}
                    </p>
                  </div>
                  <div className="md:col-span-2 bg-white/5 rounded-2xl p-5 border border-white/10">
                    <p className="text-gray-400 text-sm">Description</p>
                    <p className="text-white leading-7 mt-2">
                      {selectedApplication.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-xl font-semibold text-[#d4af37] mb-6">
                  Address
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <p className="text-gray-400 text-sm">Address</p>
                    <p className="text-white mt-1">{selectedApplication.address}</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <p className="text-gray-400 text-sm">City</p>
                    <p className="text-white mt-1">{selectedApplication.city}</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <p className="text-gray-400 text-sm">Province</p>
                    <p className="text-white mt-1">{selectedApplication.province}</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <p className="text-gray-400 text-sm">Postal Code</p>
                    <p className="text-white mt-1">
                      {selectedApplication.postalCode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Verification */}
              <div>
                <h3 className="text-xl font-semibold text-[#d4af37] mb-6">
                  Verification
                </h3>
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <p className="text-gray-400 text-sm">Citizenship Number</p>
                  <p className="text-white font-medium mt-2 tracking-wide">
                    {selectedApplication.citizenshipNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerApplications;
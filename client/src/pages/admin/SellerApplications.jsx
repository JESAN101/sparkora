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
        err?.response?.data?.message ||
          "Failed to load applications."
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
      err?.response?.data?.message ||
      "Failed to approve application."
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
      err?.response?.data?.message ||
      "Failed to reject application."
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

    setApplications((prev) =>
      prev.filter((app) => app._id !== id)
    );
  } catch (err) {
    showError(
      err?.response?.data?.message ||
      "Failed to delete application."
    );
  }
};

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-3xl font-display mb-8">
        Seller Applications
      </h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-rose-dark text-white">

            <tr>

              <th className="px-6 py-4 text-left">
                Applicant
              </th>

              <th className="px-6 py-4 text-left">
                Business
              </th>

              <th className="px-6 py-4 text-left">
                Phone
              </th>

              <th className="px-6 py-4 text-left">
                City
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {applications.map((app) => (

              <tr
                key={app._id}
                className="border-b"
              >

                <td className="px-6 py-4">
                  {app.user?.firstName} {app.user?.lastName}
                </td>

                <td className="px-6 py-4">
                  {app.businessName}
                </td>

                <td className="px-6 py-4">
                  {app.phone}
                </td>

                <td className="px-6 py-4">
                  {app.city}
                </td>

                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                    {app.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">

  <button
    onClick={() => setSelectedApplication(app)}
    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
  >
    View
  </button>

  {app.status === "pending" ? (
    <>
      <button
        onClick={() => handleApprove(app._id)}
        disabled={processingId === app._id}
        className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
      >
        Approve
      </button>

      <button
        onClick={() => handleReject(app._id)}
        disabled={processingId === app._id}
        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
      >
        Reject
      </button>

      <button
  onClick={() => handleDelete(app._id)}
  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
>
  Delete
</button>
    </>
  ) : (
    <span className="text-gray-500 text-sm">
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
      {selectedApplication && (
  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">

    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

      <div className="flex items-center justify-between p-6 border-b">

        <h2 className="text-3xl font-display">
          Seller Application
        </h2>

        <button
          onClick={() => setSelectedApplication(null)}
          className="text-3xl text-gray-500 hover:text-red-600"
        >
          ×
        </button>

      </div>

      <div className="p-8 space-y-8">

        {/* Applicant */}

        <div>

          <h3 className="font-semibold text-xl mb-4">
            Applicant Information
          </h3>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-medium">
                {selectedApplication.user?.firstName}{" "}
                {selectedApplication.user?.lastName}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Email</p>
              <p>{selectedApplication.user?.email}</p>
            </div>

            <div>
              <p className="text-gray-500">Phone</p>
              <p>{selectedApplication.phone}</p>
            </div>

            <div>
              <p className="text-gray-500">Status</p>
              <p className="capitalize">
                {selectedApplication.status}
              </p>
            </div>

          </div>

        </div>

        {/* Business */}

        <div>

          <h3 className="font-semibold text-xl mb-4">
            Business Information
          </h3>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <p className="text-gray-500">Business Name</p>
              <p>{selectedApplication.businessName}</p>
            </div>

            <div>
              <p className="text-gray-500">Business Type</p>
              <p>{selectedApplication.businessType}</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-gray-500">Description</p>
              <p>{selectedApplication.description}</p>
            </div>

          </div>

        </div>

        {/* Address */}

        <div>

          <h3 className="font-semibold text-xl mb-4">
            Address
          </h3>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <p className="text-gray-500">Address</p>
              <p>{selectedApplication.address}</p>
            </div>

            <div>
              <p className="text-gray-500">City</p>
              <p>{selectedApplication.city}</p>
            </div>

            <div>
              <p className="text-gray-500">Province</p>
              <p>{selectedApplication.province}</p>
            </div>

            <div>
              <p className="text-gray-500">Postal Code</p>
              <p>{selectedApplication.postalCode}</p>
            </div>

          </div>

        </div>

        {/* Verification */}

        <div>

          <h3 className="font-semibold text-xl mb-4">
            Verification
          </h3>

          <div>

            <p className="text-gray-500">
              Citizenship Number
            </p>

            <p className="font-medium">
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
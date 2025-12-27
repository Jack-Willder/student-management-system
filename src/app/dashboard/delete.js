'use client'
import { useState } from 'react';

export default function DeleteStudentForm({ setDeleteVisible, handleDelete, currentStudentId, refresh, reload }) {
const [popupVisible, setPopupVisible] = useState(false);
const [deletionStatus, setDeletionStatus] = useState("");
async function deleteStudent(id) {
  console.log(id, "deleting student");
  const res = await fetch(`/api/delete/${id}`, {
    method: 'DELETE',
  });

  const data = await res.json();
  
  if (res.ok) {
    reload();
    setDeletionStatus("The student profile has been successfully deleted.");
  } else {
    setDeletionStatus(data.message || "An error occurred while deleting the student profile.");
  }
  setPopupVisible(true);
}

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 min-w-7xl min-h-3/4 flex flex-col items-center justify-center drop-shadow-xl">

      {popupVisible && (
    <div className="absolute bg-white rounded-xl shadow-lg p-8 min-w-7xl min-h-full flex flex-col items-center justify-center drop-shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
      {deletionStatus}
      </h2>
      <div className="flex gap-4">
        <button
          onClick={() => setDeleteVisible(false)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-800 font-medium"
        >
          close
        </button>
      </div>
    </div>
      )}

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Confirm Deletion
      </h2>
      <p className="text-gray-600 mb-6">
        Are you sure you want to delete this student profile? This action cannot be undone.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => setDeleteVisible(false)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-800 font-medium"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            deleteStudent(currentStudentId);
          }}
          className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 text-white font-medium"
        >
          Delete
        </button>
      </div>
    </div>

  );
}
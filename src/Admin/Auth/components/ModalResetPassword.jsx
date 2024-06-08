import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const ResetPasswordModal = ({ open, setResetPasswordModalOpen, onClose }) => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const handleResetPassword = async () => {
    try {
      setLoading(true);

      // Mendapatkan instance auth dari Firebase
      const auth = getAuth();

      // Jika email ada, kirim email reset password
      await sendPasswordResetEmail(auth, email);

      alert(
        "Email untuk reset password telah dikirim. Silakan periksa kotak masuk Anda."
      );
      setEmail("")
      onClose();
      setResetPasswordModalOpen(false);
    } catch (error) {
      toast.error("User Tidak ditemukan");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleResetPassword();
  };

  return (
    <div
      className={`fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 ${
        open ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg p-8 w-96">
        <h2 className="text-lg font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="yourmail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full disabled:bg-gray-500 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {loading ? "Tunggu Sebentar" : "   Kirim Email Reset Password"}
          </button>
          <button className="w-full border border-gray-300 py-2 mt-2 rounded hover:bg-gray-200 bg-white" onClick={onClose}>
            Batal
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPasswordModal;

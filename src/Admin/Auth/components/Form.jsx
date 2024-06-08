import React, { useEffect, useRef, useState } from "react";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../services/Firebase/FirebaseConfig";
import Button from "./Button";
import { login } from "../../../Redux/slices/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ResetPasswordModal from "./ModalResetPassword";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
  const emailInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await userCredential.user.getIdToken();
      dispatch(login(token));
      navigate("/dashboard");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setError("Email atau password salah");
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div>
          <p className="text-lg font-bold text-center ">
            System Amplang Epok Ema
          </p>
          <p className="text-lg font-bold text-center ">V.1.0</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              placeholder="Example@gmailcom"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              ref={emailInputRef}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              value={password}
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded  "
            />
          </div>
          <Button type="submit" title="Masuk" loading={loading} />
          <div className="text-center">
            <div
              onClick={() => setResetPasswordModalOpen(true)}
              className="text-blue-500 underline focus:outline-none cursor-pointer"
              disabled={loading}
            >
              Lupa password?
            </div>
          </div>
          {error && <p className="text-red-500 text-center -mt-4">{error}</p>}
        </form>
      </div>
      <ResetPasswordModal
        open={resetPasswordModalOpen}
        onClose={() => setResetPasswordModalOpen(false)}
        setResetPasswordModalOpen={setResetPasswordModalOpen}
      />
    </div>
  );
};

export default Form;

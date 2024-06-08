import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { jwtDecode } from "jwt-decode";
import { checkLogin } from "../../Redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

const useCheckLogin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);
  const email = useSelector((state) => state.auth.email);

  useEffect(() => {
    const auth = getAuth();

    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
       

        try {
          const idToken = await user.getIdToken();

          const decodedToken = jwtDecode(idToken);

          if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");

            navigate("/login");
          } else {
            dispatch(checkLogin({ token: idToken, email: decodedToken.email }));
            navigate("/dashboard");
          }
        } catch (error) {
          navigate("/login");
        } finally {
          setLoading(false);
        }
      } else {
        localStorage.removeItem("token");
      
        navigate("/login");
      }
    });

    if (!token) {
      navigate("/login");
      setLoading(false);
    }

    return () => {
      unsubscribe();
    };
  }, [dispatch, navigate]);

  return { user, isLoggedIn, token, email, loading };
};

export default useCheckLogin;

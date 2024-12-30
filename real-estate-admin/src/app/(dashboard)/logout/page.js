"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import { LOGOUT } from "@/redux/constants/actionsType";


const LogoutView = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    const handleLogout = () => {
      // Dispatch LOGOUT action
      dispatch({ type: LOGOUT });

      // Navigate to login page
      router.push("/login");
    };

    handleLogout();
  }, [dispatch]);

  return null; // Component doesn't render anything
};

export default LogoutView;


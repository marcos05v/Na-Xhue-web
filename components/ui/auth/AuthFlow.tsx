"use client";
import { useState } from "react";
// 1. Importa useRouter desde el hook correcto de Next.js
import { useRouter } from "next/navigation"; 
import { WelcomeScreen } from "./WelcomeScreen";
import { LoginScreen } from "./Loginscreen";
import { RestaurantRegisterScreen } from "./RestaurantRegisterScreen";
import { SupplierRegisterScreen } from "./SupplierRegisterScreen";
import { SuccessScreen } from "./SuccessScreen";

// Eliminamos el tipo "dashboard" ya que ahora es una ruta real
type Screen =
  | "welcome"
  | "restaurant-login"
  | "supplier-login"
  | "restaurant-register"
  | "supplier-register"
  | "success-restaurant"
  | "success-supplier";

export function AuthFlow() {
  const [screen, setScreen] = useState<Screen>("welcome");
  
  // 2. Inicializa el router
  const router = useRouter();

  // Centralizamos las transiciones
  const transitions = {
    goWelcome: () => setScreen("welcome"),
    goRestaurantLogin: () => setScreen("restaurant-login"),
    goSupplierLogin: () => setScreen("supplier-login"),
    goRestaurantRegister: () => setScreen("restaurant-register"),
    goSupplierRegister: () => setScreen("supplier-register"),
    successRestaurant: () => setScreen("success-restaurant"),
    successSupplier: () => setScreen("success-supplier"),
    goDashboard: () => router.push("/dashboard"), 
  };

  switch (screen) {
    case "welcome":
      return (
        <WelcomeScreen
          onSelectRole={(role) =>
            role === "restaurant"
              ? transitions.goRestaurantLogin()
              : transitions.goSupplierLogin()
          }
        />
      );

    case "restaurant-login":
      return (
        <LoginScreen
          role="restaurant"
          onBack={transitions.goWelcome}
          onRegister={transitions.goRestaurantRegister}
          onLogin={transitions.goDashboard} // Llama a router.push("/dashboard")
        />
      );

    case "supplier-login":
      return (
        <LoginScreen
          role="supplier"
          onBack={transitions.goWelcome}
          onRegister={transitions.goSupplierRegister}
          onLogin={transitions.goDashboard} // Llama a router.push("/dashboard")
        />
      );

    case "restaurant-register":
      return (
        <RestaurantRegisterScreen
          onBack={transitions.goRestaurantLogin}
          onSuccess={transitions.successRestaurant}
        />
      );

    case "supplier-register":
      return (
        <SupplierRegisterScreen
          onBack={transitions.goSupplierLogin}
          onSuccess={transitions.successSupplier}
        />
      );

    case "success-restaurant":
      return (
        <SuccessScreen 
          role="restaurant" 
          onRestart={transitions.goRestaurantLogin} 
        />
      );

    case "success-supplier":
      return (
        <SuccessScreen 
          role="supplier" 
          onRestart={transitions.goSupplierLogin} 
        />
      );

    default:
      return null;
  }
}
"use client";
import { useState } from "react";
import { WelcomeScreen } from "./WelcomeScreen";
import { LoginScreen } from "./Loginscreen";
import { RestaurantRegisterScreen } from "./RestaurantRegisterScreen";
import { SupplierRegisterScreen } from "./SupplierRegisterScreen";
import { SuccessScreen } from "./SuccessScreen";

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

  const transitions: Record<string, () => void> = {
    goWelcome: () => setScreen("welcome"),
    goRestaurantLogin: () => setScreen("restaurant-login"),
    goSupplierLogin: () => setScreen("supplier-login"),
    goRestaurantRegister: () => setScreen("restaurant-register"),
    goSupplierRegister: () => setScreen("supplier-register"),
    successRestaurant: () => setScreen("success-restaurant"),
    successSupplier: () => setScreen("success-supplier"),
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
          onLogin={() => transitions.successRestaurant()}
        />
      );

    case "supplier-login":
      return (
        <LoginScreen
          role="supplier"
          onBack={transitions.goWelcome}
          onRegister={transitions.goSupplierRegister}
          onLogin={() => transitions.successSupplier()}
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
      return <SuccessScreen role="restaurant" onRestart={transitions.goWelcome} />;

    case "success-supplier":
      return <SuccessScreen role="supplier" onRestart={transitions.goWelcome} />;

    default:
      return null;
  }
}
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Meals from "../pages/Meals/Meals";
import MealDetails from "../pages/MealDetails/MealDetails";
import OrderPage from "../pages/Order/Order";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home
        },
        {
          path: 'meals',
          Component: Meals
        },
        {
        path: "meals/:id",   // 🔴 details route
        Component: MealDetails,
      },
      {
        path: "order/:id",   // 🔴 নতুন Order route
        Component: OrderPage,
      },
    ]
  },

  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component:Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  }
]);
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Meals from "../pages/Meals/Meals";
import MealDetails from "../pages/MealDetails/MealDetails";
import OrderPage from "../pages/Order/Order";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import CreateMeal from "../pages/CreateMeal/CreateMeal";
import DashboardLayout from "../layouts/DashboardLayout";
import MyMeals from "../pages/Dashboard/MyMeals/MyMeals";
import UpdateMeal from "../pages/UpdateMeal/UpdateMeal";
import MyOrders from "../pages/Dashboard/MyOrders/MyOrders";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/paymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "create-meal",
        element: (
          <PrivateRoute>
            <CreateMeal />
          </PrivateRoute>
        ),
      },
      {
        path: "meals",
        Component: Meals,
      },
      {
        path: "meals/:id",
        Component: MealDetails,
      },
      {
        path: "order/:id",
        Component: OrderPage,
      },
    ],
  },

  // Auth routes
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },

  // Dashboard routes (✅ FIXED)
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-meals",
        Component: MyMeals,
      },
      {
        path: "update-meal/:id",
        Component: UpdateMeal,
      },
      {
        path: 'my-orders',
        Component: MyOrders,
      },
      {
        path: 'payment/:orderId',
        Component: Payment,
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled
      }
    ],
  },
]);

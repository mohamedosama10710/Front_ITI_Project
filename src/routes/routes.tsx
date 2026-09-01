import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Contact from "@/pages/Contact/Contact";
import About from "@/pages/About/About";
import Category from "@/pages/Category/Category";
import Login from "@/pages/Login/Login";
import ProductDetails from "@/pages/ProductDetails/ProductDetails";
import Signup from "@/pages/Signup/Signup";
import Wishlist from "@/pages/Wishlist/Wishlist";
import Home from "@/pages/home/Home";
import NotFound from "@/pages/NotFound/NotFound";
import { Cart } from "@/pages/Cart/Cart";
import { CheckOut } from "@/pages/Checkout/Checkout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },

      {
        path: "/category/:categoryName",
        element: <Category key={window.location.pathname} />
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path:"checkout",
        element:<CheckOut />
      }
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

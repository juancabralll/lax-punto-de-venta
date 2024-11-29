import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.jsx"
import { AuthProvider } from "./contexts/AuthContext.jsx"
import "./index.css"
import Categories from "./pages/Categories.jsx"
import Layout from "./pages/Layout.jsx"
import Login from "./pages/Login.jsx"
import POS from "./pages/POS.jsx"
import Products from "./pages/Products.jsx"
import Ventas from "./pages/Sales.jsx"
import PrivateRoute from "./utils/PrivateRoute.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout component={<App />} />
      </PrivateRoute>
    )
  },
  {
    path: "/pos",
    element: (
      <PrivateRoute>
        <POS />
      </PrivateRoute>
    )
  },
  {
    path: "/productos",
    element: (
      <PrivateRoute>
        <Layout component={<Products />} />
      </PrivateRoute>
    )
  },
  {
    path: "/categorias",
    element: (
      <PrivateRoute>
        <Layout component={<Categories />} />
      </PrivateRoute>
    )
  },
  {
    path: "/ventas",
    element: (
      <PrivateRoute>
        <Layout component={<Ventas />} />
      </PrivateRoute>
    )
  },
  {
    path: "/usuarios",
    element: <Layout component="Usuarios" />
  },
  {
    path: "/clientes",
    element: <Layout component="Clientes" />
  },
  {
    path: "/login",
    element: <Login />
  }
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)

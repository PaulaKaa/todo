import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './screens/App.jsx'
import Authentication, { AuthenticationMode } from './screens/Authentication'
import ProtectedRoute from './components/ProtectedRoute'
import UserProvider from './context/UserProvider.jsx'
import { RouterProvider } from 'react-router-dom' //to define routes (address and which component it corresponds to).
import { createBrowserRouter } from "react-router-dom";
import NotFound from "./screens/NotFound";

const router = createBrowserRouter([
  {
    //capture all invalid calls (wrong url) and displays NotFound page.
    errorElement: <NotFound />
  },
  {
    // signing in and signing up, which will display Authentication component using proper mode
    path: "/signin",
    element: <Authentication authenticationMode={AuthenticationMode.SignIn} />
  }, 
  {
    path: "/signup",
    element: <Authentication authenticationMode={AuthenticationMode.SignUp} />
  },
  {
    //App component is protected and only logged in users can access it.
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: < App />,
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  //UserProvider wraps in RouterProvider (and all components in the application). This enables all components in the app to share user information (state) and related functions.

  <StrictMode>
    <UserProvider> 
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
)

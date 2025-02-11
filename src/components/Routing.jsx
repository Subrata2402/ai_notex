import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Loader = lazy(() => import('./loader/Loader'));
const Layout = lazy(() => import('./Layout'));
const Home = lazy(() => import('./home/Home'));
const Favourites = lazy(() => import('./favourites/Favourites'));
const AddNotes = lazy(() => import('./add_notes/AddNotes'));
const SignIn = lazy(() => import('./auth/signin/SignIn'));
const SignUp = lazy(() => import('./auth/signup/SignUp'));
const ForgotPassword = lazy(() => import('./auth/forgot_password/ForgotPassword'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loader />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        )
      },
      {
        path: '/favourites',
        element: (
          <Suspense fallback={<Loader />}>
            <Favourites />
          </Suspense>
        )
      },
      {
        path: '/add-notes',
        element: (
          <Suspense fallback={<Loader />}>
            <AddNotes />
          </Suspense>
        )
      }
    ]
  },
  {
    path: '/auth/signin',
    element: (
      <Suspense fallback={<Loader />}>
        <SignIn />
      </Suspense>
    )
  },
  {
    path: '/auth/signup',
    element: (
      <Suspense fallback={<Loader />}>
        <SignUp />
      </Suspense>
    )
  },
  {
    path: '/auth/forgot-password',
    element: (
      <Suspense fallback={<Loader />}>
        <ForgotPassword />
      </Suspense>
    )
  }
]);

function Routing() {
  return (
    <RouterProvider router={router} />
  )
}

export default Routing;
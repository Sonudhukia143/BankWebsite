import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from '../src/components/Layout';
import Homepage from './routes/Homepage.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';
import Loader from './helpercomponents/Loader.jsx';
import ErrorTemplate from './components/ErrorTemplate.jsx';
import UndefinedPath from './components/UndefinedPath.jsx';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css';
import '../styles/footer.css';
import '../styles/userpage.css';

const SignUp = lazy(() => import('./routes/SignUp.jsx'));
const Login = lazy(() => import('./routes/Login.jsx'));
const BankAccount = lazy(() => import('./routes/BankAccount.jsx'));
const UserPage = lazy(() => import('./routes/UserPage.jsx'));
const AdminPage = lazy(() => import('./routes/AdminPage.jsx'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<ErrorTemplate />} >
        <Route index element={
          <Suspense fallback={<Loader props={"Fetching"} />}>
            <Homepage />
          </Suspense>
        } />
        <Route path="/login" element={
          <Suspense fallback={<Loader props={"Fetching"} />}>
            <Login />
          </Suspense>
        } />
        <Route path="/signup" element={
          <Suspense fallback={<Loader props={"Fetching"} />}>
            <SignUp />
          </Suspense>
        } />
        <Route path="/user" element={
          <Suspense fallback={<Loader props={"Fetching"} />}>
            <UserPage />
          </Suspense>
        } />
        <Route path="/createaccount" element={
          <Suspense fallback={<Loader props={"Fetching"} />}>
            <BankAccount />
          </Suspense>
        } />
        <Route path="/admin" element={
          <Suspense fallback={<Loader props={"Fetching"} />}>
            <AdminPage />
          </Suspense>
        } />
        <Route path="*" element={<UndefinedPath />} />
      </Route>
    </>
  )
)

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}


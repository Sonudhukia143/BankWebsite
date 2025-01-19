import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import Layout from '../src/components/Layout';
import UndefinedPath from '../src/utils/UndefinedPath';
import ErrorTemplate from '../src/utils/ErrorTemplate';
import SignUp from './routes/SignUp';
import Login from './routes/Login';
import Homepage from './routes/Homepage';
import UserSubmmision from './routes/UserSubmmision.jsx';
import { AuthProvider } from '../src/context/AuthProvider.jsx';
import Submissions from './routes/Submission.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<ErrorTemplate />} >
        <Route index element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/usersubmission" element={<UserSubmmision />} />
        <Route path="/submissions" element={<Submissions /> } />
        <Route path="*" element={<UndefinedPath />} />
      </Route>
    </>
  )
)

export default function App() {
  return (
    <AuthProvider >
      <RouterProvider router={router} />
    </AuthProvider>
  )
}


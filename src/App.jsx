import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashboardPage from "./pages/DashboardPage";
import ExpensesPage from './pages/ExpensesPage';
import BudgetPage from './pages/BudgetPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/Layout';

const routeConfig = [
  {
    path: '/', 
    element: <Layout />,           // 父路由：Layout 组件
    children: [                    // 子路由数组
      {index: true, element: <DashboardPage />},  // 首页
      {path: 'expenses', element: <ExpensesPage />},
      {path: 'budget', element: <BudgetPage />},
      {path: 'settings', element: <SettingsPage />},
      {path: "*", element: <NotFoundPage />}
    ]
  }
]

const route = createBrowserRouter(routeConfig)

function App() {

  return (
    <>
      <RouterProvider router={route} />
    </>
  )
}

export default App

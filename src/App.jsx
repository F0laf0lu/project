import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import DataTable from './components/Datatable'
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage'
import UserRoleManagement from './pages/RolePage';
import Dashboard from './pages/DashboardPage';
import Client from './pages/IndividualClientPage';
import IncompleteOnboardingPage from './pages/IncompleteOnboardingPage';
import CorporateClient from './pages/CorporateClientsPage';
import AppLayout from './components/layout/AppLayout';
import ClientDetailsPage from './pages/ClientDetailsPage';
import OnboardClientPage from './pages/OnboardClientPage';
import ParentComponent from './pages/test';
import "./App.css"


function App() {




  return (
    <>  
      <NotificationProvider>
        <AuthProvider>
          <Router>
            <Routes>
                <Route path="/" element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                  }>
                  <Route index element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/clients" element={<Client />} />
                  <Route path="/itla" element={<CorporateClient />} />
                  <Route path="/clients/:id" element={<ClientDetailsPage />} />
                  <Route path="/roles" element={<UserRoleManagement />} />
                  <Route path="/onboard-client" element={<OnboardClientPage />} />
                  <Route path="/incomplete-onboarding" element={<IncompleteOnboardingPage />} />
                </Route>
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/test' element={<ParentComponent/>}/>
              <Route path='/mock' element={<DataTable/>}/>
              <Route path="*" element={<div>Not found</div>} />
            </Routes>
          </Router>
u        </AuthProvider>
      </NotificationProvider>
    </>
  )
}

export default App
  
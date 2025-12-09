import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RoleSelection from "./pages/RoleSelection";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorSchedulePage from "./pages/DoctorSchedulePage";
import DoctorPatientsPage from "./pages/DoctorPatientsPage";
import PatientAppointmentsPage from "./pages/PatientAppointmentsPage";
import PatientMedicalRecordsPage from "./pages/PatientMedicalRecordsPage";
import PatientProfilePage from "./pages/PatientProfilePage";
import PatientMessagesPage from "./pages/PatientMessagesPage";
import DoctorMessagesPage from "./pages/DoctorMessagesPage";
import DoctorAppointmentRequests from "./pages/DoctorAppointmentRequests";
import PatientAppointmentRequests from "./pages/PatientAppointmentRequests";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<RoleSelection />} />
        <Route path="/dashboard/patient" element={<PatientDashboard />} />
        <Route path="/patient/appointments" element={<PatientAppointmentsPage />} />
        <Route path="/patient/appointment-requests" element={<PatientAppointmentRequests />} />
        <Route path="/patient/records" element={<PatientMedicalRecordsPage />} />
        <Route path="/patient/messages" element={<PatientMessagesPage />} />
        <Route path="/patient/profile" element={<PatientProfilePage />} />
        
        <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
        <Route path="/doctor/schedule" element={<DoctorSchedulePage />} />
        <Route path="/doctor/patients" element={<DoctorPatientsPage />} />
        <Route path="/doctor/messages" element={<DoctorMessagesPage />} />
        <Route path="/doctor/appointments" element={<DoctorAppointmentRequests />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
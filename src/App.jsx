import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { SignIn } from "./pages/auth";
import { TokenProvider } from "./context/TokenContext";

function App() {
  return (
    <TokenProvider>
    <Routes>
      <Route path="*" element={<SignIn />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/home" element={<Navigate to="/dashboard/home" replace />} />
      <Route path='/profile' element={<Navigate to="/dashboard/profile"/>} />
    </Routes>
    </TokenProvider>

  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Landingpage from "./components/Landingpage";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/signUp";
import ResponsiveDrawer from "./components/DrawerResponsiveness";
import Pharmacy from "./components/Pharmacy/pharmacy";
import Medecine from "./components/Meds/Medecine";
import AppNavbar from "./components/AppBar";
import CompletedOrder from "./components/Orders/Completed";
import InprogressOrder from "./components/Orders/Inprogress";
import Report from "./components/PharmacyUser/Report";
import MedsStock from "./components/PharmacyUser/Stock";
import Dashboard from "./components/Dashboard";
import AppNavAdmin from "./components/AppBarAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/DrawerResponsiveness" element={<ResponsiveDrawer />} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/AppNavbar" element={<AppNavbar />} />
        <Route path="/Medecine" element={<Medecine />} />
        <Route path="/Completed" element={<CompletedOrder />} />
        <Route path="/Inprogress" element={<InprogressOrder />} />
        <Route path="/Report" element={<Report />} />
        <Route path="/Stock" element={<MedsStock />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Verification from "./pages/verification";
import Issuance from "./pages/issuance";
import { Toaster } from "sonner";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Issuance />}></Route>
          <Route path="/issuance" element={<Issuance />}></Route>
          <Route path="/verify" element={<Verification />}></Route>
        </Routes>
      </Router>
      <Toaster></Toaster>
    </>
  );
}

export default App;

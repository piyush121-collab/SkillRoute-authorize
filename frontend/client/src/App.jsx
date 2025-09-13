// // import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// // import ChatbotWidget from "./components/ChatbotWidget";

// // // Pages
// // function Home() {
// //   return <h1 className="text-3xl font-bold text-blue-500 p-8">Home Page</h1>;
// // }

// // function Dashboard() {
// //   return <h1 className="text-3xl font-bold text-green-500 p-8">Dashboard</h1>;
// // }

// // function App() {
// //   return (
// //     <Router>
// //       <div>
// //         {/* --- Simple Navbar --- */}
// //         <nav className="flex gap-4 p-4 bg-gray-100 shadow-md">
// //           <Link to="/" className="hover:underline">Home</Link>
// //           <Link to="/dashboard" className="hover:underline">Dashboard</Link>
// //         </nav>

// //         {/* --- Routes --- */}
// //         <Routes>
// //           <Route path="/" element={<Home />} />
// //           <Route path="/dashboard" element={<Dashboard />} />
// //         </Routes>

// //         {/* --- Chatbot on all pages --- */}
// //         <ChatbotWidget />
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;




// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import ChatbotWidget from "./components/ChatbotWidget";
// import SignupPage from "./pages/SignupPage";
// import LoginPage from "./pages/LoginPage";
// import Dashboard from "./pages/Dashboard";

// function Home() {
//   return <h1 className="text-3xl font-bold text-blue-500 p-8">Home Page</h1>;
// }

// function App() {
//   return (
//     <Router>
//       <div>
//         <nav className="flex gap-4 p-4 bg-gray-100 shadow-md">
//           <Link to="/">Home</Link>
//           <Link to="/dashboard">Dashboard</Link>
//           <Link to="/signup">Sign Up</Link>
//           <Link to="/login">Login</Link>
//         </nav>

//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/signup" element={<SignupPage />} />
//           <Route path="/login" element={<LoginPage />} />
//         </Routes>

//         <ChatbotWidget />
//       </div>
//     </Router>
//   );
// }

// export default App;




import { Routes, Route, Link } from "react-router-dom";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import ChatbotWidget from "./components/ChatbotWidget.jsx";

function App() {
  return (
    <div>
      {/* Navbar */}
      <nav style={{ display: "flex", gap: "20px", padding: "10px" }}>
        <Link to="/">Dashboard</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      {/* Chatbot on all pages */}
      <ChatbotWidget />
    </div>
  );
}

export default App;

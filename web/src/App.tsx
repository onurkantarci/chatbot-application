import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ChatPage from "./pages/ChatPage";
import PrivateRoute from "./pages/PrivateRoute";
import NotFoundPage from "./pages/NotFoundPage";
import PublicRoute from "./pages/PublicRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute element={<MainPage />} />} />{" "}
        <Route path="/chat" element={<PrivateRoute element={<ChatPage />} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;

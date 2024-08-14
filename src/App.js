import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LogInPage from "./pages/LogInPage/LogInPage";
import MainContent from "./pages/mainContent/mainContent";
import ErrorPage from "./pages/error/ErrorPage";
import CoursesPage from "./pages/coursesPage/CoursesPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/admin" element={<MainContent />} />
				<Route path="/" element={<HomePage />} />
				<Route path="/CoursesPage" element={<CoursesPage />} />
				<Route path="/LogIn" element={<LogInPage />} />
				{/* Error page */}
				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

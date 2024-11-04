import React from "react";
import LoginPage from "./pages/auth/login/LoginPage";
import SignupPage from "./pages/auth/signup/SignupPage";
import HomePage from "./pages/home/HomePage";
import Sidebar from "./components/common/Sidebar";
import {Navigate, Route, Routes} from "react-router-dom"
import RightPanel from "./components/common/RightPanel";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import {useQuery} from "@tanstack/react-query"
import {Toaster} from "react-hot-toast"
import LoadingSpinner from "./components/common/LoadingSpinner";

function App() {
	const {data: authUser, isLoading} = useQuery({
		queryKey: ["authUser"],
		queryFn: async()=>{
			try {
				const res = await fetch("/api/auth/getMe")
				const data = await res.json();
				if(data.error) return null;
				if(!res.ok) throw new Error(data.error || "Something went wrong");
				return data;
			} catch (error) {
				throw new Error(error)
			}
		},
		retry:false
	});

	if(isLoading){
		<div className="h-screen flex justify-center items-center">
			<LoadingSpinner size="lg"></LoadingSpinner>
		</div>
	}

	return (
		<div className='flex max-w-6xl mx-auto'>
			{authUser && <Sidebar/>}
			<Routes>
				<Route path='/' element={ authUser? <HomePage /> : <Navigate to="/login"/>} />
				<Route path='/signup' element={!authUser ? <SignupPage/> : <Navigate to="/" />} />
				<Route path='/login' element={!authUser ?  <LoginPage /> : <Navigate to="/"/>} />
				<Route path='/notifications' element={authUser ?  <NotificationPage /> : <Navigate to="/"/>} />
				<Route path='/profile/:username' element={authUser ?  <ProfilePage /> : <Navigate to="/"/>} />
			</Routes>
			{authUser && <RightPanel/>}
			<Toaster/>
		</div>
	);
}

export default App;
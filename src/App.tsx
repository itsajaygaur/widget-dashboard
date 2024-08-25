import Navbar from "./components/navbar"
import { Dashboard } from "./pages/dashboard"
import { Toaster } from "react-hot-toast"


export default function App() {

  return (
    <div> 
      <Navbar />
      <Dashboard />
      <Toaster />
    </div>
  )
}



import Sidebar from './navbar/Sidebar'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Dashboard />
    </div>
  )
}

export default App

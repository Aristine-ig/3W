import UserManager from './components/UserManager'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">
              MongoDB + React Demo
            </h1>
            <div className="text-sm text-gray-500">
              Database Management System
            </div>
          </div>
        </div>
      </header>
      
      <main className="py-8">
        <UserManager />
      </main>
    </div>
  )
}

export default App

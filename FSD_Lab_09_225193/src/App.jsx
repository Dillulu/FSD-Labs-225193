import Header from './components/Header.jsx';
import Dashboard from './components/Dashboard.jsx';
import './App.css';

export default function App() {
  return (
    <main className="app">
      <div className="container">
        <Header />
        <Dashboard />
      </div>
    </main>
  );
}

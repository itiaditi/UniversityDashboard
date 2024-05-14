
// import './App.css'
const AllRoutes =()=>import('./AllRoutes');
const Navbar = () => import('./components/Navbar');

function App() {

  return (
    <>
    <Navbar/>
     <AllRoutes/>
    </>
  )
}

export default App

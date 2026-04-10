import{Routes,Route} from 'react-router-dom';
import Home from './pages/home';

export default function App(){
  return(
    <Routes>
      <Route path="/" element={<home/>} />
      {/* Future routes: /results/:id, /about, etc. */}
      <Route
      path="*"
      element={
        <div className="min-h-screen flex item-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">404</h1>
            <p className="text-slate-400 mb-4">Page not found</p>
            <a href="/" className="btn-analyze inline-flex">Go home</a>
            </div>
            
          </div>
    
       
      }
      />
    </Routes>
  );

}

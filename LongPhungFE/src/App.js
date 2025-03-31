
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import DashboardPage from './page/DashBoardPage.jsx';
import { Provider } from "react-redux";
import "./styles/Dashboard.scss"
import "react-toastify/dist/ReactToastify.css";
import store from './redux/store.js';

function App() {
  return (
    
    <Provider store={store}>
      <BrowserRouter>
        <DashboardPage/>
       </BrowserRouter>
       <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </Provider>    
    
  );
}

export default App;

import { MainForm } from "./components/MainForm";
import { Card } from "./components/Card";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Card>
        <MainForm />
      </Card>
    </>
  );
}

export default App;

import { Layout } from "./components/Layout";
import { CustomCursor } from "./components/shared/CustomCursor";
import { Preloader } from "./components/shared/Preloader";

function App() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <Layout />
    </>
  );
}

export default App;

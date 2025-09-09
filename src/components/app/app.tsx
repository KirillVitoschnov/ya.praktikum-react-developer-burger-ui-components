import Header from "../header/header";
import MainBurger from "../main-burger/main-burger";
import BASE_PATH from "../../utils/constants";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(BASE_PATH)
      .then(res => res.json())
      .then(data => setData(data.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      <Header />
      <MainBurger data={data}/>
    </div>
  );
}

export default App;

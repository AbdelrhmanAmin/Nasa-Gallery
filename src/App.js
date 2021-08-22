import React, { useEffect } from "react";
import "./App.css";
import { getNASAPictures } from "./NasaAPI";

function App() {
  const [pictures, updatePictures] = React.useState(null);

  useEffect(() => {
    if (!pictures) {
      const startDate = new Date("2020-07-01T08:28:41.917Z");
      const endDate = new Date();
      getNASAPictures(startDate, endDate).then((res) => {
        updatePictures(res);
      });
    }
  }, [pictures]);

  return (
    <div className="App">
      {pictures && pictures.map((picture) => <div key={picture.date}>{picture.title}</div>)}
    </div>
  );
}

export default App;

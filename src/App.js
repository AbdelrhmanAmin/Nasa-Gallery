import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { getNASAPictures } from "./NasaAPI";
import Picture from './components/Picture';
import Placeholder from './assets/loading.gif';
import { IoIosArrowDroprightCircle as RightIcon } from "react-icons/io";
import { IoIosArrowDropleftCircle as LeftIcon } from "react-icons/io";
import { IoIosArrowDropdownCircle as BottomIcon } from "react-icons/io";

function App() {
  const [pictures, updatePictures] = useState(null);
  const [i, setIndex] = useState(0)
  const [index, setCurrentIndex] = useState(0)
  const [slideDown, setSlideDown] = useState(false)
  const img = useRef(null)
  const handleRight = () => {
    if (i === pictures.length - 1) {
      setIndex(0)
    } else {
      setIndex(i + 1)
    }
  }
  const handleLeft = () => {
    if (i === 0) {
      setIndex(pictures.length - 1)
    } else {
      setIndex(i - 1)
    }
  }
  const slideDownHandle = () => {
    setSlideDown(true)
    setCurrentIndex(i)
    // container from above
    // img from left
    // text from right
  }
  useEffect(() => {
    if (!pictures) { // if pictures is null
      const startDate = new Date("2021-08-20T08:28:41.917Z"); // start day: 2021-08-20
      const endDate = new Date(); //Today
      getNASAPictures(startDate, endDate).then((res) => {
        updatePictures(res);
      });
    }
  }, [pictures]); //if pictures changes, re-render.
  useEffect(() => {
    if (pictures) {
      var interval = setInterval(() => handleRight(), 5000)
    }
    return () => clearInterval(interval)
  })

  return (
    <div className="App">
      {
        !pictures ? <img src={Placeholder} alt='placeholder_loading_gif' className='loading-gif' /> :
          <div className='gallery'>
            <LeftIcon size={70} color='white' onClick={() => handleLeft()} className='icon-left' />
            <img src={pictures[i].url} alt='picture_of_the_day' className='img_gallery' />
            <RightIcon size={70} color='white' onClick={() => handleRight()} className='icon-right' />
            <BottomIcon size={70} color='00ffa9' onClick={() => slideDownHandle()} className='icon-bottom' />
          </div>

      }
      {
        slideDown ?
          <Picture
            author={pictures[index].copyright}
            title={pictures[index].title}
            url={pictures[index].url}
            slideDownHandler={setSlideDown}
          />
          : null
      }
    </div>
  );
}

export default App;

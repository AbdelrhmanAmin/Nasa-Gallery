import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { getNASAPictures } from "./NasaAPI";
import { gsap } from "gsap";
import Picture from './components/Picture';
import Placeholder from './assets/loading.gif';
import swipe from './assets/swipe.gif';
import { IoIosArrowDroprightCircle as RightIcon } from "react-icons/io";
import { IoIosArrowDropleftCircle as LeftIcon } from "react-icons/io";
import { IoIosArrowDropdownCircle as BottomIcon } from "react-icons/io";

function App() {
  const [pictures, updatePictures] = useState(null);
  const [i, setIndex] = useState(0)
  const [prevI, setPrevIndex] = useState(0)
  const [index, setCurrentIndex] = useState(0)
  const [slideDown, setSlideDown] = useState(false)
  const [startPointX, setStartPointX] = useState(0)
  const [startPointY, setStartPointY] = useState(0)
  const [diffX, setDiffX] = useState(0)
  const [diffY, setDiffY] = useState(0)
  const img = useRef(null)
  const bgImg = useRef(null)
  const btnSwipe = useRef(null)
  const swipeLeft = useRef(null)
  const swipeDown = useRef(null)
  const handleRight = () => {
    console.log('swipe-right')
    if (i === pictures.length - 1) {
      setPrevIndex(i)
      setIndex(0)
    } else {
      setPrevIndex(i)
      setIndex(i + 1)
    }
    gsap.from(img.current, {
      x: -800,
      ease: "circ.out",
    })
    gsap.to(img.current, {
      x: 0,
      ease: "circ.out",
    })
  }
  const handleLeft = () => {
    console.log('swipe-left')
    if (i === 0) {
      setPrevIndex(i)
      setIndex(pictures.length - 1)
    } else {
      setPrevIndex(i)
      setIndex(i - 1)
    }
    gsap.from(img.current, {
      x: 800,
      ease: "circ.out",
    })
    gsap.to(img.current, {
      x: 0,
      ease: "circ.out",
    })
  }
  const slideDownHandle = () => {
    setSlideDown(true)
    setCurrentIndex(i)
  }
  const touchStartHandler = (e) => {
    setStartPointX(e.touches[0].clientX)
    setStartPointY(e.touches[0].clientY)
  }
  const touchMoveHandler = (e) => {
    setDiffX(startPointX - e.touches[0].clientX)
    setDiffY(startPointY - e.touches[0].clientX)
    console.log(startPointX, diffY)
  }
  const touchEndHandler = () => {
    if (diffY < 0) {
      slideDownHandle()
    }
    if (diffX > 20) {
      handleLeft()
    }
    if (diffX < -20) {
      handleRight()
    }
  }
  useEffect(() => {
    if (!pictures) { // if pictures is null
      const startDate = new Date("2021-08-20T08:28:41.917Z"); // start day: 2021-08-20
      const endDate = new Date("2021-08-22T08:28:41.917Z"); //Use yesterday date because if it passes midnight the API will fail.
      getNASAPictures(startDate, endDate).then((res) => {
        updatePictures(res);
      });
      if (pictures) {
        setPrevIndex(pictures.length - 1)
      }
    }
  }, [pictures]); //if pictures changes, re-render.
  useEffect(() => {
    if (pictures) {
      var interval = setInterval(() => handleRight(), 5000)
      // const mobile = window.matchMedia('(max-width: 480px)')
      // const tablet = window.matchMedia('(max-width: 768px)')
      // const laptop = window.matchMedia('(min-width: 768px)')
      // // Check if the media query is true
      // if (tablet.matches) {
      //   swipeLeft.current.style.display = 'block'
      // }
      // if (laptop.matches) {
      //   swipeLeft.current.style.display = 'none'
      // }
    }
    return () => clearInterval(interval)
  })

  return (
    <div className="App">
      {
        !pictures ? <img src={Placeholder} alt='placeholder_loading_gif' className='loading-gif' /> :
          <div className='gallery'>
            <LeftIcon size={70} onClick={() => handleLeft()} className='icon-left' />
            <div className='gallery-img-container'>
              <img onTouchEnd={() => touchEndHandler()} onTouchStart={(e) => touchStartHandler(e)} onTouchMove={(e) => touchMoveHandler(e)} src={pictures[i].url} alt='picture_of_the_day' className='img_gallery' ref={img} />
              <img src={pictures[prevI].url} alt='picture_of_the_day' className='img_gallery_bg' ref={bgImg} />
              <img src={swipe} alt='swipe_gif' className='swipe-left-gif' ref={swipeLeft} />
            </div>
            <RightIcon size={70} onClick={() => handleRight()} className='icon-right' />
            <BottomIcon size={70} color='cccccc' onClick={() => slideDownHandle()} className='icon-bottom' ref={btnSwipe} />
          </div>

      }
      {
        slideDown ?
          <Picture
            author={pictures[index].copyright}
            title={pictures[index].title}
            url={pictures[index].url}
            date={pictures[index].date}
            slideDownHandler={setSlideDown}
          />
          : null
      }
    </div>
  );
}

export default App;

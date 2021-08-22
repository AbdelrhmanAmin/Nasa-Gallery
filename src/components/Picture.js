import React, { useEffect, useRef } from 'react';
import { IoIosArrowDropupCircle as UpIcon } from "react-icons/io";
import { gsap } from "gsap";

const Picture = ({ author, title, url, slideDownHandler }) => {
  const container = useRef(null)
  const img = useRef(null)
  const details = useRef(null)
  useEffect(() => {
    // container from above
    gsap.from(container.current, {
      y: -2500,
      delay: 0.5,
      ease: "power4.out",
    })
    // img from left
    gsap.from(img.current, {
      x: -2500,
      delay: 1.5,
      ease: "power4.out",
    })
    // text from right
    gsap.from(details.current, {
      x: 2500,
      delay: 1.5,
      ease: "power4.out",
    })
  }, [])
  const slideUpHandle = () => {
    // container to above
    gsap.to(container.current, {
      y: 2500,
      delay: 0.5,
      ease: "power4.out",
    })
    // img to left
    gsap.to(img.current, {
      x: 2500,
      delay: 1.5,
      ease: "power4.out",
    })
    // text to right
    gsap.to(details.current, {
      x: -2500,
      delay: 1.5,
      ease: "power4.out",
    })
    const t1 = setTimeout(() => slideDownHandler(false), 2000)
    return () => clearTimeout(t1)
  }
  return (
    <div className='picture-container' ref={container}>
      <img src={url} alt='picture_of_the_day' className='img' ref={img} />
      <div className='picture-details' ref={details}>
        <h2>{title}</h2>
        <h4>{author}</h4>
      </div>
      <UpIcon size={70} color='white' onClick={() => slideUpHandle()} className='icon-up' />
    </div>
  )
}
export default Picture;
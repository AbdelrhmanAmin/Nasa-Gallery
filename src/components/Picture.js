import React, { useEffect, useRef } from 'react';
import { IoIosArrowDropupCircle as UpIcon } from "react-icons/io";
import { gsap } from "gsap";

const Picture = ({ author, title, url, date, slideDownHandler }) => {
  const container = useRef(null)
  const img = useRef(null)
  const details = useRef(null)
  useEffect(() => {
    // container from above
    gsap.from(container.current, {
      y: -700,
      delay: 1,
      ease: "power3.out",
    })
    // img from left
    gsap.from(img.current, {
      x: -1200,
      delay: 1.5,
      ease: "circ.out",
    })
    // text from right
    gsap.from(details.current, {
      x: 1500,
      delay: 1.5,
      ease: "circ.out",
    })

  }, [])
  const slideUpHandle = () => {
    gsap.to(container.current, {
      y: -800,
      delay: 0.5,
      ease: "slow(0.7, 0.7, false)",
    })
    const t1 = setTimeout(() => {
      slideDownHandler(false)
      clearTimeout(t1)
    }, 1200)
  }
  return (
    <div className='picture-container' ref={container}>
      <img src={url} alt='picture_of_the_day' className='img' ref={img} />
      <div className='picture-details' ref={details}>
        <h2 className='picture-title'>{title}</h2>
        <h4 className='picture-author'>{author}</h4>
        <span>{date}</span>
      </div>
      <UpIcon size={70} color='black' onClick={() => slideUpHandle()} className='icon-up' />
    </div>
  )
}
export default Picture;
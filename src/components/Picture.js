import React from 'react';
const Picture = ({ author, title, url }) => {
  return (
    <div className='picture-container'>
      <h2>{title}</h2>
      <h6>{author}</h6>
      <img src={url} alt='picture_of_the_day' className='img' />
    </div>
  )
}
export default Picture;
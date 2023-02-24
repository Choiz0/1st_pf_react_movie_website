import React from 'react'

const Banner = ({info}) => {
  
  return (
 
    <div 
    className='banner'
    style={{
        backgroundImage:" url("+
            `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${info.poster_path}`
       +" )",

    }}>
        <div className='banner_text'>
        <h1>{info.title}</h1>
        <p>{info.overview}</p>
        </div>
    </div>
  )
}

export default Banner

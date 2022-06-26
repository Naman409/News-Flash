import React from 'react'
import loading from './Loader.gif'


export default function Loader() {
  return (
    <div className='text-center my-5'>
        <img src={loading} alt="loading" />
    </div>
)
}

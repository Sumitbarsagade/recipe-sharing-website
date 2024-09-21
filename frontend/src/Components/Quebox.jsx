import {React,useState} from 'react'




export default function Quebox({que, ans}) {
  const [clicked, setClicked]= useState(false);

  const toggleClick=()=>{
    setClicked(!clicked);
  }

  return (
    <>

    <div className="box w-11/12 h-fit bg-white   rounded-2xl px-2 py-5">
      <div className="questext flex justify-between mb-5  text-5xl">
       <h1>{que}</h1>
       <h1   onClick={toggleClick}  className={clicked? "rotate-180":"rotate-180"} ><i class={clicked? " rotate-180 ri-arrow-down-s-line":"rotate ri-arrow-up-s-line"}></i></h1>
      </div>

      <div className={clicked? "block": "hidden"}>
          <h2 className='text-3xl'>{ans}</h2>
      </div>

    </div>
    
    
    
    
    </>
  )
}

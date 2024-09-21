import React from 'react'

export default function Loop() {
  return (

    <section
                    x-data="{}"
                    x-init="$nextTick(() => {
                        let ul = $refs.logos;
                        ul.insertAdjacentHTML('afterend', ul.outerHTML);
                        ul.nextSibling.setAttribute('aria-hidden', 'true');
                    })"
                    className="w-full h-24 text-black text-6xl inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
                >
                    <ul x-ref="logos" class="flex whitespace-nowrap items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                    <li className=' whitespace-nowrap'><h1>User-Friendly Interface</h1></li>
       <li className=' whitespace-nowrap'><h1>* Endless Recipe Ideas</h1></li>
       <li className=' whitespace-nowrap'><h1>* Community Feedback</h1>  </li>
       <li className=' whitespace-nowrap'><h1>* Share Your Creations</h1> </li>
       <li className=' whitespace-nowrap'><h1>* Cooking Challenges</h1>  </li>
       <li className=' whitespace-nowrap'><h1>*  Mobile Friendly *</h1>  </li>
                    </ul>  


                    <ul x-ref="logos" class="flex whitespace-nowrap items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                    <li className=' whitespace-nowrap'><h1>User-Friendly Interface</h1></li>
       <li className=' whitespace-nowrap'><h1>* Endless Recipe Ideas</h1></li>
       <li className=' whitespace-nowrap'><h1>* Community Feedback</h1>  </li>
       <li className=' whitespace-nowrap'><h1>* Share Your Creations</h1> </li>
       <li className=' whitespace-nowrap'><h1>* Cooking Challenges</h1>  </li>
       <li className=' whitespace-nowrap'><h1>*  Mobile Friendly *</h1>  </li>
                    </ul> 


                           
</section>
                
                
  
      
     

  )
}

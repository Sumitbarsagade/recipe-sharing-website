import { useEffect } from 'react';

import "../index.css"
import Loop from '../Components/Loop'
import Quebox from '../Components/Quebox'
import Recipebox from '../Components/recipebox'
import ChefDescription from '../Components/ChefDescription'
import Contact from '../Components/Contact'
import HomeRecipesShowCase from '../Components/HomeRecipesShowCase'

export default function Home() {

   
 const q1="How I add recipe?"
 const a1= "Simply click on the 'Add' section and let your culinary genius shine!"
  

 const q2="Can I edit my recipe later?"
 const a2 = "Absolutely! You can tweak your masterpieces anytime!"

 const q3 ="What types of recipes can I share?"
 const a3="Anything from gourmet to 'what was I thinking?'!"

 const q4 ="Is it free to use?"
 const a4 ="Of course!Your taste buds deserve it!"

  return (


    <>
    <main className='w-[100vw] h-fit bg-[#74A04B] overflow-x-hidden text-black'>
    <section className='hero  flex items-center p-10 justify-left  ' >
       <div  
      
       className="hero-text w-fit h-fit p-2 m-1  flex flex-col items-center justify-center text-center bg-transparent bg-gray-200 opacity-80 rounded-xl">
       <h1 className='text-5xl'>Recipe Revolution</h1>
       <h2 className='text-2xl'>Join the culinary chaos and unleash your inner chef!</h2>
       
       <h1 className='text-4xl text-white border-2   border-white rounded-3xl p-4 mt-3 hover:text-green-600 cursor-pointer'>Join Now!</h1>
       
       </div>
     
    </section>


    <section className="page2 w-lvw p-2 min-h-lvh  ">
       <div className="container mx-auto w-11/12 flex flex-col items-center   gap-10 justify-between">
         <div className="page-head text-white text-center mt-5 "> <h1 className='text-6xl text-black '>Frequently Asked Questions</h1> </div>
         
         <Quebox   que={q1} ans={a1}  />
         <Quebox   que={q2} ans={a2}  />
         <Quebox   que={q3} ans={a3}  />
         <Quebox   que={q4} ans={a4}  />
       



       </div>


    </section>



    <section className='scrolling_animation w-full mt-10 h-52 flex items-center  bg-white'> 
  <Loop/>
    </section>


    <section className="recipes w-full min-h-lvh pt-10 pb-10">
         <Recipebox  image={"/recipeImage1.jfif"} title={"Playful Panda Noodles"} description={"Wiggly, Waggly, and Oh-So-Tasty—A Panda Party in Every Bite! The combination of tender noodles, colorful veggies, and a simple sauce will have your kids slurping happily!"} />
         <Recipebox  image={"/recipeImage2.jfif"} title={"Crispy Punjabi Potato Samosas"} description={"The crispy crust, flavorful potato filling, and aromatic spices make them a hit at any gathering. Serve them with mint chutney or tamarind chutney for an extra flavor blast!"} />
         <Recipebox  image={"/recipeImage3.jfif"} title={"Coq au Vin"} description={"Coq au vin is a rich and savory stew made with chicken braised in red wine, lardons (cured pork), mushrooms, and optionally garlic. This dish embodies the rustic elegance of French cuisine, perfect for cozy gatherings or special occasions."} />
    </section>
     

  <section className="cookingImage">



  

  </section>
   

   <section className="w-full md:h-44 h-56 bg-yellow-400 flex flex-row items-center justify-between p-10">
        <h1 className='md:text-3xl text-xl w-fit '>Join the Recipe Revolution! Share and Discover Amazing Dishes!</h1>

        <button className='bg-orange-500 p-5 md:rounded-full rounded-xl text-white text-3xl'>Share Your Recipe!</button>
   </section>

   <section data-scroll data-scroll-speed="-5" className="video w-full relative h-fit  object-cover bg-fixed">
   <video autoPlay muted loop src="https://www.mediafire.com/file/t3zgh5hlt0agptt/food.mp4/file" className='object-cover type="audio/mp3"  '></video>
   </section>



   <section className="chefs w-full min-h-lvh flex  md:flex-col flex-row flex-wrap gap-10 items-center p-10">
     <h1 className='text-white text-6xl w-fit mx-auto '>Our Chef</h1>

     <div className="description w-11/12 mx-auto flex md:flex-row flex-col gap-10 items-center justify-evenly">
     <ChefDescription image={"/chef1.jfif"} name={"Mei Ling"} tag={"Work Master"} />

     <ChefDescription image={"/chef2.jfif"} name={"Arjun Patel"} tag={"Spice Whisperer"} />

     <ChefDescription image={"/chef5.jfif"} name={"Lily Anderson"} tag={"Comfort Food Artisan"} />

     <ChefDescription image={"/chef4.jfif"} name={"Etienne Dubois"} tag={"Haute Cuisine Maestro"} />
     </div>
    

   </section>


   <section className="chefs w-full min-h-lvh flex  md:flex-col flex-row flex-wrap gap-10 items-center p-10">
     <h1 className='text-white text-6xl '>Our Lastest Recipes</h1>
    

     
    <HomeRecipesShowCase/>
    

   </section>
  



   <section className="socialmedialinks w-full h-fit p-10 flex items-center justify-end gap-10 flex-col">
    <h1 className='text-white text-6xl'>Join Our Flavor Adventure!</h1>


    <ul className="links ">
    <i className="ri-facebook-circle-fill text-5xl p-5 text-blue-600"></i>
    <i className="ri-instagram-fill text-5xl p-5 text-orange-900"></i>
    <i className="ri-twitter-x-fill text-5xl p-5 text-white"></i>
    </ul>
   </section>

   <section className="contact w-full h-fit  ">
     <Contact/>
    
   </section>
   </main>
   </>
  )
}


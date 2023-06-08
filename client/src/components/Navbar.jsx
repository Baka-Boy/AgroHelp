import {useState} from 'react';
import {Link , useHistory} from 'react-router-dom';
import {useSpring, animated} from '@react-spring/web';
import { connect } from "react-redux";
import { logoutUser } from "../auth/actions/userActions";

const Navbar = ({logoutUser}) => {
  const history = useHistory()
  // STATES
  const [hamburger, setHamburger] = useState(false); // State for toggling hamburger menu
  const props = useSpring({
    opacity: hamburger ? 1 : 0,
    visibility: hamburger ? 'visible' : 'hidden',
    config: {duration: 500},
  });

  const fadeIn = useSpring({
    from: {opacity: 0},
    to: {opacity: 1},
    config: {duration: 500},
  });

  return (
    <header class="absolute inset-x-0 top-0 z-50">
  
    <nav class="h-[5rem] shadow-inner bg-green-100 flex items-center justify-between p-6 lg:px-8 fixed top-0 left-0 right-0 z-10">
      
      <div class="flex lg:flex-1">
        <a href="/home" class="-m-1.5 p-1.5">
          <img class="h-14 w-auto" src="logo.png" alt=""/>
        </a>
      </div>

      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
          <span class="sr-only">Open main menu</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      <div class="hidden lg:flex lg:gap-x-12">
      <button className="transition ease-in-out duration-100 hover:bg-[#b8e4bb] bg-[#9ae19f] px-4 py-2 rounded-md">
        <Link to="/Diseases">About Diseases (Crop and Fruit)</Link>
      </button>
      <button className="transition ease-in-out duration-100 hover:bg-[#b8e4bb] bg-[#9ae19f] px-4 py-2 rounded-md">
        <Link to="/Soils">About Soil Analysis</Link>
      </button>
      </div>

      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <a onClick={()=>{
          logoutUser(history)
        }} class="text-sm font-semibold leading-6 text-gray-900">Logout<span aria-hidden="true">&rarr;</span></a>
      </div>

    </nav>
    
    
  </header>
  );
};
export default connect(null, { logoutUser })(Navbar);

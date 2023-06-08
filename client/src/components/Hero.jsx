import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Parallax} from 'react-parallax';
import {useSpring, animated} from '@react-spring/web';
import useHover from './hook';
import './Hero.css';

const Hero = () => {
  const [hoverRef, isHovered] = useHover();
  const [show, setShow] = useState(false);

  const buttonProps = useSpring({
    opacity: show ? 1 : 0,
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    config: {duration: 200},
  });

  const fadeDown = useSpring({
    from: {opacity: 0, transform: 'translateY(-50px)'},
    to: {
      opacity: 1,
      transform: 'translateY(0px)',
    },
    config: {duration: 500},
  });

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
  }, []);
  return (
    <Parallax bgImage="/logo.jfif" blur={5}>
      <div className="h-screen flex justify-center items-center">
        <div className="max-w[1000px] flex flex-col items-center justify-around w-[100rem] h-[60%] text-center mx-[2rem]">
          <animated.div
            className="flex flex-col justify-center items-center"
            style={fadeDown}
          >
            <h1 className="text-[#073763] lg:text-[56px] md:text-[50px] text-[35px] font-extrabold drop-shadow-2xl">
              AgroHelp
            </h1>
            <p className="text-[#073763] font-semibold drop-shadow-lg text-center text-[18px] mt-[2rem]">
              Features:<br></br>
              1. Predict your crop disease<br></br>
              2. Analyse the soil for the given area <br></br>
            </p>
          </animated.div>
          
        </div>
      </div>

      <div class="Parent">
        <div class="child1">
       
          <p>Our crop disease detection system uses Deep Learning to identify and diagnose crop diseases quickly and accurately. By analyzing images of crops and leaves, our system can detect and identify the presence of diseases such as rust, blight, and mosaic virus. The machine learning algorithms learn from vast amounts of data and can provide accurate results with high confidence levels.</p>
            <br></br><br></br>
            <animated.div ref={hoverRef} style={buttonProps}>
            <Link to="/diagnose" className="transition ease-in-out duration-100 hover:bg-[#b8e4bb] bg-[#9ae19f] w-[14rem] px-6 py-4 text-[18px] rounded-md shadow-md font-semibold text-center">
              Identify Crop Disease
            </Link>
          </animated.div>
        </div>

        <div class="child2">
        
          <p>Our system uses advanced algorithms to analyze soil samples and generate recommendations based on the soil's properties, such as nutrient content, pH levels, and moisture content. By taking into account historical soil data and crop-specific requirements, our recommendation system suggests the most suitable crops for the given soil type, helping farmers make informed decisions about crop selection.</p>
            <br></br><br></br>
            <animated.div style={buttonProps}>
            <Link to="/soilanalysis" className="transition ease-in-out duration-100 hover:bg-[#b8e4bb] bg-[#9ae19f] w-[14rem] px-6 py-4 text-[18px] rounded-md shadow-md font-semibold text-center">
              Soil Analysis
            </Link>
          </animated.div>
        </div>
    </div>
 
    </Parallax>
  );
};

export default Hero;

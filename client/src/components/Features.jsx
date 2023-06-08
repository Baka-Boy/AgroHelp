import React from 'react';
import {Parallax} from 'react-parallax';
import {Upload, Analyze, Teach, Understand} from '../assets/features-icons';

import {animated, useSpring} from '@react-spring/web';
const Features = () => {
  const fadeIn = useSpring({
    to: {
      opacity: 1,
    },
    from: {
      opacity: 0,
    },
  });

  return (
    <Parallax bgImage="/flogo.jfif" blur={10}>
      <animated.div
        className="flex justify-center items-center my-[10rem]"
        style={fadeIn}
      >
        <div className="transition ease-in-out duration-200 hover:shadow-xl shadow-md flex flex-col justify-center items-center w-[100rem] bg-white px-[2rem] py-[4rem] mx-[2rem] rounded-xl text-[#2c302e]">
          <div className="font-bold font-serif text-[48px]">Features</div>
          <div className="flex flex-col lg:flex-row items-end justify-center mt-[2rem] space-x-6">
            <div className="text-[16px] flex flex-col justify-center items-center text-center w-[100%]">
              <p className="lg:mb-[1.5rem]">
                Upload a photo of your maize plant or fruit to know if it has been infected with any disease or not
              </p>
              <img src={Upload} alt="upload" className="w-[5rem] mt-[1rem]" />
            </div>
            <div className="text-[16px] flex flex-col justify-center items-center text-center w-[100%] mt-[3rem] lg:mt-0">
              <p>
                Our model will analyze the photo and let you know the disease associated with the plant alongwith symptoms and remedies
              </p>
              <img src={Analyze} alt="upload" className="w-[5rem] mt-[1rem]" />
            </div>
            <div className="text-[16px] flex flex-col justify-center items-center text-center w-[100%] mt-[3rem] lg:mt-0">
              <p>Analysis of soil based on region using map API and get details like moisture level, nutrients etc. found in the region</p>
              <img src={Teach} alt="upload" className="w-[5rem] mt-[1rem]" />
            </div>
            <div className="text-[16px] flex flex-col justify-center items-center text-center w-[100%] mt-[3rem] lg:mt-0">
              <p>Crop recommendation for the selected area according to soil and weather conditions</p>
              <img
                src={Understand}
                alt="upload"
                className="w-[5rem] mt-[1rem]"
              />
            </div>
          </div>
        </div>
      </animated.div>
    </Parallax>
  );
};

export default Features;

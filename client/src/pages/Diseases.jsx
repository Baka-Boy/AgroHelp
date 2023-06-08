import Data from './data.json';
// import Data1 from './data1.json';
import DiseaseCard from '../components/DiseaseCard';
import {useSpring, animated, useTrail} from '@react-spring/web';
import {useEffect} from 'react';
import './Diseases.css';

const Diseases = () => {
  const pages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const config = {mass: 100, tension: 2000, friction: 500};

  useEffect(() => {
    localStorage.setItem('uploaded', false);
  }, []);

  const trail = useTrail(pages.length, {
    from: {opacity: 0, transform: 'translateY(-50px)'},
    to: {opacity: 1, transform: 'translateY(0px)'},
    delay: 500,
    config,
  });

  const fadeDown = useSpring({
    from: {opacity: 0, transform: 'translateY(-50px)'},
    to: {opacity: 1, transform: 'translateY(0px)'},
    config: {duration: 500},
  });

  return (
 
    <div class="Parentdisease">
      <div class="childdis1">
        <div className="flex justify-center">
          <div className="w-[70rem] mt-[4rem] mb-[3rem] text-[#2c302e] ">
            <animated.div style={fadeDown}>
              <h1 className="font-serif text-[32px] font-bold">Crop and Fruit Diseases</h1>
              <p className="text-[#666e75]">
                Learn more about different type of Crop and Fruits diseases.<br></br>
                Here are the samples for each type of disease found in Crops and Fruits.
              </p>
            </animated.div>

            <div className="flex flex-wrap gap-7 mt-[2rem] items-center justify-center">
              {pages.map((page, index) => (
                <animated.div style={trail[index]}>
                  <DiseaseCard
                    page={page}
                    photo={`/images/${page}.jpg`}
                    name={Data[page].name}
                    description={`${Data[page].cause
                      .slice(0, 50)
                      .replace(/^\s+|\s+$/gm, '')}...`}
                  />
                </animated.div>
                
              ))}

       
      </div>
      </div>
      
      </div>
      </div>

    </div>
  );
};

export default Diseases;

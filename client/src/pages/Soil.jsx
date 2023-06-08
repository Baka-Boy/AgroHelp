import {useParams} from 'react-router';
import {useSpring, animated} from '@react-spring/web';
import Data from './data1.json';

export default function Soil() {
  const {id} = useParams();
  const soil = Data[id];

  // ANIMATIONS
  const fadeDown1 = useSpring({
    from: {opacity: 0, transform: 'translateY(-50px)'},
    to: {opacity: 1, transform: 'translateY(0px)'},
    config: {duration: 500},
  });

  const fadeDown2 = useSpring({
    from: {opacity: 0, transform: 'translateY(-50px)'},
    to: {opacity: 1, transform: 'translateY(0px)'},
    config: {duration: 500},
    delay: 200,
  });

  const fadeDown4 = useSpring({
    from: {opacity: 0, transform: 'translateY(-50px)'},
    to: {opacity: 1, transform: 'translateY(0px)'},
    config: {duration: 500},
    delay: 600,
  });


  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[100rem] mt-[10rem] mb-[5rem] px-8 text-[#2c302e]">
        <animated.div style={fadeDown1}>
          <h1 className="text-[36px] font-extrabold font-serif">
            {soil.name}
          </h1>
        </animated.div>

        <animated.div style={fadeDown2}>
          <img
            src={
              localStorage.getItem('uploaded') === 'true'
                ? localStorage.getItem('userImage')
                : `/sample-soil/${id}.jpg`
            }
            alt={`${id}.jpg`}
            className="w-[20rem] mt-6 rounded-xl"
          />
        </animated.div>

          <animated.div style={fadeDown4} className="mt-[2rem]">
            <p className="text-[18px] text-[#43b348] font-medium">
              What is the importance?
            </p>
            <div className="text-[32px] font-bold font-serif">Description </div>
            <div className="text-[#666e75] mt-[1rem]">{soil.cause}</div>
          </animated.div>

        </div>
      </div>
  
  );
}
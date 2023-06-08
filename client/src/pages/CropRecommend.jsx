import {useParams} from 'react-router';
import {useSpring, animated} from '@react-spring/web';
import Data from './data2.json';

export default function CropRecommend() {
  const {id} = useParams();
  const CropRecommend = Data[id];

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
            {CropRecommend.name}
          </h1>
        </animated.div>

        <animated.div style={fadeDown2}>
          <img
            src={`/sample-CropRecommend/${id}.jpg`}
            alt={`${id}.jpg`}
            className="w-[20rem] mt-6 rounded-xl"
          />
        </animated.div>

          <animated.div style={fadeDown4} className="mt-[2rem]">
            <div className="text-[32px] font-bold font-serif">Description </div>
            <div className="text-[#666e75] mt-[1rem]">{CropRecommend.description}</div>
          </animated.div>

          <animated.div style={fadeDown4} className="mt-[2rem]">
            <div className="text-[32px] font-bold font-serif">Cultivation </div>
            <div className="text-[#666e75] mt-[1rem]">{CropRecommend.cultivation}</div>
          </animated.div>

        </div>
      </div>
  
  );
}
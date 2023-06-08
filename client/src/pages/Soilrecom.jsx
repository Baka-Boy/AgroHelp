import {useParams} from 'react-router';
import {useSpring, animated} from '@react-spring/web';
import Data from './data2.json';

export default function Soilrecom() {
  const {id} = useParams();
  const soilrecom = Data[id];

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


  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[100rem] mt-[10rem] mb-[5rem] px-8 text-[#2c302e]">
        <animated.div style={fadeDown1}>
          <h1 className="text-[36px] font-extrabold font-serif">
            {soilrecom.name}
          </h1>
        </animated.div>

        <animated.div style={fadeDown2}>
          <img
            src={
              localStorage.getItem('uploaded') === 'true'
                ? localStorage.getItem('userImage')
                : `/sample-paddies/${id}.jpg`
            }
            alt={`${id}.jpg`}
            className="w-[20rem] mt-6 rounded-xl"
          />
        </animated.div>


        </div>
      </div>
  );
}

import {useParams} from 'react-router';
import {useSpring, animated} from '@react-spring/web';
import Data from './data.json';

export default function Disease() {
  const {id} = useParams();
  const disease = Data[id];

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

  const fadeDown3 = useSpring({
    from: {opacity: 0, transform: 'translateY(-50px)'},
    to: {opacity: 1, transform: 'translateY(0px)'},
    config: {duration: 500},
    delay: 400,
  });

  const fadeDown4 = useSpring({
    from: {opacity: 0, transform: 'translateY(-50px)'},
    to: {opacity: 1, transform: 'translateY(0px)'},
    config: {duration: 500},
    delay: 600,
  });

  const fadeDown5 = useSpring({
    from: {opacity: 0, transform: 'translateY(-50px)'},
    to: {opacity: 1, transform: 'translateY(0px)'},
    config: {duration: 500},
    delay: 800,
  });

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[100rem] mt-[10rem] mb-[5rem] px-8 text-[#2c302e]">
        <animated.div style={fadeDown1}>
          <h1 className="text-[36px] font-extrabold font-serif">
            {disease.name}
          </h1>

          {/* Scientific name will not show up for "normal" paddy plants */}
          {disease.scientific_name ? (
            <div className="text-[16px]">
              Scientific Name:{' '}
              <span className="font-bold text-[#537a5a]">
                {disease.scientific_name}
              </span>
            </div>
          ) : (
            <></>
          )}
        </animated.div>

        <animated.div style={fadeDown2}>
          <img
            src={
              localStorage.getItem('uploaded') === 'true'
                ? localStorage.getItem('userImage')
                : `/images/${id}.jpg`
            }
            alt={`${id}.jpg`}
            className="w-[20rem] mt-6 rounded-xl"
          />
        </animated.div>

        <div className="flex flex-col justify-center max-w-[50rem]">
          <animated.div style={fadeDown3} className="mt-[2rem]">
            <p className="text-[18px] text-[#43b348] font-medium">
              What happens?
            </p>
            <div className="text-[32px] font-bold font-serif">Symptoms: </div>
            <div className="text-[#666e75] mt-[1rem]">{disease.symptoms}</div>
          </animated.div>

          <animated.div style={fadeDown4} className="mt-[2rem]">
            <p className="text-[18px] text-[#43b348] font-medium">
              What are the causes?
            </p>
            <div className="text-[32px] font-bold font-serif">Cause: </div>
            <div className="text-[#666e75] mt-[1rem]">{disease.cause}</div>
          </animated.div>

          <animated.div style={fadeDown5} className="mt-[2rem]">
            <p className="text-[18px] text-[#43b348] font-medium">
              How do you prevent this disease?
            </p>
            <div className="text-[32px] font-bold font-serif">Prevention:</div>
            <ul className="ml-[2rem] mt-[1rem]">
              {disease.prevention.map((prevention, index) => (
                <li key={index} className="text-[#666e75] list-disc">
                  <div>{prevention}</div>
                </li>
              ))}
            </ul>
          </animated.div>
        </div>
      </div>
    </div>
  );
}

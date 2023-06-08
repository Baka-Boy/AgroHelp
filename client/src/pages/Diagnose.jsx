import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useSpring, animated} from '@react-spring/web';
import {CircularProgress, Stack} from '@mui/material';

const Diagnose = () => {
  // STATES
  const [select, setSelect] = useState('none'); // State for the sample image select value
  const [image, setImage] = useState(null); // State for user uploaded image
  const [imageData, setImageData] = useState(null); // State for user uploaded image
  const [loading, setLoading] = useState(false); // State for loading
  const [predictionType, setPredictionType] = useState("none");
  const navigate = useHistory();

  const fadeLeft = useSpring({
    from: {opacity: 0, transform: 'translateX(-100px)'},
    to: {opacity: 1, transform: 'translateX(0px)'},
    config: {duration: 500},
  });

  const fadeLeft2 = useSpring({
    from: {opacity: 0, transform: 'translateX(-100px)'},
    to: {opacity: 1, transform: 'translateX(0px)'},
    config: {duration: 500},
    delay: 500,
  });

  const fadeLeft3 = useSpring({
    from: {opacity: 0, transform: 'translateX(-100px)'},
    to: {opacity: 1, transform: 'translateX(0px)'},
    config: {duration: 500},
    delay: 1000,
  });

  // EFFECTS

  useEffect(() => {
    localStorage.setItem('uploaded', false);
  }, []);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = 256;
          canvas.height = 256;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 256, 256);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          setImageData(imageData);
        };
      };
      reader.readAsDataURL(image);
    }
  }, [image]); // Activates every time image is updated

  // FUNCTIONS

  // Sends a POST request to the server
  const handleSubmit = (e) => {
    e.preventDefault();

    // Alerts user if no image is selected
    if (!image) {
      alert('Please upload a valid image.');
      return;
    }

    const data = imageData.data;
    const length = imageData.height;
    const width = imageData.width;
    const imageArray = new Array(length);
    for (let i = 0; i < length; i++) {
      imageArray[i] = new Array(width);
      for (let j = 0; j < width; j++) {
        const red = data[(i * width + j) * 4];
        const green = data[(i * width + j) * 4 + 1];
        const blue = data[(i * width + j) * 4 + 2];
        imageArray[i][j] = [red, green, blue];
      }
    }
    setLoading(true);
 
    fetch(`http://127.0.0.1:5000/predict/${predictionType.toLowerCase()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(imageArray),
    })
      .then(
        (response) => response.json(), // if the response is a JSON object
      )
      .then((data) => {
        setLoading(false);
        let page = data[0]
        if (predictionType == "potato") page += 4;
        if (predictionType == "apple") page += 7;
        navigate.push('/disease/' + page);
        // navigate(`/diseases/${predictionType.toLowerCase()}/` + page);
      });

    //   fetch('http://127.0.0.1:5000/predict/Apple', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(imageArray),
    // })
    //   .then(
    //     (response) => response.json(), // if the response is a JSON object
    //   )
    //   .then((data) => {
    //     setLoading(false);
    //     navigate('/diseases/' + data[0]);
    //   });
      
  };

  const updatePredictionType = (e) => {
    setPredictionType(e.target.value);
  }

  // Updates the image state every time the select input changes
  const updateSelect = (e) => {
    setSelect(e.target.value);

    const img = new Image();
    img.src = `/images/${e.target.value}.jpg`;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          const file = new File([blob], 'image.jpg', {type: 'image/jpeg'});
          setImage(file);
          localStorage.setItem('userImage', URL.createObjectURL(file));
          localStorage.setItem('uploaded', true);
        },
        'image/jpeg',
        1,
      );
    };
  };

  // Updates the image state every time the user uploads an image
  const updateUserImage = (e) => {
    if (e.target.files[0]) {
      // Resize the image to 300x300
      setImage(e.target.files[0]);
      localStorage.setItem('userImage', URL.createObjectURL(e.target.files[0]));
      localStorage.setItem('uploaded', true);
    }
  };

  return (
    <div className="flex justify-center text-[#2c302e] mb-[5rem]">
      <form align='center'
        onSubmit={(e) => handleSubmit(e)}
        action="POST"
        name="detection"
        id="detection"
        className="flex flex-col justify-center mt-[10rem] w-[100rem] px-8"
      >
        <animated.div align='center' style={fadeLeft}>
          <h1 className="text-[32px] font-bold font-serif">Diagnose</h1>
          <p className="text-[16px] text-[#666e75] lg:w-[50rem] w[20rem] mt-4">
            This feature allows users to upload images of their Crops and Fruits images and
            uses Image Recognition Technology to detect any signs of disease. It then provides a diagnosis of the
            disease along with recommended treatment options. This feature is
            designed to assist farmers in identifying and addressing potential
            issues with their crops quickly and efficiently.
          </p>
        </animated.div>
        <animated.div align='center' style={fadeLeft2}>
          <p className="text-[16px] mt-10">
            Upload an image or choose from one of our demo images below!
          </p>

          <select align='center'
            onChange={(e) => updatePredictionType(e)}
            value={predictionType}
            className="mt-6 bg-white border px-4 py-2 w-[14rem] rounded-md text-center "
            ame="detection"
            id="detection"
            name="detection"
          >
            <option value="none" disabled hidden></option>
            <option value="maize">Maize</option>
            <option value="potato">Potato</option>
            <option value="apple">Apple</option>
            {/* <option value="2">Gray Leaf Spot (Maize)</option>
            <option value="3">Blast (Maize)</option>
            <option value="4">Disease 1 (Apple)</option>
            <option value="5">Disease 2 (Apple)</option>
            <option value="6">Disease 3 (Apple)</option> */}
            
          </select>
          <br></br>
        <div align='center'>
          <select align='center'
            onChange={(e) => updateSelect(e)}
            value={select}
            className="mt-6 bg-white border px-4 py-2 w-[14rem] rounded-md text-center "
            ame="paddies"
            id="paddies"
          >
            <option value="none" disabled hidden></option>
            <option value="0">Blight (Maize)</option>
            <option value="1">Common Rust (Maize)</option>c
            <option value="2">Gray Leaf Spot (Maize)</option>
            <option value="3">Blast (Maize)</option>
            <option value="4">Potato Early Blight (Potato)</option>
            <option value="5">Potato Late Blight (Potato)</option>
            <option value="6">Healthy Potato (Potato)</option>
            <option value="7"> Apple Scab (Apple) </option>
            <option value="8"> Apple Black Rot (Apple) </option>
            <option value="9"> Cedar Apple Rust (Apple) </option>
            <option value="10"> Healthy Apple (Apple) </option>
            
          </select>
        
          <input align='center'
            onChange={(e) => updateUserImage(e)}
            type="file"
            name="userImage"
            id="userImage"
            placeholder="Choose the image"
            className="mt-6 block w-full text-sm text-[#666e75] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#2c302e] file:text-[#9ae19f] hover:file:bg-[#3b5449]"
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="image"
              className="w-[20rem] mt-6 rounded-xl"
            />
          )}
          </div>
        </animated.div>
        <Stack align='center'
          direction="row"
          spacing={4}
          alignItems="center"
          alignContent="center"
          justifyItems="center"
        >
          <animated.div align='center' style={fadeLeft3}>
            <button align='center'
              type="submit"
              className="transition ease-in-out duration-100 mt-12 hover:bg-[#b8e4bb] bg-[#9ae19f] w-[6rem] px-4 py-2 rounded-md"
            >
              Upload
            </button>
        
          </animated.div>
          {loading && <CircularProgress color="success" />}
        </Stack>
    
      </form>
    </div>
  );
};

export default Diagnose;

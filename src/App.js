import { useState, useEffect } from "react";
import Particles from "react-particles-js";
import FaceRecognition from "./components/FaceRecognition";
import ImageLinkForm from "./components/ImageLinkForm";
import Logo from "./components/Logo";
import Navigation from "./components/Navigation";
import Rank from "./components/Rank";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import "./styles.css";

const initailUserState = {
  id: "",
  name: "",
  email: "",
  password: "",
  entries: 0,
  joined: ""
};

function App() {
  const [input, setInput] = useState(
    "https://goop-img.com/wp-content/uploads/2015/08/9-Best-Clean-Face-Oils-TLP-MANI-0100_Magdalena-Niziol-The-Licensing-Project.jpg"
  );
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(initailUserState);

  useEffect(() => {
    fetch("https://immense-hamlet-18637.herokuapp.com/")
      .then((res) => res.json())
      .then(console.log);
  }, []);

  const loadUser = (user) => {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      entries: user.entries,
      joined: user.joined
    });
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  const displayFaceBox = (box) => {
    setBox({ ...box });
  };

  // https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg

  // "https://samples.clarifai.com/face-det.jpg"
  const onButtonSubmit = () => {
    setImageUrl(input);
    fetch("https://immense-hamlet-18637.herokuapp.com/imageUrl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: input })
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://immense-hamlet-18637.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: user.id })
          })
            .then((res) => res.json())
            .then((count) => {
              setUser((user) => {
                return { ...user, entries: count };
              });
            })
            .catch(console.log);
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  const particlesOptions = {
    particles: {
      number: {
        value: 40,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setIsSignedIn(false);
      setInput("");
      setImageUrl("");
      setBox({});
      setRoute("signin");
      setIsSignedIn(false);
      setUser(initailUserState);
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />

      {route === "home" ? (
        <>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            input={input}
            onButtonSubmit={onButtonSubmit}
            onInputChange={onInputChange}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </>
      ) : route === "signin" ? (
        <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;

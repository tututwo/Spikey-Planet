import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// import Experience from './Experience.jsx'
import Sun from "./Sun.jsx";
import Spikey from "./Spikey.jsx";
const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <OrbitControls makeDefault />
      {/* <Experience /> */}
      <Sun />
      {/* <Spikey /> */}
    </Canvas>
  </>
);

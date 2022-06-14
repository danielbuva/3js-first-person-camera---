import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { OrbitControls, Stars, PointerLockControls, Sky } from "@react-three/drei";
import User from "./User";
import Floor from './Floor'
import Workbench from "./Workbench";

const Box = () => {
  return (
    <mesh position={[0, 1, 0]}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 2]}/>
      <meshStandardMaterial attach="material" color="red" />
    </mesh>
  );
};



function App() {
  return (
    <Canvas>
      <Stars />
      <Sky/>
      <PointerLockControls />
      <ambientLight color={0x404040} intensity={1} />
      <directionalLight position={1} castShadow={true} shadowBias={-0.01} />
      <Physics>
        <User />
        <Workbench/>
        {/* <Box /> */}
        <Floor />
      </Physics>
    </Canvas>
  );
}

export default App;

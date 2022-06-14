import { usePlane } from "@react-three/cannon";

const Floor = (props: any) => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="pink" />
    </mesh>
  );
};
export default Floor;

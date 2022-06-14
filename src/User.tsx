import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { useSphere, useCylinder, useCompoundBody } from "@react-three/cannon";
import { useState, useRef, useEffect } from "react";
import { Capsule } from "@react-three/drei";
import { Camera } from "three";
// import { useRigidBody, ShapeType, AmmoPhysicsContext } from "use-ammojs";

const SPEED = 5;
const keys = { KeyW: "forward", KeyS: "backward", KeyA: "left", KeyD: "right", Space: "jump" };
const mouse = { leftButton: false, rightButton: false, mouseX: 0, mouseY: 0 };
const movementInput = (key: any) => keys[key];
const cameraInput = (key: any) => mouse[key];

const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const rotation = new THREE.Vector3();
const speed = new THREE.Vector3();
const camera = new THREE.Camera();

const InputController = () => {
  const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false, jump: false });
  const [camera, setCamera] = useState((Window, ev: MouseEvent) => ev.pageX - window.innerWidth / 2);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => setMovement((m: any) => ({ ...m, [movementInput(e.code)]: true }));
    const handleKeyUp = (e: KeyboardEvent) => setMovement((m: any) => ({ ...m, [movementInput(e.code)]: false }));
    const handleMouseDown = (e: MouseEvent) => setCamera((c: any) => ({ ...c, [cameraInput(e.code)]: true }));
    const handleMouseUp = (e: MouseEvent) => setCamera((c: any) => ({ ...c, [cameraInput(e.code)]: false }));
    const handleMouseMove = (e: MouseEvent) => setCamera((c: any) => ({ ...c, [cameraInput(e.code)]: c }));

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return movement;
};
const User = (props: any) => {
  const [ref, api] = useSphere(() => ({ mass: 1, type: "Dynamic", position: [0, 5, 0] }));
  const { forward, backward, left, right, jump } = InputController();
  const { camera } = useThree();
  const velocity = useRef([0, 0, 0]);
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [api.velocity]);
  useFrame((state) => {
    ref.current?.getWorldPosition(camera.position);
    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation);
    speed.fromArray(velocity.current);
    api.velocity.set(direction.x, velocity.current[1], direction.z);
    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) api.velocity.set(velocity.current[0], 10, velocity.current[2]);
  });
  return (
    <>
      <mesh ref={ref} />
    </>
  );
};
export default User;

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";

const Gameplay = () => {
  const [video] = React.useState(() => {
    const vid = document.createElement("video")
    vid.src = "https://cdn.discordapp.com/attachments/902872036844666900/980063916484857896/noot.mp4"
    vid.crossOrigin = "Anonymous"
    vid.loop = true
    vid.muted = false
    vid.play()
    return vid;
  })
  return (
    <Canvas>
      <fog attach="fog" args={["black", 1, 7]} />
      <OrbitControls maxPolarAngle={Math.PI/2} minPolarAngle={0} />
      <directionalLight intensity={0.5} />
      <group>
        <mesh>
          <boxGeometry args={[2,1,1]} />
          <meshStandardMaterial color={"blue"}>
            <videoTexture attach="map" args={[video]} />
            <videoTexture attach="emissiveMap" args={[video]} />
          </meshStandardMaterial>
        </mesh>
      </group>
    </Canvas>
  )
}

export default Gameplay
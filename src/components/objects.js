import { Canvas, useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import { motion } from "framer-motion-3d"
import * as THREE from "three"
import * as React from "react"

const Box = props => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = React.useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = React.useState(false)
  const [clicked, click] = React.useState(false)

  return (
    <motion.mesh
      {...props}
      ref={ref}
      receiveShadow
      onPointerOver={event => hover(true)}
      onPointerOut={event => hover(false)}
    >
      <boxGeometry args={[2, 1, 1]} />
      <meshStandardMaterial color={props.color} />
    </motion.mesh>
  )
}

const CameraRig = ({ v = new THREE.Vector3() }) => {
  return useFrame(state => {
    state.camera.position.lerp(
      v.set(state.mouse.x / 3, state.mouse.y / 3, 9),
      0.05
    )
  })
}

export const Objects = () => {
  const colors = [
    "#EAB464",
    "#8D98A7",
    "#F25757",
    "#F1BB87",
    "#D7F9FF",
    "#5AA9E6",
  ]
  const [hover, setHover] = React.useState(false)

  return (
    <Canvas shadowMap fov={22} className="absolute">
      <ambientLight intensity={0.6} castShadow />
      <pointLight position={[0, 0, 8]} intensity={1.4} castShadow />
      <CameraRig />
      <Text position={[0, 0.5, 4]} fontSize={1} color="#242423">
        Sleep deprivation simulator
      </Text>
      <motion.group
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        animate={hover ? "hover" : "rest"}
      >
        <Box
        recieveShadow
          width={200}
          color={colors[THREE.MathUtils.randInt(0, colors.length - 1)]}
          position={[0, -1.5, 4.5]}
        />
        <motion.group animate={hover ? "hover": "rest"} whileHover={{z: 0.1}}>
        <Text castShadow position={[0, -1.5, 5.05]} fontSize={0.2} color="#704C5E">
          Start suffering
        </Text>
        </motion.group>
      </motion.group>
    </Canvas>
  )
}

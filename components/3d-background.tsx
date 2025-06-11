"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"

function AnimatedSphere({
  position,
  color,
  speed,
}: { position: [number, number, number]; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.4}
        emissive={color}
        emissiveIntensity={0.8}
        wireframe
        roughness={0.3}
        metalness={0.8}
      />
    </mesh>
  )
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 500 // Reduced particle count for cleaner look
  
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 15     // Reduced spread
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15
    
    const color = new THREE.Color()
    color.setHSL(0.6 + Math.random() * 0.1, 0.7, 0.6) // More consistent colors
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} vertexColors transparent opacity={0.6} />
    </points>
  )
}

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  const nodes = [
    // Input layer
    { position: [4, 6, 0], color: "#9333ea" },
    { position: [-4, 0, 0], color: "#9333ea" },
    { position: [-4, -2, 0], color: "#9333ea" },
    // Hidden layer 1
    { position: [1, 3, 0], color: "#06b6d4" },
    { position: [1, 0, 0], color: "#06b6d4" },
    { position: [0, -1, 0], color: "#06b6d4" },
    // Output layer
    { position: [3, 5, 0], color: "#10b981" },
    { position: [4, 0, 0], color: "#10b981" },
    { position: [4, -2, 0], color: "#10b981" }
  ]

  return (
    <group ref={groupRef}>
      {nodes.map((node, index) => (
        <AnimatedSphere
          key={index}
          position={node.position as [number, number, number]}
          color={node.color}
          speed={0.5 + index * 0.1}
        />
      ))}

      {/* Neural connections */}
      {nodes.map((node, i) =>
        nodes.slice(i + 1).map((otherNode, j) => (
          <line key={`${i}-${j}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([...node.position, ...otherNode.position]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#9333ea" transparent opacity={0.1} />
          </line>
        )),
      )}
    </group>
  )
}

function Scene() {
  return (
    <>
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.5}
      />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#9333ea" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#06b6d4" />

      <FloatingParticles />
      <NeuralNetwork />

      {/* Floating geometric shapes */}
      <AnimatedSphere position={[-8, 3, -5]} color="#9333ea" speed={0.15} />
      <AnimatedSphere position={[8, -2, 3]} color="#c084fc" speed={0.3} />
      <AnimatedSphere position={[0, 5, -1]} color="#06b6d4" speed={0.2} />
      <AnimatedSphere position={[3, 7, 0]} color="#FFAC1C" speed={0.5} />
    </>
  )
}

const ThreeDBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        dpr={[1, 2]}
        camera={{
          position: [0, 0, 15],
          fov: 50,
          near: 0.1,
          far: 1000
        }}
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <Scene />
      </Canvas>
    </div>
  )
}

export { ThreeDBackground }

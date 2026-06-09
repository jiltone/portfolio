import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import * as THREE from 'three'
import ParticleField from './ParticleField'
import { NeuralCore, DataMatrix, HelixDNA, ProjectOrb, WormholeOrb } from './FloatingModel'

export default function Scene3D({ scrollProgress }) {
  return (
    <div id="canvas-container">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <ambientLight intensity={0.1} />

        <Suspense fallback={null}>
          <ParticleField count={2200} />
          <NeuralCore scrollProgress={scrollProgress} />
          <DataMatrix scrollProgress={scrollProgress} />
          <HelixDNA scrollProgress={scrollProgress} />
          <ProjectOrb scrollProgress={scrollProgress} />
          <WormholeOrb scrollProgress={scrollProgress} />
        </Suspense>

        <EffectComposer>
          <Bloom
            intensity={1.8}
            luminanceThreshold={0.08}
            luminanceSmoothing={0.92}
            mipmapBlur
          />
          <ChromaticAberration offset={[0.0006, 0.0006]} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

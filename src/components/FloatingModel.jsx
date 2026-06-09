import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Shared colors ────────────────────────────────────────────────────────────
const ACCENT = '#00ffcc'
const BLUE = '#4f8eff'
const VIOLET = '#a855f7'

// ─── Section scroll windows (5 × 100vh page) ─────────────────────────────────
// Hero      sp 0.00–0.20
// About     sp 0.20–0.40
// Experience sp 0.40–0.60
// Projects  sp 0.60–0.80
// Contact   sp 0.80–1.00

/**
 * NeuralCore — Scene 1 (Hero → About)
 * Glowing icosahedron wireframe + orbiting rings
 */
function NeuralCore({ scrollProgress }) {
  const groupRef = useRef()
  const coreRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const sp = scrollProgress?.current ?? 0

    if (groupRef.current) {
      // Antigravity float
      groupRef.current.position.y = Math.sin(t * 0.7) * 0.18
      // Drift right + shrink as user leaves hero
      const progress = Math.min(sp * 5, 1)  // 0→1 over first section
      groupRef.current.position.x = THREE.MathUtils.lerp(0, 2.8, progress)
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(1, 0.5, progress))
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.15
      coreRef.current.rotation.y = t * 0.22
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.4
      ring1Ref.current.rotation.x = Math.cos(t * 0.3) * 0.5
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.3
      ring2Ref.current.rotation.z = t * 0.15
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = t * 0.2
      ring3Ref.current.rotation.y = -t * 0.35
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Core icosahedron */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={ACCENT} wireframe />
      </mesh>

      {/* Inner solid glow shell */}
      <mesh>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.04} />
      </mesh>

      {/* Orbiting ring 1 — tight */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.6, 0.008, 6, 80]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.6} />
      </mesh>

      {/* Orbiting ring 2 — medium */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.1, 0.006, 6, 80]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.5} />
      </mesh>

      {/* Orbiting ring 3 — wide */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 5, Math.PI / 4, 0]}>
        <torusGeometry args={[2.6, 0.004, 6, 80]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0.4} />
      </mesh>

      <pointLight color={ACCENT} intensity={3} distance={5} />
    </group>
  )
}

// ─── DataMatrix — Scene 2 (About) ─────────────────────────────────────────────
function DataShard({ position, delay }) {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime() + delay
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.12
      ref.current.rotation.x = t * 0.3
      ref.current.rotation.z = t * 0.2
    }
  })
  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.12, 0]} />
      <meshBasicMaterial color={BLUE} wireframe />
    </mesh>
  )
}

function DataMatrix({ scrollProgress }) {
  const groupRef = useRef()

  const shards = useMemo(() => {
    const items = []
    for (let x = -3; x <= 3; x += 0.9) {
      for (let y = -1.5; y <= 1.5; y += 0.9) {
        items.push({
          position: [
            x + (Math.random() - 0.5) * 0.3,
            y + (Math.random() - 0.5) * 0.3,
            (Math.random() - 0.5) * 1.5,
          ],
          delay: Math.random() * Math.PI * 2,
        })
      }
    }
    return items
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const sp = scrollProgress?.current ?? 0
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1
      groupRef.current.rotation.y = t * 0.03
      // Fade in at sp=0.20, fade out at sp=0.40
      const vis = Math.max(0, Math.min(1, (sp - 0.20) * 10)) *
        Math.max(0, Math.min(1, (0.45 - sp) * 10))
      groupRef.current.scale.setScalar(vis)
    }
  })

  return (
    <group ref={groupRef} scale={0}>
      {shards.map((s, i) => (
        <DataShard key={i} position={s.position} delay={s.delay} />
      ))}
      <pointLight color={BLUE} intensity={2} distance={8} position={[0, 0, 0]} />
    </group>
  )
}

// ─── HelixDNA — Scene 3 (Experience) ──────────────────────────────────────────
function HelixDNA({ scrollProgress }) {
  const groupRef = useRef()

  const points = useMemo(() => {
    const strand1 = []
    const strand2 = []
    for (let i = 0; i < 60; i++) {
      const t = (i / 60) * Math.PI * 4
      strand1.push(new THREE.Vector3(Math.cos(t) * 1.0, (i / 60) * 4 - 2, Math.sin(t) * 1.0))
      strand2.push(new THREE.Vector3(Math.cos(t + Math.PI) * 1.0, (i / 60) * 4 - 2, Math.sin(t + Math.PI) * 1.0))
    }
    return { strand1, strand2 }
  }, [])

  const geometry1 = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.strand1)
    return new THREE.TubeGeometry(curve, 100, 0.025, 6, false)
  }, [points])

  const geometry2 = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.strand2)
    return new THREE.TubeGeometry(curve, 100, 0.025, 6, false)
  }, [points])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const sp = scrollProgress?.current ?? 0
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.15
      groupRef.current.position.x = THREE.MathUtils.lerp(-2.5, 0, Math.min(1, (sp - 0.40) * 10))
      // Fade in at sp=0.40, fade out at sp=0.62
      const vis = Math.max(0, Math.min(1, (sp - 0.40) * 12)) *
        Math.max(0, Math.min(1, (0.65 - sp) * 12))
      groupRef.current.scale.setScalar(vis * 0.9)
    }
  })

  return (
    <group ref={groupRef} scale={0}>
      <mesh geometry={geometry1}>
        <meshBasicMaterial color={ACCENT} transparent opacity={0.85} />
      </mesh>
      <mesh geometry={geometry2}>
        <meshBasicMaterial color={VIOLET} transparent opacity={0.85} />
      </mesh>

      {/* Rungs connecting the strands */}
      {points.strand1.map((p1, i) => {
        if (i % 5 !== 0) return null
        const p2 = points.strand2[i]
        const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5)
        const dist = p1.distanceTo(p2)
        return (
          <mesh key={i} position={mid.toArray()}>
            <cylinderGeometry args={[0.01, 0.01, dist, 4]} />
            <meshBasicMaterial color={BLUE} transparent opacity={0.5} />
          </mesh>
        )
      })}

      <pointLight color={ACCENT} intensity={2.5} distance={6} />
      <pointLight color={VIOLET} intensity={1.5} distance={6} position={[0, -2, 0]} />
    </group>
  )
}

// ─── ProjectOrb — Scene 4 (Projects) ──────────────────────────────────────────
function ProjectOrb({ scrollProgress }) {
  const ref = useRef()
  const inner = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const sp = scrollProgress?.current ?? 0
    if (ref.current) {
      ref.current.position.y = Math.sin(t * 0.8) * 0.15
      ref.current.position.x = THREE.MathUtils.lerp(0, -2.5, Math.max(0, Math.min(1, (sp - 0.60) * 10)))
      ref.current.rotation.y = t * 0.18
      // Fade in at sp=0.60, fade out at sp=0.82
      const vis = Math.max(0, Math.min(1, (sp - 0.60) * 12)) *
        Math.max(0, Math.min(1, (0.85 - sp) * 12))
      ref.current.scale.setScalar(vis * 0.9)
    }
    if (inner.current) {
      inner.current.rotation.x = t * 0.25
      inner.current.rotation.z = t * 0.15
    }
  })

  return (
    <group ref={ref} scale={0}>
      <mesh ref={inner}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color={VIOLET} wireframe />
      </mesh>
      <mesh>
        <dodecahedronGeometry args={[1.4, 0]} />
        <meshBasicMaterial color={VIOLET} wireframe transparent opacity={0.25} />
      </mesh>
      <mesh>
        <dodecahedronGeometry args={[1.8, 0]} />
        <meshBasicMaterial color={BLUE} wireframe transparent opacity={0.1} />
      </mesh>
      <pointLight color={VIOLET} intensity={3} distance={6} />
    </group>
  )
}

// ─── WormholeOrb — Scene 5 (Contact) ─────────────────────────────────────────
function WormholeOrb({ scrollProgress }) {
  const groupRef = useRef()
  const rA = useRef()
  const rB = useRef()
  const rC = useRef()
  const sphere = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const sp = scrollProgress?.current ?? 0
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.65) * 0.2
      // Fade in at sp=0.80
      const vis = Math.max(0, Math.min(1, (sp - 0.80) * 12))
      groupRef.current.scale.setScalar(vis * 0.85)
    }
    if (rA.current) { rA.current.rotation.z = t * 0.55; rA.current.rotation.x = t * 0.28 }
    if (rB.current) { rB.current.rotation.y = -t * 0.42; rB.current.rotation.z = t * 0.18 }
    if (rC.current) { rC.current.rotation.x = t * 0.22; rC.current.rotation.y = t * 0.38 }
    if (sphere.current) { sphere.current.rotation.x = t * 0.2; sphere.current.rotation.y = t * 0.3 }
  })

  return (
    <group ref={groupRef} scale={0} position={[0, 0, 0]}>
      {/* Inner wireframe sphere */}
      <mesh ref={sphere}>
        <icosahedronGeometry args={[0.55, 2]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.9} />
      </mesh>

      {/* Concentric rings */}
      <mesh ref={rA}>
        <torusGeometry args={[1.1, 0.007, 4, 64]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.8} />
      </mesh>
      <mesh ref={rB} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.006, 4, 64]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.55} />
      </mesh>
      <mesh ref={rC} rotation={[Math.PI / 4, Math.PI / 5, 0]}>
        <torusGeometry args={[1.9, 0.005, 4, 64]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0.4} />
      </mesh>

      <pointLight color={ACCENT} intensity={3.5} distance={6} />
      <pointLight color={VIOLET} intensity={1.5} distance={6} position={[0, 0, 2]} />
    </group>
  )
}

export { NeuralCore, DataMatrix, HelixDNA, ProjectOrb, WormholeOrb }

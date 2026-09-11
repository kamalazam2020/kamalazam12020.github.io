import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroAutomotive3DProps {
  className?: string;
}

export const HeroAutomotive3D: React.FC<HeroAutomotive3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(4.2, 1.6, 5.2);
    camera.lookAt(0, 0.2, 0);

    // 3. Renderer with antialiasing and alpha
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. Cinematic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x1a1e24, 1.4);
    scene.add(ambientLight);

    // Key light (cool specular highlight on body lines)
    const keyLight = new THREE.DirectionalLight(0xdde8f5, 2.6);
    keyLight.position.set(6, 7, 4);
    scene.add(keyLight);

    // Warm dusk rim light (matches sunset horizon in photograph)
    const rimLight = new THREE.DirectionalLight(0xf5a962, 2.4);
    rimLight.position.set(-6, 3, -4);
    scene.add(rimLight);

    // Low fill light underbody
    const fillLight = new THREE.DirectionalLight(0x3a4856, 1.0);
    fillLight.position.set(0, -2, 5);
    scene.add(fillLight);

    // 5. Automotive Object Root Group
    const carGroup = new THREE.Group();
    carGroup.position.set(0, -0.15, 0);
    scene.add(carGroup);

    // --- Premium Automotive Geometry & Shaders ---
    // Luxury Car Paint: Obsidian Metallic with high clearcoat
    const paintMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x0a0c10),
      metalness: 0.94,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.95,
    });

    // Satin Carbon fiber / dark titanium accent material
    const carbonMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x15181c),
      metalness: 0.85,
      roughness: 0.35,
    });

    // High-spec Glass Canopy material
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x05070a),
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.7,
      transparent: true,
      opacity: 0.92,
      ior: 1.52,
    });

    // Emissive Lightbars (Headlights & DRLs)
    const headlightMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xecf6ff),
      emissive: new THREE.Color(0x8bc3ff),
      emissiveIntensity: 2.5,
      roughness: 0.1,
    });

    // Tail light strip (thin red signature)
    const taillightMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xff1e28),
      emissive: new THREE.Color(0xff0511),
      emissiveIntensity: 3.0,
      roughness: 0.2,
    });

    // Wheel Tire Rubber
    const tireMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x0c0d0e),
      roughness: 0.85,
      metalness: 0.1,
    });

    // Wheel Alloy Rim
    const rimMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x88929e),
      metalness: 0.95,
      roughness: 0.2,
    });

    // Brake Caliper (Performance Amber/Gold)
    const caliperMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xd49b29),
      metalness: 0.7,
      roughness: 0.3,
    });

    // A. Main Sculpted Body (Aerodynamic Lower Chassis)
    const bodyGeometry = new THREE.BoxGeometry(3.6, 0.45, 1.7, 8, 4, 8);
    // Taper front and rear
    const pos = bodyGeometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      let z = pos.getZ(i);

      // Nose taper
      if (x > 0.8) {
        const factor = (x - 0.8) / 1.0;
        z *= 1 - factor * 0.28;
        pos.setY(i, y - factor * 0.12);
      }
      // Rear taper and diffuser rise
      if (x < -0.8) {
        const factor = (-x - 0.8) / 1.0;
        z *= 1 - factor * 0.18;
        if (y < 0) {
          pos.setY(i, y + factor * 0.08); // diffuser upsweep
        }
      }
      // Aerodynamic curve on roof/hood
      if (y > 0 && Math.abs(x) < 1.2) {
        pos.setY(i, y + 0.06 * Math.cos(x * 1.3));
      }
      pos.setZ(i, z);
    }
    bodyGeometry.computeVertexNormals();
    const mainBodyMesh = new THREE.Mesh(bodyGeometry, paintMaterial);
    mainBodyMesh.position.y = 0.32;
    carGroup.add(mainBodyMesh);

    // B. Aerodynamic Canopy / Cockpit Greenhouse
    const canopyGeometry = new THREE.CylinderGeometry(0.72, 0.95, 1.85, 16, 4, false, 0, Math.PI);
    canopyGeometry.rotateZ(Math.PI / 2);
    canopyGeometry.rotateY(Math.PI / 2);
    canopyGeometry.scale(1.1, 0.44, 0.88);
    const canopyMesh = new THREE.Mesh(canopyGeometry, glassMaterial);
    canopyMesh.position.set(-0.15, 0.65, 0);
    carGroup.add(canopyMesh);

    // C. Roof Cap (Carbon Fiber backbone)
    const roofGeo = new THREE.BoxGeometry(1.6, 0.06, 0.95);
    const roofMesh = new THREE.Mesh(roofGeo, carbonMaterial);
    roofMesh.position.set(-0.12, 0.87, 0);
    carGroup.add(roofMesh);

    // D. Front Aerodynamic Splitter (Carbon)
    const splitterGeo = new THREE.BoxGeometry(0.65, 0.05, 1.8);
    const splitterMesh = new THREE.Mesh(splitterGeo, carbonMaterial);
    splitterMesh.position.set(1.7, 0.1, 0);
    carGroup.add(splitterMesh);

    // E. Rear Diffuser & Aero Wing
    const wingGeo = new THREE.BoxGeometry(0.35, 0.04, 1.75);
    const wingMesh = new THREE.Mesh(wingGeo, carbonMaterial);
    wingMesh.position.set(-1.75, 0.68, 0);
    carGroup.add(wingMesh);

    const wingPillarGeo = new THREE.BoxGeometry(0.08, 0.25, 0.04);
    const wingPillar1 = new THREE.Mesh(wingPillarGeo, carbonMaterial);
    wingPillar1.position.set(-1.65, 0.55, 0.45);
    const wingPillar2 = new THREE.Mesh(wingPillarGeo, carbonMaterial);
    wingPillar2.position.set(-1.65, 0.55, -0.45);
    carGroup.add(wingPillar1, wingPillar2);

    // F. Sleek Horizon Headlight Strips (Linear LED optics)
    const headlightGeo = new THREE.BoxGeometry(0.2, 0.03, 0.45);
    const leftHeadlight = new THREE.Mesh(headlightGeo, headlightMaterial);
    leftHeadlight.position.set(1.75, 0.38, 0.58);
    leftHeadlight.rotation.y = -0.15;
    const rightHeadlight = new THREE.Mesh(headlightGeo, headlightMaterial);
    rightHeadlight.position.set(1.75, 0.38, -0.58);
    rightHeadlight.rotation.y = 0.15;
    carGroup.add(leftHeadlight, rightHeadlight);

    // G. Rear Horizon Lightbar (Continuous single laser strip)
    const taillightGeo = new THREE.BoxGeometry(0.05, 0.035, 1.5);
    const taillightMesh = new THREE.Mesh(taillightGeo, taillightMaterial);
    taillightMesh.position.set(-1.82, 0.44, 0);
    carGroup.add(taillightMesh);

    // H. Wheels & Rotors (4 wheels)
    const wheelPositions = [
      { x: 1.15, z: 0.88, isFront: true },
      { x: 1.15, z: -0.88, isFront: true },
      { x: -1.15, z: 0.88, isFront: false },
      { x: -1.15, z: -0.88, isFront: false },
    ];

    const wheelMeshes: THREE.Group[] = [];

    wheelPositions.forEach((pos) => {
      const wheelAssembly = new THREE.Group();
      wheelAssembly.position.set(pos.x, 0.28, pos.z);

      // Tire
      const tireGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.22, 24);
      tireGeo.rotateX(Math.PI / 2);
      const tireMesh = new THREE.Mesh(tireGeo, tireMaterial);
      wheelAssembly.add(tireMesh);

      // Rim Spoke Disc
      const rimGeo = new THREE.CylinderGeometry(0.23, 0.23, 0.23, 10);
      rimGeo.rotateX(Math.PI / 2);
      const rimMesh = new THREE.Mesh(rimGeo, rimMaterial);
      wheelAssembly.add(rimMesh);

      // Brake Caliper
      const caliperGeo = new THREE.BoxGeometry(0.08, 0.12, 0.05);
      const caliperMesh = new THREE.Mesh(caliperGeo, caliperMaterial);
      caliperMesh.position.set(0.12, 0.1, 0);
      wheelAssembly.add(caliperMesh);

      carGroup.add(wheelAssembly);
      wheelMeshes.push(wheelAssembly);
    });

    // I. Ground Ambient Occlusion & Reflection Disc
    const groundGeo = new THREE.PlaneGeometry(6, 6);
    const groundMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const groundPlane = new THREE.Mesh(groundGeo, groundMat);
    groundPlane.rotation.x = -Math.PI / 2;
    groundPlane.position.y = 0.01;
    scene.add(groundPlane);

    // 6. Smooth Mouse Interaction tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      // Normalized coordinates (-1 to 1)
      const nx = (clientX / rect.width) * 2 - 1;
      const ny = (clientY / rect.height) * 2 - 1;
      mouseRef.current.targetX = nx * 0.18;
      mouseRef.current.targetY = ny * 0.12;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 7. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      }
    });
    resizeObserver.observe(container);

    // 8. Animation Loop
    let animationFrameId: number;
    let baseRotation = -Math.PI * 0.35; // start at alluring 3/4 front angle

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Continuous ultra-slow rotation if motion not reduced
      if (!prefersReducedMotion) {
        baseRotation += 0.0022; // Controlled, slow, luxury pace
      }

      // Smooth lerp mouse tracking
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      // Apply rotation (continuous base + mouse responsive nudge)
      carGroup.rotation.y = baseRotation + mouseRef.current.x;
      carGroup.rotation.x = mouseRef.current.y * 0.4;
      carGroup.rotation.z = -mouseRef.current.x * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      // Dispose materials & geometries
      bodyGeometry.dispose();
      canopyGeometry.dispose();
      roofGeo.dispose();
      splitterGeo.dispose();
      wingGeo.dispose();
      paintMaterial.dispose();
      carbonMaterial.dispose();
      glassMaterial.dispose();
      headlightMaterial.dispose();
      taillightMaterial.dispose();
      tireMaterial.dispose();
      rimMaterial.dispose();
      caliperMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="hero-3d-automotive-viewport"
      className={`w-full h-full relative pointer-events-none select-none ${className}`}
      aria-label="Interactive 3D Automotive Object Render"
    />
  );
};

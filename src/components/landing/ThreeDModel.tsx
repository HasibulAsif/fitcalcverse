import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const ThreeDModel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create a dumbbell model
    const createDumbbell = () => {
      const group = new THREE.Group();

      // Handle (bar)
      const barGeometry = new THREE.CylinderGeometry(0.1, 0.1, 4, 32);
      const barMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
      const bar = new THREE.Mesh(barGeometry, barMaterial);
      group.add(bar);

      // Weights
      const weightGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 32);
      const weightMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });
      
      const weight1 = new THREE.Mesh(weightGeometry, weightMaterial);
      weight1.position.y = 1.5;
      group.add(weight1);

      const weight2 = new THREE.Mesh(weightGeometry, weightMaterial);
      weight2.position.y = -1.5;
      group.add(weight2);

      return group;
    };

    const dumbbell = createDumbbell();
    scene.add(dumbbell);

    // Position camera
    camera.position.z = 5;

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      dumbbell.rotation.y += 0.005;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-[400px]" />;
};
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const TrafficHeatmap: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // SCENE SETUP
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    
    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 150, 0);
    camera.lookAt(0, 0, 0);
    
    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 50;
    controls.maxDistance = 300;
    controls.maxPolarAngle = Math.PI / 2 - 0.1;
    
    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 100, 50);
    scene.add(directionalLight);
    
    // GRID
    const grid = new THREE.GridHelper(200, 20, 0x999999, 0xddddd);
    scene.add(grid);
    
    // GROUND PLANE
    const groundGeometry = new THREE.PlaneGeometry(200, 200);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xeeeeee,
      transparent: true,
      opacity: 0.8
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);
    
    // HEATMAP
    createHeatmap(scene);
    
    // ANIMATION LOOP
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      rendererRef.current?.dispose();
    };
  }, []);

  // Create heatmap
  const createHeatmap = (scene: THREE.Scene) => {
    // Sample traffic data (x, y, intensity)
    const trafficData = [
      // Main intersection
      { x: 0, z: 0, intensity: 0.9 },
      
      // Major roads
      { x: -40, z: 0, intensity: 0.7 },
      { x: -80, z: 0, intensity: 0.5 },
      { x: 40, z: 0, intensity: 0.8 },
      { x: 80, z: 0, intensity: 0.6 },
      
      { x: 0, z: -40, intensity: 0.7 },
      { x: 0, z: -80, intensity: 0.4 },
      { x: 0, z: 40, intensity: 0.9 },
      { x: 0, z: 80, intensity: 0.7 },
      
      // Other congestion points
      { x: -30, z: 30, intensity: 0.6 },
      { x: 60, z: -20, intensity: 0.8 },
      { x: -50, z: -50, intensity: 0.5 },
      { x: 70, z: 70, intensity: 0.3 },
    ];
    
    trafficData.forEach(point => {
      // Create gradient heat area
      const radius = 15 + point.intensity * 15;
      const segments = 32;
      
      const heatGeometry = new THREE.CircleGeometry(radius, segments);
      
      // Create gradient material (red for high traffic, green for low)
      const heatColor = new THREE.Color();
      
      // Red (high traffic) to Green (low traffic)
      if (point.intensity > 0.7) {
        heatColor.setRGB(1, 0, 0); // Red for high intensity
      } else if (point.intensity > 0.4) {
        heatColor.setRGB(1, 1, 0); // Yellow for medium intensity
      } else {
        heatColor.setRGB(0, 1, 0); // Green for low intensity
      }
      
      const heatMaterial = new THREE.MeshBasicMaterial({ 
        color: heatColor, 
        transparent: true, 
        opacity: 0.4 + point.intensity * 0.3,
        side: THREE.DoubleSide
      });
      
      const heat = new THREE.Mesh(heatGeometry, heatMaterial);
      heat.rotation.x = -Math.PI / 2;
      heat.position.set(point.x, 0.2, point.z);
      
      scene.add(heat);
    });
    
    // Add roads
    const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    
    // East-West Road
    const ewRoad = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 10),
      roadMaterial
    );
    ewRoad.rotation.x = -Math.PI / 2;
    ewRoad.position.y = 0.1;
    scene.add(ewRoad);
    
    // North-South Road
    const nsRoad = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 200),
      roadMaterial
    );
    nsRoad.rotation.x = -Math.PI / 2;
    nsRoad.position.y = 0.1;
    scene.add(nsRoad);
    
    // Add intersection markers for problematic areas
    trafficData.filter(point => point.intensity > 0.7).forEach(point => {
      const markerGeometry = new THREE.SphereGeometry(2, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      
      marker.position.set(point.x, 5, point.z);
      scene.add(marker);
    });
  };

  return (
    <div className="h-full min-h-[300px]">
      <div ref={mountRef} className="map-canvas" />
    </div>
  );
};

export default TrafficHeatmap;
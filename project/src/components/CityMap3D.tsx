import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const CityMap3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const carsRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    // SCENE SETUP
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    scene.fog = new THREE.Fog(0xf8fafc, 100, 600);
    sceneRef.current = scene;

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(200, 200, 200);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 50;
    controls.maxDistance = 400;
    controls.maxPolarAngle = Math.PI / 2 - 0.1;
    controlsRef.current = controls;

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(100, 200, 100);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 10;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.left = -200;
    directionalLight.shadow.camera.right = 200;
    directionalLight.shadow.camera.top = 200;
    directionalLight.shadow.camera.bottom = -200;
    scene.add(directionalLight);

    // GRID
    const grid = new THREE.GridHelper(500, 50, 0x999999, 0xddddd);
    scene.add(grid);

    // GROUND
    const groundGeometry = new THREE.PlaneGeometry(500, 500);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xeeeeee,
      roughness: 1,
      metalness: 0
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // CITY BUILDINGS
    createCity(scene);
    
    // ROADS
    createRoads(scene);
    
    // TRAFFIC VEHICLES
    createCars(scene);

    // ANIMATION LOOP
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      // Animate cars
      carsRef.current.forEach((car, i) => {
        const speed = 0.2 + (i % 3) * 0.1;
        car.position.x += speed;
        if (car.position.x > 100) {
          car.position.x = -100;
        }
      });
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
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

  // Function to create city buildings
  const createCity = (scene: THREE.Scene) => {
    const buildingCount = 50;
    const cityRadius = 200;
    
    for (let i = 0; i < buildingCount; i++) {
      // Random position within city radius
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * cityRadius * 0.8;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      // Random building dimensions
      const width = 5 + Math.random() * 15;
      const depth = 5 + Math.random() * 15;
      const height = 10 + Math.random() * 50;
      
      // Create building geometry
      const geometry = new THREE.BoxGeometry(width, height, depth);
      
      // Create material with random light color
      const hue = 0.6 + Math.random() * 0.1; // Mostly blue
      const saturation = 0.1 + Math.random() * 0.3;
      const lightness = 0.7 + Math.random() * 0.3;
      
      const color = new THREE.Color();
      color.setHSL(hue, saturation, lightness);
      
      const material = new THREE.MeshStandardMaterial({ color });
      
      // Create mesh
      const building = new THREE.Mesh(geometry, material);
      building.position.set(x, height / 2, z);
      building.castShadow = true;
      building.receiveShadow = true;
      
      scene.add(building);
    }
  };

  // Function to create roads
  const createRoads = (scene: THREE.Scene) => {
    const roadMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.8,
      metalness: 0.2
    });
    
    // Main roads
    const eastWestRoad = new THREE.Mesh(
      new THREE.PlaneGeometry(400, 20),
      roadMaterial
    );
    eastWestRoad.rotation.x = -Math.PI / 2;
    eastWestRoad.position.y = 0.1;
    scene.add(eastWestRoad);
    
    const northSouthRoad = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 400),
      roadMaterial
    );
    northSouthRoad.rotation.x = -Math.PI / 2;
    northSouthRoad.position.y = 0.1;
    scene.add(northSouthRoad);
    
    // Road markings
    const markingMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.5
    });
    
    for (let i = -180; i <= 180; i += 20) {
      const marking = new THREE.Mesh(
        new THREE.PlaneGeometry(5, 1),
        markingMaterial
      );
      marking.rotation.x = -Math.PI / 2;
      marking.position.set(i, 0.2, 0);
      scene.add(marking);
      
      const marking2 = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 5),
        markingMaterial
      );
      marking2.rotation.x = -Math.PI / 2;
      marking2.position.set(0, 0.2, i);
      scene.add(marking2);
    }
    
    // Intersection
    const intersection = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      roadMaterial
    );
    intersection.rotation.x = -Math.PI / 2;
    intersection.position.y = 0.15;
    scene.add(intersection);
    
    // Traffic light
    const trafficLightBase = new THREE.Mesh(
      new THREE.BoxGeometry(2, 10, 2),
      new THREE.MeshStandardMaterial({ color: 0x666666 })
    );
    trafficLightBase.position.set(15, 5, 15);
    scene.add(trafficLightBase);
    
    const trafficLightHead = new THREE.Mesh(
      new THREE.BoxGeometry(4, 8, 3),
      new THREE.MeshStandardMaterial({ color: 0x333333 })
    );
    trafficLightHead.position.set(15, 12, 15);
    scene.add(trafficLightHead);
    
    // Red light
    const redLight = new THREE.Mesh(
      new THREE.CircleGeometry(1, 16),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    redLight.position.set(15.5, 14, 13.5);
    redLight.rotation.y = Math.PI / 2;
    scene.add(redLight);
    
    // Yellow light
    const yellowLight = new THREE.Mesh(
      new THREE.CircleGeometry(1, 16),
      new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );
    yellowLight.position.set(15.5, 12, 13.5);
    yellowLight.rotation.y = Math.PI / 2;
    scene.add(yellowLight);
    
    // Green light
    const greenLight = new THREE.Mesh(
      new THREE.CircleGeometry(1, 16),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    greenLight.position.set(15.5, 10, 13.5);
    greenLight.rotation.y = Math.PI / 2;
    scene.add(greenLight);
  };

  // Function to create cars
  const createCars = (scene: THREE.Scene) => {
    const carColors = [
      0xff0000, // red
      0x0000ff, // blue
      0xffff00, // yellow
      0x00ff00, // green
      0xffffff, // white
      0x000000, // black
    ];
    
    for (let i = 0; i < 10; i++) {
      const carBody = new THREE.Mesh(
        new THREE.BoxGeometry(4, 1.5, 2),
        new THREE.MeshStandardMaterial({ 
          color: carColors[i % carColors.length],
          roughness: 0.2,
          metalness: 0.8
        })
      );
      
      const carTop = new THREE.Mesh(
        new THREE.BoxGeometry(2, 1, 1.8),
        new THREE.MeshStandardMaterial({ 
          color: carColors[i % carColors.length],
          roughness: 0.2,
          metalness: 0.8
        })
      );
      carTop.position.y = 1.25;
      carTop.position.x = -0.5;
      carBody.add(carTop);
      
      // Position along east-west road
      const lane = i % 2 === 0 ? -3 : 3;  // Two lanes
      carBody.position.set(-100 + i * 20, 1, lane);
      carBody.castShadow = true;
      
      scene.add(carBody);
      carsRef.current.push(carBody);
    }
  };

  return (
    <div className="map-container">
      <div ref={mountRef} className="map-canvas" />
      <div className="map-controls">
        <div className="flex gap-2">
          <button className="btn btn-primary">Zoom In</button>
          <button className="btn btn-outline">Reset View</button>
        </div>
      </div>
    </div>
  );
};

export default CityMap3D;
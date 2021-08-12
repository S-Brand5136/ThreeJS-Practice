import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Objects
const torus = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
const sphere = new THREE.SphereGeometry(15, 32, 16);
const ring = new THREE.RingGeometry(20, 30, 8);
const ringTwo = new THREE.RingGeometry(20, 30, 8);

// Materials
const material = new THREE.MeshNormalMaterial();
const ringMaterial = new THREE.MeshBasicMaterial({
  color: 0x0b96f2,
  side: THREE.DoubleSide,
});

// Mesh
const torusMesh = new THREE.Mesh(torus, material);
const sphereMesh = new THREE.Mesh(sphere, material);
const ringMesh = new THREE.Mesh(ring, ringMaterial);
const ringMeshTwo = new THREE.Mesh(ringTwo, ringMaterial);
scene.add(torusMesh, sphereMesh, ringMesh, ringMeshTwo);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = -4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true

/**
 * Add Star
 */

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

/**
 * Animate
 */

// Camera movment
const moveCamera = () => {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
};

document.body.onscroll = moveCamera;

// Animation
const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  torusMesh.rotation.y = 0.5 * elapsedTime;
  torusMesh.rotation.x = 0.5 * elapsedTime;
  torusMesh.rotation.z = 0.5 * elapsedTime;

  // Update Orbital Controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call animate again on the next frame
  window.requestAnimationFrame(animate);
};

animate();

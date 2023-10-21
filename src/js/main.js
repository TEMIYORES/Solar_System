import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import star from "../assets/img/star.jpeg";
const stars = "./assets/stars.jpg";
const mars_texture = "./assets/mars.jpg";
const mercury_texture = "./assets/mercury.jpg";
const neptune_texture = "./assets/neptune.jpg";
const pluto_texture = "./assets/pluto.jpg";
const saturn_ring_texture = "./assets/saturn ring.png";
const saturn_texture = "./assets/saturn.jpg";
const sun_texture = "./assets/sun.jpg";
const uranus_ring_texture = "./assets/uranus ring.png";
const uranus_texture = "./assets/uranus.jpg";
const venus_texture = "./assets/venus.jpg";
const renderer = new THREE.WebGL1Renderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
console.log(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
camera.position.set(-90, 140, 140);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  stars,
  stars,
  stars,
  stars,
  stars,
  stars,
]);
const pointLight = new THREE.PointLight(0xffffff, 8000, 300);
scene.add(pointLight);

// Texture Loader to Load Image
const textureLoader = new THREE.TextureLoader();
const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sun_texture),
  color: 0xffffff00,
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

// Mercury
const mercuryGeo = new THREE.SphereGeometry(3.2, 30, 30);
const mercuryMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load(mercury_texture),
});
const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
const mercuryObj = new THREE.Object3D();
mercuryObj.add(mercury);
scene.add(mercuryObj);
mercury.position.x = 28;

// Saturn
const saturnGeo = new THREE.SphereGeometry(10, 30, 30);
const saturnMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load(saturn_texture),
});
const saturn = new THREE.Mesh(saturnGeo, saturnMat);
const saturnObj = new THREE.Object3D();
saturnObj.add(saturn);
scene.add(saturnObj);
saturn.position.x = 138;

// Saturn Ring
const saturnRingGeo = new THREE.RingGeometry(10, 20, 32);
const saturnRingMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(saturn_ring_texture),
  side: THREE.DoubleSide,
});
const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat);
saturnObj.add(saturnRing);
saturnRing.position.x = 138;
saturnRing.rotateX(-0.5 * Math.PI);
const animate = () => {
  sun.rotateY(0.0004);
  mercury.rotateY(0.004);
  mercuryObj.rotateY(0.004);
  saturn.rotateY(0.004);
  saturnObj.rotateY(0.004);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
};
renderer.setAnimationLoop(animate);

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import star from "../assets/img/star.jpeg";
const stars = "./assets/stars.jpg";
const mars_texture = "./assets/mars.jpg";
const earth_texture = "./assets/earth.jpg";
const mercury_texture = "./assets/mercury.jpg";
const jupiter_texture = "./assets/mercury.jpg";
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
const pointLight = new THREE.PointLight(0xffffff, 10000, 300);
scene.add(pointLight);
const ambientLight = new THREE.AmbientLight(0x222222, 2);
scene.add(ambientLight);
// Texture Loader to Load Image
const textureLoader = new THREE.TextureLoader();
const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sun_texture),
  color: 0xffffff00,
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

const createPlanet = (size, texture, position, ring) => {
  const PlanetGeo = new THREE.SphereGeometry(size, 30, 30);
  const PlanetMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
  });
  const Planet = new THREE.Mesh(PlanetGeo, PlanetMat);
  const PlanetObj = new THREE.Object3D();
  PlanetObj.add(Planet);
  scene.add(PlanetObj);
  Planet.position.x = position;
  if (ring) {
    const PlanetRingGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    );
    const PlanetRingMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide,
    });
    const PlanetRing = new THREE.Mesh(PlanetRingGeo, PlanetRingMat);
    PlanetRing.rotateX(-0.5 * Math.PI);
    Planet.add(PlanetRing);
  }
  return { Planet, PlanetObj };
};
const mercury = createPlanet(3.2, mercury_texture, 28);
const venus = createPlanet(5.8, venus_texture, 44);
const earth = createPlanet(6, earth_texture, 62);
const mars = createPlanet(10, mars_texture, 78);
const jupiter = createPlanet(12, jupiter_texture, 100);
const saturn = createPlanet(10, saturn_texture, 138, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturn_ring_texture,
});
const uranus = createPlanet(7, uranus_texture, 176, {
  innerRadius: 7,
  outerRadius: 12,
  texture: uranus_ring_texture,
});
const neptune = createPlanet(7, neptune_texture, 200);
const pluto = createPlanet(2.8, pluto_texture, 216);

const animate = () => {
  // Self rotation
  sun.rotateY(0.004);
  mercury.Planet.rotateY(0.004);
  venus.Planet.rotateY(0.002);
  earth.Planet.rotateY(0.02);
  mars.Planet.rotateY(0.018);
  jupiter.Planet.rotateY(0.04);
  saturn.Planet.rotateY(0.038);
  uranus.Planet.rotateY(0.03);
  neptune.Planet.rotateY(0.032);
  pluto.Planet.rotateY(0.008);

  // Around the sun-rotation
  mercury.PlanetObj.rotateY(0.04);
  venus.PlanetObj.rotateY(0.015);
  earth.PlanetObj.rotateY(0.01);
  mars.PlanetObj.rotateY(0.008);
  jupiter.PlanetObj.rotateY(0.002);
  saturn.PlanetObj.rotateY(0.0009);
  uranus.PlanetObj.rotateY(0.0004);
  neptune.PlanetObj.rotateY(0.0001);
  pluto.PlanetObj.rotateY(0.00007);

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
};
renderer.setAnimationLoop(animate);

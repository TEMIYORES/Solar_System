import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const renderContainer = document.getElementById("render");
console.log(renderContainer.clientWidth);
const renderer = new THREE.WebGL1Renderer();
renderer.shadowMap.enabled = true;
renderer.setSize(renderContainer.clientWidth, renderContainer.clientHeight);
renderContainer.appendChild(renderer.domElement);
console.log(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);
camera.position.set(-10, 30, 30);
console.log(camera);
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

const animate = () => {
  renderer.setSize(renderContainer.clientWidth, renderContainer.clientHeight);
  renderer.render(scene, camera);
};
renderer.setAnimationLoop(animate);

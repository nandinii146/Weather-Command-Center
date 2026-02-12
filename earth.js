const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("earthCanvas").appendChild(renderer.domElement);

camera.position.z = 8;

/* Earth */
const earthGeo = new THREE.SphereGeometry(3, 64, 64);
const earthTex = new THREE.TextureLoader().load("earth.jpg");
const earthMat = new THREE.MeshStandardMaterial({ map: earthTex });
const earth = new THREE.Mesh(earthGeo, earthMat);
scene.add(earth);

/* Lights */
scene.add(new THREE.AmbientLight(0x404040));
const light = new THREE.PointLight(0xffffff, 1.5);
light.position.set(5, 3, 5);
scene.add(light);

/* Stars */
const starGeo = new THREE.BufferGeometry();
const starCount = 2000;
const positions = [];

for (let i = 0; i < starCount; i++) {
  positions.push((Math.random() - 0.5) * 200);
  positions.push((Math.random() - 0.5) * 200);
  positions.push((Math.random() - 0.5) * 200);
}

starGeo.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(positions, 3)
);

const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });
const stars = new THREE.Points(starGeo, starMat);
scene.add(stars);

/* Satellite */
const satGeo = new THREE.BoxGeometry(0.3, 0.3, 1);
const satMat = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
const satellite = new THREE.Mesh(satGeo, satMat);
scene.add(satellite);

let angle = 0;

function animate() {
  requestAnimationFrame(animate);

  earth.rotation.y += 0.002;

  angle += 0.01;
  satellite.position.x = Math.cos(angle) * 5;
  satellite.position.z = Math.sin(angle) * 5;
  satellite.position.y = Math.sin(angle) * 2;

  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

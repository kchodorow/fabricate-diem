var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add body.
var loader = new THREE.ObjectLoader();
loader.load(
  'assets/standard-female-figure.json',
  function(object) {
    scene.add(object);
  }
);

camera.position.z = -20;
camera.position.y = 0;
camera.lookAt(new THREE.Vector3(0, 2, 0));

var ambient = new THREE.AmbientLight(0x101030);
scene.add(ambient);
var directionalLight = new THREE.DirectionalLight(0xffeedd);
directionalLight.position.set(0,0,-30);
scene.add(directionalLight);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();

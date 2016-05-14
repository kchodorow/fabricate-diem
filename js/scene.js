/* global THREE, requestAnimationFrame */

goog.require('diem.Cloth');
goog.require('diem.Globals');
goog.require('diem.Person');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var cloth = new diem.Cloth(camera);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = -20;
camera.position.y = 10;
camera.lookAt(new THREE.Vector3(0, 10, 0));

var ambient = new THREE.AmbientLight(0x101030);
scene.add(ambient);
var directionalLight = new THREE.DirectionalLight(0xffeedd);
directionalLight.position.set(0,0,-30);
scene.add(directionalLight);

var clothGeometry;

var addFabric = function() {
  var loader = new THREE.TextureLoader();
  var clothTexture = loader.load('textures/patterns/circuit_pattern.png');
  clothTexture.wrapS = clothTexture.wrapT = THREE.RepeatWrapping;
  clothTexture.anisotropy = 16;

  var clothMaterial = new THREE.MeshPhongMaterial( {
    specular: 0x030303,
    map: clothTexture,
    side: THREE.DoubleSide,
    alphaTest: 0.5
  });

  // cloth geometry
  clothGeometry = new THREE.ParametricGeometry(clothFunction, cloth.w, cloth.h );
  clothGeometry.dynamic = true;

  var uniforms = {texture:  {type: "t", value: clothTexture}};
  var vertexShader = document.getElementById('vertexShaderDepth').textContent;
  var fragmentShader = document.getElementById('fragmentShaderDepth').textContent;

  // cloth mesh
  var object = new THREE.Mesh(clothGeometry, clothMaterial);
  object.position.set(0, 0, 0);
  object.castShadow = true;
  scene.add(object);

  object.customDepthMaterial = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide
  });
};

var mouse = new THREE.Vector3();
mouse.z = 0;

var onMouseMove = function(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  diem.Globals.raycaster.setFromCamera(mouse, camera);
};

function render() {
  cloth.simulate(Date.now());
  requestAnimationFrame(render);

  for ( var i = 0; i < cloth.particles.length; ++i) {
    clothGeometry.vertices[i].copy(cloth.particles[i].position);
  }

  clothGeometry.computeFaceNormals();
  clothGeometry.computeVertexNormals();

  clothGeometry.normalsNeedUpdate = true;
  clothGeometry.verticesNeedUpdate = true;
  renderer.render(scene, camera);
}

function init() {
  var person = new diem.Person();
  person.load(scene, cloth);
}

addFabric();
render();

window.addEventListener('mousemove', onMouseMove, false);

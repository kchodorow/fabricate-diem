/* Globals:  THREE */

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

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

// Add body.
var addBody = function() {
  var loader = new THREE.ObjectLoader();
  loader.load(
    'assets/standard-female-figure.json',
    function(object) {
      scene.add(object);
    }
  );
};


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

function render() {
  requestAnimationFrame(render);
  var p = cloth.particles;

  for ( var i = 0, il = p.length; i < il; i ++ ) {
    clothGeometry.vertices[ i ].copy( p[ i ].position );
  }

  clothGeometry.computeFaceNormals();
  clothGeometry.computeVertexNormals();

  clothGeometry.normalsNeedUpdate = true;
  clothGeometry.verticesNeedUpdate = true;
  renderer.render(scene, camera);
}

addBody();
addFabric();
render();

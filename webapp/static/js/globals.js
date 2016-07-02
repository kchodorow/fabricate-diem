/* global THREE */

goog.provide('diem.Globals');

diem.Globals.WEBGL_DIV_ID = 'model-box';
diem.Globals.WIDTH = 800;
diem.Globals.HEIGHT = 600;

diem.Globals.raycaster = new THREE.Raycaster();
diem.Globals.renderList = [];
diem.Globals.textureLoader = new THREE.TextureLoader();
diem.Globals.mouse = new THREE.Vector3();

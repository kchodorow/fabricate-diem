/* global THREE */

goog.provide('diem.Globals');

diem.Globals.WEBGL_DIV_ID = 'model-box';

diem.Globals.raycaster = new THREE.Raycaster();
diem.Globals.renderList = [];
diem.Globals.textureLoader = new THREE.TextureLoader();
diem.Globals.mouse = new THREE.Vector2();

/**
 * Changes the mesh's position to be relative to the parent's position.
 * @param {THREE.Mesh} mesh the mesh to adjust the position of
 * @param {THREE.Mesh} parent the parent mesh
 */
diem.Globals.worldToParent = function(mesh, parent) {
  while (parent != null) {
    mesh.position.sub(parent.position);
    parent = parent.parent;
  }
};

/**
 * Switch the mesh's position from one parent to another.  For example, if the
 * mesh is at (2,4) with a current parent at (1,0), it'll be at (-2,3) with a
 * new parent at (5,3). Uses world coordinates if mesh has no parent.
 * 4      m
 * 3
 * 2
 * 1          n
 * 0  p
 *  0 1 2 3 4 5
 * So p + m - n = new position.
 * @param {THREE.Mesh} mesh the mesh to adjust the position of
 * @param {THREE.Mesh} newParent the parent mesh
 */
diem.Globals.oldParentToNewParent = function(mesh, newParent) {
  if (mesh.parent == null) {
    diem.Globals.worldToParent(mesh, newParent);
    return;
  }

  var temp = new THREE.Vector3();
  temp.copy(mesh.parent.position).add(mesh.position).sub(newParent);
  mesh.position.copy(temp);
};

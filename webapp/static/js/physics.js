/* global Ammo, THREE */
goog.provide('diem.Physics');

/**
 * @private
 */
diem.Physics = function() {
  this.clock = new THREE.Clock();
  this.collisionConfiguration = new Ammo.btSoftBodyRigidBodyCollisionConfiguration();
  this.dispatcher = new Ammo.btCollisionDispatcher(this.collisionConfiguration);
  this.broadphase = new Ammo.btDbvtBroadphase();
  this.solver = new Ammo.btSequentialImpulseConstraintSolver();
  this.softBodySolver = new Ammo.btDefaultSoftBodySolver();
  this.physicsWorld = new Ammo.btSoftRigidDynamicsWorld(
    this.dispatcher, this.broadphase, this.solver, this.collisionConfiguration,
    this.softBodySolver);
  this.physicsWorld.setGravity( new Ammo.btVector3(0, diem.Physics.GRAVITY, 0));
  this.physicsWorld.getWorldInfo().set_m_gravity(
    new Ammo.btVector3( 0, diem.Physics.GRAVITY, 0));

  // Add ground
  var groundShape = new Ammo.btStaticPlaneShape(new Ammo.btVector3(0, 1, 0), -1);
  var groundMotionState = new Ammo.btDefaultMotionState(
    new Ammo.btTransform(new Ammo.btQuaternion(0, 0, 0, 1), new Ammo.btVector3(0, 0, 0)));
  var groundBodyInfo = new Ammo.btRigidBodyConstructionInfo(
    0, groundMotionState, groundShape, new Ammo.btVector3(0, 0, 0));
  var groundRigidBody = new Ammo.btRigidBody(groundBodyInfo);
  this.physicsWorld.addRigidBody(groundRigidBody);
};

diem.Physics.GRAVITY = -9.8;
diem.Physics.INSTANCE = null;

diem.Physics.get = function() {
  if (diem.Physics.INSTANCE == null) {
    diem.Physics.INSTANCE = new diem.Physics();
  }
  return diem.Physics.INSTANCE;
};

diem.Physics.prototype.update = function() {
  this.physicsWorld.stepSimulation(this.clock.getDelta(), 10);
};

diem.Physics.prototype.getWorld = function() {
  return this.physicsWorld;
};

diem.Physics.prototype.addMouseBody = function() {
  var mouseShape = new Ammo.btSphereShape(.1);
  var transform = new Ammo.btTransform();
  transform.setOrigin(new Ammo.btVector3(
    diem.Globals.mouse.x, diem.Globals.mouse.y, 0));
  transform.setRotation(new Ammo.btQuaternion(0, 0, 0, 1));
  var inertia = new Ammo.btVector3(0, 0, 0);
  var mouseMotionState = new Ammo.btDefaultMotionState(transform);
  var mouseBodyInfo = new Ammo.btRigidBodyConstructionInfo(
    0,  // mass
    mouseMotionState,
    mouseShape,
    inertia);
  var mouseRigidBody = new Ammo.btRigidBody(mouseBodyInfo);
  diem.Physics.get().getWorld().addRigidBody(mouseRigidBody);
  return mouseRigidBody;
};

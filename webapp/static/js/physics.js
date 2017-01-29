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
  this.addGround_();
};

diem.Physics.prototype.addGround_ = function() {
  // I would love to get btStaticPlaneShape to work here, but something seems to
  // be wrong with its intersections with btSoftBody, so btBoxShape it is.
  var shape = new Ammo.btBoxShape(new Ammo.btVector3(50, 10, 50));
  var groundMotionState = new Ammo.btDefaultMotionState(
    new Ammo.btTransform(
      new Ammo.btQuaternion(0, 0, 0, 1), new Ammo.btVector3(0, -10, 0)));
  var mass = 0;
  var inertia = new Ammo.btVector3(0, 0, 0);
  var ci = new Ammo.btRigidBodyConstructionInfo(
    mass, groundMotionState, shape, inertia);
  var groundRigidBody = new Ammo.btRigidBody(ci);
  this.physicsWorld.addRigidBody(groundRigidBody);
};

diem.Physics.GRAVITY = -9.8;
diem.Physics.INSTANCE = null;

/**
 * @returns {diem.Physics}
 */
diem.Physics.get = function() {
  if (diem.Physics.INSTANCE == null) {
    diem.Physics.INSTANCE = new diem.Physics();
  }
  return diem.Physics.INSTANCE;
};

/**
 * Updates world by one timestep.
 */
diem.Physics.prototype.update = function() {
  var delta = this.clock.getDelta();
  this.physicsWorld.stepSimulation(delta);
};

/**
 * @returns {Ammo.btSoftRigidDynamicsWorld}
 */
diem.Physics.prototype.getWorld = function() {
  return this.physicsWorld;
};

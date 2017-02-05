#include "pin_joint.h"

#include "BulletSoftBody/btSoftBody.h"
#include "LinearMath/btScalar.h"
#include "LinearMath/btVector3.h"

using namespace FabDm;

PinJoint::PinJoint(btVector3 *position, btSoftBody::Node *node) :
  position_(position), node_(node) {
}

PinJoint::~PinJoint() {
}

void PinJoint::Prepare(btScalar dt, int iterations) {
  // No-op.
}

void PinJoint::Solve(btScalar dt, btScalar sor) {
  node_->m_x.setX(position_->getX());
  node_->m_x.setY(position_->getY());
  node_->m_x.setZ(position_->getZ());
  node_->m_v.setX(0);
  node_->m_v.setY(0);
  node_->m_v.setZ(0);
  node_->m_f.setX(0);
  node_->m_f.setY(0);
  node_->m_f.setZ(0);
}

void PinJoint::Terminate(btScalar dt) {
}

btSoftBody::Joint::eType::_ PinJoint::Type() const {
  return btSoftBody::Joint::eType::Contact;
}

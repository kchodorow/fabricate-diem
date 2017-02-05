#include "BulletSoftBody/btSoftBody.h"
#include "LinearMath/btScalar.h"
#include "LinearMath/btVector3.h"

namespace FabDm {

class PinJoint : btSoftBody::Joint {
 public:
  PinJoint(btVector3 *position, btSoftBody::Node *node);
  virtual ~PinJoint();
  virtual void Prepare(btScalar dt, int iterations);
  virtual void Solve(btScalar dt, btScalar sor);
  virtual void Terminate(btScalar dt);
  virtual eType::_ Type() const;

 private:
  btVector3 *position_;
  btSoftBody::Node *node_;
};

}

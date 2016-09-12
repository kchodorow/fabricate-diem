// This file was autogenerated by depswriter.py.
// Please do not edit.
goog.addDependency('../../../../js/cloth.js', ['diem.Cloth'], ['diem.Fabric', 'diem.Globals', 'diem.Part', 'diem.Particle', 'diem.Pin', 'goog.asserts'], false);
goog.addDependency('../../../../js/cloth/anchor.js', ['diem.cloth.Anchor'], ['diem.Fabric', 'diem.Globals', 'diem.MeshWrapper', 'diem.cloth.ControlPoint', 'diem.events', 'diem.tools.AnchorPoint', 'diem.tools.RemoveAnchorPoint'], false);
goog.addDependency('../../../../js/cloth/control_point.js', ['diem.cloth.ControlPoint'], ['diem.events', 'diem.tools.AnchorPoint'], false);
goog.addDependency('../../../../js/cloth/edge.js', ['diem.cloth.Edge'], ['diem.Fabric', 'diem.Globals', 'diem.MeshWrapper', 'diem.cloth.Anchor', 'diem.cloth.ControlPoint', 'diem.events', 'diem.tools.AddAnchorPoint'], false);
goog.addDependency('../../../../js/cloth/physical_piece.js', ['diem.cloth.PhysicalPiece', 'diem.cloth.PhysicalPiece.Constraint'], ['diem.MeshWrapper', 'diem.cloth.physics.Column', 'diem.cloth.physics.Constraint', 'diem.cloth.physics.Grid', 'diem.events', 'diem.tools.DragPiece'], false);
goog.addDependency('../../../../js/cloth/physics/column.js', ['diem.cloth.physics.Column'], [], false);
goog.addDependency('../../../../js/cloth/physics/constraint.js', ['diem.cloth.physics.Constraint'], [], false);
goog.addDependency('../../../../js/cloth/physics/grid.js', ['diem.cloth.physics.Grid'], ['diem.cloth.physics.Column', 'diem.cloth.physics.Constraint'], false);
goog.addDependency('../../../../js/cloth/workboard.js', ['diem.cloth.Workboard'], ['diem.Fabric', 'diem.MeshWrapper', 'diem.cloth.Anchor', 'diem.cloth.ControlPoint', 'diem.cloth.Edge', 'diem.cloth.PhysicalPiece', 'diem.tools.DragPiece'], false);
goog.addDependency('../../../../js/event_handler.js', ['diem.EventHandler'], ['diem.Globals', 'diem.tools.ToolManager', 'goog.events', 'goog.events.EventType', 'goog.fx.Dragger'], false);
goog.addDependency('../../../../js/events/events.js', ['diem.events'], [], false);
goog.addDependency('../../../../js/events/intersectable.js', ['diem.events.Intersectable'], [], false);
goog.addDependency('../../../../js/fabric.js', ['diem.Fabric'], [], false);
goog.addDependency('../../../../js/globals.js', ['diem.Globals'], [], false);
goog.addDependency('../../../../js/mesh_wrapper.js', ['diem.MeshWrapper'], [], false);
goog.addDependency('../../../../js/part.js', ['diem.Part'], [], false);
goog.addDependency('../../../../js/particle.js', ['diem.Particle'], ['diem.Fabric'], false);
goog.addDependency('../../../../js/pattern.js', ['diem.Pattern'], ['diem.cloth.Workboard'], false);
goog.addDependency('../../../../js/person.js', ['diem.Person'], ['diem.MeshWrapper', 'diem.Pin', 'diem.events', 'diem.tools.DragPiece'], false);
goog.addDependency('../../../../js/physics.js', ['diem.Physics'], [], false);
goog.addDependency('../../../../js/pin.js', ['diem.Pin'], ['diem.MeshWrapper'], false);
goog.addDependency('../../../../js/ruler.js', ['diem.Ruler'], [], false);
goog.addDependency('../../../../js/scene_container.js', ['diem.SceneContainer'], ['diem.EventHandler', 'diem.Globals', 'diem.Person', 'diem.Physics', 'diem.tools.AddAnchorPoint', 'diem.tools.AddPiece', 'diem.tools.AnchorPoint', 'diem.tools.DragPiece', 'diem.tools.RemoveAnchorPoint', 'diem.tools.ToolManager'], false);
goog.addDependency('../../../../js/tools/add_anchor_pt.js', ['diem.tools.AddAnchorPoint'], ['diem.tools.Tool', 'goog.events.KeyCodes'], false);
goog.addDependency('../../../../js/tools/add_piece.js', ['diem.tools.AddPiece'], ['diem.Pattern', 'diem.tools.Tool', 'goog.events.KeyCodes'], false);
goog.addDependency('../../../../js/tools/anchor_pt.js', ['diem.tools.AnchorPoint'], ['diem.tools.Tool', 'goog.events.KeyCodes'], false);
goog.addDependency('../../../../js/tools/drag_piece.js', ['diem.tools.DragPiece'], ['diem.tools.Tool', 'goog.events.KeyCodes'], false);
goog.addDependency('../../../../js/tools/rm_anchor_pt.js', ['diem.tools.RemoveAnchorPoint'], ['diem.tools.Tool', 'goog.events.KeyCodes'], false);
goog.addDependency('../../../../js/tools/tool.js', ['diem.tools.Tool'], ['diem.events.Intersectable'], false);
goog.addDependency('../../../../js/tools/tool_manager.js', ['diem.tools.ToolManager'], ['diem.tools.Tool', 'goog.events', 'goog.ui.KeyboardShortcutHandler'], false);

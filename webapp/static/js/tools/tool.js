goog.provide('diem.tools.Tool');

/**
 * Tool base class.
 *
 * Flow:
 * - EventHandler.registerShortcut registers what should happen when a tool is
 * selected.
 * - The shortcut key is pressed -> onSelect is called -> This registers onClick
 * and onDrag handlers for the tool.
 * - Another shortcut key is pressed. This tool's onDeselect is called -> This
 * removes all of the event handlers.
 */
diem.tools.Tool = function() {
};

diem.tools.Tool.NO_OP = function() {
};

/**
 * Register all listeners this tool requires.
 */
diem.tools.Tool.prototype.onSelect = function(opt_oldTool) {
};

/**
 * Unregister all listeners this tool uses.
 */
diem.tools.Tool.prototype.onDeselect = function(opt_newTool) {
};

/**
 * Returns a unique string for this tool.
 */
diem.tools.Tool.prototype.getName = function() {
};

/**
 * Returns an array of shortcut keys that trigger this tool.
 */
diem.tools.Tool.prototype.getKeys = function() {
};

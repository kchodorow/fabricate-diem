load(
    "@io_bazel_rules_closure//closure:defs.bzl",
    "closure_js_binary",
    "closure_js_library",
)

filegroup(
    name = "js",
    srcs = [
        ":lib.js",
        ":user-bin.js",
        "//webapp/static/js/vendor",
    ],
    visibility = ["//webapp/static:__pkg__"],
)

closure_js_binary(
    name = "user-bin",
    entry_points = ["diem.User.delete"],
    deps = [":user-lib"],
)

closure_js_library(
    name = "user-lib",
    srcs = ["user.js"],
    deps = ["@io_bazel_rules_closure//closure/library"],
)

closure_js_binary(
    name = "lib",
    compilation_level = "WHITESPACE_ONLY",
    debug = True,
    entry_points = [
        "diem.Scene.init",
        "diem.Scene.addButtons",
    ],
    deps = [":scene"],
)

closure_js_library(
    name = "globals",
    srcs = ["globals.js"],
    visibility = ["//webapp/static/js:__subpackages__"],
)

closure_js_library(
    name = "scene",
    srcs = ["scene.js"],
    visibility = ["//webapp/static:__pkg__"],
    deps = [
        ":button",
        ":scene-container",
        "//webapp/static/js/tools:toolbar",
    ],
)

closure_js_library(
    name = "scene-container",
    srcs = ["scene_container.js"],
    visibility = ["//webapp/static:__pkg__"],
    deps = [
        ":event_handler",
        ":globals",
        ":person",
        ":physics",
        "//webapp/static/js/cloth",
        "//webapp/static/js/storage",
        "//webapp/static/js/tools",
        "//webapp/static/js/tools:tool-manager",
        "//webapp/static/js/tools:toolbar",
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "pattern",
    srcs = ["pattern.js"],
    visibility = ["//webapp/static/js/tools:__pkg__"],
    deps = [
        "//webapp/static/js/cloth",
        "//webapp/static/js/storage",
    ],
)

closure_js_library(
    name = "person",
    srcs = [
        "person.js",
    ],
    deps = [
        ":mesh-wrapper",
        ":physics",
        ":pin",
        "//webapp/static/js/events",
        "//webapp/static/js/tools:drag-piece",
    ],
)

# Closure wrapper for Ammo world.
closure_js_library(
    name = "physics",
    srcs = ["physics.js"],
    visibility = ["//webapp/static/js/cloth:__pkg__"],
)

closure_js_library(
    name = "pin",
    srcs = ["pin.js"],
    visibility = ["//webapp/static/js:__subpackages__"],
    deps = [":mesh-wrapper"],
)

closure_js_library(
    name = "fabric",
    srcs = ["fabric.js"],
    visibility = ["//webapp/static/js:__subpackages__"],
)

closure_js_library(
    name = "event_handler",
    srcs = [
        "event_handler.js",
    ],
    visibility = ["//webapp/static/js:__subpackages__"],
    deps = [
        ":globals",
        "//webapp/static/js/events",
        "//webapp/static/js/storage",
        "//webapp/static/js/tools:tool-manager",
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "mesh-wrapper",
    srcs = ["mesh_wrapper.js"],
    visibility = ["//webapp/static/js:__subpackages__"],
    deps = [
        ":event_handler",
        ":globals",
    ],
)

closure_js_library(
    name = "button",
    srcs = ["button.js"],
    visibility = ["//webapp/static/js:__subpackages__"],
)

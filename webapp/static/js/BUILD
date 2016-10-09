exports_files(["three.js"])

load(
    "@io_bazel_rules_closure//closure:defs.bzl",
    "closure_js_binary",
    "closure_js_library",
)

filegroup(
    name = "js",
    srcs = [
        ":lib.js",
        "//webapp/static/js/vendor",
    ],
    visibility = ["//webapp/static:__pkg__"],
)

closure_js_binary(
    name = "lib",
    compilation_level = "WHITESPACE_ONLY",
    deps = [":scene"],
)

closure_js_library(
    name = "globals",
    srcs = ["globals.js"],
    externs = [":extern.js"],
    visibility = ["//webapp/static/js:__subpackages__"],
)

closure_js_library(
    name = "scene",
    srcs = [
        "scene.js",
        "scene_container.js",
    ],
    visibility = ["//webapp/static:__pkg__"],
    deps = [
        ":event_handler",
        ":globals",
        ":pattern",
        ":person",
        ":physics",
        "//webapp/static/js/cloth",
        "//webapp/static/js/storage",
        "//webapp/static/js/tools",
        "//webapp/static/js/tools:tool-manager",
    ],
)

closure_js_library(
    name = "pattern",
    srcs = ["pattern.js"],
    visibility = ["//webapp/static/js/tools:__pkg__"],
    deps = ["//webapp/static/js/cloth"],
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

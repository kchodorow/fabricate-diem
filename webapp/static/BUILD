load("@io_bazel_rules_closure//closure:defs.bzl",
    "closure_js_binary", "closure_js_library")

filegroup(
    name = "uncompiled",
    srcs = [
        "index.html",
        "js/three.js",
        "js/renderers/CanvasRenderer.js",
    ],
    visibility = ["//:__pkg__"],
)

closure_js_binary(
    name = "js",
    deps = [
        ":lib",
        ":externs"
    ],
    visibility = ["//:__pkg__"],
)

closure_js_library(
    name = "externs",
    externs = ["js/extern.js"],
)

closure_js_library(
    name = "lib",
    srcs = [
        "js/cloth.js",
        "js/fabric.js",
        "js/globals.js",
        "js/particle.js",
        "js/person.js",
        "js/pin.js",
        "js/ruler.js",
        "js/scene.js",
    ],
)

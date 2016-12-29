load(
    "@io_bazel_rules_closure//closure:defs.bzl",
    "closure_js_deps",
)

filegroup(
    name = "static",
    srcs = [
        ":assets",
        ":deps.js",
        "//webapp/static/css",
        "//webapp/static/js",
    ],
    visibility = ["//webapp:__pkg__"],
)

filegroup(
    name = "assets",
    srcs = ["assets/dressform.json"],
)

closure_js_deps(
    name = "deps",
    deps = ["//webapp/static/js:scene"],
)

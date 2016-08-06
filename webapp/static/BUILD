load(
    "@io_bazel_rules_closure//closure:defs.bzl",
    "closure_js_deps",
)

filegroup(
    name = "static",
    srcs = [
        "index.html",
        ":assets",
        ":deps.js",
        "//webapp/static/js",
    ],
    visibility = ["//:__pkg__"],
)

genrule(
    name = "mv-html",
    srcs = ["release.html"],
    outs = ["index.html"],
    cmd = "cp $< $@",
)

filegroup(
    name = "assets",
    srcs = ["assets/standard-female-figure.json"],
)

closure_js_deps(
    name = "deps",
    deps = ["//webapp/static/js:scene"],
)

load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_test")

def js_test(name, srcs, deps):
    closure_js_test(
        name = name,
        srcs = srcs,
        compilation_level = "WHITESPACE_ONLY",
        data = ["//webapp/static/js/vendor"],
        html = "//webapp/static/js/testing:testing.html",
        deps = deps + [
            "@io_bazel_rules_closure//closure/library",
            "@io_bazel_rules_closure//closure/library:testing",
        ],
    )

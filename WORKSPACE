workspace(name = "com_kchodorow_diem")

local_repository(
    name = "io_bazel_rules_appengine",
    path = "/Users/kchodorow/gitroot/rules_appengine",
)

load("@io_bazel_rules_appengine//appengine:appengine.bzl", "appengine_repositories")
appengine_repositories()

git_repository(
    name = "io_bazel_rules_closure",
    remote = "https://github.com/bazelbuild/rules_closure.git",
    tag = "0.2.3",
)
load("@io_bazel_rules_closure//closure:defs.bzl", "closure_repositories")
closure_repositories()

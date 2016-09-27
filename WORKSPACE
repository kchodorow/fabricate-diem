workspace(name = "com_kchodorow_diem")

git_repository(
    name = "io_bazel_rules_appengine",
    remote = "https://github.com/bazelbuild/rules_appengine.git",
    commit = "bec2c82",
)
load("@io_bazel_rules_appengine//appengine:appengine.bzl", "appengine_repositories")
appengine_repositories()

git_repository(
    name = "io_bazel_rules_closure",
    remote = "https://github.com/bazelbuild/rules_closure.git",
    commit = "190f7d9b6d3608455ff404504bb3cda3aa7a3bc1",
)
load("@io_bazel_rules_closure//closure:defs.bzl", "closure_repositories")
closure_repositories()

# For closure template libraries.
maven_jar(
    name = "org_aopalliance",
    artifact = "aopalliance:aopalliance:jar:1.0",
)

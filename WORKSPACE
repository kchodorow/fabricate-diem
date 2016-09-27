workspace(name = "com_kchodorow_diem")

local_repository(
    name = "io_bazel_rules_appengine",
    path = "/Users/k/gitroot/rules_appengine",
)

load("@io_bazel_rules_appengine//appengine:appengine.bzl",
        "APPENGINE_BUILD_FILE")
new_local_repository(
    name = "com_google_appengine_java",
    path = "/Users/k/Downloads",
    build_file_content = APPENGINE_BUILD_FILE,
)
maven_jar(
    name = "javax_servlet_api",
    artifact = "javax.servlet:servlet-api:2.5",
)

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

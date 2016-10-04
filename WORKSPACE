workspace(name = "com_fabdm")

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

# For Datastore access.
maven_jar(
    name = "com_google_objectify",
    artifact = "com.googlecode.objectify:objectify:5.1.13",
)

maven_jar(
    name = "org_tuckey_urlrewritefilter",
    artifact = "org.tuckey:urlrewritefilter:4.0.3",
)

# Testing.
maven_jar(
    name = "org_junit",
    artifact = "junit:junit:4.4",
)
maven_jar(
    name = "org_mockito",
    artifact = "org.mockito:mockito-all:1.9.5",
)

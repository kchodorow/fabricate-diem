workspace(name = "com_fabdm")

git_repository(
    name = "io_bazel_rules_appengine",
    remote = "https://github.com/bazelbuild/rules_appengine.git",
    commit = "a645e2c",
)

APPENGINE_BUILD_FILE="""
# BUILD file to use the Java AppEngine SDK with a remote repository.
java_import(
    name = "jars",
    jars = glob(["appengine-java-sdk-1.9.44/lib/**/*.jar"]),
    visibility = ["//visibility:public"],
)

java_import(
    name = "user",
    jars = glob(["appengine-java-sdk-1.9.44/lib/user/*-1.9.44.jar"]),
    visibility = ["//visibility:public"],
)

java_import(
    name = "api",
    jars = [
        "appengine-java-sdk-1.9.44/lib/agent/appengine-agent.jar",
        "appengine-java-sdk-1.9.44/lib/appengine-tools-api.jar",
        "appengine-java-sdk-1.9.44/lib/impl/appengine-api.jar",
    ],
    visibility = ["//visibility:public"],
    neverlink = 1,
)

filegroup(
    name = "sdk",
    srcs = glob(["appengine-java-sdk-1.9.44/**"]),
    visibility = ["//visibility:public"],
    path = "appengine-java-sdk-1.9.44",
)
"""
new_http_archive(
    name = "com_google_appengine_java",
    url = "http://central.maven.org/maven2/com/google/appengine/appengine-java-sdk/1.9.44/appengine-java-sdk-1.9.44.zip",
    sha256 = "70fd66b394348fbb6d6e1863447b3629364e049aca8dd4c1af507051b9411b44",
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

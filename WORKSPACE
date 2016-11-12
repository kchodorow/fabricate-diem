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

new_local_repository(
    name = "itext",
    path = "/users/k/Downloads/itext5-5.5.10",
    build_file_content = """
java_import(
    name = "jar",
    jars = ["itextpdf-5.5.10.jar"],
    visibility = ["//visibility:public"],
)
"""
)

new_http_archive(
    name = "auto_value",
    url = "http://repo1.maven.org/maven2/com/google/auto/value/auto-value/1.3/auto-value-1.3.jar",
    build_file_content = """
java_import(
    name = "jar",
    jars = ["auto-value-1.3.jar"],
    visibility = ["//visibility:public"],
)

java_plugin(
    name = "autovalue-plugin",
    generates_api = 1,
    processor_class = "com.google.auto.value.processor.AutoValueProcessor",
    deps = [":jar"],
    visibility = ["//visibility:public"],
)

java_library(
    name = "processor",
    exported_plugins = [":autovalue-plugin"],
    exports = [":jar"],
    visibility = ["//visibility:public"],
)
""",
)

# This is repackaged by AppEngine, but we're not using that one!
maven_jar(
    name = "com_google_gson",
    artifact = "com.google.code.gson:gson:jar:2.8.0",
)

maven_jar(
    name = "java_poet",
    artifact = "com.squareup:javapoet:1.7.0",
)

maven_jar(
    name = "com_google_auto_common",
    artifact = "com.google.auto:auto-common:0.8",
)

new_http_archive(
    name = "auto_value_gson",
    url = "http://repo1.maven.org/maven2/com/ryanharter/auto/value/auto-value-gson/0.4.4/auto-value-gson-0.4.4.jar",
    build_file_content = """
java_import(
    name = "jar",
    jars = ["auto-value-gson-0.4.4.jar"],
)

java_plugin(
    name = "autovalue-plugin",
    generates_api = 1,
    processor_class = "com.ryanharter.auto.value.gson.AutoValueGsonAdapterFactoryProcessor",
    deps = [
        ":jar",
        "@auto_value//:processor",
        "@com_google_auto_common//jar",
        "@com_google_gson//jar",
        "@guava//jar",
        "@java_poet//jar",
    ],
)

java_library(
    name = "processor",
    exported_plugins = [
        "@auto_value//:autovalue-plugin",
        ":autovalue-plugin",
    ],
    exports = [
        ":jar",
        "@auto_value//:jar",
    ],
    visibility = ["//visibility:public"],
)
""",
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
maven_jar(
    name = "com_google_truth",
    artifact = "com.google.truth:truth:0.30",
)


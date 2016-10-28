load("@io_bazel_rules_appengine//appengine:appengine.bzl", "appengine_war")

appengine_war(
    name = "diem",
    data = ["//webapp"],
    data_path = "/webapp",
    jars = ["//src/main/java:bundle_deploy.jar"],
)

java_toolchain(
    name = "jdk7",
    bootclasspath = ["@bazel_tools//tools/jdk:bootclasspath"],
    encoding = "UTF-8",
    extclasspath = ["@bazel_tools//tools/jdk:extdir"],
    genclass = ["@bazel_tools//tools/jdk:GenClass_deploy.jar"],
    header_compiler = ["@bazel_tools//tools/jdk:turbine_deploy.jar"],
    ijar = ["@bazel_tools//tools/jdk:ijar"],
    javabuilder = ["@bazel_tools//tools/jdk:JavaBuilder_deploy.jar"],
    javac = ["@bazel_tools//third_party/java/jdk/langtools:javac_jar"],
    javac_supports_workers = 1,
    jvm_opts = [
        "-XX:+TieredCompilation",
        "-XX:TieredStopAtLevel=1",
    ],
    singlejar = ["@bazel_tools//tools/jdk:SingleJar_deploy.jar"],
    source_version = "7",
    target_version = "7",
    visibility = ["//visibility:public"],
)

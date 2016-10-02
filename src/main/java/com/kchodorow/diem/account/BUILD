java_library(
    name = "account",
    srcs = [
        "Account.java",
        "AccountStorage.java",
    ],
    deps = [
        "//src/main/java/com/kchodorow/diem/project",
        "@com_google_appengine_java//:user",
        "@com_google_objectify//jar",
        "@guava//jar",
        "@jsr305//jar",
        "@soy//jar",
    ],
    visibility = ["//src/main/java/com/kchodorow/diem:__subpackages__"],
)

java_library(
    name = "servlet",
    srcs = ["SetUsernameServlet.java"],
    deps = [
        ":account",
        "//src/main/java/com/kchodorow/diem/template",
        "@com_google_appengine_java//:user", 
        "@com_google_objectify//jar", 
        "@guava//jar",
        "@javax_servlet_api//jar",
        "@jsr305//jar",
    ],
    visibility = ["//src/main/java:__pkg__"],
)

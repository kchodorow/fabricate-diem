java_library(
    name = "user",
    srcs = ["AccountServlet.java"],
    visibility = ["//src/main/java:__pkg__"],
    deps = [
        ":account",
        "@com_google_objectify//jar",
        "@javax_servlet_api//jar",
    ],    
)

java_library(
    name = "account",
    srcs = [
        "Account.java",
        "UserStorage.java",
    ],
    deps = [
        "@com_google_appengine_java//:user",
        "@com_google_objectify//jar",
    ],
    visibility = ["//src/main/java/com/kchodorow/diem/editor:__pkg__"],
)

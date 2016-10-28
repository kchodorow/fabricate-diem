# Fabricate Diem

An app for designing clothing patterns using a 3D model.

Goals:

* Make it easy to share/fork/favorite designs.
* Make it possible to design for any size/shape person.
* To that end, everything should be configurable: you should be able to add your
  own models (as well as changing the dimensions of existing models) and
  fabrics, as well as creating the clothing itself.

## Building and running

Prerequisites:

* Bazel

Run `bazel run //:diem`.  This will download the AppEngine SDK and Closure, then
build and launch a dev AppEngine instance listening on localhost:8080.

To run with SimpleHTTPServer, create a symlink to the closure library:

```
$ ln -s $(bazel info output_base)/external/closure_library webapp/static/js/closure_library
$ cd webapp/static
$ python -m SimpleHTTPServer
```

Then visit localhost:8000/debug.html.

## Deploying

```
$ bazel build --java_toolchain=//:jdk7 //:diem.war
$ mkdir ~/deploy-dir
$ cd ~/deploy-dir
$ unzip $FABDM/bazel-bin/diem.war
$ cd $FABDM
$ bazel-fabricate-diem/external/com_google_appengine_java/appengine-java-sdk-1.9.44/bin/appcfg.sh --enable_jar_splitting update ~/deploy-dir
```

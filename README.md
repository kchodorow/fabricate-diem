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

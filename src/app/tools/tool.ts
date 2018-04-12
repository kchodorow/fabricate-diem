export class Tool {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Bindings for when the tool is deselected.
  disable() {}

  // Bindings for when the tool is selected.
  enable() {}
}

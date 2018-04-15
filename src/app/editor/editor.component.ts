import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  renderer: THREE.Renderer = new THREE.WebGLRenderer({ alpha: true });
  scene: THREE.Scene = new THREE.Scene();
  camera: THREE.Camera;
  mesh: THREE.Mesh;

  constructor() {
  }

  ngOnInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 50);
    this.camera.position.set(0, 10, 10);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
    this.mesh = new THREE.Mesh(geometry, material);

    this.scene.add(this.mesh);
  }

  ngAfterViewInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  onClick(event) {
    console.log('clicked!');
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;
    this.renderer.render(this.scene, this.camera);
  }
}

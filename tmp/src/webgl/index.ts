import CreateCamera from "./camera";
import CreateScene from "./scene";
import CreateRenderer from "./renderer";
import CreateObject from "./objects";

class WebGLApp {
  camera: any;
  scene: any;
  renderer: any;
  objects: any[];
  animate: any;
  element: HTMLElement;
  width: number;
  height: number;

  constructor(element: HTMLElement, width: number, height: number) {
    this.element = element;
    this.width = width;
    this.height = height;
    this.objects = [];
    this.init();
    this.start();
  }

  init() {
    const createCamera = new CreateCamera(this.width, this.height);
    this.camera = createCamera.init();

    const createScene = new CreateScene();
    this.scene = createScene.init();

    const createRenderer = new CreateRenderer(this.width, this.height);
    this.renderer = createRenderer.init();
    this.element.appendChild(this.renderer.domElement);

    this.setup();
  }

  setup() {
    const dataWebgls = document.querySelectorAll("[data-webgl]");
    Array.from(dataWebgls).map((el) => {
      const createObject = new CreateObject(el, this.width, this.height);
      const object = createObject.init();

      this.scene.add(object);
      this.objects.push(createObject);
    });
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    const startTime = performance.now();
    const animate = () => {
      const currentTime = (performance.now() - startTime) * 0.001;
      this.objects.forEach((obj) => {
        obj.update(this.width, this.height, currentTime);
      });

      this.render();
      requestAnimationFrame(animate);
    };

    animate();
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }
}

export default WebGLApp;

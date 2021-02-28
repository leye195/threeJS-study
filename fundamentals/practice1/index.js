

const main = () => {

  const canvas = document.querySelector('#c');

  //create renderer, it takes all data and rendering to the canvas
  //WebGLRenderer is thate use WebGL to render 3d to the canvas
  const renderer = new THREE.WebGLRenderer({canvas});
  
  //create a camera through PerspectiveCamera
  const fov = 75; // field of view, 75deg in the vertical dimention (카메라 시야각)
  const aspect = 2; // 시야의 가로세로비 
  const near = 0.1; // 랜더링할 물체 거리의 하한 값, 너무 가까이 있는 물체를 그리는 것을 막기 위해 사용
  const far = 5; // 랜더링할 물체의 상한 값, 너무 멀리 있는 물체를 그리는 것을 막이 위해 사용
  const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
  camera.position.z = 3;

  //create a sceme
  const scene = new THREE.Scene();
  
  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color,intensity);
    light.position.set(-1,2,4);
    scene.add(light);
  }

  //create box geometry, it contains the data for a box.
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;

  const geometry = new THREE.BoxGeometry(boxWidth,boxHeight,boxDepth);
    
  //create a basic material and set color
  //const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
  
  //MeshPhongMaterial is affected by lights
  //const material = new THREE.MeshPhongMaterial({color: 0x44aa88}); 

  
  //create mesh, its combination of geometry, material
  //const cube = new THREE.Mesh(geometry,material);
  //scene.add(cube);
  
  const createMaterial = () => {
    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
    });

    const hue = Math.random();;
  }

  const makeCubeInstance = (geometry,color,x) => {
    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry,material);
    scene.add(cube);

    cube.position.x = x;
    return cube;
  }

  const cubes = [
    makeCubeInstance(geometry,0x44aa88,0),
    makeCubeInstance(geometry,0x55acaa,-2),
    makeCubeInstance(geometry,0x1aac55,2),
  ];

  const render = (time) => {
    time*=0.001;
    //cube.rotation.x = time;
    //cube.rotation.y = time;
    cubes.forEach((cube,idx)=>{
      const speed = 1 + idx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    })

    renderer.render(scene,camera);

    //requestAnimationFrame을 활용한 3D animate
    requestAnimationFrame(render);
  };
  // render the scene
  //renderer.render(scene,camera);
  requestAnimationFrame(render);

}

main();
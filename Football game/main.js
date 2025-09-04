import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';

     var count = 0;
     var count2 = 0;
     var count3 =0;
     var count4 =0;
     var Iframe=0;
     var texture1;
     var texture2;
     var manager;
     var score=0;
     var points=0;
     var colision=0;
     var lifenumber=5;
     var  fireworks = []; 
     const clock= new THREE.Clock();

    //set dom element as a variable and set the innerHTML message
    //keep the message hidden till we need to display it under a specific circumstance
      var messager = document.getElementById("message");
        messager.innerHTML="GOOD CATCH!";
        messager.style.display = "none";

      var attentioner = document.getElementById("attention");
        attentioner.innerHTML="CATCH THE BALL!";
        attentioner.style.display = "none";

       var directioner = document.getElementById("directions");
       directioner.innerHTML="GO TO THE GOAL POST!";
        directioner.style.display = "none";
       
       var goaler = document.getElementById("goal");
         goaler.innerHTML="GOAL!";
         goaler.style.display = "none";
       
       var ender = document.getElementById("gameover");
         ender.innerHTML="GAME OVER!";
         ender.style.display = "none";

       var congratulations = document.getElementById("congrats");
         congratulations.innerHTML="CONGRATULATION!YOU SCORED";
         congratulations.style.display = "none";

// the faction which create the fireworks effect 
(function() {
  
    // constructor 
    var Firework = function( scene ) 
    {
        this.scene    = scene; 
        this.done     = false; 
        this.dest     = []; 
        this.colors   = []; 
        this.geometry = null;
        this.points   = null;
        this.material = new THREE.PointsMaterial({
            size: 12,
            color: 0xffffff,
            opacity: 1,
            vertexColors: true,
            transparent: true,
            depthTest: false,
        });
        this.launch(); 
    }; 
    
    // prototype 
    Firework.prototype = {
        constructor: Firework, 
        
        // reset 
        reset: function()
        {
            this.scene.remove( this.points );  
            this.dest     = []; 
            this.colors   = []; 
            this.geometry = null;
            this.points   = null;
        }, 
        
        
        // launching the fireworks particles 
        launch: function() 
        {   var from = new THREE.Vector3(0,0,0);
            var y = THREE.Math.randInt( 500, 500 );
            var x = THREE.Math.randInt( -400, 400 );
            var z = THREE.Math.randInt( -1000, -800 );
            from.velocity = new THREE.Vector3(x, y, z);
            var from   = new THREE.Vector3( x, -400, z ); 
            var to   = new THREE.Vector3( x, y, z ); 
            var color = new THREE.Color();
            color.setHSL( THREE.Math.randFloat( 0.1, 0.9 ), 1, 0.9 );
            this.colors.push( color ); 
            
            this.geometry = new THREE.Geometry();
            this.points   = new THREE.Points( this.geometry, this.material );
            
            this.geometry.colors = this.colors;
            this.geometry.vertices.push( from ); 
            this.dest.push( to ); 
            this.colors.push( color ); 
            this.scene.add( this.points );  
        }, 
    
        // exploding effect of the firewokrs 
        explode: function( vector ) 
        {
            this.scene.remove( this.points );  
            this.dest     = []; 
            this.colors   = []; 
            this.geometry = new THREE.Geometry();
            this.points   = new THREE.Points( this.geometry, this.material );
            
            for( var i = 0; i < 50; i++ )
            {
                var color = new THREE.Color();
                color.setHSL( THREE.Math.randFloat( 0.1, 0.9 ), 1, 0.5 );
                this.colors.push( color ); 
                
                var from = new THREE.Vector3( 
                    THREE.Math.randInt( vector.x - 5, vector.x + 5), 
                    THREE.Math.randInt( vector.y - 5, vector.y + 5 ), 
                    THREE.Math.randInt( vector.z - 5, vector.z + 5 )
                ); 
                var to = new THREE.Vector3( 
                    THREE.Math.randInt( vector.x - 400, vector.x + 400 ), 
                    THREE.Math.randInt( vector.y - 500, vector.y + 250 ), 
                    THREE.Math.randInt( vector.z - 200, vector.z + 200 )
                ); 
                this.geometry.vertices.push( from ); 
                this.dest.push( to ); 
            }
            this.geometry.colors = this.colors;
            this.scene.add( this.points );  
        }, 
        
        // update the particles
        update: function() 
        {
            // only if objects exist
            if( this.points && this.geometry )
            {
                var total = this.geometry.vertices.length; 

                // lerp particle positions 
                for( var i = 0; i < total; i++ )
                {
                    this.geometry.vertices[i].x += ( this.dest[i].x - this.geometry.vertices[i].x ) / 20;
                    this.geometry.vertices[i].y += ( this.dest[i].y - this.geometry.vertices[i].y ) / 20;
                    this.geometry.vertices[i].z += ( this.dest[i].z - this.geometry.vertices[i].z ) / 20;
                    this.geometry.verticesNeedUpdate = true;
                }
                // watch first particle for explosion 
                if( total === 1 ) 
                {
                    if( Math.ceil( this.geometry.vertices[0].y ) > ( this.dest[0].y - 20 ) )
                    {
                        this.explode( this.geometry.vertices[0] ); 
                        return; 
                    }
                }
                // fade out exploded particles 
                if( total > 1 ) 
                {
                    this.material.opacity -= 0.015; 
                    this.material.colorsNeedUpdate = true;
                }
                // remove, reset and stop animating 
                if( this.material.opacity <= 0 )
                {
                    this.reset(); 
                    this.done = true; 
                    return; 
                }
            }
        }, 
    }; 
    
    // export 
    window.Firework = Firework;  
})();

//calculate a random direction for the ball
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.z * Math.sin(angle),
        z: velocity.x * Math.sin(angle) + velocity.z * Math.cos(angle)
    };

    return rotatedVelocities;
}
//adding a bounceing effect for the ball when colliding 
function resolveCollision(ob1,ob2){
	const xVelocityDiff = ob2.velocity.x;
	const zVelocityDiff = ob2.velocity.z;

	const xDist = ob1.position.x-ob2.position.x;
	const zDist = ob1.position.z-ob2.position.z;

	if (xVelocityDiff * xDist + zVelocityDiff * zDist >= 0) {
	const angle = -Math.atan2(ob1.position.z-ob2.position.z, ob1.position.x-ob2.position.x);

	    const m1 = ob1.mass;
        const m2 = ob2.mass;

        const u1 = rotate(ob1.velocity, angle);
        const u2 = rotate(ob2.velocity, angle);

        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), z: u2.z };


        const vFinal2 = rotate(v2, -angle);


	ob2.velocity.x = vFinal2.x;
    ob2.velocity.z = vFinal2.z;

}

}


// Createing a single animated caracter
class BasicCharacterControllerProxy {
  constructor(animations) {
    this._animations = animations;
  }

  get animations() {
    return this._animations;
  }
};


class BasicCharacterController {
  constructor(params) {
    this._Init(params);
  }

  _Init(params) {
    this._params = params;
    this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
    this._acceleration = new THREE.Vector3(1, 0.25, 200.0);
    this._velocity = new THREE.Vector3(0, 0, 0);

    this._animations = {};
    this._input = new BasicCharacterControllerInput();
    this._stateMachine = new CharacterFSM(
        new BasicCharacterControllerProxy(this._animations));

    this._LoadModels();
  }

//Loads the model and the animations clips
  _LoadModels() {


    const loader = new FBXLoader();
    loader.setPath('./resources/animate/');
    loader.load('ybot2.fbx', (fbx) => {
      fbx.scale.setScalar(0.3);
      fbx.traverse(c => {
       c.castShadow=true;

      });


      fbx.position.copy( new THREE.Vector3(200, -100, 500));
      fbx.velocity = new THREE.Vector3(0, 0, -20);
      fbx.rotateY(3.0);
      fbx.name = 'man';
      fbx.mass=80;

      this._target = fbx;

      this._params.scene.add(this._target);

      this._mixer = new THREE.AnimationMixer(this._target);

      this._manager = new THREE.LoadingManager();
      this._manager.onLoad = () => {
        this._stateMachine.SetState('idle');
      };

      const _OnLoad = (animName, anim) => {
        const clip = anim.animations[0];
        const action = this._mixer.clipAction(clip);

        this._animations[animName] = {
          clip: clip,
          action: action,
        };
      };

      const loader = new FBXLoader(this._manager);
      loader.setPath('./resources/animate/');
      loader.load('Walking.fbx', (a) => { _OnLoad('walk', a); });
      loader.load('Running.fbx', (a) => { _OnLoad('run', a); });
      loader.load('Goalkeeper Idle.fbx', (a) => { _OnLoad('idle', a); });
      loader.load('Walking Backward.fbx', (a) => { _OnLoad('walk_back', a); });
      loader.load('Running Backward.fbx', (a) => { _OnLoad('run_back', a); });
      loader.load('Goalkeeper Body Block Right.fbx', (a) => { _OnLoad('jump_right', a); });
      loader.load('Goalkeeper Body Block Left.fbx', (a) => { _OnLoad('jump_left', a); });
      loader.load('Goalkeeper Diving Left.fbx', (a) => { _OnLoad('jump_up_right', a); });
      loader.load('Goalkeeper Diving Right.fbx', (a) => { _OnLoad('jump_up_left', a); });
      loader.load('Goalkeeper Miss.fbx', (a) => { _OnLoad('jump_up', a); });
      loader.load('Goalkeeper Catch.fbx', (a) => { _OnLoad('catch', a); });

    });

  }

  Update(timeInSeconds) {
    if (!this._target) {
      return;
    }

    this._stateMachine.Update(timeInSeconds, this._input);

    const velocity = this._velocity;
    const frameDecceleration = new THREE.Vector3(
        velocity.x * this._decceleration.x,
        velocity.y * this._decceleration.y,
        velocity.z * this._decceleration.z
    );
    frameDecceleration.multiplyScalar(timeInSeconds);
    frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
        Math.abs(frameDecceleration.z), Math.abs(velocity.z));

    velocity.add(frameDecceleration);

    const controlObject = this._target;
    const _Q = new THREE.Quaternion();
    const _A = new THREE.Vector3();
    const _R = controlObject.quaternion.clone();

    const acc = this._acceleration.clone();
    if (this._input._keys.shift) {
      acc.multiplyScalar(2.0);
    }

    if (this._stateMachine._currentState == 'jump_right') {
      acc.multiplyScalar(0.0);
    }

    if (this._stateMachine._currentState == 'jump_left') {
      acc.multiplyScalar(0.0);
    }


    if (this._stateMachine._currentState == 'jump_up_left') {
      acc.multiplyScalar(0.0);
     
 
    }


    if (this._stateMachine._currentState == 'jump_up_right') {
      acc.multiplyScalar(0.0);
    }

    if (this._stateMachine._currentState == 'jump_up') {
      acc.multiplyScalar(0.0);
    }

    if (this._stateMachine._currentState == 'catch') {
      acc.multiplyScalar(0.0);
    }


    if (this._input._keys.forward) {
      velocity.z += acc.z * timeInSeconds;
    }
    if (this._input._keys.backward) {
      velocity.z -= acc.z * timeInSeconds;
    }
    if (this._input._keys.left) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * Math.PI * timeInSeconds * this._acceleration.y);
      _R.multiply(_Q);
    }
    if (this._input._keys.right) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * timeInSeconds * this._acceleration.y);
      _R.multiply(_Q);
    }

     
      

    controlObject.quaternion.copy(_R);

    const oldPosition = new THREE.Vector3();
    oldPosition.copy(controlObject.position);

    const forward = new THREE.Vector3(0, 0, 1);
    forward.applyQuaternion(controlObject.quaternion);
    forward.normalize();

    const sideways = new THREE.Vector3(1, 0, 0);
    sideways.applyQuaternion(controlObject.quaternion);
    sideways.normalize();

    sideways.multiplyScalar(velocity.x * timeInSeconds);
    forward.multiplyScalar(velocity.z * timeInSeconds);

    controlObject.position.add(forward);
    controlObject.position.add(sideways);

    

    oldPosition.copy(controlObject.position);

    if (this._mixer) {
      this._mixer.update(timeInSeconds);
    }
  }
};
// Class responsabile for recording keyboard imput
class BasicCharacterControllerInput {
  constructor() {
    this._Init();
  }

  _Init() {
    this._keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      up_r_arrow: false,
      up_l_arrow:false,
      up_arrow:false,
      r_arrow: false,
      l_arrow:false,
      middle_arrow:false,
      shift: false,
    };
    document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
    document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
  }

  _onKeyDown(event) {
    switch (event.keyCode) {
      case 87: // w
        this._keys.forward = true;
        break;
      case 65: // a
        this._keys.left = true;
        break;
      case 83: // s
        this._keys.backward = true;
        break;
      case 68: // d
        this._keys.right = true;
        break;
      case 100: // right arrow
        this._keys.r_arrow = true;
        break;
        case 102: // right arrow
        this._keys.l_arrow = true;
        break;
        case 103: // up-right arrow
        this._keys.up_r_arrow = true;
        break;
        case 105: // up-left arrow
        this._keys.up_l_arrow = true;
        break;
        case 104: // up-left arrow
        this._keys.up_arrow = true;
        break;
         case 101: // up-left arrow
        this._keys.middle_arrow = true;
        break;
      case 16: // SHIFT
        this._keys.shift = true;
        break;
    }
  }

  _onKeyUp(event) {
    switch(event.keyCode) {
      case 87: // w
        this._keys.forward = false;
        break;
      case 65: // a
        this._keys.left = false;
        break;
      case 83: // s
        this._keys.backward = false;
        break;
      case 68: // d
        this._keys.right = false;
        break;
      case 100: // right arrow
        this._keys.r_arrow = false;
        break;
        case 102: // left arrow
        this._keys.l_arrow = false;
        break;
        case 103: // up-right arrow
        this._keys.up_r_arrow = false;
        break;
        case 105: // up-left arrow
        this._keys.up_l_arrow = false;
        break;
        case 104: // up-left arrow
        this._keys.up_arrow = false;
        break;
        case 101: // up-left arrow
        this._keys.middle_arrow = false;
        break;
      case 16: // SHIFT
        this._keys.shift = false;
        break;
    }
  }
};

//Interprets the key controls and plays a certain animation
class FiniteStateMachine {
  constructor() {
    this._states = {};
    this._currentState = null;
  }

  _AddState(name, type) {
    this._states[name] = type;
  }
//Signals the old state that is exiting and sets the current state
  SetState(name) {
    const prevState = this._currentState;

    if (prevState) {
      if (prevState.Name == name) {
        return;
      }
      prevState.Exit();
    }

    const state = new this._states[name](this);

    this._currentState = state;
    state.Enter(prevState);
  }
//Passes the frame time of input to the currently active state
  Update(timeElapsed, input) {
    if (this._currentState) {
      this._currentState.Update(timeElapsed, input);
    }
  }
};

//Adding caracter states
class CharacterFSM extends FiniteStateMachine {
  constructor(proxy) {
    super();
    this._proxy = proxy;
    this._Init();
  }

  _Init() {
    this._AddState('idle', IdleState);
    this._AddState('walk', WalkState);
    this._AddState('run', RunState);
    this._AddState('jump_right', JumpRightState);
    this._AddState('jump_left', JumpLeftState);
    this._AddState('jump_up_right', JumpUpRightState);
    this._AddState('jump_up_left', JumpUpLeftState);
    this._AddState('jump_up', JumpUpState);
    this._AddState('catch', CatchState);
    this._AddState('walk_back', WalkBackState);
    this._AddState('run_back', RunBackState);

  }
};


class State {
  constructor(parent) {
    this._parent = parent;
  }

  Enter() {}
  Exit() {}
  Update() {}
};
//Play jump right state animation once
class JumpRightState extends State {
  constructor(parent) {
    super(parent);

    this._FinishedCallback = () => {
      this._Finished();
    }
  }

  get Name() {
    return 'jump_right';
  }
 
  Enter(prevState) {
    const curAction = this._parent._proxy._animations['jump_right'].action;
    const mixer = curAction.getMixer();
    mixer.addEventListener('finished', this._FinishedCallback);
    
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;
      curAction.reset();
      curAction.setLoop(THREE.LoopOnce, 1);
      curAction.clampWhenFinished = true;
      curAction.crossFadeFrom(prevAction, 0.2, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }
  _Finished() {
    this._Cleanup();
    this._parent.SetState('idle');
  }

  _Cleanup() {
    const action = this._parent._proxy._animations['jump_right'].action;

    action.getMixer().removeEventListener('finished', this._CleanupCallback);
  }

  Exit() {
    this._Cleanup();
  }

  Update(_) {
  }
};
//Play catch state animation once
class CatchState extends State {
  constructor(parent) {
    super(parent);

    this._FinishedCallback = () => {
      this._Finished();
    }
  }

  get Name() {
    return 'catch';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['catch'].action;
    const mixer = curAction.getMixer();
    mixer.addEventListener('finished', this._FinishedCallback);

    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.reset();
      curAction.setLoop(THREE.LoopOnce, 1);
      curAction.clampWhenFinished = true;
      curAction.crossFadeFrom(prevAction, 0.2, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }
  _Finished() {
    this._Cleanup();
    this._parent.SetState('idle');
  }

  _Cleanup() {
    const action = this._parent._proxy._animations['catch'].action;

    action.getMixer().removeEventListener('finished', this._CleanupCallback);
  }

  Exit() {
    this._Cleanup();
  }

  Update(_) {
  }
};
//Play jump up state animation once
class JumpUpState extends State {
  constructor(parent) {
    super(parent);

    this._FinishedCallback = () => {
      this._Finished();
    }
  }

  get Name() {
    return 'jump_up';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['jump_up'].action;
    const mixer = curAction.getMixer();
    mixer.addEventListener('finished', this._FinishedCallback);

    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.reset();
      curAction.setLoop(THREE.LoopOnce, 1);
      curAction.clampWhenFinished = true;
      curAction.crossFadeFrom(prevAction, 0.2, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }
  _Finished() {
    this._Cleanup();
    this._parent.SetState('idle');
  }

  _Cleanup() {
    const action = this._parent._proxy._animations['jump_up'].action;

    action.getMixer().removeEventListener('finished', this._CleanupCallback);
  }

  Exit() {
    this._Cleanup();
  }

  Update(_) {
  }
};
//Play jump left state animation once
  class JumpLeftState extends State {
  constructor(parent) {
    super(parent);

    this._FinishedCallback = () => {
      this._Finished();
    }
  }

  get Name() {
    return 'jump_left';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['jump_left'].action;
    const mixer = curAction.getMixer();
    mixer.addEventListener('finished', this._FinishedCallback);

    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.reset();
      curAction.setLoop(THREE.LoopOnce, 1);
      curAction.clampWhenFinished = true;
      curAction.crossFadeFrom(prevAction, 0.2, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  _Finished() {
    this._Cleanup();
    this._parent.SetState('idle');
  }

  _Cleanup() {
    const action = this._parent._proxy._animations['jump_left'].action;

    action.getMixer().removeEventListener('finished', this._CleanupCallback);
  }

  Exit() {
    this._Cleanup();
  }

  Update(_) {
  }
};
//Play jump up right state animation once
class JumpUpRightState extends State {
  constructor(parent) {
    super(parent);

    this._FinishedCallback = () => {
      this._Finished();
    }
  }

  get Name() {
    return 'jump_up_right';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['jump_up_right'].action;
    const mixer = curAction.getMixer();
    mixer.addEventListener('finished', this._FinishedCallback);

    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.reset();
      curAction.setLoop(THREE.LoopOnce, 1);
      curAction.clampWhenFinished = true;
      curAction.crossFadeFrom(prevAction, 0.2, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }
  _Finished() {
    this._Cleanup();
    this._parent.SetState('idle');
  }

  _Cleanup() {
    const action = this._parent._proxy._animations['jump_up_right'].action;

    action.getMixer().removeEventListener('finished', this._CleanupCallback);
  }

  Exit() {
    this._Cleanup();
  }

  Update(_) {
  }
};
//Play jump up left state animation once
class JumpUpLeftState extends State {
  constructor(parent) {
    super(parent);

    this._FinishedCallback = () => {
      this._Finished();
    }
  }

  get Name() {
    return 'jump_up_left';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['jump_up_left'].action;
    const mixer = curAction.getMixer();
    mixer.addEventListener('finished', this._FinishedCallback);

    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.reset();
      curAction.setLoop(THREE.LoopOnce, 1);
      curAction.clampWhenFinished = true;
      curAction.crossFadeFrom(prevAction, 0.2, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }
  _Finished() {
    this._Cleanup();
    this._parent.SetState('idle');
  }

  _Cleanup() {
    const action = this._parent._proxy._animations['jump_up_left'].action;

    action.getMixer().removeEventListener('finished', this._CleanupCallback);
  }

  Exit() {
    this._Cleanup();
  }

  Update(_) {
  }
};
//Play walk state animation
class WalkState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'walk';
  }
//walk animation
  Enter(prevState) {
    const curAction = this._parent._proxy._animations['walk'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.enabled = true;
//run animation
      if (prevState.Name == 'run') {
        const ratio = curAction.getClip().duration / prevAction.getClip().duration;
        curAction.time = prevAction.time * ratio;
      } else {
        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
      }

      curAction.crossFadeFrom(prevAction, 0.5, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  Exit() {
  }

  Update(timeElapsed, input) {
    if (input._keys.forward || input._keys.backward) {
      if (input._keys.shift) {
        this._parent.SetState('run');
      }
      return;
    }

    this._parent.SetState('idle');
  }
};


class WalkBackState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'walk_back';
  }
//walk back animation
  Enter(prevState) {
    const curAction = this._parent._proxy._animations['walk_back'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.enabled = true;
//run back animation
      if (prevState.Name == 'run_back') {
        const ratio = curAction.getClip().duration / prevAction.getClip().duration;
        curAction.time = prevAction.time * ratio;
      } else {
        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
      }

      curAction.crossFadeFrom(prevAction, 0.5, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  Exit() {
  }

  Update(timeElapsed, input) {
    if (input._keys.backward) {
      if (input._keys.shift) {
        this._parent.SetState('run_back');
      }
      return;
    }

    this._parent.SetState('idle');
  }
};
//Play run backward animation
class RunBackState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'run_back';
  }
//Run backward
  Enter(prevState) {
    const curAction = this._parent._proxy._animations['run_back'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.enabled = true;
//walk backward
      if (prevState.Name == 'walk_back') {
        const ratio = curAction.getClip().duration / prevAction.getClip().duration;
        curAction.time = prevAction.time * ratio;
      } else {
        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
      }

      curAction.crossFadeFrom(prevAction, 0.5, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  Exit() {
  }

  Update(timeElapsed, input) {
    if (input._keys.backward) {
      if (!input._keys.shift) {
        this._parent.SetState('walk_back');
      }
      return;
    }

    this._parent.SetState('idle');
  }
};
//Play run animation
class RunState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'run';
  }
//run animation
  Enter(prevState) {
    const curAction = this._parent._proxy._animations['run'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.enabled = true;
//walk animation
      if (prevState.Name == 'walk') {
        const ratio = curAction.getClip().duration / prevAction.getClip().duration;
        curAction.time = prevAction.time * ratio;
      } else {
        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
      }

      curAction.crossFadeFrom(prevAction, 0.5, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  Exit() {
  }

  Update(timeElapsed, input) {
    if (input._keys.forward) {
      if (!input._keys.shift) {
        this._parent.SetState('walk');
      }
      return;
    }

    this._parent.SetState('idle');
  }
};

//play idle animation
class IdleState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'idle';
  }

  Enter(prevState) {
    const idleAction = this._parent._proxy._animations['idle'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;
      idleAction.time = 0.0;
      idleAction.enabled = true;
      idleAction.setEffectiveTimeScale(1.0);
      idleAction.setEffectiveWeight(1.0);
      idleAction.crossFadeFrom(prevAction, 0.5, true);
      idleAction.play();
    } else {
      idleAction.play();
    }
  }

  Exit() {
  }

  Update(_, input) {
    if (input._keys.forward) {
      this._parent.SetState('walk');
    } else if(input._keys.backward){
      this._parent.SetState('walk_back');
    } else if (input._keys.r_arrow) {
      this._parent.SetState('jump_right');
    } else if (input._keys.l_arrow) {
      this._parent.SetState('jump_left');
    } else if (input._keys.up_l_arrow) {
      this._parent.SetState('jump_up_left');
    } else if (input._keys.up_r_arrow) {
      this._parent.SetState('jump_up_right');
    } else if (input._keys.up_arrow) {
      this._parent.SetState('jump_up');
    }else if (input._keys.middle_arrow) {
      this._parent.SetState('catch');
    }
  }
};


class CharacterControllerDemo {
  constructor() {
   
    this._Initialize();
  }

  _Initialize() {

    this._scene = new THREE.Scene();

    this._camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 ); // Perspective projection parameters
this._camera.position.x = 0;
this._camera.position.y = 50;
this._camera.position.z = 850;


    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
    });
    this._threejs.outputEncoding = THREE.sRGBEncoding;
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setPixelRatio(window.devicePixelRatio);
    this._threejs.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this._threejs.domElement);

     window.addEventListener('resize', () => {
      this._OnWindowResize();
    }, false);



//Texture Loader
var loader = new THREE.TextureLoader();

//Resizing Event Listener
/*window.addEventListener('resize',function()
{
  var width = window.innerWidth;
  var height =window.innerHeight;
 // this._threejs.setSize(width, height);
  this._camera.aspect = width/height;
  this._camera.updateProjectionMatrix();
});*/

//SpotLight
var lightThis = new THREE.SpotLight(0xffffff);
lightThis.position.x = 0;
lightThis.position.y = 300;
lightThis.position.z = 50;
lightThis.intensity = 1.0;
lightThis.penumbra = 0.50;
lightThis.angle = Math.PI/6;
//this._scene.add(lightThis);
lightThis.target.position.x = 0;
lightThis.target.position.y = 0;
lightThis.target.position.z = 0;
//this._scene.add(lightThis.target);

//Sun Light
var hemisphereLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.5 );
this._scene.add( hemisphereLight );
var directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
directionalLight.position.set( 0, 3000, -900 );
directionalLight.castShadow = true; // default false
directionalLight.shadow.mapSize.width = 2000; // default
directionalLight.shadow.mapSize.height = 2000; // default
directionalLight.shadow.camera.near = 0.1; // default
directionalLight.shadow.camera.far = 5000; // default
directionalLight.shadow.camera.left = -5000; // default
directionalLight.shadow.camera.right = 5000; // default
directionalLight.shadow.camera.top = 2000; // default
directionalLight.shadow.camera.bottom = -2000; // default
directionalLight.name="directionalLight";
this._scene.add( directionalLight );
//Ambient Light
var lightAmbient = new THREE.AmbientLight( 0x222222, 5.0 );
//this._scene.add(lightAmbient);
//Controls
const controls = new OrbitControls(
      this._camera, this._threejs.domElement);
    controls.target.set(0, 10, 0);
    controls.update();

//Add Background Sky Cube
var skyGeoCube = new THREE.BoxGeometry(5000,5000,5000);
var skyGeoMaterial = new THREE.MeshPhongMaterial( {
    map: new THREE.TextureLoader().load('textures/Background_sky.jpg'),

} );
var skyCube = new THREE.Mesh(skyGeoCube,skyGeoMaterial);
skyCube.material.side = THREE.BackSide;
//this._scene.add(skyCube);

//Add Background Sky Sphere
var skyGeo = new THREE.SphereGeometry(10000,25,25);
var skyTexture = loader.load("textures/Background_sky.jpg");
var skyMaterial = new THREE.MeshPhongMaterial({
        map: skyTexture,
});
var sky = new THREE.Mesh(skyGeo, skyMaterial);
sky.position.y = 3000;
    sky.material.side = THREE.BackSide;
    this._scene.add(sky);

//perlin Noise
var grad3 =
    [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
    [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
    [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
var p = [];
for (var i=0; i<256; i++) {
  p[i] = Math.floor(Math.random()*256);
}

// To remove the need for index wrapping, double the permutation table length
var perm = [];
for(i=0; i<512; i++) {
perm[i]=p[i & 255];
}

// A lookup table to traverse the simplex around a given point in 4D.
// Details can be found where this table is used, in the 4D noise method.
var simplex = [
    [0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],
    [0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],
    [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
    [1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],
    [1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],
    [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
    [2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],
    [2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]];
  function  dot(g, x, y) {
        return g[0]*x + g[1]*y;
    }
function noise(xin, yin) {
    var n0, n1, n2; // Noise contributions from the three corners
    // Skew the input space to determine which simplex cell we're in
    var F2 = 0.5*(Math.sqrt(3.0)-1.0);
    var s = (xin+yin)*F2; // Hairy factor for 2D
    var i = Math.floor(xin+s);
    var j = Math.floor(yin+s);
    var G2 = (3.0-Math.sqrt(3.0))/6.0;
    var t = (i+j)*G2;
    var X0 = i-t; // Unskew the cell origin back to (x,y) space
    var Y0 = j-t;
    var x0 = xin-X0; // The x,y distances from the cell origin
    var y0 = yin-Y0;
    // For the 2D case, the simplex shape is an equilateral triangle.
    // Determine which simplex we are in.
    var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
    if(x0>y0) {i1=1; j1=0;} // lower triangle, XY order: (0,0)->(1,0)->(1,1)
    else {i1=0; j1=1;}      // upper triangle, YX order: (0,0)->(0,1)->(1,1)
    // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
    // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
    // c = (3-sqrt(3))/6
    var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
    var y1 = y0 - j1 + G2;
    var x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords
    var y2 = y0 - 1.0 + 2.0 * G2;
    // Work out the hashed gradient indices of the three simplex corners
    var ii = i & 255;
    var jj = j & 255;
    var gi0 = perm[ii+perm[jj]] % 12;
    var gi1 = perm[ii+i1+perm[jj+j1]] % 12;
    var gi2 = perm[ii+1+perm[jj+1]] % 12;
    // Calculate the contribution from the three corners
    var t0 = 0.5 - x0*x0-y0*y0;
    if(t0<0) n0 = 0.0;
    else {
        t0 *= t0;
        n0 = t0 * t0 * dot(grad3[gi0], x0, y0);  // (x,y) of grad3 used for 2D gradient
    }
    var t1 = 0.5 - x1*x1-y1*y1;
    if(t1<0) n1 = 0.0;
    else {
        t1 *= t1;
        n1 = t1 * t1 * dot(grad3[gi1], x1, y1);
    }
    var t2 = 0.5 - x2*x2-y2*y2;
    if(t2<0) n2 = 0.0;
    else {
        t2 *= t2;
        n2 = t2 * t2 * dot(grad3[gi2], x2, y2);
    }
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 70.0 * (n0 + n1 + n2);
}


//Flag Pole
var poleGeometry = new THREE.CylinderGeometry( 3, 3, 200, 32 );
const poleMaterial = new THREE.MeshPhongMaterial( {color: 0xA04E02} );
const flagPole = new THREE.Mesh( poleGeometry, poleMaterial );
flagPole.castShadow = true;
flagPole.receiveShadow = true;
//flagPole.position.y= 200;

//Flag 1
var flagTexture = loader.load("textures/flag1.png");

var flagGeometry = new THREE.PlaneGeometry( 100, 50, 30,18 );
var flagdMaterial = new THREE.MeshPhongMaterial({
  map: flagTexture,
  side: THREE.DoubleSide,


});

var flag = new THREE.Mesh( flagGeometry, flagdMaterial );
flag.name="flag";
flag.castShadow = true;
flag.receiveShadow = true;
flag.position.x -=45;
flag.position.z +=25;
flag.position.y+=70;
flagPole.add(flag);
flag.rotation.set(0,0.5,0);
flagPole.position.set(0,0,-700);
this._scene.add( flagPole );

//Flag Pole2
const flagPole2 = new THREE.Mesh( poleGeometry, poleMaterial );
flagPole2.castShadow = true;
flagPole2.receiveShadow = true;
//flagPole.position.y= 200;

//Flag 2
var flagTexture2 = loader.load("textures/flag2.png");

var flagGeometry = new THREE.PlaneGeometry( 100, 50, 30,18 );
var flagdMaterial2 = new THREE.MeshPhongMaterial({
  map: flagTexture2,
  side: THREE.DoubleSide,


});

var flag2 = new THREE.Mesh( flagGeometry, flagdMaterial2 );
flag2.name="flag2";
flag2.castShadow = true;
flag2.receiveShadow = true;
flag2.position.x -=45;
flag2.position.z +=25;
flag2.position.y+=70;
flagPole2.add(flag2);
flag2.rotation.set(0,0.5,0);
flagPole2.position.set(-150,0,-700);
this._scene.add( flagPole2 );

//Flag Pole3
const flagPole3 = new THREE.Mesh( poleGeometry, poleMaterial );
flagPole3.castShadow = true;
flagPole3.receiveShadow = true;
//flagPole.position.y= 200;

//Flag 3
var flagTexture3 = loader.load("textures/flag3.png");

var flagGeometry = new THREE.PlaneGeometry( 100, 50, 30,18 );
var flagdMaterial3 = new THREE.MeshPhongMaterial({
  map: flagTexture3,
  side: THREE.DoubleSide,


});

var flag3 = new THREE.Mesh( flagGeometry, flagdMaterial3 );
flag3.name="flag3";
flag3.castShadow = true;
flag3.receiveShadow = true;
flag3.position.x -=45;
flag3.position.z +=25;
flag3.position.y+=70;
flagPole3.add(flag3);
flag3.rotation.set(0,0.5,0);
flagPole3.position.set(150,0,-700);
this._scene.add( flagPole3 );


//Front Fence Poles
var fencePoleGeometry = new THREE.BoxGeometry( 5, 50, 5 );
var fencePoleMaterial = new THREE.MeshPhongMaterial( {color: 0xA04E02} );
var fencePole1 = new THREE.Mesh( fencePoleGeometry, fencePoleMaterial );
var fencePole2 = new THREE.Mesh( fencePoleGeometry, fencePoleMaterial );

fencePole1.position.set(-162.5,0,0);
var fence2Pos= fencePole1.position.x +325;
fencePole2.position.set(fence2Pos,0,0);

//Front Fence pannel
var pannelTexture = loader.load("textures/Pannel2.png")
var pannelGeometry = new THREE.PlaneGeometry( 325, 50, 32 );
var pannelMaterial = new THREE.MeshPhongMaterial( {
  map: pannelTexture,
  side: THREE.DoubleSide
} );
var pannel = new THREE.Mesh( pannelGeometry, pannelMaterial );
pannel.name="pannel";
pannel.position.set(275,-70,-650);

pannel.add(fencePole2,fencePole1);
this._scene.add( pannel );


//Back FencePoles1
var fencePole3 = new THREE.Mesh( fencePoleGeometry, fencePoleMaterial );
var fencePole4 = new THREE.Mesh( fencePoleGeometry, fencePoleMaterial );
fencePole3.position.set(-162.5,0,0);
var fence4Pos= fencePole3.position.x +325;
fencePole4.position.set(fence4Pos,0,0);
//Back Fence pannel1
var pannel2 = new THREE.Mesh( pannelGeometry, pannelMaterial );
pannel2.name="pannel2";
pannel2.position.set(275,-70,650);
pannel2.add(fencePole3,fencePole4);
this._scene.add( pannel2 );

//Front Fence Poles 2
var fencePoleGeometry = new THREE.BoxGeometry( 5, 50, 5 );
var fencePoleMaterial = new THREE.MeshPhongMaterial( {color: 0xA04E02} );
var fencePole5 = new THREE.Mesh( fencePoleGeometry, fencePoleMaterial );
var fencePole6 = new THREE.Mesh( fencePoleGeometry, fencePoleMaterial );

fencePole5.position.set(-162.5,0,0);
var fence6Pos= fencePole5.position.x +325;
fencePole6.position.set(fence6Pos,0,0);

//Front Fence pannel 2
var pannelTexture2 = loader.load("textures/Sport.png")
var pannelGeometry = new THREE.PlaneGeometry( 325, 50, 32 );
var pannelMaterial = new THREE.MeshPhongMaterial( {
  map: pannelTexture2,
  side: THREE.DoubleSide
} );
var pannel3 = new THREE.Mesh( pannelGeometry, pannelMaterial );
pannel3.name="pannel3";
pannel3.position.set(-275,-70,-650);
//pannel3.rotation.y = -Math.PI*(1/2);
pannel3.add(fencePole5,fencePole6);
this._scene.add( pannel3 );

//Back Fence Poles2
var fencePoleGeometry = new THREE.BoxGeometry( 5, 50, 5 );
var fencePoleMaterial = new THREE.MeshPhongMaterial( {color: 0xA04E02} );
var fencePole7 = new THREE.Mesh( fencePoleGeometry, fencePoleMaterial );
var fencePole8 = new THREE.Mesh( fencePoleGeometry, fencePoleMaterial );

fencePole7.position.set(-162.5,0,0);
var fence8Pos= fencePole7.position.x +325;
fencePole8.position.set(fence8Pos,0,0);

//Back Fence pannel2
var pannelTexture3 = loader.load("textures/Pannel1.png")
var pannelGeometry = new THREE.PlaneGeometry( 325, 50, 32 );
var pannelMaterial = new THREE.MeshPhongMaterial( {
  map: pannelTexture3,
  side: THREE.DoubleSide
} );
var pannel4 = new THREE.Mesh( pannelGeometry, pannelMaterial );
pannel4.name="pannel4";
pannel4.position.set(-275,-70,650);

pannel4.add(fencePole7,fencePole8);
this._scene.add( pannel4 );

//Side Fence Poles
var fencePoleGeometry = new THREE.BoxGeometry( 5, 50, 5 );
var fencePoleMaterial = new THREE.MeshPhongMaterial( {color: 0xA04E02} );
var sideFencePole1 = new THREE.Mesh( fencePoleGeometry, fencePoleMaterial );
var sideFencePole2 = new THREE.Mesh( fencePoleGeometry, fencePoleMaterial );

sideFencePole1.position.set(-250,0,0);
var sidefence2Pos= sideFencePole1.position.x +500;
sideFencePole2.position.set(sidefence2Pos,0,0);

//Side Fence pannel
var pannelTexture4 = loader.load("textures/Pannel2.png")
var pannelGeometry = new THREE.PlaneGeometry( 500, 50, 32 );
var pannelMaterial = new THREE.MeshPhongMaterial( {
  map: pannelTexture4,
  side: THREE.DoubleSide
} );

var pannel5 = new THREE.Mesh( pannelGeometry, pannelMaterial );
pannel5.name="pannel5";
pannel5.position.set(-450,-70,250);
pannel5.rotation.y = -Math.PI*(1/2);
pannel5.add(sideFencePole1,sideFencePole2);
this._scene.add( pannel5 );

//Side Fence Poles2
var sideFencePole3 = new THREE.Mesh( fencePoleGeometry, fencePoleMaterial );
var sideFencePole4 = new THREE.Mesh( fencePoleGeometry, fencePoleMaterial );

sideFencePole3.position.set(-250,0,0);
var sidefence4Pos= sideFencePole1.position.x +500;
sideFencePole4.position.set(sidefence4Pos,0,0);

//Side Fence pannel2
var pannelGeometry = new THREE.PlaneGeometry( 500, 50, 32 );
var pannelMaterial = new THREE.MeshPhongMaterial( {
  map: pannelTexture4,
  side: THREE.DoubleSide
} );

var pannel6 = new THREE.Mesh( pannelGeometry, pannelMaterial );
pannel6.name="pannel6";
pannel6.position.set(-450,-70,-250);
pannel6.rotation.y = -Math.PI*(1/2);
pannel6.add(sideFencePole3,sideFencePole4);
this._scene.add( pannel6 );

//Side Fence Poles
var fencePoleGeometry = new THREE.BoxGeometry( 5, 50, 5 );
var fencePoleMaterial = new THREE.MeshPhongMaterial( {color: 0xA04E02} );
var sideFencePole5 = new THREE.Mesh( fencePoleGeometry, fencePoleMaterial );
var sideFencePole6 = new THREE.Mesh( fencePoleGeometry, fencePoleMaterial );

sideFencePole5.position.set(-250,0,0);
var sidefence6Pos= sideFencePole5.position.x +500;
sideFencePole6.position.set(sidefence2Pos,0,0);

//Side Fence pannel
var pannelGeometry = new THREE.PlaneGeometry( 500, 50, 32 );
var pannelMaterial = new THREE.MeshPhongMaterial( {
  map: pannelTexture3,
  side: THREE.DoubleSide
} );

var pannel7 = new THREE.Mesh( pannelGeometry, pannelMaterial );
pannel7.name="pannel7";
pannel7.position.set(450,-70,250);
pannel7.rotation.y = -Math.PI*(1/2);
pannel7.add(sideFencePole5,sideFencePole6);
this._scene.add( pannel7 );

//Side Fence Poles2
var sideFencePole7 = new THREE.Mesh( fencePoleGeometry, fencePoleMaterial );
var sideFencePole8 = new THREE.Mesh( fencePoleGeometry, fencePoleMaterial );

sideFencePole7.position.set(-250,0,0);
var sidefence8Pos= sideFencePole1.position.x +500;
sideFencePole8.position.set(sidefence8Pos,0,0);

//Side Fence pannel2
var pannelGeometry = new THREE.PlaneGeometry( 500, 50, 32 );
var pannelMaterial = new THREE.MeshPhongMaterial( {
  map: pannelTexture4,
  side: THREE.DoubleSide
} );

pannelMaterial.name="pannelMaterial";

var pannel8 = new THREE.Mesh( pannelGeometry, pannelMaterial );
pannel8.name="pannel8";
pannel8.position.set(450,-70,-250);
pannel8.rotation.y = -Math.PI*(1/2);
pannel8.add(sideFencePole7,sideFencePole8);
this._scene.add( pannel8 );
//OBJECTS

//ObjectLoader
var objLoader = new GLTFLoader();
//Cloud object
objLoader.load('./models/low_poly_cloud/scene.gltf', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
        gltf.scene.scale.set(10,10,10);
        gltf.scene.position.set(400,600,-900);
        gltf.scene.name = "cloud";
      this._scene.add(gltf.scene);
        //scene.add(lightAmbient);
    }
);
//Cloud object 2
objLoader.load('./models/low_poly_cloud/scene.gltf', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
        gltf.scene.scale.set(10,10,10);
        gltf.scene.position.set(-300,900,-100);
         gltf.scene.name = "cloud2";
        this._scene.add(gltf.scene);
        //scene.add(lightAmbient);
    }
);
//Cloud object 3
objLoader.load('./models/low_poly_cloud/scene.gltf', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
        gltf.scene.scale.set(13,13,13);
        gltf.scene.position.set(0,800,-1300);
        gltf.scene.name = "cloud3";
        this._scene.add(gltf.scene);
        //scene.add(lightAmbient);
    }
);
//Cloud object 4
objLoader.load('./models/low_poly_cloud/scene.gltf', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
        gltf.scene.scale.set(8,8,8);
        gltf.scene.position.set(400,800,900);
        gltf.scene.name = "cloud4";
      this._scene.add(gltf.scene);
        //scene.add(lightAmbient);
    }
);
//Cloud object 5
objLoader.load('./models/low_poly_cloud/scene.gltf', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
        gltf.scene.scale.set(10,10,10);
        gltf.scene.position.set(-600,700,-900);
        gltf.scene.name = "cloud5";
        this._scene.add(gltf.scene);
        //scene.add(lightAmbient);
    }
);
//Cloud object 6
objLoader.load('./models/low_poly_cloud/scene.gltf', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
        gltf.scene.scale.set(11,11,9);
        gltf.scene.position.set(-1200,600,800);
        gltf.scene.name = "cloud6";
        this._scene.add(gltf.scene);
        //scene.add(lightAmbient);
    }
);
//Cloud object 7
objLoader.load('./models/low_poly_cloud/scene.gltf', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
        gltf.scene.scale.set(12,12,12);
        gltf.scene.position.set(-400,700,500);
        gltf.scene.name = "cloud7";
        this._scene.add(gltf.scene);
        //scene.add(lightAmbient);
    }
);
//Goal Post Object
objLoader.load('./models/football_goal/scene.gltf', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
        gltf.scene.scale.set(0.03,0.03,0.03);
        gltf.scene.position.set(0,-100,-600);
        this._scene.add(gltf.scene);
        //scene.add(lightAmbient);
    }
);
//Goal Post Object_2
objLoader.load('./models/football_goal/scene.gltf', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
         gltf.scene.scale.set(0.03,0.03,0.03);
         gltf.scene.position.set(0,-100,600);
         gltf.scene.rotation.y = Math.PI*(1/1);
        this._scene.add(gltf.scene);
        //scene.add(lightAmbient);
    }
);

//Tribune Object 1
objLoader.load('./models/tribune/scene.gltf', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
         gltf.scene.scale.set(0.07,0.07,0.07);
         gltf.scene.position.set(620,-100,-300);
         //gltf.scene.rotation.y = Math.PI*(1/1);
        this._scene.add(gltf.scene);
        //scene.add(lightAmbient);
    }
);

//Tribune Object 2
objLoader.load('./models/tribune/scene.gltf', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
         gltf.scene.scale.set(0.07,0.07,0.07);
         gltf.scene.position.set(620,-100,300);
         //gltf.scene.rotation.y = Math.PI*(1/1);
        this._scene.add(gltf.scene);
        //scene.add(lightAmbient);
    }
);
//Tribune Object 3
objLoader.load('./models/tribune/scene.gltf', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
         gltf.scene.scale.set(0.07,0.07,0.07);
         gltf.scene.position.set(620,-100,0);
         //gltf.scene.rotation.y = Math.PI*(1/1);
        this._scene.add(gltf.scene);
        //scene.add(lightAmbient);
    }
);

//Tree 1
objLoader.load('./models/cartoon_tree/scene.gltf', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
         gltf.scene.scale.set(30,30,30);
         gltf.scene.position.set(800,-50,-750);
         //gltf.scene.rotation.y = Math.PI*(1/1);
        this._scene.add(gltf.scene);
        //scene.add(lightAmbient);
    }
);
//Tree 2
objLoader.load('./models/cartoon_tree/scene.gltf', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
         gltf.scene.scale.set(40,40,40);
         gltf.scene.position.set(850,-40,400);
         //gltf.scene.rotation.y = Math.PI*(1/1);
        this._scene.add(gltf.scene);
        //scene.add(lightAmbient);
    }
);

//Tree 3
objLoader.load('./models/cartoon_tree/scene.gltf', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
         gltf.scene.scale.set(35,35,35);
         gltf.scene.position.set(-300,-50,-550);
         //gltf.scene.rotation.y = Math.PI*(1/1);
        this._scene.add(gltf.scene);
        //scene.add(lightAmbient);
    }
);
//Tree 4
objLoader.load('./models/cartoon_tree/scene.gltf', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
         gltf.scene.scale.set(45,45,45);
         gltf.scene.position.set(-300,-40,400);
         //gltf.scene.rotation.y = Math.PI*(1/1);
        this._scene.add(gltf.scene);
        //scene.add(lightAmbient);
    }
);

//Stylized Tree
objLoader.load('./models/stylized_tree/scene.gltf', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
         gltf.scene.scale.set(8,8,8);
         gltf.scene.position.set(-700,-90,200);
         gltf.scene.rotation.y = Math.PI*(1/1);
        this._scene.add(gltf.scene);
        //scene.add(lightAmbient);
    }
);
//Sun
objLoader.load('./models/sun/scene.gltf', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
         gltf.scene.scale.set(1,1,1);
         gltf.scene.position.set(0,1500,-3000);

        this._scene.add(gltf.scene);

    }
);

//Trophy
objLoader.load('./models/trophy/model.glb', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
         gltf.scene.scale.set(180,180,180);
         gltf.scene.position.set(115,-600,200);
         gltf.scene.rotation.y=-Math.PI*(1/2.65);
          gltf.scene.name = "trophy";
        this._scene.add(gltf.scene);

    }
);
//Baloon
objLoader.load('./models/Baloon/Hot air balloon.glb', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
         gltf.scene.scale.set(0.7,0.7,0.7);
         gltf.scene.position.set(-1500,150,50);
         gltf.scene.name = "balloon";
        this._scene.add(gltf.scene);


    }
);

//Life_Ball1
objLoader.load('./models/football/scene.gltf', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
         gltf.scene.scale.set(0.3,0.3,0.3);
         gltf.scene.position.set(340,-80,0);
         gltf.scene.rotation.set(0, 0, 0);
         gltf.scene.name = "lifeball";
      this._scene.add(gltf.scene);

    }
);
//Life_Ball2
objLoader.load('./models/football/scene.gltf', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
         gltf.scene.scale.set(0.3,0.3,0.3);
         gltf.scene.position.set(300,-80,0);
         gltf.scene.rotation.set(0, 0, 0);
         gltf.scene.name = "lifeball2"
        this._scene.add(gltf.scene);

    }
);
//Life_Ball3
objLoader.load('./models/football/scene.gltf', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
         gltf.scene.scale.set(0.3,0.3,0.3);
         gltf.scene.position.set(260,-80,0);
         gltf.scene.rotation.set(0, 0, 0);
         gltf.scene.name = "lifeball3"
        this._scene.add(gltf.scene);

    }
);
//Life_Ball4
objLoader.load('./models/football/scene.gltf', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
         gltf.scene.scale.set(0.3,0.3,0.3);
         gltf.scene.position.set(220,-80,0);
         gltf.scene.rotation.set(0, 0, 0);
         gltf.scene.name = "lifeball4"
      this._scene.add(gltf.scene);

    }
);
//Life_Ball5
objLoader.load('./models/football/scene.gltf', ( gltf )  => {
  gltf.scene.traverse(c=>{
    c.castShadow =true;
  })
         gltf.scene.scale.set(0.3,0.3,0.3);
         gltf.scene.position.set(180,-80,0);
          gltf.scene.rotation.set(0, 0, 0);
         gltf.scene.name = "lifeball5"
      this._scene.add(gltf.scene);

    }
);
//Hills
var hillGeometry = new THREE.PlaneBufferGeometry( 3000, 3000, 256, 256 );
var hillTexture = loader.load("textures/grass3.jpg")
var hillMaterial = new THREE.MeshLambertMaterial({
  map: hillTexture,
  bumpMap: new THREE.TextureLoader().load('textures/grass3_bump.png')
});
var hillTerrain = new THREE.Mesh( hillGeometry, hillMaterial );
hillTerrain.rotation.x = -Math.PI / 2;
hillTerrain.position.y = -101;
//hillTerrain.position.z = -15000;
hillTerrain.castShadow=true;
hillTerrain.receiveShadow=true;
this._scene.add( hillTerrain );
/*
var peak = 4000;
var smoothing = 15000;
var vertices = hillTerrain.geometry.attributes.position.array;
for (var i = 0; i <= vertices.length; i += 3) {
    vertices[i+2] = peak * noise(vertices[i]/smoothing,vertices[i+1]/smoothing);
}
hillTerrain.geometry.attributes.position.needsUpdate = true;
hillTerrain.geometry.computeVertexNormals();
*/
//Field
var fieldTexture = loader.load("textures/field.jpg");
var fieldGeometry = new THREE.PlaneGeometry( 1000, 1400, 30,30 );
var fieldMaterial = new THREE.MeshPhongMaterial( {
  map : fieldTexture,
  bumpMap: new THREE.TextureLoader().load('textures/field_bump.png'),
  side: THREE.DoubleSide
});
var field = new THREE.Mesh( fieldGeometry, fieldMaterial );
field.rotation.x = -Math.PI*(1/2);
field.receiveShadow = true;
//field.castShadow = true;
field.position.y -=100;
this._scene.add( field );

//Colision net

//Back
var colisionGeometry = new THREE.PlaneGeometry( 220, 75, 30,30 );
var colisiondMaterial = new THREE.MeshPhongMaterial( {
  color : 0xA04E02,
  side: THREE.DoubleSide,
  opacity:0.0,
  transparent: true
});
var colisionBack = new THREE.Mesh( colisionGeometry, colisiondMaterial );
colisionBack.position.set(0,-60,615);
colisionBack.name="colisionBack";
colisionBack.velocity= new THREE.Vector3(0, 0, -0.3);
colisionBack.mass=10;
this._scene.add(colisionBack)

//Right
var colisionGeometry =new THREE.CylinderGeometry(30, 30, 20, 32 )
var colisiondMaterial = new THREE.MeshPhongMaterial( {
  color : 0xA04E02,
  side: THREE.DoubleSide,
  opacity:0.0,
  transparent: true
});
var colisionRight = new THREE.Mesh( colisionGeometry, colisiondMaterial );
colisionRight.position.set(110,-60,600);
colisionRight.name="colisionRight";
colisionRight.velocity= new THREE.Vector3(0, 0, 0);
colisionRight.mass=10;
this._scene.add(colisionRight)

//Left
var colisionGeometry =  new THREE.CylinderGeometry( 30, 30, 20, 32 )
var colisiondMaterial = new THREE.MeshPhongMaterial( {
  color : 0xA04E02,
  side: THREE.DoubleSide,
  opacity:0.0,
 transparent: true
});
var colisionLeft = new THREE.Mesh( colisionGeometry, colisiondMaterial );
colisionLeft.name="colisionLeft";
colisionLeft.position.set(-110,-60,600);
colisionLeft.velocity= new THREE.Vector3(0, 0, 0);
colisionLeft.mass=10;
this._scene.add(colisionLeft);



    this._mixers = [];
    this._previousRAF = null;


    this._LoadAnimatedModel();
    this._LoadBall();
    this._LoadAnimatedModelAndPlay('./resources/animate/', 'ybot2.fbx', 'Cheering While Sitting2.fbx', new THREE.Vector3(670, -10, -400),4.5);
    this._LoadAnimatedModelAndPlay('./resources/animate/', 'ybot2.fbx', 'Standing Clap.fbx', new THREE.Vector3(670, -10, -248),4.5);
    this._LoadAnimatedModelAndPlay('./resources/animate/', 'ybot2.fbx', 'Fist Pump.fbx', new THREE.Vector3(670, -10, -115),4.5);
    this._LoadAnimatedModelAndPlay('./resources/animate/', 'ybot2.fbx', 'Cheering While Sitting1.fbx', new THREE.Vector3(670, -10, 190),4.5);
    this._LoadAnimatedModelAndPlay('./resources/animate/', 'ybot2.fbx', 'Sitting Clap.fbx', new THREE.Vector3(670, -10, 305),4.5);
    this._LoadAnimatedModelAndPlay('./resources/animate/', 'ybot2.fbx', 'Sitting Clap.fbx', new THREE.Vector3(540, -95, -258),4.5);
    this._LoadAnimatedModelAndPlay('./resources/animate/', 'ybot2.fbx', 'Cheering While Sitting1.fbx', new THREE.Vector3(540, -95, -146),4.5);
    this._LoadAnimatedModelAndPlay('./resources/animate/', 'ybot2.fbx', 'Standing Clap.fbx', new THREE.Vector3(540, -95, 17),4.5);
    this._LoadAnimatedModelAndPlay('./resources/animate/', 'ybot2.fbx', 'Fist Pump.fbx', new THREE.Vector3(540, -95, 159),4.5);
    this._LoadAnimatedModelAndPlay('./resources/animate/', 'ybot2.fbx', 'Cheering While Sitting2.fbx', new THREE.Vector3(540, -95, 338),4.5);
    this._LoadAnimatedModelAndPlay('./resources/animate/', 'ybot2.fbx', 'Standing Clap.fbx', new THREE.Vector3(600, -50, -300),4.5);
    this._LoadAnimatedModelAndPlay('./resources/animate/', 'ybot2.fbx', 'Cheering While Sitting2.fbx', new THREE.Vector3(600, -50, -100),4.5);
    this._LoadAnimatedModelAndPlay('./resources/animate/', 'ybot2.fbx', 'Cheering While Sitting1.fbx', new THREE.Vector3(600, -50, 50),4.5);
    this._LoadAnimatedModelAndPlay('./resources/animate/', 'ybot2.fbx', 'Sitting Clap.fbx', new THREE.Vector3(600, -50, 123),4.5);
    this._LoadAnimatedModelAndPlay('./resources/animate/', 'ybot2.fbx', 'Fist Pump.fbx', new THREE.Vector3(600, -50, 278),4.5);
    this._RAF();
  }
// Animate 3d model
  _LoadAnimatedModel() {
    const params = {
      camera: this._camera,
      scene: this._scene,
    }
    this._controls = new BasicCharacterController(params);
  }
//Animate 3d model
  _LoadAnimatedModelAndPlay(path, modelFile, animFile, offset,rotation) {
    const loader = new FBXLoader();
    loader.setPath(path);
    loader.load(modelFile, (fbx) => {
      fbx.scale.setScalar(0.5);
      fbx.traverse(c => {

        c.castShadow = true;
      });
      fbx.position.copy(offset);
      fbx.rotateY(rotation);

      const anim = new FBXLoader();
      anim.setPath(path);
      anim.load(animFile, (anim) => {
        const m = new THREE.AnimationMixer(fbx);
        this._mixers.push(m);
        const idle = m.clipAction(anim.animations[0]);
        idle.play();
      });
      this._scene.add(fbx);
    });
  }

//animate ball
  _LoadBall(){
         this._geoBall= new THREE.SphereGeometry(4.5, 50, 50);
         this._matBall = new THREE.MeshPhongMaterial({
           map: new THREE.TextureLoader().load('textures/ball.jpg'),
           bumpMap: new THREE.TextureLoader().load('textures/ball_bump.png'),
         });
         this._meshBall = new THREE.Mesh(this._geoBall, this._matBall);
         this._meshBall.position.copy(new THREE.Vector3(0,-95.5,0));
         this._meshBall.velocity= new THREE.Vector3(0, 0.01, 5);
         this._meshBall.mass=10;
         this._meshBall.name = 'ball';
         this._scene.add(this._meshBall);

  }

 _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }


  _RAF() {
    requestAnimationFrame((t) => {
      if (this._previousRAF === null) {
        this._previousRAF = t;
      }

 //create the moving effect of the flag 
 //use the flag geometry vertices to create the wave effect
 //the flag has 3 waves added for a more realistic effect 
 //by using the const multi the area where the flag is conected with the pole, has subtle moves 
      const t2 = clock.getElapsedTime()
    this._flag =  this._scene.getObjectByName("flag");
    this._flag.geometry.vertices.map(v => {
    const waveX1 = 5 * Math.sin(v.x*2 + t2*4)
    const waveX2 = 0.25 * Math.sin(v.x*3 + t2*8)
    const waveY1 = 1 * Math.sin(v.y*5 + t2*3)
    const multi = (v.x -50)/50
    v.z=( waveX1 + waveX2 + waveY1) * multi ;
    });

    this._flag.geometry.verticesNeedUpdate = true;

    this._flag2 =  this._scene.getObjectByName("flag2");
    this._flag2.geometry.vertices.map(v => {
    const waveX1 = 5 * Math.sin(v.x*2 + t2*4)
    const waveX2 = 0.25 * Math.sin(v.x*3 + t2*8)
    const waveY1 = 1 * Math.sin(v.y*5 + t2*3)
    const multi = (v.x -50)/50
    v.z=( waveX1 + waveX2 + waveY1) * multi ;
    });

    this._flag2.material.mapNeedsUpdate = true;
    this._flag2.geometry.verticesNeedUpdate = true;

     this._flag3 =  this._scene.getObjectByName("flag3");
    this._flag3.geometry.vertices.map(v => {
    const waveX1 = 5 * Math.sin(v.x*2 + t2*4)
    const waveX2 = 0.25 * Math.sin(v.x*3 + t2*8)
    const waveY1 = 1 * Math.sin(v.y*5 + t2*3)
    const multi = (v.x -50)/50
    v.z=( waveX1 + waveX2 + waveY1) * multi ;
    });

    this._flag3.material.mapNeedsUpdate = true;
    this._flag3.geometry.verticesNeedUpdate = true;

    this._pannel =  this._scene.getObjectByName("pannel");
    this._pannel2 =  this._scene.getObjectByName("pannel2");
    this._pannel3 =  this._scene.getObjectByName("pannel3");
    this._pannel4 =  this._scene.getObjectByName("pannel4");
    this._pannel5 =  this._scene.getObjectByName("pannel5");
    this._pannel6 =  this._scene.getObjectByName("pannel6");
    this._pannel7 =  this._scene.getObjectByName("pannel7");
    this._pannel8 =  this._scene.getObjectByName("pannel8");
    //console.log(this._pannel);

    const loader1 = new THREE.TextureLoader( );
    var texture1 = loader1.load('textures/Pannel1.png');
    var texture2 = loader1.load('textures/Pannel2.png');
    var texture3 = loader1.load('textures/Pannel3.png');
    var texture4 = loader1.load('textures/Sport.png');

     count++
    if (count == 100){
    this._pannel.material.map = texture1;
    this._pannel2.material.map = texture2;
    this._pannel3.material.map = texture3;
    this._pannel4.material.map = texture4;
    this._pannel5.material.map = texture1;
    this._pannel6.material.map = texture2;
    this._pannel7.material.map = texture3;
    this._pannel8.material.map = texture4;
    }
    if (count ==300){
      this._pannel.material.map = texture4;
      this._pannel2.material.map = texture3;
      this._pannel3.material.map = texture2;
      this._pannel4.material.map = texture1;
      this._pannel5.material.map = texture4;
      this._pannel6.material.map = texture3;
      this._pannel7.material.map = texture2;
      this._pannel8.material.map = texture1;
     }
     if (count>600){
       count=0;
     }


     this._lifeball = this._scene.getObjectByName("lifeball");
     this._lifeball2 = this._scene.getObjectByName("lifeball2");
     this._lifeball3 = this._scene.getObjectByName("lifeball3");
     this._lifeball4 = this._scene.getObjectByName("lifeball4");
     this._lifeball5 = this._scene.getObjectByName("lifeball5");


     // console.log(this._pannel.material);
    this._pannel.material.mapNeedsUpdate = true;



       this._man =  this._scene.getObjectByName("man");
       this._ball = this._scene.getObjectByName("ball");
       this._ball .rotation.x+=0.05;
       this._ball .rotation.y+=0.05;
       this._wallBack = this._scene.getObjectByName("colisionBack");
       this._wallLeft = this._scene.getObjectByName("colisionLeft");
       this._wallRight = this._scene.getObjectByName("colisionRight");
       Iframe++;
       if(Iframe>200){

       this._directionalLight=  this._scene.getObjectByName("directionalLight");
       this._directionalLight.position.z = Math.sin(Iframe/200)*800;
      //using the Math.sin formula on the y axis, we create the effect of a floating hot air balloon

       this._ballon =  this._scene.getObjectByName("balloon");
       this._ballon.position.y = Math.sin(Iframe/150)*150;

      //using the Math.sin formula on the x axis, we create a movement effect of the clouds 
      //for a more dynamic effect each cloud has a diiferent speed and 
      //a differnt lenght of the x axis path
      this._cloud =  this._scene.getObjectByName("cloud");
      this._cloud.position.x = Math.sin(Iframe/5000)*-1500;

      this._cloud2 =  this._scene.getObjectByName("cloud2");
      this._cloud2.position.x = Math.cos(Iframe/4200)*-1400;

        this._cloud3 =  this._scene.getObjectByName("cloud3");
        this._cloud3.position.x = Math.sin(Iframe/5000)*-1200;

        this._cloud4 =  this._scene.getObjectByName("cloud4");
        this._cloud4.position.x = Math.sin(Iframe/3300)*-1500;

        this._cloud5 =  this._scene.getObjectByName("cloud5");
        this._cloud5.position.x = Math.cos(Iframe/3500)*-1200;

        this._cloud6 =  this._scene.getObjectByName("cloud6");
        this._cloud6.position.x = Math.sin(Iframe/3800)*-1300;

        this._cloud7 =  this._scene.getObjectByName("cloud7");
        this._cloud7.position.x = Math.cos(Iframe/4000)*-1200;
 
      //for a more dynamic effect, in order to attract the players attention over the number of lifes remained 
      // each ball is spining aorund its center on y axis
         this._lifeball.rotation.y +=0.05;
         this._lifeball2.rotation.y +=0.05;
         this._lifeball3.rotation.y +=0.05;
         this._lifeball4.rotation.y +=0.05;
         this._lifeball5.rotation.y +=0.05;


         var distance = Math.sqrt(
         (this._wallLeft.position.x-this._ball.position.x)*(this._wallLeft.position.x-this._ball.position.x)+
         (this._wallLeft.position.z-this._ball.position.z)*(this._wallLeft.position.z-this._ball.position.z)
         );
         var distance2 = Math.sqrt(
         (this._man.position.x-this._ball.position.x)*(this._man.position.x-this._ball.position.x)+
         (this._man.position.z-this._ball.position.z)*(this._man.position.z-this._ball.position.z)
         );
         var distance3 = Math.sqrt(
         (this._wallRight.position.x-this._ball.position.x)*(this._wallRight.position.x-this._ball.position.x)+
         (this._wallRight.position.z-this._ball.position.z)*(this._wallRight.position.z-this._ball.position.z)
         );
          
          //in order to show a feedback to the user, dom element display the score 
         document.getElementById("score").innerHTML = "Score: " + score;
         if(distance2 < this._ball.geometry.parameters.radius+40 ){
		        
	
                resolveCollision(this._man,this._ball);
                colision=1;
                count4++;

                
         }

        // because the previous condition detect more colisions when the player catch the ball
        //the fallowing condition check if the a collision happend and it takes the first collision detected
        //in order to increase the score with a fix number of points and to display a feedback message only for 3 seconds 

         if( colision ==1 && count4==1 ){
           messager.style.display = "block";
           score=score+50;
            setTimeout( function(){
				messager.style.display = "none";
				}, 3000);
		
         }
         
         colision=0;
         
        
       if(615-this._ball.position.z < this._ball.geometry.parameters.radius){
            this._ball.velocity.x=0;
            this._ball.velocity.y=0;
            this._ball.velocity.z=0;
            count3++;
         }
          if(distance < this._ball.geometry.parameters.radius+ this._wallLeft.geometry.parameters.radiusTop){
             resolveCollision(this._wallLeft,this._ball);
          }
          if(distance3 < this._ball.geometry.parameters.radius+ this._wallRight.geometry.parameters.radiusTop){
             resolveCollision(this._wallRight,this._ball);
          }

         
         if(this._man.position.z > 120 && this._man.position.x > -120 && this._man.position.x < 120 )
         {
         this._ball.position.z=this._ball.position.z+this._ball.velocity.z;
         this._ball.position.x=this._ball.position.x+this._ball.velocity.x;
         this._ball.position.y=this._ball.position.y+this._ball.velocity.y;
         }
         else{
           //when the player leaves the gate, a message guides the player to go back to gate,in order to continue the game 
           directioner.style.display = "block";
           setTimeout( function(){
			directioner.style.display = "none";
			}, 3000);
         }

       if(this._ball.position.z<0 || this._ball.position.z>650|| this._ball.position.x>140 ||this._ball.position.x<-140 || count3 == 60 || this._ball.position.y>-50 || lifenumber == 0 || score==300){
         this._ball.position.set(0,-95.5,0);
         var v1 = getRandomArbitrary(-0.5,0.5);
         var v2 = getRandomArbitrary(0.0,0.3);
         this._ball.velocity.x=v1;
         this._ball.velocity.y=v2;
         this._ball.velocity.z=5;
         count3=0;
         count4=0;
  
       }
       if(lifenumber == 0 ||score==300 ){
         this._ball.material.visible= false;
       }
       this._trophy =  this._scene.getObjectByName("trophy");
       
       if(score == 300 && this._trophy.position.y <-455){

         congratulations.innerHTML="CONGRATULATION!YOU SCORED "+ score ;
         congratulations.style.display = "block";
         this._trophy.position.y +=0.4; 
         //animate the fireworks 
        if( THREE.Math.randInt( 1, 20 ) === 10 )
        {
            fireworks.push( new Firework( this._scene ) ); 
        }
        // update fireworks 
        
       }

       if(lifenumber == 0){
         ender.style.display = "block";
       }
       for( var i = 1; i < fireworks.length ; i++ )
        {
            if( fireworks[ i ].done ) // cleanup 
            {
                fireworks.splice( i, 1 ); 
                continue; 
            }
            fireworks[ i ].update();
        } 
       //another graphic feedback to the user is the lifenumber
       //each ball represents a life 
       //when the ball pass the gate possition, it means that the player received a goal which result that
       // the number of lifes is decreased and one of the balls disappear
       if(this._ball.position.z==550 && this._ball.position.x<140 && this._ball.position.x>-140){
              if (lifenumber==5){
              this._lifeball.visible= false;
        
              }
              if (lifenumber==4){
                 this._lifeball2.visible= false;
                  
              }
               if (lifenumber==3){
                 this._lifeball3.visible= false;
                  
              }
               if (lifenumber==2){
                 this._lifeball4.visible= false;
                  
              }
               if (lifenumber==1){
                 this._lifeball5.visible= false;
                  
              }
              lifenumber -- ;

              if(lifenumber>1){

              //a text-based feedback is displayed when the player didn't catch the ball
              //the player is announced that he received a goal and the number of lifes reamined
              goaler.innerHTML="GOAL! "+ lifenumber+" LIFES REMAINED" ;
              goaler.style.display = "block";
              setTimeout( function(){
			  goaler.style.display = "none";
			  }, 3000);
              }

              if (lifenumber==1)
              {
                goaler.innerHTML="GOAL! "+ lifenumber+" LIFE REMAINED" ;
              goaler.style.display = "block";
              setTimeout( function(){
			  goaler.style.display = "none";
			  }, 3000);
              }

              }

       }

       
        
       

      this._RAF();

      this._threejs.render(this._scene, this._camera);
      this._Step(t - this._previousRAF);
      this._previousRAF = t;
    });
  }


  _Step(timeElapsed) {
    const timeElapsedS = timeElapsed * 0.001;
    if (this._mixers) {
      this._mixers.map(m => m.update(timeElapsedS));
    }

    if (this._controls) {
      this._controls.Update(timeElapsedS);
    }
  }
}

let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new CharacterControllerDemo();
});

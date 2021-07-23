"use strict";
var GolfGame;
(function (GolfGame) {
    var fc = FudgeCore;
    let root;
    let cmpCamera;
    let viewport;
    let MainBall;
    let canvas;
    let buttonPressedCounter = 0;
    let schlaegeCounter = 0;
    let cmpRigidbodyDynamic;
    let cmpRigidbodyGoal;
    let winText;
    let powerText;
    let schlaegeText;
    let hasShot = false;
    window.addEventListener("load", start);
    //Maus
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("pointerlockchange", pointerLockChange);
    window.addEventListener("mousemove", onMouseMove);
    let isPointerInGame;
    function onPointerDown(_event) {
        if (!isPointerInGame)
            canvas.requestPointerLock();
    }
    function pointerLockChange(_event) {
        if (!document.pointerLockElement)
            isPointerInGame = false;
        else
            isPointerInGame = true;
    }
    function onMouseMove(_event) {
        if (isPointerInGame) {
            let rotFriction = 12;
            MainBall.getChild(0).mtxLocal.rotateY(_event.movementX / rotFriction);
        }
    }
    async function start(_event) {
        fc.Physics.settings.debugDraw = true;
        fc.Physics.settings.defaultRestitution = 0.5;
        fc.Physics.settings.defaultFriction = 0.8;
        await FudgeCore.Project.loadResourcesFromHTML();
        FudgeCore.Debug.log("Project:", FudgeCore.Project.resources);
        // pick the graph to show
        root = FudgeCore.Project.resources["Graph|2021-07-19T15:33:34.943Z|65568"];
        cmpCamera = new fc.ComponentCamera();
        MainBall = root.getChildrenByName("Node_Ball")[0];
        createRigidbodies();
        canvas = document.querySelector("canvas");
        viewport = new fc.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        powerText = document.querySelector("#Power-Text");
        schlaegeText = document.querySelector("#Schläge-Text");
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        fc.Loop.start();
    }
    function update() {
        fc.Physics.world.simulate(fc.Loop.timeFrameReal / 1000);
        let forward;
        forward = cmpCamera.getContainer().getParent().mtxWorld.getZ();
        let ballVelocity = MainBall.getComponent(fc.ComponentRigidbody).getVelocity().magnitude;
        if (wIsPressed && Math.floor(ballVelocity) == 0) {
            hasShot = false;
            buttonPressedCounter++;
            powerText.innerHTML = "Power: " + buttonPressedCounter;
        }
        if (wIsReleased) {
            MainBall.getComponent(fc.ComponentRigidbody).applyForce(fc.Vector3.SCALE(forward, -buttonPressedCounter * 100));
            buttonPressedCounter = 0;
            if (!hasShot) {
                hasShot = true;
                schlaegeCounter++;
                powerText.innerHTML = "Power: " + buttonPressedCounter;
                schlaegeText.innerHTML = "Schläge: " + schlaegeCounter;
            }
        }
        viewport.draw();
    }
    function createRigidbodies() {
        //gewicht
        cmpRigidbodyDynamic = new fc.ComponentRigidbody(5, fc.PHYSICS_TYPE.DYNAMIC, fc.COLLIDER_TYPE.SPHERE, fc.PHYSICS_GROUP.GROUP_2);
        cmpRigidbodyDynamic.rotationInfluenceFactor = fc.Vector3.ZERO();
        root.getChildrenByName("Node_Ball")[0].addComponent(cmpRigidbodyDynamic);
        //camera
        root.getChildrenByName("Node_Ball")[0].getChild(0).getChild(0).addComponent(cmpCamera);
        cmpCamera.mtxPivot.translate(new fc.Vector3(0, 15, 25));
        cmpCamera.mtxPivot.rotateY(180);
        cmpCamera.mtxPivot.rotateX(25);
        //OuterWalls
        root.getChild(1).getChildren().forEach(node => {
            if (node.name != "Node_Pyramide" && node.name != "Node_goal") {
                let cmpRigidbodyStatic = new fc.ComponentRigidbody(0, fc.PHYSICS_TYPE.STATIC, fc.COLLIDER_TYPE.CUBE, fc.PHYSICS_GROUP.DEFAULT);
                node.addComponent(cmpRigidbodyStatic);
            }
            if (node.name == "Node_Pyramide") {
                let cmpRigidbodyPyramide = new fc.ComponentRigidbody(0, fc.PHYSICS_TYPE.STATIC, fc.COLLIDER_TYPE.PYRAMID, fc.PHYSICS_GROUP.DEFAULT);
                node.addComponent(cmpRigidbodyPyramide);
            }
            if (node.name == "Node_goal") {
                console.log("n" + node.name);
                cmpRigidbodyGoal = new fc.ComponentRigidbody(0, fc.PHYSICS_TYPE.STATIC, fc.COLLIDER_TYPE.CUBE, fc.PHYSICS_GROUP.TRIGGER);
                node.addComponent(cmpRigidbodyGoal);
            }
        });
        // let cmpRigidbodyStatic: fc.ComponentRigidbody = new fc.ComponentRigidbody(0, fc.PHYSICS_TYPE.STATIC, fc.COLLIDER_TYPE.CUBE, fc.PHYSICS_GROUP.DEFAULT);
        // root.getChildrenByName("Node_Enviroment")[0].getChild(0).addComponent(cmpRigidbodyStatic);
        // let cmpRigidbodyStaticWallEast: fc.ComponentRigidbody = new fc.ComponentRigidbody(0, fc.PHYSICS_TYPE.STATIC, fc.COLLIDER_TYPE.CUBE, fc.PHYSICS_GROUP.DEFAULT);
        // root.getChildrenByName("Node_Enviroment")[0].getChild(1).addComponent(cmpRigidbodyStaticWallEast);
        // let cmpRigidbodyStaticWallNorth: fc.ComponentRigidbody = new fc.ComponentRigidbody(0, fc.PHYSICS_TYPE.STATIC, fc.COLLIDER_TYPE.CUBE, fc.PHYSICS_GROUP.DEFAULT);
        // root.getChildrenByName("Node_Enviroment")[0].getChild(2).addComponent(cmpRigidbodyStaticWallNorth);
        // let cmpRigidbodyStaticWallWest: fc.ComponentRigidbody = new fc.ComponentRigidbody(0, fc.PHYSICS_TYPE.STATIC, fc.COLLIDER_TYPE.CUBE, fc.PHYSICS_GROUP.DEFAULT);
        // root.getChildrenByName("Node_Enviroment")[0].getChild(3).addComponent(cmpRigidbodyStaticWallWest);
        // let cmpRigidbodyStaticWallSouth: fc.ComponentRigidbody = new fc.ComponentRigidbody(0, fc.PHYSICS_TYPE.STATIC, fc.COLLIDER_TYPE.CUBE, fc.PHYSICS_GROUP.DEFAULT);
        // root.getChildrenByName("Node_Enviroment")[0].getChild(4).addComponent(cmpRigidbodyStaticWallSouth);
        // //InnerWalls
        // let cmpRigidbodyStaticWallInner_1: fc.ComponentRigidbody = new fc.ComponentRigidbody(0, fc.PHYSICS_TYPE.STATIC, fc.COLLIDER_TYPE.CUBE, fc.PHYSICS_GROUP.DEFAULT);
        // root.getChildrenByName("Node_Enviroment")[0].getChild(5).addComponent(cmpRigidbodyStaticWallInner_1);
        // let cmpRigidbodyStaticWallInner_2: fc.ComponentRigidbody = new fc.ComponentRigidbody(0, fc.PHYSICS_TYPE.STATIC, fc.COLLIDER_TYPE.CUBE, fc.PHYSICS_GROUP.DEFAULT);
        // root.getChildrenByName("Node_Enviroment")[0].getChild(6).addComponent(cmpRigidbodyStaticWallInner_2);
        // //Other Obsticals
        // let cmpRigidbodyStaticPyramide: fc.ComponentRigidbody = new fc.ComponentRigidbody(0, fc.PHYSICS_TYPE.STATIC, fc.COLLIDER_TYPE.PYRAMID, fc.PHYSICS_GROUP.DEFAULT);
        // root.getChildrenByName("Node_Enviroment")[0].getChild(7).addComponent(cmpRigidbodyStaticPyramide);
        // //Goal
        // let cmpRigidbodyStaticGoal: fc.ComponentRigidbody = new fc.ComponentRigidbody(0, fc.PHYSICS_TYPE.STATIC, fc.COLLIDER_TYPE.CUBE, fc.PHYSICS_GROUP.TRIGGER);
        // root.getChildrenByName("Node_Enviroment")[0].getChild(8).addComponent(cmpRigidbodyStaticGoal);
        // for (let i = 0; i < 10 ; i ++ ){
        //   root.getChildrenByName("Node_Enviroment")[0].getChild(i).addComponent(cmpRigidbodyStatic);
        // }
        fc.Physics.adjustTransforms(root, true);
        cmpRigidbodyGoal.addEventListener("TriggerEnteredCollision" /* TRIGGER_ENTER */, hndTrigger);
    }
    function hndTrigger(_event) {
        if (_event.cmpRigidbody == cmpRigidbodyDynamic) {
            console.log(_event.cmpRigidbody.getContainer().name);
            winText = document.querySelector("#Gewonnen-Text");
            winText.hidden = false;
        }
    }
    document.addEventListener("keypress", handler_Key_Pressed);
    document.addEventListener("keyup", handler_Key_Released);
    let wIsPressed;
    let wIsReleased;
    function handler_Key_Pressed(_event) {
        if (_event.code == FudgeCore.KEYBOARD_CODE.W) {
            wIsPressed = true;
            wIsReleased = false;
        }
    }
    function handler_Key_Released(_event) {
        if (_event.code == FudgeCore.KEYBOARD_CODE.W) {
            wIsReleased = true;
            wIsPressed = false;
        }
    }
})(GolfGame || (GolfGame = {}));
//# sourceMappingURL=GolfMain.js.map
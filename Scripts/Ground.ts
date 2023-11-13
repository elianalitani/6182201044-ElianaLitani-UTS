import { _decorator, Component, Node, UITransform, Vec3, director, Canvas } from 'cc';
const { ccclass, property } = _decorator;

import {GameCtrl} from './GameCtrl';

@ccclass('Ground')
export class Ground extends Component {

    @property({
        type: Node,
        tooltip: 'First Ground'
    })
    public ground1: Node;

    @property({
        type: Node,
        tooltip: 'Second Ground'
    })
    public ground2: Node;

    @property({
        type: Node,
        tooltip: 'Third Ground'
    })
    public ground3: Node;

    // GROUND width variable
    public groundWidth1:number;
    public groundWidth2:number;
    public groundWidth3:number;

    // TEMPORARY start location
    public tempStartLocation1 = new Vec3;
    public tempStartLocation2 = new Vec3;
    public tempStartLocation3 = new Vec3;

    // GET GAME SPEED
    public gameCtrlSpeed = new GameCtrl;
    public gameSpeed: number;

    // TO DO ON LOAD
    onLoad(){
        this.startUp()
    }

    // PREPARATION FOR GROUND
    startUp(){

        this.groundWidth1 = this.ground1.getComponent(UITransform).width;
        this.groundWidth2 = this.ground2.getComponent(UITransform).width;
        this.groundWidth3 = this.ground3.getComponent(UITransform).width;

        this.tempStartLocation1.x = 0;
        this.tempStartLocation2.x = this.groundWidth1;
        this.tempStartLocation3.x = this.groundWidth1+this.groundWidth2;

        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);
    }

    // DO WHEN GAME UPDATES
    update(deltaTime: number){

        this.gameSpeed = this.gameCtrlSpeed.speed;

        // put real location to temp location
        this.tempStartLocation1 = this.ground1.position;
        this.tempStartLocation2 = this.ground2.position;
        this.tempStartLocation3 = this.ground3.position;

        // speed subtracted by x
        this.tempStartLocation1.x -= this.gameSpeed*deltaTime;
        this.tempStartLocation2.x -= this.gameSpeed*deltaTime;
        this.tempStartLocation3.x -= this.gameSpeed*deltaTime;

        // get canvas size
        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);

        // IF ground out of bounds, location will be reset
        if(this.tempStartLocation1.x <= (0-this.groundWidth1)){
            this.tempStartLocation1.x = canvas.getComponent(UITransform).width;
        }

        if(this.tempStartLocation2.x <= (0-this.groundWidth2)){
            this.tempStartLocation2.x = canvas.getComponent(UITransform).width;
        }

        if(this.tempStartLocation3.x <= (0-this.groundWidth3)){
            this.tempStartLocation3.x = canvas.getComponent(UITransform).width;
        }

        // set new location for ground
        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);
    }
}




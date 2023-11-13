import { _decorator, Component, Node, Vec3, screen, find, UITransform } from 'cc';
const { ccclass, property } = _decorator;

const random = (min,max) =>{
    return Math.random()*(max-min)+min
}

@ccclass('Pipe')
export class Pipe extends Component {

    @property({
        type: Node,
        tooltip: 'Top'
    })
    public topPipe: Node;

    @property({
        type: Node,
        tooltip: 'Bottom'
    })
    public bottomPipe: Node;  
    
    // TEMP LOCATION
    public tempStartLocationTop:Vec3 = new Vec3(0, 0, 0);
    public tempStartLocationBottom:Vec3 = new Vec3(0, 0, 0);
    public scene = screen.windowSize;

    // PIPE SPEED
    public game;
    public pipeSpeed:number;
    public tempSpeed:number;

    // CHECK IF THE BIRD PASS THE PIPE
    isPass: boolean;

    // DO when loading pipes
    onLoad(){
        this.game = find("GameCtrl").getComponent("GameCtrl")
        this.pipeSpeed = this.game.pipeSpeed;
        this.initPos();
        this.isPass = false;
    }

    // PIPES POSITION
    initPos(){
        // pipe x position
        this.tempStartLocationTop.x = (this.topPipe.getComponent(UITransform).width+this.scene.width);
        this.tempStartLocationBottom.x = (this.bottomPipe.getComponent(UITransform).width+this.scene.width);
        
        // random gap for passable area
        let gap = random(0, 100);
        let topHeight = random(100, 450);

        // pipe y position
        this.tempStartLocationTop.y = topHeight;
        this.tempStartLocationBottom.y = (topHeight - (gap*10));

        // set pipe position
        this.topPipe.setPosition(this.tempStartLocationTop.x, this.tempStartLocationTop.y);
        this.bottomPipe.setPosition(this.tempStartLocationBottom.x, this.tempStartLocationBottom.y);
    }

    // PIPES MOVEMENT
    update(deltaTime:number){
        this.tempSpeed = this.pipeSpeed*deltaTime;
        
        // TEMP PIPE LOCATION
        this.tempStartLocationBottom = this.bottomPipe.position;
        this.tempStartLocationTop = this.topPipe.position;

        // MOVE PIPE LOCATION
        this.tempStartLocationBottom.x -= this.tempSpeed;
        this.tempStartLocationTop.x -= this.tempSpeed;

        this.bottomPipe.setPosition(this.tempStartLocationBottom);
        this.topPipe.setPosition(this.tempStartLocationTop);
        
        // CHECK BIRD CONDITION: pass or no?
        if(this.isPass == false && this.topPipe.position.x <= 0){
            this.isPass = true;
            this.game.passPipe();       // add one point to score
        }

        // RESET PIPE POSITION
        if(this.topPipe.position.x < (0-this.scene.width)){
            this.game.createPipe();
            this.destroy();
        }
    }
}
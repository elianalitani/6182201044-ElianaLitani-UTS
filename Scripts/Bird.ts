import { _decorator, Component, Node, CCFloat, Vec3, Animation, tween } from 'cc';
const { ccclass, property } = _decorator;

import {GameCtrl} from './GameCtrl';

@ccclass('Bird')
export class Bird extends Component {

    @property({
        type: CCFloat,
        tooltip: 'Bird fly height'
    })
    public jumpHeight: number = 1.5;

    @property({
        type: CCFloat,
        tooltip: 'Bird fly duration'
    })
    public jumpDuration: number = 1.5;

    // @property({
    //     type: GameCtrl,
    //     tooltip: 'Game control here'
    // })
    // public game: GameCtrl;

    public birdAnimation: Animation;            // bird animation
    public birdLocation: Vec3;                  // bird temporary location
    public hitSomething: boolean;               // hit detection

    /* TO DO ON LOAD
     * bird reset
     */
    onLoad(){
        this.resetBird();
        this.birdAnimation = this.getComponent(Animation);
    }

    /* RESET BIRD
     * reset location and hit detection
     * create the original bird location, place bird in location, reset hit detection
     */
    resetBird(){
        this.birdLocation = new Vec3(0, 0, 0);
        this.node.setPosition(this.birdLocation)
        this.hitSomething = false;
    }

    /* BIRD FLY
     * movement start from tween and animation will play
     */
    fly(){        
        this.birdAnimation.stop();
        
        tween(this.node.position)
        .to(this.jumpDuration, new Vec3(this.node.position.x, this.node.position.y+this.jumpHeight, 0), {
            easing: "smooth", onUpdate: (target:Vec3, ratio:number) => {
                this.node.position = target;
            }
        })
        .start();

        this.birdAnimation.play();
    }
}
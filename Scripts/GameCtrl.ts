import { _decorator, CCInteger, Component, Node, Input, input, EventKeyboard, KeyCode, director, Contact2DType, Collider2D, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

import {Ground} from './Ground';
import {Result} from './Result';
import {Bird} from './Bird';
import {PipePool} from './PipePool';
import {BirdAudio} from './BirdAudio';

@ccclass('GameCtrl')
export class GameCtrl extends Component {

    @property({
        type:Component,
        tooltip: 'Add ground prefab here'
    })
    public ground:Ground;

    @property({
        type:CCInteger,
        tooltip: 'Change the speed of ground'
    })
    public speed: number = 200;

    @property({
        type: CCInteger,
        tooltip: 'Change the speed of pipes',
    })
    public pipeSpeed: number = 200;

    @property({
        type: Result,
        tooltip: 'Result here',
    })
    public result: Result;

    @property({
        type: Bird,
        tooltip: 'Add bird node',
    })
    public bird: Bird;

    @property({
        type: PipePool,
        tooltip: 'Canvas here'
    })
    public pipeQueue: PipePool;

    @property({
        type: BirdAudio,
        tooltip: 'Audio controller'
    })
    public clip: BirdAudio;

    // CHECK is the game over or not?
    public isOver: boolean;

    /* TO DO ON LOAD
     * score reset, game considered over, game paused
     */
    onLoad(){
        this.initListener();
        this.result.resetScore;
        this.isOver = true;
        director.pause;
    }

    // LISTENER FOR MOUSE CLICK WHILE PLAYING
    initListener(){
        // for when keyboard key goes down
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        // for mouse or finger go down
        this.node.on(Node.EventType.TOUCH_START, () => {

            // DO when game is over, reset everything
            if(this.isOver == true){
                this.resetGame();
                this.bird.resetBird();
                this.startGame();
            }

            // DO when game is playing, bird flies and sound effect plays
            if(this.isOver == false){
                this.bird.fly();
                this.clip.onAudioQueue(0);
            }

        })
    }

    // TESTING AND PAUSING PURPOSE
    onKeyDown(event: EventKeyboard){
        switch(event.keyCode){
            // case KeyCode.KEY_A:
            //     // end game
            //     this.gameOver();
            //     break;
            // case KeyCode.KEY_P:
            //     // add point
            //     this.result.addScore();
            //     break;
            // case KeyCode.KEY_Q:
            //     // reset score to 0
            //     this.resetGame();
            //     this.bird.resetBird();

            // PAUSING THE GAME
            case KeyCode.ESCAPE:
                director.pause();
                break;
            // RESUMING THE GAME
            case KeyCode.SPACE:
                director.resume();
                break;
        }
    }

    /* TO DO ON START
     * high score and try again will be hidden, game resumed
     */
    startGame(){
        this.result.hideResult();
        director.resume();
    }

    /* DO WHEN BIRD HITS SOMETHING
     * shows results, game considered over, sound effect plays, game paused 
     */
    gameOver(){
        this.result.showResult();
        this.isOver = true;
        this.clip.onAudioQueue(3);
        director.pause();
    }

    /* DO WHEN GAME STARTS AGAIN
     * reset everything, game starts again
     */
    resetGame(){
        this.result.resetScore();
        this.pipeQueue.reset();
        this.isOver = false;
        this.startGame();
    }

    /* DO WHEN PIPE PASSES BIRD
     *  point added, sound effect plays
     */
    passPipe(){
        this.result.addScore();
        this.clip.onAudioQueue(1);
    }

    /* DO WHEN OLD PIPE PASSED THE SCREEN
     * add new pipe
     */
    createPipe(){
        this.pipeQueue.addPool();
    }

    /* CHECK IF THERE WAS CONTACT BETWEEN BIRD AND OBJECTS
     * check if colliders hit each other
     */
    contactGroundPipe(){
        let collider = this.bird.getComponent(Collider2D);

        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    /* DO WHEN PLAYER HITS SOMETHING
     * considered as a hit, sound effect plays
     */
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        this.bird.hitSomething = true;
        this.clip.onAudioQueue(2);
    }

    /* HIT DETECTION FOR BIRD
     * if hits, game over
     */
    birdStruck(){
        this.contactGroundPipe();

        if(this.bird.hitSomething == true){
            this.gameOver();
        }
    }

    /* GAME UPDATE
     * check if bird hits something
     */
    update(){
        if(this.isOver == false){
            this.birdStruck();
        }
    }
}



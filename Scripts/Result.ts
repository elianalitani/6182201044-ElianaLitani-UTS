import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Result')
export class Result extends Component {

    @property({
        type: Label,
        tooltip: 'Current Score'
    })
    public scoreLabel: Label;

    @property({
        type: Label,
        tooltip: 'High Score'
    })
    public highScore: Label;

    @property({
        type: Label,
        tooltip: 'Try Again'
    })
    public resultEnd: Label;

    maxScore: number = 0;           // high score history
    currentScore: number;           // score while playing

    // DISPLAYING UPDATED SCORE
    updateScore(num:number){
        this.currentScore = num;
        this.scoreLabel.string = ('' + this.currentScore);
    }

    // RESETING SCORE
    resetScore(){
        this.updateScore(0);
        this.hideResult();
        this.scoreLabel.string = ('' + this.currentScore);
    }

    // ADDING POINT TO SCORE
    addScore(){
        this.updateScore(this.currentScore+1);
    }

    // SHOWING ALL RESULTS
    showResult(){
        this.maxScore = Math.max(this.maxScore, this.currentScore);

        this.highScore.string = 'High Score: ' + this.maxScore;
        this.highScore.node.active = true;

        this.resultEnd.node.active = true;
    }

    // HIDING RESULTS WHILE PLAYING
    hideResult(){
        this.highScore.node.active = false;
        this.resultEnd.node.active = false;
    }
}



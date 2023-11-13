import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BirdAudio')
export class BirdAudio extends Component {

    @property({
        type: [AudioClip],
        tooltip: 'Audio clip'
    })
    public clip: AudioClip[] = [];

    @property({
        type: AudioSource,
        tooltip: 'Audio node'
    })
    public audioSource: AudioSource = null;

    onAudioQueue(index: number){
        let clip: AudioClip = this.clip[index];
        this.audioSource.playOneShot(clip);
    }
}
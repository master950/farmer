import { AnimationClip, SpriteFrame, animation, Sprite, Animation} from "cc";
import { State } from "../../state_machine/state";
import { PLAYER_DIR } from "../../../enum";

export class PlayerState implements State{

    private animClip: AnimationClip;
    private animMode: AnimationClip.WrapMode;
    private animComp: Animation;

    private spriteFrames: SpriteFrame[];
    private FRAME_TIME = 1/5;

    constructor(spriteFrames: SpriteFrame[], animComp: Animation, animMode: AnimationClip.WrapMode = AnimationClip.WrapMode.Normal){
        this.spriteFrames = spriteFrames;
        this.animMode = animMode;
        this.animComp = animComp;
    }

    createAnimClip(){
        const spriteFrames = this.spriteFrames;
        this.animClip = new AnimationClip();
        const frams: Array<[number,SpriteFrame]> = spriteFrames.map((item,index)=>[this.FRAME_TIME * index, item])
        const track  = new animation.ObjectTrack();
        track.path = new animation.TrackPath().toComponent(Sprite).toProperty('spriteFrame');
        track.channel.curve.assignSorted(frams);

        // 最后将轨道添加到动画剪辑以应用
        this.animClip.addTrack(track);
        this.animClip.duration = frams.length * this.FRAME_TIME; // 整个动画剪辑的周期
        this.animClip.wrapMode = this.animMode;
        this.animComp.defaultClip = this.animClip;
        this.animComp.play();
    }

    enter(): void {
        this.createAnimClip();
    }
    update(): void {
       console.log('idle update')
    }
    exit(): void {
        this.animComp.stop();
    }

}
import { PlayerState } from "./player_state";
import { AnimationClip, SpriteFrame, Animation} from "cc";
import { PLAYER_DIR } from "../../../enum";

export class PlayerIdle extends PlayerState{

    constructor(spriteFrames: SpriteFrame[], animComp: Animation, animMode: AnimationClip.WrapMode = AnimationClip.WrapMode.Normal){
        super(spriteFrames,animComp,animMode);
    }
}
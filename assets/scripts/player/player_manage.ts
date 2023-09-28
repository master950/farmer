import { AnimationClip,UITransform, Animation } from "cc";
import { EVENT_TYPE, PLAYER_STATE } from "../../enum";
import { StateMachine } from "../state_machine/state_machine";
import { Player } from "./player";
import { PlayerIdle, PlayerWalk } from './animation'
import { PlayerStateManage } from "./player_state_manage";
import { EventManage } from "../../common/event_manage";
import { PlayerResourceManage } from "./player_resource_manage";
import { PlayerState } from "./animation/player_state";

export class PlayerManage{
    
    private player: Player;
    private playerState: PlayerStateManage;
    private PlayerResouce: PlayerResourceManage

    // 动画
    private stateMachine: StateMachine;
    
    constructor(p: Player){
        this.player = p;
        this.playerState = new PlayerStateManage();
        this.PlayerResouce = new PlayerResourceManage();
        this.player.initState(this.playerState);
    }

    async init(){
        await this.PlayerResouce.init();
        this.renderFunc();
        this.initState();
        EventManage.Instance.on(EVENT_TYPE.STATE_CHANGE,this.monitorPlayerStateChange, this);
    }

    renderFunc(){
        const uiTransform = this.player.node.getComponent<UITransform>(UITransform);
        uiTransform.setContentSize(this.playerState.tileWidth, this.playerState.tileHeight);
    }

    initState(){
        const dir = this.playerState.dir;
        const animComp = this.player.getComponent(Animation);
        const sprits = this.PlayerResouce.loadSprites(dir,this.playerState.state);
        this.stateMachine = new StateMachine();
        this.stateMachine.initState(new PlayerIdle(sprits,animComp,AnimationClip.WrapMode.Loop));
    }

    monitorPlayerStateChange(...params){
        const dir = this.playerState.dir;
        const animComp = this.player.getComponent(Animation);
        const sprits = this.PlayerResouce.loadSprites(dir,this.playerState.state);
        if(this.playerState.state === PLAYER_STATE.IDLE){
            this.stateMachine.changeState(new PlayerIdle(sprits,animComp,AnimationClip.WrapMode.Loop));
        }else if(this.playerState.state === PLAYER_STATE.walk){
            this.stateMachine.changeState(new PlayerWalk(sprits,animComp,AnimationClip.WrapMode.Loop));
        }
    }

    getPlayerState(){ return this.playerState.state; }

    getPlayerHp(){ return this.playerState.hp; }
}
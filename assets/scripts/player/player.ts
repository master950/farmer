
import { _decorator, Component, Node } from 'cc';
import { PlayerStateManage } from './player_state_manage';
import { PLAYER_DIR, PLAYER_STATE } from '../../enum';
const { ccclass, property } = _decorator;
 
@ccclass('Player')
export class Player extends Component {

    private playerState: PlayerStateManage;
    initState(p: PlayerStateManage){
        this.playerState = p;
    }
    
    update (deltaTime: number) {
        if(this.playerState.state === PLAYER_STATE.walk){
            let {x, y} = this.node.position;
            if(this.playerState.dir === PLAYER_DIR.BOTTOM)  y -= this.playerState.speed * deltaTime;
            if(this.playerState.dir === PLAYER_DIR.LEFT)  x -= this.playerState.speed * deltaTime;
            if(this.playerState.dir === PLAYER_DIR.RIGHT)  x += this.playerState.speed * deltaTime;
            if(this.playerState.dir === PLAYER_DIR.TOP)  y += this.playerState.speed * deltaTime;
            this.node.setPosition(x,y);
        }
    }
}

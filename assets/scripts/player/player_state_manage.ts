import { input, Input} from "cc";
import { EVENT_TYPE, PLAYER_DIR, PLAYER_STATE } from "../../enum";
import { EventManage } from "../../common/event_manage";

export class PlayerStateManage{

    private _hp: number;
    private _state: PLAYER_STATE;
    private _speed: number = 42;
    private _dir: PLAYER_DIR;
    public tileWidth: number = 14;
    public tileHeight: number = 16;

    constructor(){
        this._hp = 100;
        this._state = PLAYER_STATE.IDLE;
        this._dir = PLAYER_DIR.TOP;
        this.monitorPlayer();
    }

    get state(){ return this._state; }
    get speed(){ return this._speed; }
    get hp(){ return this._hp; }
    get dir(){ return this._dir; }

    set dir(d: PLAYER_DIR){ 
        this._dir = d;
     }
    set state(state: PLAYER_STATE){ 
        this._state = state;
        EventManage.Instance.emit(EVENT_TYPE.STATE_CHANGE);
     }
    set hp(hp: number){
        if(hp <= 0){
            this.state = PLAYER_STATE.DEAD;
        }else{
            if(this.state === PLAYER_STATE.DEAD){
                this.state = PLAYER_STATE.IDLE;
            }
        }
        this._hp = hp;
    }

    keybordDown({keyCode}){
        switch(keyCode){
            case 68: // right
                if(this.dir !== PLAYER_DIR.RIGHT) this.dir = PLAYER_DIR.RIGHT;
                if(this.state !== PLAYER_STATE.walk) this.state = PLAYER_STATE.walk;
                break;
            case 65: // left
                if(this.dir !== PLAYER_DIR.LEFT) this.dir = PLAYER_DIR.LEFT;
                if(this.state !== PLAYER_STATE.walk) this.state = PLAYER_STATE.walk;
                break;
            case 83: // bottom
                if(this.dir !== PLAYER_DIR.BOTTOM) this.dir = PLAYER_DIR.BOTTOM;
                if(this.state !== PLAYER_STATE.walk) this.state = PLAYER_STATE.walk;
                break;
            case 87: // top
                if(this.dir !== PLAYER_DIR.TOP) this.dir = PLAYER_DIR.TOP;
                if(this.state !== PLAYER_STATE.walk) this.state = PLAYER_STATE.walk;
                break;
            case 74: // j
                break;
        }
    }

    keybordUp(){
        this.state = PLAYER_STATE.IDLE;
    }

    keybordPress(){
        
    }

    monitorPlayer(){
        input.on(Input.EventType.KEY_DOWN,this.keybordDown, this);
        input.on(Input.EventType.KEY_UP,this.keybordUp, this);
        input.on(Input.EventType.KEY_PRESSING,this.keybordPress, this);
    }
}
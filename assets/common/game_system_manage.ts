import { Player } from "../scripts/player/player";
import { PlayerManage } from "../scripts/player/player_manage";
import { DataManage } from "./data_manage";
import { Singleton } from "./sington";

export class GameSystemManage extends Singleton{

    static get Instance(){ return this.getInstance<GameSystemManage>(); }

    private playerManage: PlayerManage;

    init(p: Player){
        DataManage.Instance.initBaseData();
        this.playerManage = new PlayerManage(p);
        this.playerManage.init();
    }

    // 获取角色状态
    getPlayerState(){ return this.playerManage.getPlayerState(); }

    // 获取角色血量
    getPlayerHp(){ return this.playerManage.getPlayerHp(); }
}
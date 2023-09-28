import { PLAYER_DIR } from "../enum";
import { MapPoint } from "../map/map_point";
import { Singleton } from "./sington";

export class DataManage extends Singleton{

    static get Instance(){
        return this.getInstance<DataManage>();
    }

    idleFilePath: Map<PLAYER_DIR, string>;
    walkFilePath: Map<PLAYER_DIR, string>;

    mapPoints: Array<MapPoint>

    initBaseData(){
        // idle
        this.idleFilePath = new Map();
        this.idleFilePath.set(PLAYER_DIR.TOP, 'texture/player/idle/top');
        this.idleFilePath.set(PLAYER_DIR.BOTTOM, 'texture/player/idle/bottom');
        this.idleFilePath.set(PLAYER_DIR.LEFT, 'texture/player/idle/left');
        this.idleFilePath.set(PLAYER_DIR.RIGHT, 'texture/player/idle/right');

        // walk
        this.walkFilePath = new Map();
        this.walkFilePath.set(PLAYER_DIR.TOP, 'texture/player/walk/top');
        this.walkFilePath.set(PLAYER_DIR.BOTTOM, 'texture/player/walk/down');
        this.walkFilePath.set(PLAYER_DIR.LEFT, 'texture/player/walk/left');
        this.walkFilePath.set(PLAYER_DIR.RIGHT, 'texture/player/walk/right');
    }

    reset(){
        this.mapPoints = [];
    }
}
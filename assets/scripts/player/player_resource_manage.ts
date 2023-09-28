import { SpriteFrame} from "cc";
import { DataManage } from "../../common/data_manage";
import { ResourceManage } from "../../common/resource_manage";
import { PLAYER_DIR, PLAYER_STATE } from "../../enum";
export class PlayerResourceManage{

    private idleArr: Array<Promise<SpriteFrame[]>> = [];
    private walkArr: Array<Promise<SpriteFrame[]>> = [];
    private idleMap: Map<string, SpriteFrame[]> = new Map();
    private walkMap: Map<string, SpriteFrame[]> = new Map();

    constructor(){
        const { idleFilePath, walkFilePath} = DataManage.Instance;
        idleFilePath.forEach((val,key_map_)=>{
            this.idleArr.push(new Promise<SpriteFrame[]>(async (resolve,reject)=>{
                const file = await ResourceManage.Instance.loadFolderRes(val);
                file.splice(file.length - 1, 1);
                resolve(file);
            }))
        })
        walkFilePath.forEach((val,key_map_)=>{
            this.walkArr.push(new Promise<SpriteFrame[]>(async (resolve,reject)=>{
                const file = await ResourceManage.Instance.loadFolderRes(val);
                file.splice(file.length - 1, 1);
                resolve(file);
            }))
        })
    }

    async init(){
        await this.loadAllRes();
    }

    async loadAllRes(){
        const walk = await Promise.all(this.walkArr);
        const idle = await Promise.all(this.idleArr);
        const dir = [PLAYER_DIR.TOP,PLAYER_DIR.BOTTOM,PLAYER_DIR.LEFT,PLAYER_DIR.RIGHT];
        walk.forEach((item,index)=>{ this.walkMap.set(dir[index], item); });
        idle.forEach((item,index)=>{ this.idleMap.set(dir[index], item); });
    }

    loadSprites(dir: PLAYER_DIR, state: PLAYER_STATE):SpriteFrame[]{
       let res: SpriteFrame[];
       if(state === PLAYER_STATE.IDLE){
            res = this.idleMap.get(dir);
       }else if(state === PLAYER_STATE.walk){
            res = this.walkMap.get(dir);
       }
       return res;
    }
}
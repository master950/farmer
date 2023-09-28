import { resources, SpriteFrame } from 'cc';
import { Singleton } from './sington';

export class ResourceManage extends Singleton {
    
    static get Instance(){
        return this.getInstance<ResourceManage>();
    }

    loadRes(path: string, type : typeof SpriteFrame = SpriteFrame){
        return new Promise<SpriteFrame>((resolve, reject)=>{
            resources.load(path, type, function (err, assets) {
               if(err) {
                    reject(err);
                    return;
                }
               resolve(assets);
            });
        })
    }

    loadFolderRes(path: string, type : typeof SpriteFrame = SpriteFrame){
        return new Promise<SpriteFrame[]>((resolve, reject)=>{
            resources.loadDir(path, type, function (err, assets) {
               if(err) {
                    reject(err);
                    return;
                }
               resolve(assets);
            });
        })
    }
}

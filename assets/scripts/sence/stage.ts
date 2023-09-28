
import { _decorator, Component,Animation, Node, Sprite } from 'cc';
import { createUINode } from '../../utils';
import { GameSystemManage } from '../../common/game_system_manage';
import { Player } from '../player/player';
const { ccclass, property } = _decorator;
 
@ccclass('Sence')
export class Sence extends Component {

    start () {
        this.init();
    }

    createPlayer(): Node{
       const player = createUINode('player');
       const sp = player.addComponent(Sprite);
       sp.sizeMode = Sprite.SizeMode.CUSTOM;
       player.addComponent(Animation);
       player.setParent(this.node);
       return player;
    }

    init(){
       const player = this.createPlayer();
       const playerSp = player.addComponent(Player);
       GameSystemManage.Instance.init(playerSp);
    }
}

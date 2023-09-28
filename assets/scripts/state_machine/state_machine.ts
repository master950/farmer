import { EnemyState } from "../enemy/animation/enemy_state";
import { PlayerState } from "../player/animation/player_state";

export class StateMachine{

    private currState: PlayerState | EnemyState;

    initState(state: PlayerState | EnemyState){
        this.currState = state;
        this.currState.enter();
    }

   changeState(state: PlayerState | EnemyState){
        this.currState.exit();
        this.currState = state;
        this.currState.enter();
   }

   update() {
        this.currState.update();    
   }
}
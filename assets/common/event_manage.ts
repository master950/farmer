import { Singleton } from "./sington";

export interface EventItem{
    func: Function,
    ctx: unknown,
}

export class EventManage extends Singleton{

    static get Instance(){ return this.getInstance<EventManage>(); }

    private eventMap: Map<string,Array<EventItem>> = new Map<string,Array<EventItem>>();

    on(name: string, func: Function, ctx?: unknown){
        if(this.eventMap.has(name)){
            this.eventMap.get(name).push({func: func, ctx: ctx});
        }else{
            this.eventMap.set(name,[{func: func, ctx: ctx}])
        }
    }

    offAll(name: string){
        if(this.eventMap.has(name)){
            this.eventMap.delete(name);
        }
    }

    off(name: string, func: Function){
        if(this.eventMap.has(name)){
           const index = this.eventMap.get(name).findIndex(val=> val.func === func);
           if(index > -1){ this.eventMap.get(name).splice(index, 1); }
        }
    }

    emit(name: string, ...params){
        if(this.eventMap.has(name)){
            this.eventMap.get(name).forEach(({func,ctx})=>{
                if(ctx){
                    func.apply(ctx,params);
                }else{
                    func(...params);
                }
            })
        }
    }

    clear(){
        this.eventMap.clear();
    }
}
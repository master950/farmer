export class MapPoint{
    x: number;
    y: number;
    filePath: string;
    _parent: MapPoint;
    _isObstacle: boolean;
    _cost: number;

    constructor(x:number, y: number, f: string){
        this.x = x;
        this.y = y;
        this.filePath = f;
        this._cost = 0;
        this._isObstacle = false;
        this._parent = null;
    }

    set parent(p: MapPoint){ this._parent = p; }

    set cost(c: number){ this._cost = c; }
    get cost(){ return this._cost; }

    get isObstacle(){ return this._isObstacle; }
    set isObstacle(b: boolean){ this._isObstacle = b; }
}
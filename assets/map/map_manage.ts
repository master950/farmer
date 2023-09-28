import { MapPoint } from "./map_point";

export class MapManage{

    private mapColumn: number;
    private mapRow: number;
    private mapPoints: Array<MapPoint> = [];

    constructor(column: number, row: number){
        this.mapColumn = column;
        this.mapRow = row;
    }

    initMapData(){
        for(let i = 0; i< this.mapRow; i++){
            for(let j = 0; j < this.mapColumn; j++){
                this.mapPoints.push(new MapPoint(i,j,''))
            }
        }
    }
}
import { Point } from "../entities/point.entity"

export const pointStub = ():Point => {
    let point = new Point();
    point.id = '652fd4824a45d3d08caf1c0a';
    point.uid = 'Zd0t7ecAlZWTVGIcFx3xBI5r33x2';
    point.userName = 'Jef';
    point.usablePoints = 5;
    point.totalPoints = 5;
    point.isPublic = true;
    return point;
}
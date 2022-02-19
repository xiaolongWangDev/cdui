export class HeatMapData {
  xCategories: string[];
  yCategories: string[];
  data: number[][];
  constructor(args: Readonly<HeatMapData>) {
    Object.assign(this, args);
  }
}

export class HeatMapData {
  xCategories: string[];
  yCategories: string[];
  data: [number, number, number][];
  constructor(args: Readonly<HeatMapData>) {
    Object.assign(this, args);
  }
}

export class ScatterData {
  data: [number, number][];
  constructor(args: Readonly<ScatterData>) {
    Object.assign(this, args);
  }
}

export class SplineData {
  data: [number, number][];
  constructor(args: Readonly<ScatterData>) {
    Object.assign(this, args);
  }
}

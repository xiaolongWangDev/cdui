import {Injectable} from "@angular/core";
import {HeatMapData, markAsTracked} from "configuration-driven-core";
import {Observable, of} from "rxjs";
import {delay} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MockApiService {
  constructor(private http: HttpClient) {
  }

  getSpendingXOptions(): Observable<string[]> {
    return markAsTracked(of(["Monthly", "Yearly"]).pipe(delay(2000)), "spending_x_options");
  }

  getSpendingYOptions(): Observable<string[]> {
    return markAsTracked(of(["Entertainment", "Dining"]).pipe(delay(1000)), "spending_y_options");
  }

  getOlympicData(): Observable<Record<string, any>[]> {
    return this.http.get<Record<string, any>[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
  }

  getSpendingHeatMapData(xAxis: string, yAxis: string): Observable<HeatMapData> {
    let result: Observable<HeatMapData>;
    if (xAxis === "Monthly") {
      if (yAxis == "Entertainment") {
        result = of(new HeatMapData({
          xCategories: ["2021-01", "2021-02", "2021-03", "2021-04", "2021-05"],
          yCategories: ["Game", "Movie", "Travel"],
          data: [
            [0, 0, 100], [0, 1, 30], [0, 2, 0],
            [1, 0, 0], [1, 1, 60], [1, 2, 0],
            [2, 0, 0], [2, 1, 0], [2, 2, 500],
            [3, 0, 200], [3, 1, 100], [3, 2, 0],
            [4, 0, 20], [4, 1, 30], [4, 2, 100],
          ]
        })).pipe(delay(1000));
      } else {
        result = of(new HeatMapData({
          xCategories: ["2021-01", "2021-02", "2021-03", "2021-04", "2021-05"],
          yCategories: ["Sushi", "Ramen", "Burger"],
          data: [
            [0, 0, 48], [0, 1, 123], [0, 2, 34],
            [1, 0, 200], [1, 1, 15], [1, 2, 0],
            [2, 0, 0], [2, 1, 100], [2, 2, 100],
            [3, 0, 55], [3, 1, 0], [3, 2, 40],
            [4, 0, 90], [4, 1, 80], [4, 2, 22],
          ]
        })).pipe(delay(1000));
      }
    } else {
      if (yAxis == "Entertainment") {
        result = of(new HeatMapData({
          xCategories: ["2020", "2021"],
          yCategories: ["Game", "Movie", "Travel"],
          data: [
            [0, 0, 800], [0, 1, 300], [0, 2, 2000],
            [1, 0, 1000], [1, 1, 200], [1, 2, 500],
          ]
        })).pipe(delay(1000))
      } else {
        result = of(new HeatMapData({
          xCategories: ["2020", "2021",],
          yCategories: ["Sushi", "Ramen", "Burger"],
          data: [
            [0, 0, 400], [0, 1, 500], [0, 2, 100],
            [1, 0, 300], [1, 1, 500], [1, 2, 200],
          ]
        })).pipe(delay(1000))
      }
    }

    return markAsTracked(result, "spending_heat_map_data");
  }
}



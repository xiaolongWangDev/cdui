import * as Highcharts from "highcharts";

import HC_stock from 'highcharts/modules/stock';
import HC_heatmap from 'highcharts/modules/heatmap';

HC_stock(Highcharts);
HC_heatmap(Highcharts);

export const configuredHighchartsLibrary = Highcharts;

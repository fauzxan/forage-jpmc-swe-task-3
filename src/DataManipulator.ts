import { ServerRespond } from './DataStreamer';

export interface Row {
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  upper_conservative: number,
  lower_conservative: number,
  trigger_alert: number | undefined,
  confirmed: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const price_abc = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const price_def = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const ratio = price_abc / price_def;
    const upper_bound = 1 + 0.1;
    const lower_bound = 1 - 0.1;
    const upper_conservative = 1 + 0.05;
    const lower_conservative = 1 - 0.05;
    const timestamp = serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp;
    let trigger_alert =  undefined;
    if (ratio > upper_conservative || ratio < lower_conservative) {
      trigger_alert = ratio;
    }
    let confirmed = undefined;
    if (ratio > upper_bound || ratio < lower_bound) {
      confirmed = ratio;
    }

    return {
      ratio: ratio,
      timestamp: timestamp,
      upper_bound: upper_bound,
      lower_bound: lower_bound,
      upper_conservative: upper_conservative,
      lower_conservative: lower_conservative,
      trigger_alert: trigger_alert,
      confirmed: confirmed,
    }
  }
}

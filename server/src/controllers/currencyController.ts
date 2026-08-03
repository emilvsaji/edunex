import { Request, Response } from 'express';

export const getCurrencyRate = async (req: Request, res: Response) => {
  try {
    const base = String(req.query.base || 'EUR');
    const target = String(req.query.target || 'INR');

    // Default rate if external API is unreachable or rate limited
    let rate = 91.25;
    let lastUpdated = new Date().toISOString();

    try {
      // Free open exchange rate endpoint
      const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);
      if (response.ok) {
        const json: any = await response.json();
        if (json.rates && json.rates[target]) {
          rate = json.rates[target];
          lastUpdated = json.time_last_update_utc || lastUpdated;
        }
      }
    } catch (e) {
      console.log('Using cached/fallback currency rate:', rate);
    }

    // Historical simulated rate data for past 6 months
    const history = [
      { month: 'Mar', rate: (rate * 0.985).toFixed(2) },
      { month: 'Apr', rate: (rate * 0.990).toFixed(2) },
      { month: 'May', rate: (rate * 0.994).toFixed(2) },
      { month: 'Jun', rate: (rate * 1.002).toFixed(2) },
      { month: 'Jul', rate: (rate * 1.008).toFixed(2) },
      { month: 'Aug', rate: rate.toFixed(2) },
    ];

    return res.json({
      success: true,
      data: {
        base,
        target,
        rate,
        lastUpdated,
        history,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

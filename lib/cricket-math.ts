/**
 * CreaseGrid Domain Cricket Mathematics Engine
 * Strictly follows ICC / MCC Laws of Cricket and CreaseGrid PRD specifications.
 * All overs calculations use INTEGER legal balls to avoid floating-point inaccuracies.
 */

export interface CalcResult {
  answer: string;
  unit: string;
  detail: string;
  error?: string;
}

/**
 * Validates cricket over notation and returns exact count of legal deliveries.
 * e.g., '17.4' -> 106 balls.
 * '17.6' throws an Error (17.6 is invalid; 18.0 is 18 overs completed).
 */
export function ballsFromOvers(value: string | number): number {
  const s = String(value ?? '').trim();
  if (!s) {
    throw new Error('Please enter an overs value.');
  }

  // Allow integer overs (e.g. "20") or valid cricket notation "20.0" through "20.5"
  if (!/^\d+(?:\.[0-5])?$/.test(s)) {
    if (/^\d+\.6$/.test(s)) {
      throw new Error(`Invalid overs notation "${s}". In cricket, 6 balls make an over, so use the next whole over.`);
    }
    throw new Error(`Invalid overs notation "${s}". Enter valid cricket overs, e.g. 17.4 (0-5 balls).`);
  }

  const [oversStr, ballsStr = '0'] = s.split('.');
  const overs = parseInt(oversStr, 10);
  const balls = parseInt(ballsStr, 10);

  if (balls >= 6) {
    throw new Error('Overs decimal must be between 0 and 5.');
  }

  return overs * 6 + balls;
}

/**
 * Converts integer legal deliveries back to standard cricket overs notation.
 * e.g., 106 -> '17.4'
 */
export function oversFromBalls(balls: number): string {
  if (!Number.isFinite(balls) || balls < 0) return '0.0';
  const completedOvers = Math.floor(balls / 6);
  const remainderBalls = balls % 6;
  return `${completedOvers}.${remainderBalls}`;
}

export function formatTwoDecimals(val: number): string {
  if (!Number.isFinite(val)) return '0.00';
  return val.toFixed(2);
}

export function formatSigned(val: number, digits = 3): string {
  if (!Number.isFinite(val)) return '0.000';
  return (val > 0 ? '+' : '') + val.toFixed(digits);
}

export function parseNonNegativeNumber(val: string | number, fieldName: string): number {
  const s = String(val ?? '').trim();
  if (s === '') {
    throw new Error(`Enter ${fieldName}.`);
  }
  const n = Number(s);
  if (!Number.isFinite(n) || n < 0) {
    throw new Error(`${fieldName} must be a non-negative number.`);
  }
  return n;
}

export function parsePositiveNumber(val: string | number, fieldName: string): number {
  const n = parseNonNegativeNumber(val, fieldName);
  if (n <= 0) {
    throw new Error(`${fieldName} must be greater than zero.`);
  }
  return n;
}

/**
 * Calculate Run Rate
 */
export function calculateRunRate(runsInput: string | number, oversInput: string | number): CalcResult {
  const runs = parseNonNegativeNumber(runsInput, 'Runs');
  const balls = ballsFromOvers(oversInput);
  if (balls === 0) {
    throw new Error('Overs must be greater than 0.');
  }
  const rate = (runs * 6) / balls;
  return {
    answer: formatTwoDecimals(rate),
    unit: 'runs per over',
    detail: `${runs} runs in ${oversFromBalls(balls)} overs (${balls} legal balls) gives ${formatTwoDecimals(rate)} runs per 6-ball over.`,
  };
}

/**
 * Calculate Required Run Rate
 */
export function calculateRequiredRunRate(
  targetInput: string | number,
  runsInput: string | number,
  oversCompletedInput: string | number,
  totalOversInput: string | number
): CalcResult {
  const target = parsePositiveNumber(targetInput, 'Target');
  const runs = parseNonNegativeNumber(runsInput, 'Current runs');
  const ballsCompleted = ballsFromOvers(oversCompletedInput);
  const totalBalls = ballsFromOvers(totalOversInput);

  if (totalBalls <= 0) {
    throw new Error('Total overs must be greater than zero.');
  }
  if (ballsCompleted > totalBalls) {
    throw new Error('Overs completed cannot exceed total scheduled overs.');
  }

  const remainingBalls = totalBalls - ballsCompleted;
  const needed = Math.max(0, target - runs);

  if (needed === 0) {
    return {
      answer: '0.00',
      unit: 'Target already achieved',
      detail: 'The batting side has reached or exceeded the winning target.',
    };
  }

  if (remainingBalls === 0) {
    return {
      answer: 'Chase concluded',
      unit: `${needed} runs short`,
      detail: `All scheduled deliveries have been bowled. The batting side fell ${needed} runs short.`,
    };
  }

  const requiredRate = (needed * 6) / remainingBalls;
  return {
    answer: formatTwoDecimals(requiredRate),
    unit: 'runs per over required',
    detail: `Need ${needed} runs from ${remainingBalls} balls (${oversFromBalls(remainingBalls)} overs). Required rate is ${formatTwoDecimals(requiredRate)} per over.`,
  };
}

/**
 * Calculate Net Run Rate (NRR)
 */
export function calculateNetRunRate(
  scoredRunsInput: string | number,
  facedOversInput: string | number,
  concededRunsInput: string | number,
  bowledOversInput: string | number
): CalcResult {
  const scored = parseNonNegativeNumber(scoredRunsInput, 'Scored runs');
  const facedBalls = ballsFromOvers(facedOversInput);
  const conceded = parseNonNegativeNumber(concededRunsInput, 'Conceded runs');
  const bowledBalls = ballsFromOvers(bowledOversInput);

  if (facedBalls === 0 || bowledBalls === 0) {
    throw new Error('Effective overs faced and bowled must be greater than zero.');
  }

  const forRate = (scored * 6) / facedBalls;
  const againstRate = (conceded * 6) / bowledBalls;
  const netRate = forRate - againstRate;

  return {
    answer: formatSigned(netRate, 3),
    unit: 'Net Run Rate',
    detail: `For: ${scored}/${oversFromBalls(facedBalls)} (${formatTwoDecimals(forRate)} RPO) — Against: ${conceded}/${oversFromBalls(bowledBalls)} (${formatTwoDecimals(againstRate)} RPO) = NRR ${formatSigned(netRate, 3)}.`,
  };
}

/**
 * Batting Average
 */
export function calculateBattingAverage(
  runsInput: string | number,
  inningsInput: string | number,
  notOutsInput: string | number
): CalcResult {
  const runs = parseNonNegativeNumber(runsInput, 'Total runs');
  const innings = parseNonNegativeNumber(inningsInput, 'Innings');
  const notOuts = parseNonNegativeNumber(notOutsInput, 'Not outs');

  if (notOuts > innings) {
    throw new Error('Not-out innings cannot exceed total innings batted.');
  }

  const dismissals = innings - notOuts;
  if (dismissals === 0) {
    return {
      answer: 'N/A',
      unit: 'Undefined (no dismissals)',
      detail: `${runs} runs scored with 0 dismissals. Batting average is undefined without a dismissal.`,
    };
  }

  const avg = runs / dismissals;
  return {
    answer: formatTwoDecimals(avg),
    unit: 'runs per dismissal',
    detail: `${runs} runs scored over ${dismissals} dismissal${dismissals === 1 ? '' : 's'} (${innings} innings with ${notOuts} not-outs).`,
  };
}

/**
 * Batting Strike Rate
 */
export function calculateBattingStrikeRate(runsInput: string | number, ballsInput: string | number): CalcResult {
  const runs = parseNonNegativeNumber(runsInput, 'Runs scored');
  const balls = parsePositiveNumber(ballsInput, 'Balls faced');
  const sr = (runs * 100) / balls;
  return {
    answer: formatTwoDecimals(sr),
    unit: 'runs per 100 balls',
    detail: `${runs} runs from ${balls} balls faced gives a strike rate of ${formatTwoDecimals(sr)}.`,
  };
}

/**
 * Bowling Average
 */
export function calculateBowlingAverage(concededInput: string | number, wicketsInput: string | number): CalcResult {
  const conceded = parseNonNegativeNumber(concededInput, 'Runs conceded');
  const wickets = parseNonNegativeNumber(wicketsInput, 'Wickets credited');

  if (wickets === 0) {
    return {
      answer: 'N/A',
      unit: 'Undefined (0 wickets)',
      detail: 'Bowling average is undefined when no wickets have been taken.',
    };
  }

  const avg = conceded / wickets;
  return {
    answer: formatTwoDecimals(avg),
    unit: 'runs per wicket',
    detail: `${conceded} runs conceded for ${wickets} wicket${wickets === 1 ? '' : 's'} = ${formatTwoDecimals(avg)}.`,
  };
}

/**
 * Bowling Economy
 */
export function calculateBowlingEconomy(concededInput: string | number, oversInput: string | number): CalcResult {
  const conceded = parseNonNegativeNumber(concededInput, 'Runs conceded');
  const balls = ballsFromOvers(oversInput);
  if (balls === 0) {
    throw new Error('Overs bowled must be greater than zero.');
  }
  const econ = (conceded * 6) / balls;
  return {
    answer: formatTwoDecimals(econ),
    unit: 'runs per 6-ball over',
    detail: `${conceded} runs conceded across ${oversFromBalls(balls)} overs (${balls} legal deliveries).`,
  };
}

/**
 * Bowling Strike Rate
 */
export function calculateBowlingStrikeRate(ballsInput: string | number, wicketsInput: string | number): CalcResult {
  const balls = parsePositiveNumber(ballsInput, 'Legal deliveries bowled');
  const wickets = parseNonNegativeNumber(wicketsInput, 'Wickets credited');

  if (wickets === 0) {
    return {
      answer: 'N/A',
      unit: 'Undefined (0 wickets)',
      detail: 'Bowling strike rate is undefined with 0 wickets.',
    };
  }

  const sr = balls / wickets;
  return {
    answer: formatTwoDecimals(sr),
    unit: 'balls per wicket',
    detail: `Bowler strikes once every ${formatTwoDecimals(sr)} legal deliveries.`,
  };
}

/**
 * Overs to Balls converter
 */
export function calculateOversToBalls(oversInput: string | number): CalcResult {
  const balls = ballsFromOvers(oversInput);
  const completed = Math.floor(balls / 6);
  const rem = balls % 6;
  return {
    answer: String(balls),
    unit: 'legal deliveries',
    detail: `${oversInput} overs = ${completed} completed over${completed === 1 ? '' : 's'} and ${rem} ball${rem === 1 ? '' : 's'} (${balls} legal deliveries).`,
  };
}

/**
 * Target & Chase
 */
export function calculateTargetAndChase(opponentRunsInput: string | number, currentRunsInput: string | number): CalcResult {
  const opponent = parseNonNegativeNumber(opponentRunsInput, 'Opponent score');
  const current = parseNonNegativeNumber(currentRunsInput, 'Current runs');
  const winningTarget = opponent + 1;
  const needed = Math.max(0, winningTarget - current);

  return {
    answer: String(winningTarget),
    unit: 'target to win',
    detail: `Opponent scored ${opponent}. Winning target is ${winningTarget} runs. Currently at ${current}, requiring ${needed} more run${needed === 1 ? '' : 's'} to win.`,
  };
}

/**
 * Projected Innings Score
 */
export function calculateProjectedScore(
  currentRunsInput: string | number,
  oversFacedInput: string | number,
  totalOversLimitInput: string | number
): CalcResult {
  const currentRuns = parseNonNegativeNumber(currentRunsInput, 'Current runs');
  const facedBalls = ballsFromOvers(oversFacedInput);
  const totalBalls = ballsFromOvers(totalOversLimitInput);

  if (facedBalls === 0) {
    throw new Error('Overs faced must be greater than zero.');
  }
  if (totalBalls < facedBalls) {
    throw new Error('Total scheduled overs cannot be less than overs faced.');
  }

  const currentRate = (currentRuns * 6) / facedBalls;
  const remainingBalls = totalBalls - facedBalls;
  const projectedTotal = Math.round(currentRuns + (currentRate * remainingBalls) / 6);

  return {
    answer: String(projectedTotal),
    unit: 'projected runs',
    detail: `At current rate of ${formatTwoDecimals(currentRate)} RPO, projected total after ${oversFromBalls(totalBalls)} overs is ${projectedTotal} runs.`,
  };
}

/**
 * Partnership Calculator
 */
export function calculatePartnership(
  batterAInput: string | number,
  batterBInput: string | number,
  extrasInput: string | number
): CalcResult {
  const a = parseNonNegativeNumber(batterAInput, 'Batter A runs');
  const b = parseNonNegativeNumber(batterBInput, 'Batter B runs');
  const extras = parseNonNegativeNumber(extrasInput, 'Partnership extras');
  const total = a + b + extras;

  return {
    answer: String(total),
    unit: 'partnership runs',
    detail: `Batter A (${a}) + Batter B (${b}) + Extras (${extras}) = ${total} runs total stand.`,
  };
}


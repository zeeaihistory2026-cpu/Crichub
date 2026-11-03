// Unit verification for CreaseGrid Cricket Math Engine
import assert from 'node:assert';
import {
  ballsFromOvers,
  oversFromBalls,
  calculateRunRate,
  calculateRequiredRunRate,
  calculateNetRunRate,
  calculateBattingAverage,
  calculateBattingStrikeRate,
  calculateBowlingAverage,
  calculateBowlingEconomy,
  calculateOversToBalls,
  calculateTargetAndChase,
  calculateProjectedScore,
  calculatePartnership,
} from '../lib/cricket-math.ts';

console.log('--- Running CreaseGrid Cricket Math Tests ---');

// 1. Overs conversion
assert.strictEqual(ballsFromOvers('17.4'), 106, '17.4 overs should be 106 balls');
assert.strictEqual(ballsFromOvers('20.0'), 120, '20.0 overs should be 120 balls');
assert.strictEqual(ballsFromOvers('0.5'), 5, '0.5 overs should be 5 balls');
assert.strictEqual(oversFromBalls(106), '17.4', '106 balls should convert to 17.4');

// 2. Reject 17.6
assert.throws(() => ballsFromOvers('17.6'), /Invalid overs notation/, '17.6 should throw invalid overs error');

// 3. Run Rate
const rr = calculateRunRate(145, '18.0');
assert.strictEqual(rr.answer, '8.06', '145 runs in 18 overs should be 8.06 RPO');

// 4. Required Run Rate
const rrr = calculateRequiredRunRate(177, 142, '16.2', '20.0');
assert.strictEqual(rrr.answer, '9.55', '35 needed off 22 balls should be 9.55 RPO');

// 5. Batting Average with 0 dismissals
const ba0 = calculateBattingAverage(150, 3, 3);
assert.strictEqual(ba0.answer, 'N/A', 'Batting average with 0 dismissals must return N/A');
const baValid = calculateBattingAverage(1230, 35, 4);
assert.strictEqual(baValid.answer, '39.68', '1230 runs / 31 dismissals should be 39.68');

// 6. Bowling Average with 0 wickets
const bwa0 = calculateBowlingAverage(44, 0);
assert.strictEqual(bwa0.answer, 'N/A', 'Bowling average with 0 wickets must return N/A');

// 7. Bowling Economy
const econ = calculateBowlingEconomy(38, '4.0');
assert.strictEqual(econ.answer, '9.50', '38 runs in 4 overs should be 9.50 econ');

// 8. Net Run Rate
const nrr = calculateNetRunRate(560, '60.0', 510, '60.0');
assert.strictEqual(nrr.answer, '+0.833', 'NRR should be +0.833');

// 9. Target & Chase
const tc = calculateTargetAndChase(176, 142);
assert.strictEqual(tc.answer, '177', 'Target should be 177');

// 10. Partnership
const part = calculatePartnership(55, 42, 5);
assert.strictEqual(part.answer, '102', 'Partnership should sum to 102');

console.log('✅ ALL 10 CRICKET MATH TEST VECTORS PASSED PERFECTLY!');


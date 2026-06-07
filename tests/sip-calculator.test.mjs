import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../src/components/sip-calculator.ts', import.meta.url), 'utf8');
const testableSource = source.replace(
  "import { InvestmentTypes } from '@/constants';",
  `const InvestmentTypes = {
    SIP: 'sip',
    LUMPSUM: 'lumpsum',
    STEPUP: 'stepup',
    YEARLY: 'yearly',
    SWP: 'swp',
    OTHER: 'other'
  };`
);

const transpiled = ts.transpileModule(testableSource, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022
  }
}).outputText;

const calculator = await import(`data:text/javascript,${encodeURIComponent(transpiled)}`);

const round = Math.round;
const effectiveMonthlyRate = (annualReturn) => Math.pow(1 + annualReturn / 100, 1 / 12) - 1;
const expectNear = (actual, expected, tolerance = 1) =>
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `expected ${actual} to be within ${tolerance} of ${expected}`
  );

const independentSip = (monthlyInvestment, years, annualReturn) => {
  const months = years * 12;
  const rate = effectiveMonthlyRate(annualReturn);
  if (rate === 0) return monthlyInvestment * months;
  return monthlyInvestment * (((1 + rate) ** months - 1) / rate) * (1 + rate);
};

const independentStepUpSip = (monthlyInvestment, years, annualStepUp, annualReturn) => {
  const monthlyRate = effectiveMonthlyRate(annualReturn);
  let totalReturn = 0;

  for (let year = 0; year < years; year += 1) {
    const monthlyAmount = monthlyInvestment * Math.pow(1 + annualStepUp / 100, year);
    for (let month = 0; month < 12; month += 1) {
      totalReturn +=
        monthlyRate === 0
          ? monthlyAmount
          : monthlyAmount * Math.pow(1 + monthlyRate, (years - year) * 12 - month);
    }
  }

  return totalReturn;
};

{
  const result = calculator.calculateSIP(1, 1000, 12);
  expectNear(result.totalInvestment, 12000, 0);
  expectNear(result.totalReturn, round(independentSip(1000, 1, 12)), 0);
  expectNear(result.totalReturn, 12766, 1);
}

{
  const result = calculator.calculateLump(5, 1500000, 12);
  expectNear(result.totalReturn, round(1500000 * Math.pow(1.12, 5)), 0);
  expectNear(result.totalReturn, 2643513, 1);
}

{
  const result = calculator.calculateStepUpSIP(10, 10000, 10, 12);
  const expectedInvestment = Array.from({ length: 10 }, (_, year) => 10000 * 12 * 1.1 ** year)
    .reduce((sum, value) => sum + value, 0);
  expectNear(result.totalInvestment, round(expectedInvestment), 0);
  expectNear(result.totalReturn, round(independentStepUpSip(10000, 10, 10, 12)), 0);
}

{
  const result = calculator.calculateYearlySIP(100000, 12, 10);
  const expected = 100000 * (((1.12 ** 10 - 1) / 0.12) * 1.12);
  expectNear(result.totalInvestment, 1000000, 0);
  expectNear(result.totalReturn, round(expected), 0);
}

{
  const accumulation = calculator.calculateStepUpSIP(10, 25000, 10, 12).totalReturn;
  const result = calculator.calculateSWP(25000, 12, 10, 6, 30, 10, 10);
  let expectedFinalValue = accumulation;
  let expectedWithdrawals = 0;
  for (let year = 0; year < 30; year += 1) {
    const withdrawal = expectedFinalValue * 0.06;
    expectedWithdrawals += withdrawal;
    expectedFinalValue = (expectedFinalValue - withdrawal) * 1.1;
  }
  expectNear(result.totalWithdrawals, expectedWithdrawals, 1);
  expectNear(result.finalValue, expectedFinalValue, 1);
}

{
  expectNear(calculator.calculateInflationAdjustedValue(1000000, 6, 10), 558395, 0);
  assert.equal(calculator.calculateInflationAdjustedValue(100000, 10, 10) - 100000 < 0, true);
  expectNear(calculator.calculateSIP(10, 1000, 0).totalReturn, 120000, 0);
  expectNear(calculator.calculateYearlySIP(100000, 0, 10).totalReturn, 1000000, 0);
}

console.log('sip-calculator tests passed');

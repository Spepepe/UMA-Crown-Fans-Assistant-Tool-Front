import React, { useState } from 'react';
import { FactorResult } from './factorResult';
import { FactorSelect } from './factorSelect';
import { Umamusume, FactorCalculationParams } from '../../interface/interface';
import { useFactorCalculator } from '../../../services/util/useFactorCalculator';

//ウマ娘親因子計算機コンポーネント
export const FactorCalculator: React.FC = () => {
  const [step, setStep] = useState<boolean>(false);

  const [factorData, setFactorData] = useState<any>(null);

  const [parentUmamusume, setParentUmamusume] = useState<Umamusume>();

  const [grandparentUmamusume, setGrandparentUmamusume] = useState<Umamusume>();

  const [grandmotherUmamusume, setGrandmotherUmamusume] = useState<Umamusume>();
  const [distanceId, setDistanceId] = useState<number>(1);

  const [surfaceId, setSurfaceId] = useState<number>(1);

  const [styleId, setStyleId] = useState<number>(1);

  const { handleCalculationComplete: hookHandleCalculationComplete } = useFactorCalculator();

  const handleCalculationComplete = async (params: FactorCalculationParams): Promise<void> => {
    setParentUmamusume(params.parentUmamusume);
    setGrandparentUmamusume(params.grandparentUmamusume);
    setGrandmotherUmamusume(params.grandmotherUmamusume);
    setDistanceId(params.distanceId);
    setSurfaceId(params.surfaceId);
    setStyleId(params.styleId);
    
    try {
      const data = await hookHandleCalculationComplete(params);
      setFactorData(data);
      setStep(true);
    } catch (error) {
      console.error('Factor calculation failed:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-800">ウマ娘親因子計算</h1>
      {step ? 
        <FactorResult factorData={factorData} distanceId={distanceId} surfaceId={surfaceId} styleId={styleId} parentUmamusume={parentUmamusume} grandparentUmamusume={grandparentUmamusume} grandmotherUmamusume={grandmotherUmamusume} /> : 
        <FactorSelect onStep={handleCalculationComplete} />
      }
    </div>
  );
};
import { useState, useEffect } from 'react';
import React from 'react';
import { FactorResult } from './factorResult';
import { FactorSelect } from './factorSelect';
import { Umamusume , FactorCalculationParams } from '../../interface/interface';

//ウマ娘親因子計算機コンポーネント
export const FactorCalculator: React.FC = () => {
  const [step, setStep] = useState(false);
  const [factorData, setFactorData] = useState(null);

  const [parentUmamusume, setParentUmamusume] = useState<Umamusume>();
  const [grandparentUmamusume, setGrandparentUmamusume] = useState<Umamusume>();
  const [grandmotherUmamusume, setGrandmotherUmamusume] = useState<Umamusume>();

  const [distanceId, setDistanceId] = useState<number>(1);
  const [surfaceId, setSurfaceId] = useState<number>(1);
  const [styleId, setStyleId] = useState<number>(1);
  const handleCalculationComplete = (params : FactorCalculationParams) => {
    setParentUmamusume(params.parentUmamusume);
    setGrandparentUmamusume(params.grandparentUmamusume);
    setGrandmotherUmamusume(params.grandmotherUmamusume);
    setDistanceId(params.distanceId);
    setSurfaceId(params.surfaceId);
    setStyleId(params.styleId);
    getFactorData(params);
    setStep(true);
  }

  const getFactorData = async (params : FactorCalculationParams) => {
    try {
      const queryParams = new URLSearchParams({
        distance_id: params.distanceId.toString(),
        surface_id: params.surfaceId.toString(),
        style_id: params.styleId.toString(),
        parent_umamusume_id: params.parentUmamusumeId.toString(),
        grandparent_umamusume_id: params.grandparentUmamusumeId.toString(),
        grandmother_umamusume_id: params.grandmotherUmamusumeId.toString()
      });

      const response = await fetch(`/api/factor/calculate?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched factor data:', data);
      
      // 取得したデータをstateに保存
      setFactorData(data);
      
      return data;
    } catch (error) {
      console.error('Error fetching factor data:', error);
      throw error;
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
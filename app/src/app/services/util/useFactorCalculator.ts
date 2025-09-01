import { useState } from 'react';
import { Umamusume, FactorCalculationParams, factorApi } from 'src';

/** 因子計算用カスタムフック
 * @return 因子計算関連の状態と関数
 */
export const useFactorCalculator = () => {
  const [step, setStep] = useState<boolean>(false);
  const [factorData, setFactorData] = useState<any>(null);
  const [parentUmamusume, setParentUmamusume] = useState<Umamusume>();
  const [grandparentUmamusume, setGrandparentUmamusume] = useState<Umamusume>();
  const [grandmotherUmamusume, setGrandmotherUmamusume] = useState<Umamusume>();
  const [distanceId, setDistanceId] = useState<number>(1);
  const [surfaceId, setSurfaceId] = useState<number>(1);
  const [styleId, setStyleId] = useState<number>(1);

  /** 計算完了処理
   * @param params 因子計算パラメータ
   * @return any 因子データ
   */
  const handleCalculationComplete = async (params: FactorCalculationParams): Promise<any> => {
    setParentUmamusume(params.parentUmamusume);
    setGrandparentUmamusume(params.grandparentUmamusume);
    setGrandmotherUmamusume(params.grandmotherUmamusume);
    setDistanceId(params.distanceId);
    setSurfaceId(params.surfaceId);
    setStyleId(params.styleId);
    const data = await getFactorData(params);
    setStep(true);
    return data;
  };

  /** 因子データ取得
   * @param params 因子計算パラメータ
   * @return any 因子データ
   */
  const getFactorData = async (params: FactorCalculationParams): Promise<any> => {
    try {
      const data = await factorApi.calculateFactor(
        params.distanceId,
        params.surfaceId,
        params.styleId,
        params.parentUmamusumeId,
        params.grandparentUmamusumeId,
        params.grandmotherUmamusumeId
      );
      setFactorData(data);
      return data;
    } catch (error) {
      console.error('Error fetching factor data:', error);
      throw error;
    }
  };

  return {
    step,
    factorData,
    parentUmamusume,
    grandparentUmamusume,
    grandmotherUmamusume,
    distanceId,
    surfaceId,
    styleId,
    handleCalculationComplete
  };
};
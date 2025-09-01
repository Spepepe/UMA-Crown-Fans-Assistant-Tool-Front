import { useState, useEffect } from 'react';
import { RegistUmamusume } from 'src';
import { characterApi } from '../api/characterApi';

// キャラクターリスト用カスタムフック
// @param token 認証トークン
// @return キャラクターリスト関連の状態と関数
export const useCharacterList = (token: string) => {
  const [registUmamusumes, setRegistUmamusume] = useState<RegistUmamusume[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectUmamusume, SetSelectUmamusume] = useState<RegistUmamusume | undefined>(undefined);
  const [fanCount, setFanCount] = useState<number>(0);
  const [fanDisplay, isFanDisplay] = useState<boolean>(false);
  const [fanCalculationDisplay, isFanCalculationDisplay] = useState<boolean>(false);

  // ウマ娘情報取得
  // @return void
  const fetchUmamusumes = async (): Promise<void> => {
    try {
      const data = await characterApi.getUserRegisteredCharacters(token);
      setRegistUmamusume(data);
    } catch (error) {
      console.error("Failed to fetch races:", error);
    } finally {
      setLoading(false);
    }
  };

  // ファン数更新
  // @return void
  const fetchFanUp = async (): Promise<void> => {
    try {
      if (selectUmamusume) {
        await characterApi.updateFanCount(token, selectUmamusume.umamusume.umamusume_id, fanCount);
        fetchUmamusumes();
      }
    } catch (error) {
      console.error("Failed to fetch races:", error);
    } finally {
      setLoading(false);
    }
  };

  // ファン数変動画面表示
  // @param registUmamusume 選択されたウマ娘
  // @return void
  const handleFansUp = (registUmamusume: RegistUmamusume): void => {
    SetSelectUmamusume(registUmamusume);
    isFanDisplay(true);
  };

  // ファン数設定
  // @param fan ファン数
  // @return void
  const countUp = (fan: number): void => {
    setFanCount(fan);
  };

  // ファン数追加と画面クローズ
  // @return void
  const addFan = (): void => {
    fetchFanUp();
    isFanDisplay(false);
  };

  // ファン数変動画面を閉じる
  // @return void
  const onReturn = (): void => {
    isFanDisplay(false);
  };

  // ファン計算画面表示
  // @return void
  const FanCalculation = (): void => {
    isFanCalculationDisplay(true);
  };

  useEffect(() => {
    fetchUmamusumes();
  }, []);

  return {
    registUmamusumes,
    loading,
    selectUmamusume,
    fanDisplay,
    fanCalculationDisplay,
    handleFansUp,
    countUp,
    addFan,
    onReturn,
    FanCalculation
  };
};
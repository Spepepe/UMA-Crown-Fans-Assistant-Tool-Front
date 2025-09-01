import { characterRegistService, characterLogic } from 'src';

interface UseCharacterRegistProps {
  races: any[];
  setRaces: (races: any[]) => void;
  umamusumes: any[];
  setUmamusumes: (umamusumes: any[]) => void;
  selectedUmamusume: any;
  setSelectedUmamusume: (umamusume: any) => void;
  registRace: number[];
  setregistRace: (races: number[]) => void;
  fans: number;
  setFans: (fans: number) => void;
}

export const useCharacterRegist = (token: string | null, state: UseCharacterRegistProps) => {
  const {
    races, setRaces,
    umamusumes, setUmamusumes,
    selectedUmamusume, setSelectedUmamusume,
    registRace, setregistRace,
    fans, setFans
  } = state;

  /** ウマ娘情報取得
   * @return void
   */
  const fetchUmamusumes = async (): Promise<void> => {
    if (!token) {
      console.error('トークンが見つかりません');
      return;
    }
    const data = await characterRegistService.fetchUmamusumes(token);
    setUmamusumes(data);
  };

  /** レース情報取得
   * @return void
   */
  const fetchRaces = async (): Promise<void> => {
    if (!token) {
      console.error('トークンが見つかりません');
      return;
    }
    const data = await characterRegistService.fetchRaces(token);
    setRaces(data);
  };
  
  /** ウマ娘選択変更
   * @param e セレクトボックスイベント
   * @return void
   */
  const handleUmamusumeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedId = parseInt(e.target.value);
    const selected = umamusumes.find((umamusume: any) => umamusume.umamusume_id === selectedId);
    if (selected) {
      setSelectedUmamusume(selected);
    }
  };

  /** ウマ娘登録処理
   * @return void
   */
  const umamusumeRegist = async (): Promise<void> => {
    try {
      if (!token || !selectedUmamusume) {
        alert('トークンまたはウマ娘が選択されていません');
        return;
      }
      await characterRegistService.registerCharacter(token, selectedUmamusume.umamusume_id, registRace, fans);
      alert(selectedUmamusume.umamusume_name + "の登録が完了しました！");
      fetchUmamusumes();
      fetchRaces();
      setregistRace([]);
      setFans(0);
    } catch (error) {
      console.error("Registration failed:", error);
      alert('登録に失敗しました。エラー: ' + error);
    }
  };

  /** チェックボックス変更処理
   * @param raceId レースID
   * @param checked チェック状態
   * @return void
   */
  const handleCheckboxChange = (raceId: number, checked: boolean): void => {
    const { updatedRaces, updatedRegistRace } = characterLogic.handleRaceCheckboxChange(
      races, registRace, raceId, checked
    );
    setRaces(updatedRaces);
    setregistRace(updatedRegistRace);
  };

  /** 全選択処理
   * @return void
   */
  const handleSelectAll = (): void => {
    const { updatedRaces, allRaceIds } = characterLogic.selectAllRaces(races);
    setRaces(updatedRaces);
    setregistRace(allRaceIds);
  };

  /** ファン数変更処理
   * @param e 入力フィールドイベント
   * @return void
   */
  const handleFansChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setFans(value);
    }
  };

  return {
    fetchUmamusumes,
    fetchRaces,
    handleUmamusumeChange,
    umamusumeRegist,
    handleCheckboxChange,
    handleSelectAll,
    handleFansChange
  };
};
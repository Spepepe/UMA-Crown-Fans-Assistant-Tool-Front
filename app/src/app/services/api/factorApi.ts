// 因子計算関連のAPI呼び出し
export const factorApi = {
  /** 因子計算データ取得
   * @param distanceId 距離ID
   * @param surfaceId 馬場ID
   * @param styleId スタイルID
   * @param parentUmamusumeId 親ウマ娘ID
   * @param grandparentUmamusumeId 祖父ウマ娘ID
   * @param grandmotherUmamusumeId 祖母ウマ娘ID
   * @return any 因子計算結果
   */
  calculateFactor: async (
    distanceId: number,
    surfaceId: number,
    styleId: number,
    parentUmamusumeId: number,
    grandparentUmamusumeId: number,
    grandmotherUmamusumeId: number
  ): Promise<any> => {
    const queryParams = new URLSearchParams({
      distance_id: distanceId.toString(),
      surface_id: surfaceId.toString(),
      style_id: styleId.toString(),
      parent_umamusume_id: parentUmamusumeId.toString(),
      grandparent_umamusume_id: grandparentUmamusumeId.toString(),
      grandmother_umamusume_id: grandmotherUmamusumeId.toString()
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

    return await response.json();
  }
};
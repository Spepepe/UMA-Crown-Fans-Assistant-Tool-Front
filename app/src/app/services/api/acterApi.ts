// アクター関連のAPI呼び出し
export const acterApi = {
  /** アクター情報取得
   * @return any[] アクター情報
   */
  fetchActers: async (): Promise<any[]> => {
    const response = await fetch("/api/acter/list");
    const responseJson = await response.json();
    return responseJson.data || [];
  }
};
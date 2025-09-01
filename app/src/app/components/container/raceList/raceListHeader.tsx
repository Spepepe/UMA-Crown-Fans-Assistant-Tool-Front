import { Header } from "../../common/header";

//ヘッダーに表示する情報を定義する
const raceListHeaderItem = [
    {display:'レース名', width: 'w-1/3'},
    {display:'クラス', width: 'w-16'},
    {display:'馬場', width: 'w-16'},
    {display:'距離', width: 'w-20'},
    {display:'獲得ファン数最小値', width: 'w-24'},
    {display:'獲得ファン数最大値', width: 'w-24'},
    {display:'出走時期', width: 'w-20'},
    {display:'月', width: 'w-12'}
  ];

//レース情報表示画面のヘッダー情報
export const RaceListHeader = () => {
    return (
        <Header ItemArray={raceListHeaderItem} />
    );
};

import { Header } from "../../common/header";

//ヘッダーに表示する情報を定義する
const remainingRaceListHeaderItem = [
    {display:'出走', width: 'w-20'},
    {display:'パターン', width: 'w-20'},
    {display:'ウマ娘', width: 'w-24'},
    {display:'育成数', width: 'w-16'},
    {display:'総数', width: 'w-16'},
    {display:'短距離', width: 'w-16'},
    {display:'マイル', width: 'w-16'},
    {display:'中距離', width: 'w-16'},
    {display:'長距離', width: 'w-16'},
    {display:'短距離', width: 'w-16'},
    {display:'マイル', width: 'w-16'},
    {display:'中距離', width: 'w-16'}
  ];

//残レース情報表示画面のヘッダー情報
export const RemainingRaceListHeader = () => {
    return (
        <Header ItemArray={remainingRaceListHeaderItem} />
    );
};

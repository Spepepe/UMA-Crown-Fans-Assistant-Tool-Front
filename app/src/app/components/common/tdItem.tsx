import React from "react";
import { TdItemProps } from "../interface/props";

//テーブル内のカラムの要素を構成するコンポーネント
export const TdItem: React.FC<TdItemProps> = ({ content }) => {
    return (
        <td className="border border-gray-500 px-1 py-0.5 text-center text-black font-semibold" style={{ fontSize: 'clamp(1.2rem, 2vw, 0.3rem)' , whiteSpace: 'nowrap'}}>
            <div className="flex flex-wrap justify-center items-center">
                {content}
            </div>
        </td>
    );
};

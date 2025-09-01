import { useState, useRef } from 'react';
import React from 'react';
import { JewelControllerProps } from '../../interface/props';
import { JewelControllerCalendar, JewelControllerCalendarHandle } from './jewelControllerCalendar';
import { jewelService } from 'src';

//ジュエル情報管理画面
export const JewelController : React.FC<JewelControllerProps> = ({token}) => {

      const calendarRef = useRef<JewelControllerCalendarHandle>(null);

      //選択年（現在の年を初期値として設定）
      const [year, setYear] = useState<number>(() => jewelService.getCurrentDate().year);
      
      //選択月（現在の月を初期値として設定）
      const [month, setMonth] = useState<number>(() => jewelService.getCurrentDate().month);

      //ジュエル数
      const [dayJewel, setDayJewel] = useState<number>(0);
    
      //年変更イベント
      const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setYear(Number(e.target.value));
      };

      //月変更イベント
      const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setMonth(Number(e.target.value));
      };

      //本日分登録用入力処理
      const handleJewelChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
          setDayJewel(value);
        }
      }

      const handleFetch = (): void => {
        calendarRef.current?.fetchJewelData();
      };

      //ジュエル登録処理
      const jewelRegist = async (): Promise<void> => {
        try {
          if (!token) {
              console.error('トークンが見つかりません');
              return;
          }
          await jewelService.registerJewel(token, dayJewel);
          setDayJewel(0);
          handleFetch();
        } catch (error) {
            alert('登録できませんでした');
        }
      }

      // 現在日時に戻すボタンの処理
      const resetToCurrentDate = (): void => {
        const current = jewelService.getCurrentDate();
        setYear(current.year);
        setMonth(current.month);
      };
      
      //API取得中の状態を表示する判定
      const [loading,setLoading] = useState(false);
  
      if (loading) {
          return <div className="min-h-full flex justify-center bg-Looding bg-cover"></div>
      }

      return (
        <div className="p-8 flex flex-col items-center">
          {/* 年月セレクトを中央に配置 */}
          <div className="flex gap-2 mb-8 justify-center items-center">
            <select value={year} onChange={handleYearChange} className="border p-2 rounded text-lg">
              {jewelService.getYearOptions().map((y) => (
                <option key={y} value={y}>{y}年</option>
              ))}
            </select>
            <select value={month} onChange={handleMonthChange} className="border p-2 rounded text-lg">
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1}月</option>
              ))}
            </select>
            {/* 現在日時に戻すボタン */}
            <button
              onClick={resetToCurrentDate}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm transition-colors duration-200"
              title="現在の年月に戻す"
            >
              今月
            </button>
          </div>

          {/* カレンダー部分 */}
          <JewelControllerCalendar year={year} month={month} token={token} ref={calendarRef}/>

          <div className="mt-6 flex justify-center items-center space-x-4">
            <label htmlFor="fans" className="text-xl text-pink-600 font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
              ジュエル数
            </label>
            <input
              id="fans"
              type="number"
              className="p-2 border rounded-lg shadow-md mr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right"  // text-rightで数字を右寄せ
              value={dayJewel}
              onChange={handleJewelChange}
              placeholder="ジュエル数"
              style={{
                fontFamily: 'Dancing Script, cursive',
                fontSize: '1.2rem',
              }}
            />
            <button
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-gradient-to-l transform hover:scale-105 transition-all duration-300"
              onClick={jewelRegist}
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.2rem',
              }}
              >
              登録
            </button>
          </div>
        </div>
      )
};
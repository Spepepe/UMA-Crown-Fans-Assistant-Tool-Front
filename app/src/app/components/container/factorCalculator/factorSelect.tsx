import { useState, useEffect } from 'react';
import React from 'react';
import Select from 'react-select';
import { Umamusume } from '../../interface/interface';
import { FactorSelectProps } from '../../interface/props';

// 因子選択コンポーネント
export const FactorSelect: React.FC<FactorSelectProps> = ({ onStep }) => {
  const [targetConditions, setTargetConditions] = useState({
    distance: '',
    surface: '',
    style: '',
    parent: '',
    grandparent1: '',
    grandparent2: ''
  });

  const [umamusumeList, setUmamusumeList] = useState<Umamusume[]>([]);

  // ソート処理を削除し、APIから返されたデータをそのまま使用
  const fetchUmamusume = async () => {
    try {
      const res = await fetch("/api/umamusume/list");
      const data = await res.json();
      if (data && data.data) {
        setUmamusumeList(data.data);
      }
    } catch (err) {
      console.error("ウマ娘リスト取得エラー:", err);
    }
  };

  useEffect(() => {
    fetchUmamusume();
  }, []);

  const distanceOptions = [
    { value: 1, label: '短距離' },
    { value: 2, label: 'マイル' },
    { value: 3, label: '中距離' },
    { value: 4, label: '長距離' }
  ];

  const surfaceOptions = [
    { value: 1, label: '芝' },
    { value: 2, label: 'ダート' }
  ];

  const styleOptions = [
    { value: 1, label: '逃げ' },
    { value: 2, label: '先行' },
    { value: 3, label: '差し' },
    { value: 4, label: '追込' }
  ];

  const umamusumeOptions = umamusumeList.map(u => ({
    value: u.umamusume_id,
    label: u.umamusume_name
  }));

  const handleSelectChange = (selectedOption: any, type: string) => {
    setTargetConditions(prev => ({
      ...prev,
      [type]: selectedOption.value.toString()
    }));
  };

  // フィルタリングロジックをカスタマイズ
  const filterOptions = (option: any, inputValue: string) => {
    // ③オートコンプリートを前方一致にする
    return option.label.toLowerCase().startsWith(inputValue.toLowerCase());
  };

  const calculateParentFactors = () => {
    if (!targetConditions.distance || !targetConditions.surface || !targetConditions.style ||
      !targetConditions.parent || !targetConditions.grandparent1 || !targetConditions.grandparent2) {
      alert('すべての項目を選択してください');
      return;
    }

    const params = {
      distanceId: parseInt(targetConditions.distance),
      surfaceId: parseInt(targetConditions.surface),
      styleId: parseInt(targetConditions.style),
      parentUmamusumeId: parseInt(targetConditions.parent),
      grandparentUmamusumeId: parseInt(targetConditions.grandparent1),
      grandmotherUmamusumeId: parseInt(targetConditions.grandparent2),
      parentUmamusume: umamusumeList.find(umamusume => umamusume.umamusume_id === parseInt(targetConditions.parent))!,
      grandparentUmamusume: umamusumeList.find(umamusume => umamusume.umamusume_id === parseInt(targetConditions.grandparent1))!,
      grandmotherUmamusume: umamusumeList.find(umamusume => umamusume.umamusume_id === parseInt(targetConditions.grandparent2))!
    };

    onStep(params);
  };

  return (
    <div className="flex justify-center items-center p-8 w-full">
      <div className="bg-blue-50 p-8 rounded-lg mb-8 w-full max-w-4xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-blue-800 text-center">目標設定</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ①距離・馬場・脚質はオートコンプリートなしの通常のSelect */}
          <div>
            <label className="block text-sm font-medium mb-2">距離</label>
            <select
              value={targetConditions.distance}
              onChange={(e) => setTargetConditions(prev => ({ ...prev, distance: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">選択してください</option>
              {distanceOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">馬場</label>
            <select
              value={targetConditions.surface}
              onChange={(e) => setTargetConditions(prev => ({ ...prev, surface: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">選択してください</option>
              {surfaceOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">脚質</label>
            <select
              value={targetConditions.style}
              onChange={(e) => setTargetConditions(prev => ({ ...prev, style: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">選択してください</option>
              {styleOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* 親・祖父母はオートコンプリート対応のReact Select */}
          <div>
            <label className="block text-sm font-medium mb-2">親ウマ娘</label>
            <Select 
              options={umamusumeOptions} 
              onChange={(e) => handleSelectChange(e, 'parent')}
              placeholder="ウマ娘名を入力..."
              filterOption={filterOptions}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">祖父母Aウマ娘</label>
            <Select 
              options={umamusumeOptions.filter(u => 
                u.value.toString() !== targetConditions.parent && u.value.toString() !== targetConditions.grandparent2
              )} 
              onChange={(e) => handleSelectChange(e, 'grandparent1')}
              placeholder="ウマ娘名を入力..."
              filterOption={filterOptions}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">祖父母Bウマ娘</label>
            <Select 
              options={umamusumeOptions.filter(u => 
                u.value.toString() !== targetConditions.parent && u.value.toString() !== targetConditions.grandparent1
              )} 
              onChange={(e) => handleSelectChange(e, 'grandparent2')}
              placeholder="ウマ娘名を入力..."
              filterOption={filterOptions}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={calculateParentFactors}
            className="mt-8 bg-blue-600 text-white text-lg px-8 py-3 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
          >
            因子構成を計算
          </button>
        </div>
      </div>
    </div>
  );
};
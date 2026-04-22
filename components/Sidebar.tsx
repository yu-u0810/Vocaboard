"use client";
import React from "react";
// ImageIcon アイコンを追加
import { Menu, X, Home, BarChart2, Image as ImageIcon } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  // 画面切り替え用の型定義を追加
  view: 'home' | 'album' | 'analytics';
  setView: (view: 'home' | 'album' | 'analytics') => void;
}

export default function Sidebar({ isOpen, setIsOpen, view, setView }: SidebarProps) {
  // ボタンクリック時の共通処理
  const handleNavClick = (targetView: 'home' | 'album' | 'analytics') => {
    setView(targetView); // 画面を切り替える
    setIsOpen(false);    // サイドバーを閉じる
  };

  return (
    <>
      {/* ハンバーガーボタン */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-3 bg-white rounded-xl shadow-md border border-gray-200 active:scale-90 transition-transform"
        aria-label="メニュー開閉"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* バックドロップ */}
      <div 
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* サイドバー本体 */}
      <aside
        className={`fixed top-0 left-0 z-40 w-72 h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6 pt-24">
          <div className="mb-8 px-2">
            <h2 className="text-xl font-black text-blue-600 tracking-tighter italic">VocaBoard</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Cognitive Analysis</p>
          </div>

          <nav className="space-y-2 flex-none">
            {/* メモ帳（ホーム）ボタン */}
            <div 
              onClick={() => handleNavClick('home')}
              className={`flex items-center gap-3 p-4 rounded-2xl font-bold cursor-pointer transition-all ${
                view === 'home' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Home size={22} /> 
              <span>メモ帳</span>
            </div>

            {/* アルバムボタン */}
            <div 
              onClick={() => handleNavClick('album')}
              className={`flex items-center gap-3 p-4 rounded-2xl font-bold cursor-pointer transition-all ${
                view === 'album' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <ImageIcon size={22} /> 
              <span>アルバム</span>
            </div>
            
            {/* 解析画面ボタン */}
            <div 
              onClick={() => handleNavClick('analytics')}
              className={`flex items-center gap-3 p-4 rounded-2xl font-bold cursor-pointer transition-all ${
                view === 'analytics' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <BarChart2 size={22} /> 
              <span>解析画面</span>
            </div>
          </nav>

          <hr className="my-8 border-gray-100" />

          {/* 下部はステータス表示のみにする（写真は FamilyAlbumView 側で表示するため） */}
          <div className="mt-auto p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Engine Online
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
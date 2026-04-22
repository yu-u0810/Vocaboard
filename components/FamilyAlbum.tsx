"use client";
import React from "react";
import { Image as ImageIcon, Heart, Plus } from 'lucide-react';

// 写真データの型定義
interface FamilyPhoto {
  id: string;
  url: string;
  title: string;
}

// サンプルデータ
const FAMILY_PHOTOS: FamilyPhoto[] = [
  { id: '1', url: "https://images.unsplash.com/photo-1590073844006-3a7436756b54?w=200", title: "旅行" },
  { id: '2', url: "https://images.unsplash.com/photo-1542037104857-6bb5bc91ebba?w=200", title: "食事" },
  { id: '3', url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=200", title: "散歩" },
];

export default function FamilyAlbum() {
  return (
    <div className="flex flex-col h-full">
      {/* セクションタイトル */}
      <div className="flex items-center gap-2 px-2 mb-4 text-gray-600">
        <Heart size={18} className="text-pink-500 fill-pink-500" />
        <span className="font-bold text-sm tracking-tight">家族の思い出</span>
      </div>

      {/* 写真グリッド */}
      <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-1 scrollbar-hide">
        {FAMILY_PHOTOS.map((photo) => (
          <div 
            key={photo.id}
            className="group relative aspect-square rounded-2xl bg-gray-100 overflow-hidden border border-gray-100 hover:ring-2 ring-blue-400 transition-all cursor-pointer shadow-sm"
          >
            <img 
              src={photo.url} 
              alt={photo.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            {/* ホバー時にタイトルを表示 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
              <span className="text-[10px] text-white font-bold leading-none">{photo.title}</span>
            </div>
          </div>
        ))}

        {/* 写真追加ボタン */}
        <button className="aspect-square border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-1 text-gray-400 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95">
          <Plus size={20} />
          <span className="text-[9px] font-bold">追加</span>
        </button>
      </div>
    </div>
  );
}
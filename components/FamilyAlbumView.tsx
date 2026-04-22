"use client";
import React, { useEffect, useRef } from 'react';
import { Image as ImageIcon } from 'lucide-react';

// サンプルデータ：上が古く、下が新しい順
const ALBUM_DATA = [
  {
    month: "2026年 1月",
    photos: [
      { url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400", title: "初詣" },
      { url: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=400", title: "冬の景色" },
    ]
  },
  {
    month: "2026年 2月",
    photos: [
      { url: "https://images.unsplash.com/photo-1542037104857-6bb5bc91ebba?w=400", title: "家族で外食" },
    ]
  },
  {
    month: "2026年 3月",
    photos: [
      { url: "https://images.unsplash.com/photo-1590073844006-3a7436756b54?w=400", title: "公園の散歩" },
      { url: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=400", title: "お花見" },
    ]
  },
];

export default function FamilyAlbumView() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // コンポーネントが表示された時に一番下（最新）へスクロール
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="h-full flex flex-col bg-white/20">
      <div className="p-8 pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
            <ImageIcon size={24} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tighter">家族のアルバム</h2>
        </div>
      </div>

      {/* スクロールエリア：flex-col（通常順）に戻し、Refを付与 */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-8 pb-12 scrollbar-hide flex flex-col"
      >
        {ALBUM_DATA.map((group) => (
          <div key={group.month} className="mb-12">
            <div className="sticky top-0 z-10 py-4 bg-transparent backdrop-blur-sm flex items-center gap-4 mb-6">
              <span className="text-lg font-black text-gray-700 bg-white/90 px-4 py-1 rounded-full shadow-sm border border-gray-100">
                {group.month}
              </span>
              <div className="flex-1 h-[2px] bg-gradient-to-r from-gray-200 to-transparent" />
            </div>

            {/* 写真グリッド：grid-flow-dense を追加 */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 grid-flow-dense">
            {group.photos.map((photo, idx) => {
                // 規則的なバラつきを作るロジック
                // 3個ごとに横長(col-span-2)、4個ごとに縦長(row-span-2)を混ぜる
                const isWide = idx % 3 === 0;
                const isTall = idx % 4 === 0 && !isWide; // 重なりすぎを防ぐ

                return (
                <div 
                    key={idx} 
                    className={`group relative bg-white rounded-3xl overflow-hidden shadow-md border-4 border-white hover:shadow-xl hover:scale-[1.03] transition-all duration-300
                    ${isWide ? 'col-span-2' : 'col-span-1'} 
                    ${isTall ? 'row-span-2' : 'row-span-1'}
                    `}
                    style={{
                    // aspect-ratioを動的に変えることで、隙間なく埋まるように調整
                    aspectRatio: isWide ? '16 / 9' : isTall ? '4 / 7' : '4 / 5'
                    }}
                >
                    <img 
                    src={photo.url} 
                    className="w-full h-full object-cover" 
                    alt={photo.title} 
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-bold uppercase tracking-wider">{photo.title}</p>
                    </div>
                </div>
                );
            })}
            </div>
          </div>
        ))}
        
        {/* 一番下に「最新の思い出」という目印を置くとUXが向上します */}
        <div className="py-10 text-center text-gray-300 font-bold uppercase tracking-widest text-xs">
          --- 最新の思い出 ---
        </div>
      </div>
    </div>
  );
}
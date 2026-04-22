"use client";
import React from 'react';
import { Calendar, Image as ImageIcon } from 'lucide-react';

// 写真データの型定義
interface Photo {
  url: string;
  title: string;
}

interface MonthlyGroup {
  month: string;
  photos: Photo[];
}

// サンプルデータ：上が古く、下が新しい順に並べています
const ALBUM_DATA: MonthlyGroup[] = [
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
      { url: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=400", title: "春の訪れ" },
      { url: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=400", title: "お花見" },
    ]
  },
];

export default function FamilyAlbumView() {
  return (
    <div className="h-full flex flex-col bg-white/20">
      {/* ヘッダーエリア */}
      <div className="p-8 pb-4 shrink-0">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
            <ImageIcon size={24} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tighter">家族のアルバム</h2>
        </div>
        <p className="text-gray-400 text-sm font-medium ml-12">
          大切な思い出を振り返りましょう
        </p>
      </div>

      {/* アルバムリスト：flex-col-reverse で「新しいものが下」を実現 */}
      <div className="flex-1 overflow-y-auto px-8 pb-12 scrollbar-hide flex flex-col-reverse">
        {ALBUM_DATA.map((group) => (
          <div key={group.month} className="mb-12">
            {/* 月ヘッダー：stickyにしてスクロールしても月が見えるようにするプロの技 */}
            <div className="sticky top-0 z-10 py-4 bg-transparent backdrop-blur-sm flex items-center gap-4 mb-6">
              <span className="text-lg font-black text-gray-700 bg-white/80 px-4 py-1 rounded-full shadow-sm border border-gray-100">
                {group.month}
              </span>
              <div className="flex-1 h-[2px] bg-gradient-to-r from-gray-200 to-transparent" />
            </div>

            {/* 写真グリッド：スマホ風に大きさを少しバラつかせてもいいですが、まずは綺麗に整列 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {group.photos.map((photo, idx) => (
                <div 
                  key={idx} 
                  className="group relative aspect-[4/5] bg-white rounded-3xl overflow-hidden shadow-md border-4 border-white hover:shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                >
                  <img 
                    src={photo.url} 
                    className="w-full h-full object-cover" 
                    alt={photo.title} 
                  />
                  {/* キャプション */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-bold tracking-wider uppercase">
                      {photo.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
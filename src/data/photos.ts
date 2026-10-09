import type { ImageMetadata } from 'astro';
import yoasobi from '../assets/photos/yoasobi-empire-state-2026.jpg';
import ayase from '../assets/photos/ayase-podcast-2026.jpg';
import ikura from '../assets/photos/ikura-wembley-2025.jpg';
import seattleMonochrome from '../assets/photos/ikura-seattle-monochrome-2026.jpg';
import seattleColor from '../assets/photos/ikura-seattle-color-2026.jpg';
import whiteHouse from '../assets/photos/white-house-dinner-2024.jpg';
import simpleLife from '../assets/photos/simple-life-taipei-2023.jpg';

export interface EditorialPhoto {
  image: ImageMetadata;
  alt: string;
  caption: string;
  creditLabel: string;
  author: string;
  sourceUrl: string;
  license: { name: string; url: string };
  changes: string;
  contextNote?: string;
  contextSources?: readonly { title: string; url: string }[];
}

export const photos = {
  yoasobi: {
    image: yoasobi,
    alt: 'ikura 在左、Ayase 在右，並肩站在紐約帝國大廈的觀景台。',
    caption: 'ikura（左）與 Ayase（右），2026-06-26 於紐約帝國大廈。',
    creditLabel: '攝影',
    author: 'Colleen Sturtevant',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Yoasobi.jpg',
    license: {
      name: 'CC BY-SA 4.0',
      url: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    changes: '等比例縮圖與格式壓縮，未裁切。',
  },
  ayase: {
    image: ayase,
    alt: 'Ayase 穿著棕色上衣，坐在麥克風前接受訪談。',
    caption: 'Ayase 於 GOLDNRUSH PODCAST 的 2026 年訪談影像。',
    creditLabel: '影像',
    author: 'GOLDNRUSH PODCAST',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ayase_YOASOBI_2026.png',
    license: {
      name: 'CC BY 4.0',
      url: 'https://creativecommons.org/licenses/by/4.0/',
    },
    changes: '影片截圖轉檔、等比例縮圖與格式壓縮，未裁切。',
  },
  ikura: {
    image: ikura,
    alt: 'ikura 穿著淺藍色服裝，拿著麥克風在紫色燈光的舞台上演唱。',
    caption: 'ikura，2025-06-09 倫敦 Wembley Arena 演出。',
    creditLabel: '攝影',
    author: 'DimensionalFusion',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ikura_at_YOASOBI_London.jpg',
    license: {
      name: 'CC BY 4.0',
      url: 'https://creativecommons.org/licenses/by/4.0/',
    },
    changes: '等比例縮圖與格式壓縮，未裁切。',
  },
  seattleMonochrome: {
    image: seattleMonochrome,
    alt: '黑白現場照片：ikura 拿著麥克風演唱，背景可見樂手與鍵盤。',
    caption: 'ikura，2026-08-12 西雅圖北美巡演現場。原圖為黑白照片。',
    creditLabel: '攝影',
    author: 'David Lee',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:20260812_Yoasobi_in_Seattle.jpg',
    license: { name: 'CC BY 4.0', url: 'https://creativecommons.org/licenses/by/4.0/' },
    changes: '等比例縮圖與格式壓縮，未裁切。',
  },
  seattleColor: {
    image: seattleColor,
    alt: 'ikura 在紅紫色舞台燈光下伸展手臂，背景可見鍵盤與其他樂手。',
    caption: 'ikura，2026-08-12 西雅圖北美巡演現場。',
    creditLabel: '攝影',
    author: 'David Lee',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:20260812_Yoasobi.jpg',
    license: { name: 'CC BY 4.0', url: 'https://creativecommons.org/licenses/by/4.0/' },
    changes: '等比例縮圖與格式壓縮，未裁切。',
  },
  simpleLife: {
    image: simpleLife,
    alt: '台灣演出報導的影片截圖：紫色燈光照亮舞台，右側大螢幕顯示 ikura 演唱，前景為觀眾。',
    caption: 'YOASOBI 首次來台演出報導中的舞台影像，取自三立娛樂星聞影片。',
    creditLabel: '影像',
    author: '三立娛樂星聞',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Yoasobi%27s_live_show_in_Taiwan.jpg',
    license: { name: 'CC BY 3.0', url: 'https://creativecommons.org/licenses/by/3.0/' },
    changes: '影片截圖等比例縮圖與格式壓縮，未裁切。',
    contextNote: '來源檔案標示 2023-12-04，官方簡單生活節演出日程為 2023-12-03。保留此日期差異，不把檔案日期當作演出日期。',
    contextSources: [
      { title: '官方演出日程', url: 'https://www.yoasobi-music.jp/live/51264' },
      { title: '原始報導影片', url: 'https://www.youtube.com/watch?v=Zf89nkK_CBU' },
    ],
  },
  whiteHouse: {
    image: whiteHouse,
    alt: '白宮晚宴會場全景，賓客坐在餐桌旁，中央有講台，牆面以粉紅花卉與扇形圖案裝飾。',
    caption: '2024-04-10 白宮國宴會場全景。Ayase 與 ikura 列於當日賓客名單。',
    creditLabel: '攝影',
    author: '日本內閣官房內閣廣報室',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Fumio_Kishida_visit_to_the_United_States_20240410_27.jpg',
    license: { name: 'CC BY 4.0', url: 'https://creativecommons.org/licenses/by/4.0/' },
    changes: '等比例縮圖與格式壓縮，未裁切。',
    contextSources: [
      { title: '白宮當日賓客名單', url: 'https://www.presidency.ucsb.edu/documents/white-house-press-release-white-house-releases-state-dinner-guest-list-3' },
      { title: '中央社：國宴出席的事後報導', url: 'https://www.cna.com.tw/news/aopl/202404120345.aspx' },
    ],
  },
} satisfies Record<string, EditorialPhoto>;

export const memberPhotos: Readonly<Partial<Record<string, EditorialPhoto>>> = {
  ayase: photos.ayase,
  ikura: photos.ikura,
};

export interface PhotoStory {
  photo: EditorialPhoto;
  title?: string;
  historyId?: string;
  linkLabel?: string;
}

export const livePhotoStories: readonly PhotoStory[] = [
  { photo: photos.simpleLife, title: '台北・簡單生活節', historyId: 'history-0221' },
  { photo: photos.ikura, title: '倫敦・Wembley Arena', historyId: 'history-0177' },
  { photo: photos.seattleColor, title: '西雅圖・北美巡演', historyId: 'history-0129' },
];

export const historyPhotoStories: readonly PhotoStory[] = [
  livePhotoStories[0],
  { photo: photos.whiteHouse, title: '2024・白宮國宴', historyId: 'history-0306', linkLabel: '閱讀活動紀錄 →' },
  livePhotoStories[1],
  livePhotoStories[2],
];

export const historyPhotos: Readonly<Partial<Record<string, readonly PhotoStory[]>>> = {
  'history-0306': [{ photo: photos.whiteHouse }],
  'history-0221': [{ photo: photos.simpleLife }],
  'history-0177': [{ photo: photos.ikura }],
  'history-0129': [{ photo: photos.seattleMonochrome }, { photo: photos.seattleColor }],
};

export const concertPhotos: Readonly<Partial<Record<string, readonly PhotoStory[]>>> = {
  'wembley-2025-06-09': historyPhotos['history-0177'],
};

export type Member = {
  /** 展示名 */
  name: string;
  /** 头像里的那个字 */
  glyph: string;
  /** 拼音 / 昵称小标 */
  latin: string;
  /** 音频路径（放在 assets/audio/ 下即可自动播放） */
  audio: string;
  /** 头像渐变 */
  from: string;
  to: string;
};

/**
 * 学长姐寄语名单。
 * 音频文件路径保持与原页面一致（assets/audio/ 目录），把文件放回去就能直接播放。
 */
export const members: Member[] = [
  { name: "杜禹乐", glyph: "乐", latin: "DU YULE", audio: "assets/audio/duyule.m4a", from: "#7C9CFF", to: "#4A5BE8" },
  { name: "龚铱诺", glyph: "诺", latin: "GONG YINUO", audio: "assets/audio/gongyinuo.m4a", from: "#FF9BB3", to: "#E4487F" },
  { name: "蒋吴曦", glyph: "曦", latin: "JIANG WUXI", audio: "assets/audio/jiangwuxi.m4a", from: "#FFD08A", to: "#F0873B" },
  { name: "李东睿", glyph: "睿", latin: "LI DONGRUI", audio: "assets/audio/lidongrui.m4a", from: "#8FF0DA", to: "#22A88E" },
  { name: "明萱", glyph: "萱", latin: "MING XUAN", audio: "assets/audio/mingxuan.m4a", from: "#C7A9FF", to: "#7B4BE0" },
  { name: "牟予新", glyph: "新", latin: "MU YUXIN", audio: "assets/audio/muyuxin.m4a", from: "#9BE8FF", to: "#2C8FD6" },
  { name: "王税潇", glyph: "潇", latin: "WANG SHUIXIAO", audio: "assets/audio/wangshuixiao.m4a", from: "#FFB58A", to: "#E5673F" },
  { name: "郑景泽", glyph: "泽", latin: "ZHENG JINGZE", audio: "assets/audio/zhengjingze.mp3", from: "#A6F5A0", to: "#3E9E4E" },
  { name: "颂和", glyph: "和", latin: "SONG HE", audio: "assets/audio/songhe.m4a", from: "#FFC6E0", to: "#B14BC6" },
  { name: "阿瓷", glyph: "瓷", latin: "A CI", audio: "assets/audio/aci.wav", from: "#BFD4FF", to: "#5A6ED8" },
  { name: "Reji", glyph: "R", latin: "REJI", audio: "assets/audio/reji.m4a", from: "#FFE08A", to: "#D9A22B" },
  { name: "小丫", glyph: "丫", latin: "XIAO YA", audio: "assets/audio/xiaoya.m4a", from: "#A5F3EA", to: "#3FB8C9" },
];

export const backgroundMusic = "assets/audio/bg-music.mp4";

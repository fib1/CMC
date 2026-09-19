export type Member = {
  /** 展示名 */
  name: string;
  /** 头像里的那个字（照片加载失败时才会显示） */
  glyph: string;
  /** 拼音 / 昵称小标 */
  latin: string;
  /** 音频路径（放在 assets/audio/ 下即可自动播放） */
  audio: string;
  /** 照片路径（放在 assets/images/ 下即可自动显示；没有就留空 ""） */
  image: string;
  /** 头像渐变（作为照片加载前的底色 / 加载失败时的兜底） */
  from: string;
  to: string;
};

/**
 * 学长姐寄语名单。
 * 想改名字、加人、删人：直接增删下面这一条条对象即可。
 * - audio：语音文件，放 assets/audio/
 * - image：照片文件，放 assets/images/（文件名对上就自动显示，对不上会显示彩色字）
 */
export const members: Member[] = [
  { name: "杜禹乐", glyph: "乐", latin: "DU YULE", audio: "assets/audio/duyule.m4a", image: "assets/images/duyule.jpg", from: "#7C9CFF", to: "#4A5BE8" },
  { name: "龚铱诺", glyph: "诺", latin: "GONG YINUO", audio: "assets/audio/gongyinuo.m4a", image: "assets/images/gongyinuo.jpg", from: "#FF9BB3", to: "#E4487F" },
  { name: "蒋吴曦", glyph: "曦", latin: "JIANG WUXI", audio: "assets/audio/jiangwuxi.m4a", image: "assets/images/jiangwuxi.jpg", from: "#FFD08A", to: "#F0873B" },
  { name: "李东睿", glyph: "睿", latin: "LI DONGRUI", audio: "assets/audio/lidongrui.m4a", image: "assets/images/lidongrui.jpg", from: "#8FF0DA", to: "#22A88E" },
  { name: "明萱", glyph: "萱", latin: "MING XUAN", audio: "assets/audio/mingxuan.m4a", image: "assets/images/mingxuan.jpg", from: "#C7A9FF", to: "#7B4BE0" },
  { name: "牟予新", glyph: "新", latin: "MU YUXIN", audio: "assets/audio/muyuxin.m4a", image: "assets/images/muyuxin.jpg", from: "#9BE8FF", to: "#2C8FD6" },
  { name: "王税潇", glyph: "潇", latin: "WANG SHUIXIAO", audio: "assets/audio/wangshuixiao.m4a", image: "assets/images/wangshuixiao.jpg", from: "#FFB58A", to: "#E5673F" },
  { name: "郑景泽", glyph: "泽", latin: "ZHENG JINGZE", audio: "assets/audio/zhengjingze.mp3", image: "assets/images/zhengjingze.jpg", from: "#A6F5A0", to: "#3E9E4E" },
  { name: "颂和", glyph: "和", latin: "SONG HE", audio: "assets/audio/songhe.m4a", image: "assets/images/zhijun.jpg", from: "#FFC6E0", to: "#B14BC6" },
  { name: "阿瓷", glyph: "瓷", latin: "A CI", audio: "assets/audio/aci.wav", image: "assets/images/aci.jpg", from: "#BFD4FF", to: "#5A6ED8" },
  { name: "Reji", glyph: "R", latin: "REJI", audio: "assets/audio/reji.m4a", image: "assets/images/yiji.jpg", from: "#FFE08A", to: "#D9A22B" },
  { name: "小丫", glyph: "丫", latin: "XIAO YA", audio: "assets/audio/xiaoya.m4a", image: "assets/images/xiaoya.jpg", from: "#A5F3EA", to: "#3FB8C9" },
];

export const backgroundMusic = "assets/audio/bg-music.mp4";

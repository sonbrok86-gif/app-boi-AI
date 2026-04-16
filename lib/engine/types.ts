export type UserProfile = {
  name: string;
  gender: string;
  birth: string;
  phone: string;
};

export type QuizAnswer = {
  [key: string]: string;
};

export type Topic =
  | "tinh_cam"
  | "gia_dao"
  | "tien_tai"
  | "co_hoi";
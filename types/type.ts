export interface WifiDetail {
  baseDate: string; // 설치 날짜
  macAddress: string; // MAC 주소 (암호화된 형태)
  apGroupName: string; // AP 그룹 이름 (설치 장소)
  installLocationDetail: string; // 설치 위치 세부 정보
  category: string; // 카테고리 (대분류)
  categoryDetail: string; // 카테고리 세부 정보 (소분류)
  addressDong: string; // 주소 (읍/면/동)
  addressDetail: string; // 주소 (세부 주소)
  latitude: string; // 위도
  longitude: string; // 경도
  isClicked?: boolean;
}

export interface WifiData {
  totCnt: number;
  hasMore: boolean;
  data: WifiDetail[];
}

import axios from "axios";

interface WifiData {
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
}

export default async function getWifiData(): Promise<WifiData[]> {
  const response = await axios.get(
    `https://open.jejudatahub.net/api/proxy/Dtb18ta1btbD1Da1a81aaDttab6tDabb/${process.env.NEXT_PUBLIC_WIFI_KEY}`,
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    },
  );

  return response.data.data;
}

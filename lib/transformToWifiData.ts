import { WifiDetail } from "@/types/type";

interface WifiDetailWithId extends WifiDetail {
  id: string;
}

function transformToWifiDetail(likedPosts: WifiDetailWithId[]): WifiDetail[] {
  return likedPosts.map((post: WifiDetailWithId) => {
    return {
      baseDate: post.baseDate || "", // 설치 날짜
      macAddress: post.macAddress || "", // MAC 주소
      apGroupName: post.apGroupName || "", // AP 그룹 이름
      installLocationDetail: post.installLocationDetail || "", // 설치 위치 세부 정보
      category: post.category || "", // 카테고리 (대분류)
      categoryDetail: post.categoryDetail || "", // 카테고리 세부 정보 (소분류)
      addressDong: post.addressDong || "", // 주소 (읍/면/동)
      addressDetail: post.addressDetail || "", // 주소 (세부 주소)
      latitude: post.latitude || "", // 위도
      longitude: post.longitude || "", // 경도
      isClicked: false, // 기본적으로 클릭 여부를 false로 설정
    };
  });
}

export default transformToWifiDetail;

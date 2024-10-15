import { WifiDetail } from "@/types/type";

interface WifiDetailWithId extends WifiDetail {
  id: string;
}

function filterWifiData(
  likedPosts: WifiDetailWithId[],
  searchParams: URLSearchParams,
): WifiDetail[] {
  const pageSize = 10;
  const pageNumber = Math.max(Number(searchParams.get("number")) || 1, 1); // 최소값 1 보장

  // 카테고리로 필터링
  const filteredCategory = (posts: WifiDetailWithId[]) => {
    const category = searchParams.get("category");
    return category
      ? posts.filter((post) => post.category === category)
      : posts;
  };

  // 주소로 필터링
  const filteredAddressDong = (posts: WifiDetailWithId[]) => {
    const addressDong = searchParams.get("addressDong");
    return addressDong
      ? posts.filter((post) => post.addressDong.includes(addressDong))
      : posts;
  };

  // 필터 적용
  const filteredPosts = filteredAddressDong(filteredCategory(likedPosts));

  // 페이지네이션
  const startIndex = (pageNumber - 1) * pageSize;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + pageSize);

  return paginatedPosts.map((post: WifiDetailWithId) => ({
    baseDate: post.baseDate || "",
    macAddress: post.macAddress || "",
    apGroupName: post.apGroupName || "",
    installLocationDetail: post.installLocationDetail || "",
    category: post.category || "",
    categoryDetail: post.categoryDetail || "",
    addressDong: post.addressDong || "",
    addressDetail: post.addressDetail || "",
    latitude: post.latitude || "",
    longitude: post.longitude || "",
    isClicked: false,
  }));
}

export default filterWifiData;

import { WifiDetail } from "@/types/type";

interface WifiDetailWithId extends WifiDetail {
  id: string;
}

function filterWifiData(
  likedPosts: WifiDetailWithId[],
  searchParams: URLSearchParams,
): WifiDetail[] {
  const category = searchParams.get("category");
  const addressDong = searchParams.get("addressDong");

  const applyFilters = (posts: WifiDetailWithId[]) => {
    return posts.filter((post) => {
      const matchesCategory = !category || post.category === category;
      const matchesAddressDong =
        !addressDong || post.addressDong.includes(addressDong);
      return matchesCategory && matchesAddressDong;
    });
  };

  const filteredPosts = applyFilters(likedPosts);

  return filteredPosts.map((post: WifiDetailWithId) => ({
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

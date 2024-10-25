<div align="center">
<h2 style="display: flex; align-items: center; justify-content:center">
    <img alt="Html" src="./asset/free-icon-wifi-4852997.png" width="25px" style="margin-right: 5px;"/>
    제주 공공 와이파이
</h2>
제주도 내 공공 와이파이 위치를 지도에서 쉽게 확인할 수 있는 웹 서비스로, 방문객과 주민들이 무료 와이파이를 빠르게 찾고 이용할 수 있도록 도와줍니다.
</div>

## 목차

- [목차](#목차)
- [배포링크](#배포링크)
- [기술스택](#기술스택)
- [주요 기능](#주요-기능)
- [상세 기능](#상세-기능)

## 배포링크

https://jeju-wifi-map.vercel.app/

## 기술스택

<div style="display: flex; align-items: center; gap: 5px;">
  <img style="height: 25px" src="https://img.shields.io/badge/Next.js-222222?style=flat&logo=Next.js&logoColor=white"/>
  <img style="height: 25px" src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat&logo=Tailwind CSS&logoColor=white"/>
  <img style="height: 25px" src="https://img.shields.io/badge/React Query-FF4154?style=flat&logo=React Query&logoColor=white"/>
  <img style="height: 25px" src="https://img.shields.io/badge/Zustand-4D2B1A?style=flat&logo=React&logoColor=white"/>
  <img style="height: 25px" src="https://img.shields.io/badge/shadcn/ui-222222?style=flat&logo=shadcn/ui&logoColor=white"/>
  <img style="height: 25px" src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=Axios&logoColor=white"/>
  <img style="height: 25px" src="https://img.shields.io/badge/Auth.js-9553E9?style=flat&logo=Next.js&logoColor=white"/>
  <img style="height: 25px" src="https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=Prisma&logoColor=white"/>
  <img style="height: 25px" src="https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=MongoDB&logoColor=white"/>
</div>

## 주요 기능

| <img alt="메인페이지1" src="https://github.com/user-attachments/assets/83cd372a-1938-4b80-add3-574034093094"> | <img alt="메인페이지2" src="https://github.com/user-attachments/assets/eefe8df3-7e53-47a3-909a-041db87989f8"> |
| :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: |
|                                                   메인 화면                                                   |                                           와이파이 데이터 상세 화면                                           |

**제주도 공공 와이파이 지도 서비스**<br/>

이 웹 페이지는 제주도 전역의 공공 와이파이 정보를 한눈에 확인할 수 있는 서비스입니다. 카카오맵 API를 활용하여, 제주도 내 다양한 지역의 와이파이 위치를 지도 상에 마커로 표시해주며, 사용자 친화적인 인터페이스를 통해 쉽게 와이파이 정보를 검색하고 필터링할 수 있습니다.<br>

## 상세 기능

|                                                                                                                                                          |                                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **지역 검색 & 필터링**                                                                                                                                   |                                                                                                                                                                    |
| <img alt="검색 및 필터링" src="https://github.com/user-attachments/assets/032077a2-2a92-47c4-9b4d-afd19303a986" width="300px">                           | 사용자는 특정 지역을 검색하고, 공공 와이파이 정보에 대해 관광지, 공공기관, 카페와 같은 카테고리 필터를 통해 원하는 조건에 맞는 와이파이를 손쉽게 찾을 수 있습니다. |
| **와이파이 상세 정보 & 로드뷰**                                                                                                                          |                                                                                                                                                                    |
| <img alt="상세 정보 및 로드뷰" src="https://github.com/user-attachments/assets/5a16f084-72dd-4681-948b-8a3574432aa8" width="300px">                      | 지도에 표시된 와이파이 마커를 클릭하여 해당 와이파이의 세부 정보를 확인할 수 있으며, 로드뷰 기능을 통해 정확한 위치를 시각적으로 파악할 수 있습니다.               |
| **유저 로그인 기능**                                                                                                                                     |                                                                                                                                                                    |
| <img width="300px" alt="스크린샷 2024-10-25 오후 2 16 41" src="https://github.com/user-attachments/assets/b147bc6d-5155-4a6d-a69b-4da550cd38a2"> | 구글 OAuth를 이용해 손쉽게 로그인할 수 있도록 하여, 사용자에게 매번 로그인할 필요 없는 간편한 인증 기능을 제공합니다.                                              |
| **포스트 찜하기**                                                                                                                                        |                                                                                                                                                                    |
| <img width="300px" alt="스크린샷 2024-10-25 오후 2 17 57" src="https://github.com/user-attachments/assets/3e26b621-fc0c-41b1-ab75-2d5a6f2edffa"> | 로그인한 사용자는 와이파이 정보를 포스트로 찜할 수 있어 나중에 다시 찾기 편리하도록 즐겨찾기 기능을 제공합니다.                                                    |
| **내가 찜한 포스트만 보기**                                                                                                                              |                                                                                                                                                                    |
| <img width="300px" alt="스크린샷 2024-10-25 오후 2 18 18" src="https://github.com/user-attachments/assets/d6363aed-8508-4834-be49-f4e831f28a05"> | 사용자가 이전에 찜해둔 와이파이 정보만 따로 볼 수 있는 기능을 제공하여, 필요한 정보에 신속하게 접근할 수 있습니다.                                                 |
| **반응형 디자인**                                                                                                                                        |                                                                                                                                                                    |
| <img alt="반응형 디자인" src="https://github.com/user-attachments/assets/5338cb3e-5859-4b24-8cdb-34a96ba96ee1" width="300px">                            | 다양한 화면 크기(모바일, 태블릿, 데스크탑)에 맞게 UI가 자동으로 최적화되어 모든 기기에서 편리하게 사용 가능합니다.                                                 |
| **라이트, 다크모드**                                                                                                                                     |                                                                                                                                                                    |
| <img width="300px" alt="스크린샷 2024-10-25 오후 2 18 53" src="https://github.com/user-attachments/assets/1c8a3eec-ad4e-45f4-bef9-dbe1c326d044"> | 사용자의 취향이나 기기 환경에 따라 라이트 모드와 다크 모드로 변경 가능하여, 야간 이용 시 눈의 피로를 줄여줍니다.                                                   |

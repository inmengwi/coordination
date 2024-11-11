# Read Me First
### 개발 환경
* Spring Boot
* Java 21

### 어플리케이션 실행
* 실행 후, 브라우저에서 http://localhost:8080 으로 접속하여 swagger로 확인 가능

# Overview
## 분석
### 도메인
* 코디네이션 - 서비스 
* (브랜드)카탈로그 - 브랜드의 카테고리별 상품 가격 모음
* 브랜드 - 여러 카테고리 상품을 가지고 있는 판매 업체
* 카테고리 - 상의/아우터/바지/스니커즈/가방/모자/양말/악세서리로 구성
* 카테고리상품 - 카테고리 대표 상품 (요구 사항에는 명시적으로 드러나지 않음)
  * 브랜드
  * 가격
  * 카테고리
* 가격

## 설계
### Core
* Entity와 Service에서 도메인 비지니스 구현
* Entity는 JpaEntity와 Dto 일부 수행.(annotation으로 역활 추가)
* 데이터의 구조와 관계 없이 비지니스를 처리하기 접합한 Entity 설계를 먼저 진행
* BusinessEception은 throw로 상위 layer에서 처리 열어 둠

### Controller
* Catalog를 Resource로 다루는 API는 RESTful을 충분히 적용
* Coordination은 Query API에 적학하여 RESTful은 예외적으로 적용

## 구현
### Repository
* 카테고리 컬럼은 동적 파라미터로 조회하기 위해 선택지 (Native Query/CriteriaQuery/QueryDSL) 중에 코드의 번잡함은 올라가지만 실행 환경에서 설정을 최소화 하기 위해 CriteriaQuery 사용  

## Test
* Intellij 환경에서 실행을 위해선는 <b>kotest</b> plug-in 설치
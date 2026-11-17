## Application Details
|               |
| ------------- |
|**Generation Date and Time**<br>Mon Nov 02 2026 09:11:09 GMT+0900 (Korean Standard Time)|
|**App Generator**<br>SAP Fiori Application Generator|
|**App Generator Version**<br>1.34.0|
|**Generation Platform**<br>Visual Studio Code|
|**Template Used**<br>List Report Page V4|
|**Service Type**<br>SAP System (ABAP On-Premise)|
|**Service URL**<br>http://saphana2.s-pert.com:8060/sap/opu/odata4/sap/zsp_itsm_p_solution_ui_v4/srvd/sap/zsp_itsm_p_solution_ui/0001/|
|**Module Name**<br>zspf_solution|
|**Application Title**<br>고객 적용 솔루션|
|**Namespace**<br>zsp.itsm|
|**UI5 Theme**<br>sap_horizon|
|**UI5 Version**<br>1.120.45|
|**Enable TypeScript**<br>False|
|**Add Eslint configuration**<br>True, see https://www.npmjs.com/package/@sap-ux/eslint-plugin-fiori-tools#rules for the eslint rules.|
|**Value Help Metadata**<br>Downloaded for external services|
|**Main Entity**<br>Main|

## zspf_solution

고객 적용 솔루션

### Starting the generated app

-   This app has been generated using the SAP Fiori tools - App Generator, as part of the SAP Fiori tools suite.  To launch the generated application, run the following from the generated application root folder:

```
    npm start
```

- It is also possible to run the application using mock data that reflects the OData Service URL supplied during application generation.  In order to run the application with Mock Data, run the following from the generated app root folder:

```
    npm run start-mock
```

#### Pre-requisites:

1. Active NodeJS LTS (Long Term Support) version and associated supported NPM version.  (See https://nodejs.org)

### Architecture & UI5 Configurations

Fiori Elements 표준 List Report / Object Page V4 템플릿을 기반으로 구현된 고객 적용 솔루션 관리 앱입니다.

<br>

#### 1) annotation.xml — solutionDelete(논리 삭제) 액션 실행 시 테이블 자동 새로고침(Common.SideEffects)

* **배경**:
  - `solutionDelete` 액션은 레코드를 물리적으로 삭제하지 않고 `DELFLAG = 'X'` 플래그를 설정하는 논리적 삭제(Logical Delete) 방식으로 동작합니다.
  - 액션 수행 시 백엔드 CDS View(`where delflag is initial`)에서 해당 행이 제외되지만, 프론트엔드에서는 엔티티셋 재조회 트리거가 없어 브라우저를 새로고침하기 전까지 행이 유지되는 현상이 발생합니다.
* **해결 방안 (`annotation.xml`)**:
  - `SAP__self.MainType` 엔터티 대상에 `com.sap.vocabularies.Common.v1.SideEffects` 어노테이션을 정의했습니다.
  - 액션 실행 완료 시 `TargetEntities`로 자기 자신(빈 `<NavigationPropertyPath/>`) 및 `TargetProperties`로 `Delflag`를 지정하여 테이블 목록을 즉시 자동 재조회(Refresh)하도록 구성했습니다.

```xml
<Annotations Target="SAP__self.MainType">
    <!-- solutionDelete 논리삭제 후 테이블 자동 새로고침 -->
    <Annotation Term="Common.SideEffects" Qualifier="SolutionDeleteRefresh">
        <Record Type="Common.SideEffectsType">
            <PropertyValue Property="SourceActions">
                <Collection>
                    <String>com.sap.gateway.srvd.zsp_itsm_p_solution_ui.v0001.solutionDelete</String>
                </Collection>
            </PropertyValue>
            <PropertyValue Property="TargetEntities">
                <Collection>
                    <NavigationPropertyPath></NavigationPropertyPath>
                </Collection>
            </PropertyValue>
            <PropertyValue Property="TargetProperties">
                <Collection>
                    <PropertyPath>Delflag</PropertyPath>
                </Collection>
            </PropertyValue>
        </Record>
    </Annotation>
</Annotations>
```

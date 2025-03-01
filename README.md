# TypeScript 시작하기

## 1. TypeScript 설치

TypeScript는 **전역(Global) 설치**와 **로컬(Local) 설치** 두 가지 방식으로 사용할 수 있습니다.

### 🔹 전역(Global) 설치

여러 프로젝트에서 TypeScript를 공통으로 사용하려면 전역으로 설치할 수 있습니다.  
전역 설치하면 `tsc`(TypeScript Compiler)를 어디서든 실행할 수 있습니다.

```sh
npm install -g typescript
```

> ⚠️ **주의:** 전역 설치하면 프로젝트마다 TypeScript 버전을 개별적으로 관리하기 어렵습니다.

### 🔹 로컬(Local) 설치 **(권장)**

프로젝트별로 TypeScript 버전을 관리하려면 로컬 설치를 권장합니다.

```sh
npm install --save-dev typescript
```

> 프로젝트 내부에서 TypeScript를 실행하려면 `npx tsc` 또는 `npm run tsc` 명령어를 사용해야 합니다.

---

## 2. 프로젝트 생성 및 초기 설정

### 프로젝트 폴더 생성

```sh
mkdir my-ts-project
cd my-ts-project
```

### package.json 생성

```sh
npm init -y
```

> `-y` 옵션을 추가하면 기본값으로 `package.json`이 생성됩니다.

---

## 3. TypeScript 설정 파일 생성

### `tsconfig.json` 파일 생성

다음 명령어를 실행하면 `tsconfig.json` 파일이 자동으로 생성됩니다.

```sh
npx tsc --init
```

> 전역 설치를 했다면 `tsc --init`을 사용할 수도 있습니다.

이 파일은 TypeScript의 컴파일 옵션을 설정하는 역할을 합니다.

---

## 4. TypeScript 코드 작성 및 실행

### TypeScript 파일 작성

`index.ts` 파일을 생성하고 다음과 같은 코드를 추가합니다.

```ts
const message: string = "Hello, TypeScript!";
console.log(message);
```

### TypeScript 컴파일

**전역 설치한 경우:**

```sh
tsc
```

**로컬 설치한 경우:**

```sh
npx tsc
```

위 명령어를 실행하면 `tsconfig.json` 설정에 따라 JavaScript 파일(`index.js`)이 생성됩니다.

### tsc 컴파일 대상 제외하기

아래 내용을 tsconfig.json에 추가하기
```json
"exclude" : [
  "targetFile.ts",
  "*.dev.ts", // .dev.ts가 붙어 있는 파일들은 다 컴파일하지 않음
  "node_modules" //default option! node_modules에 있는 ts는 컴파일할 필요가 없다...!
]
```

### tsc 컴파일 대상 추가하기

아래 내용을 tsconfig.json에 추가하기
```json
"include" : [
  "targetFile.ts", //targetFile.ts만 컴파일됨!
]
```
### tsconfig.json의 compilerOptions 알아보기

- target: 어떤 버전으로 compile할지 알려줌(es5(let, const 없음)로 하면 구형 브라우저에서도 동작 가능)

### Watch mode 실행
```sh
tsc -w
```

```sh
tsc --watch
```

### 실행 방법 (Node.js 사용)

```sh
node index.js
```

---

## 5. lite-server 설정 (HTML 테스트용)

lite-server는 간단한 개발용 서버로, 브라우저 환경에서 TypeScript 코드를 실행할 때 유용합니다.

### lite-server 설치

**전역 설치 (잘 사용하지 않음)**

```sh
npm install -g lite-server
```

**로컬 설치 (권장)**

```sh
npm install --save-dev lite-server
```

### `package.json`에 스크립트 추가

`package.json`의 `"scripts"` 항목에 다음을 추가합니다.

```json
"scripts": {
  "start": "lite-server"
}
```

### 실행 방법

**전역 설치한 경우:**

```sh
lite-server
```

**로컬 설치한 경우:**

```sh
npm start
```

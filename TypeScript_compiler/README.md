# 📁 **TypeScript Watch Mode**
- `tsc file.ts --watch` 또는 `tsc file.ts -w` 사용
- 파일 변경 시 자동으로 컴파일 수행
- VS Code의 Live Server도 File Watcher를 활용:
  - 변경 감지 시 브라우저에 메시지 전송
  - 브라우저의 **WebSocket**이나 **Server-Sent Events**로 페이지 자동 새로고침

---

# ⚙️ **tsconfig.json 주요 옵션 정리**

### 🛠️ **기본 옵션**
| 옵션              | 설명 | 사용 사례 |
|------------------|---------------------------|----------------|
| `allowJs`        | TypeScript 프로젝트 내에서 `.js` 파일 사용 허용 | 기존 JS 프로젝트의 점진적 TS 마이그레이션, JS 라이브러리 사용 |
| `checkJs`        | JS 파일에서도 타입 체크 (타입 추론 사용) | JS 코드의 타입 안정성을 높일 때 |
| `sourceMap`      | `.ts` 파일을 브라우저 개발자 도구에서 디버깅 가능 | 디버깅 시 편리 |
| `outDir`         | 컴파일된 파일 저장 디렉터리 설정 (예: `dist`) | 빌드 파일 관리 |
| `rootDir`        | 컴파일할 파일의 소스 디렉터리 설정 (예: `src`) | 프로젝트 구조화 |
| `removeComments` | 주석을 제거하여 파일 용량 감소 | 배포 시 최적화 |
| `noEmitOnError`  | 컴파일 오류 발생 시 `.js` 파일 생성 안 함 | 안전한 빌드 보장 |

---

### 🔍 **Strict 옵션**
| 옵션                  | 설명 | 사용 사례 |
|----------------------|------------------------------|----------------|
| `noImplicitAny`      | 암시적 `any` 타입을 허용하지 않음 | 안전한 타입 사용 |
| `strictNullChecks`   | `null`/`undefined` 체크를 엄격하게 함 | `null` 참조 오류 방지 |
| `strictFunctionTypes`| 함수 타입을 엄격하게 체크 | 잘못된 함수 인수 방지 |
| `strictBindCallApply`| `.bind`, `.call`, `.apply` 메서드의 타입 검사 | 안전한 메서드 사용 |

---

### 💡 **예시 코드 (`strictBindCallApply` 옵션 사용)**

```ts
const button = document.querySelector("button");

function clickHandler(message: string) {
    console.log(message);
}

// `button`이 null이 아닐 때만 이벤트 리스너 등록
button?.addEventListener("click", clickHandler.bind(null, "hello"));
```

- `?.` (Optional chaining)으로 `null` 체크 간소화
- `bind` 메서드 사용 시 `strictBindCallApply` 옵션이 타입 검사를 도와줌

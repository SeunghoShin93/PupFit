# 퍼핏 클라이언트

## 1. Getting Started

1. node.js 설치

   ```
   $ brew install node // macOS
   ```

   윈도우의 경우에는 https://nodejs.org/en/download/ Stable 버전

2. **Intel x86 Emulator Accelerator (HAXM installer)** 설치 (windows만)

   powershell

   ```powershell
   Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
   DISM /Online /Enable-Feature /All /FeatureName:Microsoft-Hyper-V
   ```

3. 안드로이드 스튜디오 설치

   2-1.안드로이드 스튜디오 설치파일 https://developer.android.com/studio?hl=ko

   2-2. Android Studio의 메뉴에서 **Tools > SDK Manager**를 선택합니다.

   ![img](https://lh5.googleusercontent.com/ob0-uLPuOWDLY3qOFwI5GSw7NXpIx0BOVBoGKwFqlZgu4l82eUUeVDPRS5PWgqX6fmpqzrS0JDhcAjtDDQ_GsARpfXZpNU6huvEOCU7NmYhQc9BgZqrU6-H8AdcKusgf7rJsuFK3)

   2-3. 안드로이드 7.0 너겟 설치 후 시뮬레이터 작동 확인

4. Expo Cli, react-native 설치

   ```bash
   $ npm i -g expo-cli && react-native
   ```

5. 내부 디펜던시 설치

   ```bash
   # workdir = project/client/
   $ npm i
   ```

6. 메트로 번들러 실행

   ```bash
   $ expo start
   ```

![image-20200528142026021](metro.png)

좌측 하단의 Run on Android device / simulator 를 선택하여 시뮬레이터로 실행

or

좌측 하단 혹은 터미널의 QR코드를 찍어서 기기의 엑스포 클라이언트로 실행



## 2. 기술 스택

1. React.js

   * React-Hooks

     함수형 컴포넌트로 작성

   * Redux
     
     * 미들웨어 : Redux-actions / pender / logger / saga

2. React-Native

   * @react-navigation (라우팅)
   * @UI-Kitten (프레임워크)
   
3. Typescript

   * Props를 사용할때는 Interface 작성
# 🎮 EsportsPulse - Real-Time Esports Analytics & AI Predictions

> Nền tảng cập nhật thông tin trực tiếp (real-time) và nhận định chuyên sâu chuẩn xác cho các giải đấu thể thao điện tử hàng đầu: **Valorant, CS2, Liên Minh Huyền Thoại (LoL), Liên Quân Mobile (AOV)**.

---

## 🏛️ Kiến Trúc Hệ Thống (Monorepo)

```
esportsBLOG/
├── backend/                                   # Spring Boot 4.x (Java 21) REST & STOMP WebSocket
│   ├── pom.xml
│   └── src/main/java/com/example/esportsBLOG/
│       ├── config/                            # WebSocket STOMP, CORS, Security
│       │   ├── WebSocketConfig.java           # Endpoint: /ws-esports, Topic: /topic/matches
│       │   └── CorsConfig.java                # CORS origins: localhost:5173
│       ├── common/                            # ApiResponse, BaseEntity, GlobalException
│       └── modules/
│           ├── game/                          # Tựa game (LOL, VAL, CS2, AOV) & Tournaments
│           ├── match/                         # Trận đấu, Map, Tỷ số, Kèo nhà cái
│           ├── prediction/                    # Phân tích, AI confidence, Bình chọn cộng đồng
│           ├── realtime/                      # Push event WebSocket khi nổ round/tỷ số
│           └── community/                     # Tin tức, bài viết & bình luận
│
├── frontend/                                  # Vite + React 18 + TypeScript + Modern Dark Theme
│   ├── vite.config.ts                         # Proxy API /api & WS /ws sang backend:8080
│   ├── tsconfig.json                          # Strict TypeScript mode & path aliases (@/*)
│   └── src/
│       ├── api/                               # Mock data & API clients
│       ├── components/
│       │   ├── common/Navbar.tsx              # Game selector, Live pulse, STOMP status
│       │   ├── match/LiveTicker.tsx           # Thanh chạy trận đấu real-time
│       │   ├── match/MatchCard.tsx            # Card trận đấu, tỷ số, maps, kèo
│       │   └── prediction/PredictionModal.tsx # Phân tích chuyên sâu, AI score & Vote
│       ├── styles/index.css                   # Cyberpunk dark mode, glassmorphism & neon glows
│       ├── types/                             # Interface chặt chẽ: game, match, prediction
│       ├── App.tsx                            # Dashboard chính đa bộ lọc
│       └── main.tsx
└── .gitignore
```

---

## 🚀 Hướng Dẫn Chạy Dự Án

### 1. Khởi động Backend (Spring Boot)
Yêu cầu: Java 21+

```bash
cd backend
./mvnw spring-boot:run
```
* **API Port**: `http://localhost:8080`
* **H2 Console** (xem DB trực tiếp trong trình duyệt): `http://localhost:8080/h2-console`
  * JDBC URL: `jdbc:h2:mem:esportsdb`
  * Username: `sa` / Password: *(để trống)*
* **WebSocket Endpoint**: `ws://localhost:8080/ws-esports`

---

### 2. Khởi động Frontend (Vite + React)
Yêu cầu: Node.js 18+

```bash
cd frontend
npm install
npm run dev
```
* Mở trình duyệt tại: `http://localhost:5173`

---

## ⚡ Các Tựa Game Được Hỗ Trợ
* 🎯 **Valorant**: VCT Masters, Champions, Challengers (Maps: Haven, Sunset, Lotus, Ascent,...)
* 💣 **CS2**: Major, BLAST Premier, IEM (Maps: Mirage, Inferno, Nuke, Dust 2, Ancient,...)
* 🛡️ **Liên Minh Huyền Thoại**: LCK, LPL, VCS, Worlds, MSI (BO3, BO5)
* ⚡ **Liên Quân Mobile**: Đấu Trường Danh Vọng (AOG), AIC, AWC (BO5, BO7)

# ESPORTSPULSE WORKSPACE SKILL GOVERNANCE & EXECUTION MATRIX

> **Phạm vi áp dụng:** Dự án `esportsBLOG` (Local Workspace Scope only - Không áp dụng global).
> Mọi tương tác, lập kế hoạch, viết code, review và kiểm thử trong dự án này BẮT BUỘC tuân thủ nghiêm ngặt ma trận 12 skill nội bộ dưới đây.

---

## 1. Ma Trận Vòng Đời Dự Án (Project Lifecycle Matrix)

| Giai Đoạn | Skill Kích Hoạt Bắt Buộc | Mục Đích & Nguyên Tắc Cốt Lõi |
| :--- | :--- | :--- |
| **1. Khởi tạo & Đề xuất Tính năng** | `brainstorming` | **BẮT BUỘC dùng trước mọi công việc sáng tạo/thêm tính năng mới.** Hỏi 1 câu hỏi tập trung tại 1 thời điểm; đề xuất 2-3 giải pháp kèm trade-off; loại bỏ tính năng thừa (YAGNI); chia nhỏ thiết kế 200-300 từ để validate từng phần. |
| **2. Kiến trúc Hệ thống** | `senior-architect`, `senior-fullstack` | Thiết kế phân tầng sạch (Presentation -> Domain -> Data); chuẩn hóa Monorepo (Spring Boot 4 / Java 21 + Vite React TS); khai báo luồng CoT (Architecture -> Implementation -> Test Vector) trước khi viết code. |
| **3. Thiết Kế Giao Diện (UI/UX)** | `frontend-design`, `ui-ux-pro-max`, `frontend-patterns` | Thiết kế đậm chất Esports/Gaming (Cyberpunk, Neon Glow, Glassmorphism, HUD stats); tuyệt đối không dùng template SaaS generic nhàm chán; ưu tiên: Accessibility (CRITICAL) -> Touch/Interaction (CRITICAL) -> Performance (HIGH) -> Layout -> Typography (Outfit + Rajdhani). Áp dụng Composition over inheritance và strict types. |
| **4. AI & Engine Nhận Định** | `senior-prompt-engineer` | Thiết kế prompt có cấu trúc (JSON schema), Chain-of-Thought phân tích kèo/tỷ lệ thắng, RAG tối ưu hóa dữ liệu lịch sử đối đầu. |
| **5. Cơ Sở Dữ Liệu & Cloud (Postgres/Supabase)** | `supabase`, `supabase-postgres-best-practices` | **BẮT BUỘC dùng trước khi tạo/sửa bảng, viết migration, query SQL, cấu hình RLS và indexes.** Tối ưu query performance (Priority 1), kết nối pooling, Row-Level Security, chuẩn hóa schema cho bảng trận đấu, kèo, tỷ số. |
| **6. Đánh Giá & Kiểm Định Code** | `code-reviewer`, `web-design-guidelines` | Quét lỗ hổng bảo mật, kiểm tra không rò rỉ secret/credentials, rà soát type safety, audit UX theo chuẩn Web Interface Guidelines (`file:line` format). |
| **7. Kiểm Thử Trực Quan & E2E** | `control-ui-e2e` | Đảm bảo luồng giao diện mượt mà, kiểm tra độ trễ WebSocket real-time, kiểm tra giao diện trước và sau khi thay đổi (visual proof). |
| **8. Phát Triển Agent & Skill Mới** | `agent-development`, `skill-creator` | Chuẩn hóa subagent với YAML frontmatter đầy đủ `<example>`, quy trình eval & benchmark chặt chẽ. |

---

## 2. Quy Tắc Tuân Thủ Chi Tiết Từng Skill

### 🧠 Skill `brainstorming`
* Khi User đưa ra một ý tưởng tính năng mới (ví dụ: live odds ticker, chat box real-time, AI match prediction):
  1. Không vội vàng code ngay.
  2. Khảo sát hiện trạng code dự án.
  3. Đặt **duy nhất 1 câu hỏi làm rõ** theo dạng trắc nghiệm/lựa chọn.
  4. Đưa ra 2-3 phương án kỹ thuật cùng ưu/nhược điểm.
  5. Trình bày thiết kế thành từng phần ngắn (200-300 từ) và xác nhận với User.

### 🏛️ Skill `senior-architect` & `senior-fullstack`
* Phân tách rõ ràng giữa Backend (Domain Driven Modules: `game`, `match`, `prediction`, `realtime`, `community`) và Frontend (Component-driven atomic architecture: `common`, `match`, `prediction`, `hooks`, `types`).
* Luôn tuân thủ nguyên tắc không mã giả (No pseudocode), trả về module hoàn chỉnh, type-safe.

### 🎨 Skill `frontend-design` & `ui-ux-pro-max`
* **Phong cách:** Esports Cyberpunk HUD, bảng tỷ số điện tử, hiệu ứng neon pulse khi có bàn thắng/round win, độ tương phản chữ tối thiểu 4.5:1.
* **Typography:** `Outfit` cho body và UI, `Rajdhani` cho tiêu đề và tỷ số thể thao, `Space Grotesk` cho số liệu kỹ thuật.
* **Tương tác:** Nút bấm tối thiểu 44x44px trên mobile, hiệu ứng hover rõ ràng, loading skeleton chống giật layout (content-jumping).

### 🔍 Skill `code-reviewer` & `web-design-guidelines`
* Mọi file mới hoặc được chỉnh sửa phải đảm bảo:
  * Không có unused imports, không có biến `any`.
  * Không hardcode API key, token hoặc mật khẩu database.
  * Tuân thủ cấu trúc exception handling tập trung (`ApiResponse<T>`, `GlobalExceptionHandler`).

---

## 3. Cơ Chế Tự Động Ghi Nhớ & Kế Thừa (Persistence Protocol)
1. Trước khi bắt tay vào bất kỳ task mới nào, Agent tự động đối chiếu ma trận trên để chọn đúng skill phụ trách.
2. Tất cả quy tắc trên chỉ áp dụng trong phạm vi workspace `d:\esportsBLOG`, hoàn toàn cách ly với cấu hình toàn cục (global).

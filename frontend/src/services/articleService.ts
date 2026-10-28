import { supabase } from '../utils/supabase';
import { Article, ArticleFilter } from '../types/article';
import { GameId } from '../types/game';

// Realistic fallback articles matching the Supabase seed
export const FALLBACK_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Tổng quan VCT Masters 2026: Sentinels vs Fnatic - Đại chiến khu vực Americas vs EMEA',
    slug: 'tong-quan-vct-masters-2026-sen-vs-fnc',
    excerpt: 'Trận thư hùng đỉnh cao giữa 2 nền Valorant hùng mạnh nhất thế giới. Cùng điểm qua phong độ của zekken, Derke và bài toán map pool.',
    content: `Trận chung kết nhánh thắng VCT Masters 2026 đang hướng mọi sự chú ý về cuộc đối đầu duyên nợ giữa Sentinels và Fnatic. Cả hai đội đều đang thể hiện phong độ hủy diệt với lối chơi hiện đại.

Fnatic trung thành với lối đánh kỷ luật, kiểm soát bản đồ theo phong cách châu Âu kinh điển, trong khi Sentinels thăng hoa nhờ những pha opening duel bùng nổ của zekken. Điểm nóng của trận đấu chắc chắn sẽ nằm ở map Haven và Sunset, nơi cả hai bên đều sở hữu winrate trên 75%.

Chiến thuật cốt lõi:
1. Sentinels phụ thuộc vào việc đẩy nhanh nhịp độ ở round 3-8 để tích lũy ultimate.
2. Fnatic sở hữu khả năng retake bombsite A đạt tỷ lệ thành công 41% - cao nhất giải đấu.
3. Dự đoán: Trận đấu sẽ kéo dài sang map thứ 3 nghẹt thở.`,
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    gameTag: 'VALORANT',
    authorName: 'Hoàng Luân Analyst',
    isPremium: false,
    status: 'PUBLISHED',
    viewsCount: 1420,
    readTime: '4 phút',
    createdAt: '2026-10-28T14:00:00Z',
  },
  {
    id: 'art-2',
    title: 'Phân tích meta LCK Mùa Xuân 2026: Lựa chọn đường giữa kiểm soát thế trận',
    slug: 'phan-tich-meta-lck-mua-xuan-2026-duong-giua',
    excerpt: 'Tại sao Azir, Orianna và Taliyah tiếp tục là xương sống trong lối vận hành của các đội tuyển hàng đầu LCK?',
    content: `Meta LCK 2026 đang chứng kiến sự trở lại mạnh mẽ của các pháp sư kiểm soát giao tranh tổng. Với sự thay đổi về lượng vàng từ sâu hư không và rồng nguyên tố, khu vực đường giữa đóng vai trò như một mỏ neo chiến thuật.

Faker và Chovy tiếp tục cho thấy khả năng roam gank và kiểm soát tầm nhìn vượt trội, tạo tiền đề để xạ thủ xả sát thương an toàn trong giai đoạn 25 phút trở đi. Bất kỳ đội tuyển nào muốn xưng vương tại LCK đều phải giải bài toán kiểm soát nhịp độ từ cặp Mid-Jungle.`,
    coverImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
    gameTag: 'LOL',
    authorName: 'Văn Tùng Caster',
    isPremium: false,
    status: 'PUBLISHED',
    viewsCount: 980,
    readTime: '6 phút',
    createdAt: '2026-10-28T15:30:00Z',
  },
  {
    id: 'art-3',
    title: '[VIP PREDICTION] Kèo Chung Kết LCK: T1 vs Gen.G - Nhận Định Ban-Pick Chi Tiết & Tỷ Lệ Thắng Từng Ván',
    slug: 'vip-nhan-dinh-t1-vs-geng-chung-ket-lck-2026',
    excerpt: 'Phân tích độc quyền dành cho hội viên VIP: Tỷ lệ kèo chi tiết, ưu thế ban-pick ván 1-5 và tín hiệu AI tự tin 82% nghiêng về T1.',
    content: `DỮ LIỆU ĐỘC QUYỀN VIP & HỘI ĐỒNG PHÂN TÍCH:
Series Bo5 giữa T1 và Gen.G sẽ phụ thuộc tới 70% vào cặp đối đầu rừng - mid trong 15 phút đầu. 

1. THỐNG KÊ CHI TIẾT:
- Khi Oner cầm các vị tướng kiểm soát mục tiêu chủ động như Lee Sin hay Vi, tỷ lệ T1 ăn Sứ Giả và Rồng đầu lên tới 84.6%.
- Gen.G dù kiểm soát late game cực tốt với Chovy nhưng đường dưới của Peyz đang có dấu hiệu chững lại trước áp lực đè lane của Gumayusi - Keria.

2. TÍN HIỆU KÈO & DỰ ĐOÁN CHUYÊN SÂU:
- Kèo Ván 1: T1 First Blood (Tỷ lệ 1.78)
- Kèo Trận: T1 -1.5 ván
- Tỷ số chung cuộc: T1 3 - 1 Gen.G
- AI Confidence: 82.4% (Tín hiệu cực mạnh)`,
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    gameTag: 'LOL',
    authorName: 'Hội Đồng Chuyên Gia VIP',
    isPremium: true,
    status: 'PUBLISHED',
    viewsCount: 3540,
    readTime: '8 phút',
    createdAt: '2026-10-28T18:00:00Z',
  },
  {
    id: 'art-4',
    title: '[PRO ANALYSIS] Giải mã chiến thuật Haven của Sentinels: Khai thác C-Long và lối đánh Default tốc độ cao',
    slug: 'pro-giai-ma-chien-thuat-haven-sentinels',
    excerpt: 'Tài liệu nghiên cứu chuyên sâu: Sơ đồ di chuyển, timing ném kỹ năng smoke/flash và cách SEN phá vỡ cấu trúc phòng thủ A-Retake của Fnatic.',
    content: `Haven luôn là tử địa với bất kỳ đội tuyển nào đối đầu Sentinels trong năm 2026. 

Bằng việc hoán đổi vị trí của Sova và Cypher để liên tục thu thập thông tin ở Garage và C-Short, Sentinels luôn nắm được quân số đối phương trước khi đưa ra quyết định execute site. Báo cáo này bao gồm toàn bộ heat-map di chuyển, bảng phân tích round eco và bài counter-strat chuẩn xác cho người chơi chuyên nghiệp.`,
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80',
    gameTag: 'VALORANT',
    authorName: 'Pro Tactic Lab',
    isPremium: true,
    status: 'PUBLISHED',
    viewsCount: 2180,
    readTime: '7 phút',
    createdAt: '2026-10-28T17:15:00Z',
  },
  {
    id: 'art-5',
    title: 'CS2 BLAST Premier: FaZe Clan tìm lại phong độ với bài đánh Inferno cải tiến',
    slug: 'cs2-blast-premier-faze-clan-inferno-cai-tien',
    excerpt: 'Karrigan một lần nữa chứng minh tài năng lãnh đạo khi xây dựng lại hệ thống chiếm Banana và fake bombsite B mẫu mực.',
    content: `Trải qua giai đoạn bất ổn, FaZe Clan đã cho thấy sự hồi sinh mạnh mẽ tại vòng bảng BLAST Premier 2026. 

Điểm nhấn lớn nhất là cách họ tái cấu trúc bài đánh T-side trên Inferno. Việc dồn hỏa lực smoke sâu và dùng flash kép từ 2 góc khác nhau giúp FaZe vô hiệu hóa hoàn toàn cặp đôi phòng thủ của đối phương.`,
    coverImage: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=800&auto=format&fit=crop&q=80',
    gameTag: 'CS2',
    authorName: 'CS2 Tactical Hub',
    isPremium: false,
    status: 'PUBLISHED',
    viewsCount: 1120,
    readTime: '5 phút',
    createdAt: '2026-10-28T16:00:00Z',
  },
  {
    id: 'art-6',
    title: '[VIP KÈO NÓNG] Chung kết ĐTDV Mùa Đông: Saigon Phantom vs Team Flash - Phân tích Bo7 và bài toán chất tướng late game',
    slug: 'vip-chung-ket-dtdv-sgp-vs-fl-bo7-keo-nong',
    excerpt: 'Bản tin độc quyền VIP: So sánh bể tướng 7 ván, khả năng cấm chọn của HLV và nhận định kèo tài xỉu mạng hạ gục.',
    content: `DỰ BÁO VIP LIÊN QUÂN MOBILE:
Saigon Phantom đang ở giai đoạn đỉnh cao với sự gắn kết tuyệt đối giữa Bang và Fish. Team Flash dù có nhiều đột biến từ các tài năng trẻ nhưng tâm lý tại một trận Bo7 chung kết tổng là yếu tố bất lợi. 

NHẬN ĐỊNH CỦA CHUYÊN GIA:
1. Ván 1-2: SGP sẽ đánh phủ đầu với dàn tướng mở combat sớm (Florentino, Wonder Woman).
2. Kèo thơm: SGP First Blood ván 1, Tài 14.5 mạng hạ gục.
3. Chung cuộc: SGP thắng 4 - 2 để bảo vệ ngai vàng ĐTDV.`,
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    gameTag: 'AOV',
    authorName: 'Chuyên Gia Liên Quân VIP',
    isPremium: true,
    status: 'PUBLISHED',
    viewsCount: 4290,
    readTime: '9 phút',
    createdAt: '2026-10-28T19:00:00Z',
  },
];

export const fetchArticles = async (filter?: ArticleFilter, gameTag?: GameId | 'ALL'): Promise<Article[]> => {
  try {
    let query = supabase.from('posts').select('*').order('created_at', { ascending: false });

    if (filter === 'FREE') {
      query = query.eq('is_premium', false);
    } else if (filter === 'PREMIUM') {
      query = query.eq('is_premium', true);
    }

    if (gameTag && gameTag !== 'ALL') {
      query = query.eq('game_tag', gameTag);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      // Fallback to memory
      let filtered = [...FALLBACK_ARTICLES];
      if (filter === 'FREE') filtered = filtered.filter((a) => !a.isPremium);
      if (filter === 'PREMIUM') filtered = filtered.filter((a) => a.isPremium);
      if (gameTag && gameTag !== 'ALL') filtered = filtered.filter((a) => a.gameTag === gameTag);
      return filtered;
    }

    return data.map((d) => ({
      id: d.id,
      title: d.title,
      slug: d.slug,
      excerpt: d.excerpt,
      content: d.content,
      coverImage: d.cover_image,
      gameTag: d.game_tag as GameId,
      authorName: d.author_name,
      isPremium: d.is_premium,
      status: d.status,
      viewsCount: d.views_count,
      readTime: d.read_time,
      createdAt: d.created_at,
    }));
  } catch (err) {
    console.warn('Error fetching articles from Supabase, using fallback:', err);
    let filtered = [...FALLBACK_ARTICLES];
    if (filter === 'FREE') filtered = filtered.filter((a) => !a.isPremium);
    if (filter === 'PREMIUM') filtered = filtered.filter((a) => a.isPremium);
    if (gameTag && gameTag !== 'ALL') filtered = filtered.filter((a) => a.gameTag === gameTag);
    return filtered;
  }
};

export const createArticle = async (article: Omit<Article, 'id' | 'createdAt' | 'viewsCount'>): Promise<boolean> => {
  try {
    const { error } = await supabase.from('posts').insert([
      {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        cover_image: article.coverImage,
        game_tag: article.gameTag,
        author_name: article.authorName,
        is_premium: article.isPremium,
        status: article.status,
        read_time: article.readTime,
      },
    ]);
    return !error;
  } catch (e) {
    console.error('Error creating article:', e);
    return false;
  }
};

export const deleteArticle = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase.from('posts').delete().eq('id', id);
    return !error;
  } catch (e) {
    console.error('Error deleting article:', e);
    return false;
  }
};

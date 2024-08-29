import { PromotionModel } from "@shared/models/promotion.model";

export const PROMOTIONS: PromotionModel[] = [
  {
    promotion: 'promotion.expired',
    title: 'title.macAndPencil',
    imgURL: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/store-card-40-bts-offer-202406_GEO_VN?wid=800&hei=1000&fmt=p-jpg&qlt=95&.v=1717526810649'
  },
  {
    isEdu: true,
    promotion: 'promotion.airpods',
    title: 'title.macBookAir',
    description: '22.499.000đ',
    imgURL: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/store-card-40-bts-macbook-air-202406?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=1717542579551'
  },
  {
    isEdu: true,
    promotion: 'promotion.pencil',
    title: 'title.ipadAir',
    description: '15.599.000đ',
    imgURL: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/store-card-40-bts-ipad-air-202406_GEO_VN?wid=800&hei=1000&fmt=p-jpg&qlt=95&.v=1717542584851'
  },
  {
    isEdu: true,
    promotion: 'promotion.airpods',
    title: 'title.macbookPro',
    description: '37.499.000đ',
    imgURL: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/store-card-40-bts-macbook-pro-202406?wid=800&hei=1000&fmt=p-jpg&qlt=95&.v=1717542584936'
  },
  {
    isEdu: true,
    promotion: 'promotion.pencil',
    title: 'title.ipadPro',
    description: '26.099.000đ',
    imgURL: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/store-card-40-bts-ipad-pro-202406_GEO_VN?wid=800&hei=1000&fmt=p-jpg&qlt=95&.v=1717542584802'
  },
  {
    isEdu: true,
    promotion: 'promotion.airpods',
    title: 'title.imac',
    description: '35.599.000đ',
    imgURL: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/store-card-40-bts-imac-202406?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=1717542584914'
  },
  {
    isEdu: true,
    promotion: 'promotion.airpods',
    title: 'title.macMini',
    description: '12.499.000đ',
    imgURL: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/store-card-40-bts-mac-mini-202406?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=1716334554593'
  }
];

export const STUDENT_PROMOTIONS: PromotionModel[] = [
  {
    isEdu: true,
    promotion: 'Mới',
    title: 'Apple Pencil Pro',
    description: '3.199.000đ với chính sách trợ giá cho giáo dục.',
    imgURL: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MX2D3?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1713841707336'
  },
  {
    isEdu: true,
    promotion: 'Mới',
    title: 'Magic Keyboard cho iPad Pro 13 inch (M4) - Tiếng Anh Mỹ',
    description: '9.199.000đ với chính sách trợ giá cho giáo dục.',
    imgURL: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MWR53?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1713934300288'
  },
  {
    isEdu: true,
    promotion: 'Mới',
    title: 'Magic Keyboard Folio cho iPad (Thế hệ thứ 10) - Tiếng Anh Mỹ',
    description: '3.199.000đ với chính sách trợ giá cho giáo dục.',
    imgURL: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MQDP3?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1664481446939',
    colors: ['gray', 'black']
  },
  {
    isEdu: true,
    title: 'Apple Pencil (USB-C)',
    description: '1.899.000đ với chính sách trợ giá cho giáo dục.',
    imgURL: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MX2D3?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1713841707336'
  },
  {
    promotion: 'Khắc Miễn Phí',
    title: 'Airpods Pro (Thế hệ thứ 2) với Hộp Sạc Magsage (USB-C)',
    description: '6.199.000đ.',
    imgURL: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MTJV3?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1694014871985'
  },
  {
    title: 'Cáp Sạc USB-C 240W (2 m)',
    description: '819.000đ.',
    imgURL: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MU2G3?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1693236163178'
  }
]
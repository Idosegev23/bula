export type ParentCategoryId = 'businesses' | 'architecture' | 'carpentry';

export interface GalleryBusiness {
  id: string;
  name: string;
  location?: string;
  images: string[];
}

export interface GallerySubCategory {
  id: string;
  label: string;
  businesses: GalleryBusiness[];
}

export interface GalleryParentCategory {
  id: ParentCategoryId;
  label: string;
  subCategories: GallerySubCategory[];
}

const u = (id: string, w = 1400, h = 900) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

export const projectsGalleryData: GalleryParentCategory[] = [
  {
    id: 'businesses',
    label: 'עסקים',
    subCategories: [
      {
        id: 'bakeries',
        label: 'מאפיות',
        businesses: [
          {
            id: 'biz-bakery-1',
            name: 'מאפיית לחם הארץ',
            location: 'תל אביב',
            images: [
              u('1567521464027-f41150d05a54'),
              u('1555507036-ab1f4038808a'),
              u('1509440159596-0249088772ff'),
              u('1534620808146-d33bb39128b2'),
            ],
          },
          {
            id: 'biz-bakery-2',
            name: 'בוטיק מאפים',
            location: 'הרצליה',
            images: [
              u('1555507036-ab1f4038808a'),
              u('1568254183919-78a4f43a2877'),
              u('1608198093002-ad4e005484ec'),
            ],
          },
        ],
      },
      {
        id: 'gyms',
        label: 'חדרי כושר',
        businesses: [
          {
            id: 'biz-gym-1',
            name: 'סטודיו FIT',
            location: 'רמת גן',
            images: [
              u('1534438327276-14e5300c3a48'),
              u('1540497077202-7c8a3999166f'),
              u('1571902943202-507ec2618e8f'),
              u('1518611012118-696072aa579a'),
            ],
          },
          {
            id: 'biz-gym-2',
            name: 'CrossFit מרכז',
            location: 'גבעתיים',
            images: [
              u('1518611012118-696072aa579a'),
              u('1534258936925-c58bed479fcb'),
              u('1583454110551-21f2fa2afe61'),
            ],
          },
        ],
      },
      {
        id: 'restaurants',
        label: 'מסעדות',
        businesses: [
          {
            id: 'biz-rest-1',
            name: 'מסעדת לבנדר',
            location: 'תל אביב',
            images: [
              u('1554118811-1e0d58224f24'),
              u('1552566626-52f8b828add9'),
              u('1559339352-11d035aa65de'),
              u('1517248135467-4c7edcad34c4'),
            ],
          },
          {
            id: 'biz-rest-2',
            name: 'בית אוכל נחום',
            location: 'יפו',
            images: [
              u('1414235077428-338989a2e8c0'),
              u('1555396273-367ea4eb4db5'),
              u('1600891964092-4316c288032e'),
            ],
          },
        ],
      },
      {
        id: 'coffee',
        label: 'בתי קפה',
        businesses: [
          {
            id: 'biz-cafe-1',
            name: 'קפה נואר',
            location: 'תל אביב',
            images: [
              u('1582719508461-905c673771fd'),
              u('1445116572660-236099ec97a0'),
              u('1507133750040-4a8f57021571'),
              u('1559925393-8be0ec4767c8'),
            ],
          },
          {
            id: 'biz-cafe-2',
            name: 'ריסטרטו',
            location: 'חיפה',
            images: [
              u('1453614512568-c4024d13c247'),
              u('1521017432531-fbd92d768814'),
              u('1559496417-e7f25cb247f3'),
            ],
          },
        ],
      },
      {
        id: 'shops',
        label: 'חנויות',
        businesses: [
          {
            id: 'biz-shop-1',
            name: 'קונספט סטור',
            location: 'נווה צדק',
            images: [
              u('1441986300917-64674bd600d8'),
              u('1555529669-e69e7aa0ba9a'),
              u('1604176354204-9268737828e4'),
              u('1567401893414-76b7b1e5a7a5'),
            ],
          },
          {
            id: 'biz-shop-2',
            name: 'בוטיק עיצוב',
            location: 'רמת השרון',
            images: [
              u('1555529669-e69e7aa0ba9a'),
              u('1604176354204-9268737828e4'),
              u('1595526114035-0d45ed16cfbf'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'architecture',
    label: 'אדריכלות',
    subCategories: [
      {
        id: 'feature-walls',
        label: 'קירות מעוצבים',
        businesses: [
          {
            id: 'arc-wall-1',
            name: 'קיר אלון מסיבי',
            location: 'פרויקט פרטי, הרצליה',
            images: [
              u('1586023492125-27b2c045efd7'),
              u('1615529182904-14819c35db37'),
              u('1600210492486-724fe5c67fb0'),
            ],
          },
          {
            id: 'arc-wall-2',
            name: 'חיפוי גיאומטרי',
            location: 'לובי בניין, תל אביב',
            images: [
              u('1615529182904-14819c35db37'),
              u('1600210492486-724fe5c67fb0'),
              u('1618219944342-824e40a13285'),
            ],
          },
        ],
      },
      {
        id: 'unique-private',
        label: 'פרויקטים פרטיים ייחודיים',
        businesses: [
          {
            id: 'arc-priv-1',
            name: 'וילה ברמת השרון',
            location: 'רמת השרון',
            images: [
              u('1600607687939-ce8a6c25118c'),
              u('1600607688969-a5bfcd646154'),
              u('1600566753376-12c8ab7fb75b'),
              u('1600585154340-be6161a56a0c'),
            ],
          },
          {
            id: 'arc-priv-2',
            name: 'בית קיבוץ משודרג',
            location: 'עמק יזרעאל',
            images: [
              u('1600566753190-17f0baa2a6c3'),
              u('1600585154526-990dced4db0d'),
              u('1600607687644-c7171b42498f'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'carpentry',
    label: 'נגרות אישית',
    subCategories: [
      {
        id: 'kids-rooms',
        label: 'חדרי ילדים',
        businesses: [
          {
            id: 'carp-kid-1',
            name: 'חדר תאומים',
            location: 'רעננה',
            images: [
              u('1558618666-fcd25c85cd64'),
              u('1522771739844-6a9f6d5f14af'),
              u('1596178065887-1198b6148b2b'),
            ],
          },
          {
            id: 'carp-kid-2',
            name: 'חדר נערה',
            location: 'כפר סבא',
            images: [
              u('1522771739844-6a9f6d5f14af'),
              u('1596178065887-1198b6148b2b'),
              u('1558618666-fcd25c85cd64'),
            ],
          },
        ],
      },
      {
        id: 'closets',
        label: 'ארונות',
        businesses: [
          {
            id: 'carp-cl-1',
            name: 'ארון הלבשה מרהיב',
            location: 'סביון',
            images: [
              u('1558997519-dbb9faa3f6b9'),
              u('1595428774223-ef52624120d2'),
              u('1604014237800-1c9102c219da'),
              u('1556909114-f6e7ad7d3136'),
            ],
          },
          {
            id: 'carp-cl-2',
            name: 'ארון כניסה פונקציונלי',
            location: 'תל אביב',
            images: [
              u('1595428774223-ef52624120d2'),
              u('1604014237800-1c9102c219da'),
              u('1583845112203-454c7d134312'),
            ],
          },
        ],
      },
      {
        id: 'kitchens',
        label: 'מטבחים',
        businesses: [
          {
            id: 'carp-kit-1',
            name: 'מטבח אי מרכזי',
            location: 'הרצליה פיתוח',
            images: [
              u('1556912172-45b7abe8b7e1'),
              u('1556909114-f6e7ad7d3136'),
              u('1565538810643-b5bdb714032a'),
              u('1600210491892-03d54c0aaf87'),
            ],
          },
          {
            id: 'carp-kit-2',
            name: 'מטבח כפרי-מודרני',
            location: 'מושב בית יהושע',
            images: [
              u('1560448204-e02f11c3d0e2'),
              u('1565538810643-b5bdb714032a'),
              u('1556911220-bff31c812dba'),
            ],
          },
        ],
      },
    ],
  },
];

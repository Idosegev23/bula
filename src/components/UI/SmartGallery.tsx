import React, { useState, useEffect } from 'react';
import styles from './SmartGallery.module.css';

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  categories: string[];
}

export interface SmartGalleryProps {
  items: GalleryItem[];
  className?: string;
  showCategoryFilter?: boolean;
  columns?: 2 | 3 | 4;
  spacing?: 'small' | 'medium' | 'large';
}

export const SmartGallery: React.FC<SmartGalleryProps> = ({
  items,
  className = '',
  showCategoryFilter = true,
  columns = 3,
  spacing = 'medium'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>(items);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // קטגוריות ייחודיות
  const allCategories = ['all', ...Array.from(new Set(
    items.flatMap(item => item.categories || [item.category])
  ))];

  // פילטור פריטים לפי קטגוריה
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => 
        item.categories?.includes(selectedCategory) || item.category === selectedCategory
      ));
    }
  }, [selectedCategory, items]);

  // תרגום שמות קטגוריות לעברית
  const getCategoryDisplayName = (category: string): string => {
    const translations: Record<string, string> = {
      'all': 'הכל',
      'residential': 'פרטי',
      'commercial': 'מסחרי',
      'office': 'משרדים',
      'restaurant': 'מסעדות',
      'retail': 'קמעונאות',
      'healthcare': 'רפואה',
      'hospitality': 'אירוח',
      'education': 'חינוך',
      'industrial': 'תעשייה',
      'interior': 'עיצוב פנים',
      'architecture': 'אדריכלות',
      'renovation': 'שיפוץ',
      'new-construction': 'בנייה חדשה'
    };
    
    return translations[category] || category;
  };

  // פתיחת תמונה במודל
  const openModal = (item: GalleryItem) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden';
  };

  // סגירת מודל
  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  // טיפול במקלדת לסגירת מודל
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedImage]);

  return (
    <div className={`${styles.smartGallery} ${styles[`columns-${columns}`]} ${styles[`spacing-${spacing}`]} ${className}`}>
      {/* פילטר קטגוריות */}
      {showCategoryFilter && allCategories.length > 2 && (
        <div className={styles.categoryFilter}>
          {allCategories.map(category => (
            <button
              key={category}
              className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {getCategoryDisplayName(category)}
            </button>
          ))}
        </div>
      )}

      {/* גריד הגלריה */}
      <div className={styles.galleryGrid}>
        {filteredItems.map((item, index) => (
          <div 
            key={item.id}
            className={styles.galleryItem}
            onClick={() => openModal(item)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={styles.imageContainer}>
              <img 
                src={item.src} 
                alt={item.alt}
                className={styles.galleryImage}
                loading="lazy"
              />
              <div className={styles.overlay}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemCategory}>{getCategoryDisplayName(item.category)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* אם אין תוצאות */}
      {filteredItems.length === 0 && (
        <div className={styles.noResults}>
          <p>לא נמצאו פרויקטים בקטגוריה זו</p>
        </div>
      )}

      {/* מודל תמונה */}
      {selectedImage && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="סגור"
            >
              ×
            </button>
            
            <div className={styles.modalImageContainer}>
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt}
                className={styles.modalImage}
              />
            </div>
            
            <div className={styles.modalInfo}>
              <h2 className={styles.modalTitle}>{selectedImage.title}</h2>
              <p className={styles.modalCategory}>
                {getCategoryDisplayName(selectedImage.category)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

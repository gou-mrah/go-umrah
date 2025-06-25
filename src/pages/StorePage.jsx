import React, { useState } from 'react';
import GenericPage from './GenericPage';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { ShoppingCart, Star, Plus, Minus, Filter, Tag, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const ProductDetails = ({ product, t, currentLang, handleAddToCart }) => {
  const [quantity, setQuantity] = React.useState(1);
  return (
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle className={`text-2xl ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{product.name}</DialogTitle>
        <DialogDescription className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
          {product.category}
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
        <div className="flex items-center justify-center">
          <img  className="w-full max-w-[250px] h-auto object-contain rounded-lg" alt={product.name} src={product.imageSrc} />
        </div>
        <div className="flex flex-col justify-center">
          <p className={`text-gray-600 mb-4 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{product.description}</p>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-5 w-5 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
            <span className="text-gray-500 text-sm ml-2">({product.reviews} {currentLang === 'ar' ? 'تقييمات' : 'reviews'})</span>
          </div>
          <p className="text-3xl font-bold text-primary mb-4">{product.price}</p>
          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
            <Label>{currentLang === 'ar' ? 'الكمية' : 'Quantity'}</Label>
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="h-4 w-4" /></Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}><Plus className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button className="w-full" onClick={() => handleAddToCart({ ...product, quantity }, 'store')}>
          <ShoppingCart className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
          {t.buttons.addToCart}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

const StorePage = ({ t, handleFeatureClick, currentLang, handleAddToCart }) => {
  const pageTitle = t.nav.store;
  const pageDescription = t.services.store.description;
  const backgroundImage = currentLang === 'ar' ? "متجر هدايا إسلامية في مكة" : "Islamic gift shop in Makkah";

  const allProducts = [
    { id: 'ihram-1', name: currentLang === 'ar' ? 'طقم إحرام قطن' : 'Cotton Ihram Set', category: currentLang === 'ar' ? 'ملابس' : 'Clothing', price: 120, image: 'A high-quality white cotton Ihram set for pilgrimage', description: currentLang === 'ar' ? 'طقم إحرام من قطن مصري فاخر، مريح وناعم على البشرة.' : 'Premium Egyptian cotton Ihram set, comfortable and soft.', rating: 5, reviews: 150, imageSrc: 'https://images.unsplash.com/photo-1635865165118-917ed9e20936' },
    { id: 'prayer-mat-1', name: currentLang === 'ar' ? 'سجادة صلاة مبطنة' : 'Padded Prayer Mat', category: currentLang === 'ar' ? 'مستلزمات الصلاة' : 'Prayer Essentials', price: 85, image: 'A thick, padded prayer mat with an elegant design', description: currentLang === 'ar' ? 'سجادة صلاة فاخرة مع طبقة إسفنجية لتوفير أقصى درجات الراحة.' : 'Luxury prayer mat with a foam layer for maximum comfort.', rating: 4, reviews: 210, imageSrc: 'https://images.unsplash.com/photo-1604273320215-a88721f7c16c' },
    { id: 'miswak-1', name: currentLang === 'ar' ? 'مسواك طبيعي' : 'Natural Miswak', category: currentLang === 'ar' ? 'عناية شخصية' : 'Personal Care', price: 10, image: 'A fresh, natural miswak stick in a hygienic package', description: currentLang === 'ar' ? 'مسواك طبيعي من شجرة الأراك، منظف ومعطر للفم.' : 'Natural miswak from the Arak tree, cleanses and freshens the mouth.', rating: 5, reviews: 500, imageSrc: 'https://images.unsplash.com/photo-1589922535360-4c86a4646e28' },
    { id: 'dates-1', name: currentLang === 'ar' ? 'تمر عجوة المدينة' : 'Ajwa Dates from Madinah', category: currentLang === 'ar' ? 'أغذية' : 'Food', price: 90, image: 'A box of premium Ajwa dates from Madinah', description: currentLang === 'ar' ? 'أجود أنواع تمر العجوة من مزارع المدينة المنورة، غني بالفوائد.' : 'The finest Ajwa dates from Madinah farms, rich in benefits.', rating: 5, reviews: 320, imageSrc: 'https://images.unsplash.com/photo-1598228668182-25b7a102b912' },
    { id: 'tasbih-1', name: currentLang === 'ar' ? 'سبحة كريستال' : 'Crystal Tasbih', category: currentLang === 'ar' ? 'اكسسوارات' : 'Accessories', price: 45, image: 'Elegant crystal prayer beads', description: currentLang === 'ar' ? 'سبحة من الكريستال اللامع، مثالية للذكر والتسبيح.' : 'Shiny crystal prayer beads, perfect for dhikr and tasbih.', rating: 4, reviews: 95, imageSrc: 'https://images.unsplash.com/photo-1605394354335-3a778b00e05c' },
    { id: 'zamzam-1', name: currentLang === 'ar' ? 'عبوة ماء زمزم' : 'Zamzam Water Bottle', category: currentLang === 'ar' ? 'أغذية' : 'Food', price: 25, image: 'A sealed bottle of pure Zamzam water', description: currentLang === 'ar' ? 'ماء زمزم مبارك في عبوة محكمة الإغلاق للحفاظ على جودته.' : 'Blessed Zamzam water in a sealed bottle to preserve its quality.', rating: 5, reviews: 800, imageSrc: 'https://images.unsplash.com/photo-1604933942926-69064a1c485e' },
    { id: 'book-1', name: currentLang === 'ar' ? 'حصن المسلم' : 'Fortress of the Muslim', category: currentLang === 'ar' ? 'كتب' : 'Books', price: 30, image: 'The Fortress of the Muslim book of supplications', description: currentLang === 'ar' ? 'كتاب الأدعية والأذكار الشهير "حصن المسلم" بحجم الجيب.' : 'The famous book of supplications and remembrances "Fortress of the Muslim" in pocket size.', rating: 5, reviews: 450, imageSrc: 'https://images.unsplash.com/photo-1532012197267-da84d127e765' },
    { id: 'perfume-1', name: currentLang === 'ar' ? 'عطر العود' : 'Oud Perfume Oil', category: currentLang === 'ar' ? 'عناية شخصية' : 'Personal Care', price: 150, image: 'A small bottle of concentrated oud perfume oil', description: currentLang === 'ar' ? 'دهن عود أصلي برائحة فواحة تدوم طويلاً.' : 'Original oud oil with a long-lasting, fragrant scent.', rating: 4, reviews: 180, imageSrc: 'https://images.unsplash.com/photo-1557175326-0ee474529553' },
  ];

  const [filters, setFilters] = useState({ category: 'all', price: 'all', rating: 'all' });
  const categories = ['all', ...new Set(allProducts.map(p => p.category))];

  const filteredProducts = allProducts.filter(p => {
    const categoryMatch = filters.category === 'all' || p.category === filters.category;
    const ratingMatch = filters.rating === 'all' || p.rating >= parseInt(filters.rating);
    const priceMatch = filters.price === 'all' ||
      (filters.price === 'low' && p.price <= 50) ||
      (filters.price === 'mid' && p.price > 50 && p.price <= 100) ||
      (filters.price === 'high' && p.price > 100);
    return categoryMatch && ratingMatch && priceMatch;
  });

  return (
    <GenericPage pageKey="store" pageTitle={pageTitle} pageDescription={pageDescription} t={t} currentLang={currentLang} backgroundImage={backgroundImage}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg h-fit sticky top-24 border border-gray-200/50">
          <h3 className={`text-xl font-bold mb-6 flex items-center text-primary ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
            <Filter className="mr-2 rtl:ml-2 rtl:mr-0 h-5 w-5" />
            {currentLang === 'ar' ? 'تصفية المنتجات' : 'Filter Products'}
          </h3>
          <div className="space-y-5">
            <div>
              <Label className={`block text-sm font-semibold text-gray-800 mb-1.5 flex items-center ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                <Tag className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 text-gray-500" />
                {currentLang === 'ar' ? 'الفئة' : 'Category'}
              </Label>
              <Select value={filters.category} onValueChange={(value) => setFilters(f => ({...f, category: value}))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map(c => <SelectItem key={c} value={c}>{c === 'all' ? (currentLang === 'ar' ? 'كل الفئات' : 'All Categories') : c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className={`block text-sm font-semibold text-gray-800 mb-1.5 flex items-center ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                <DollarSign className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 text-gray-500" />
                {currentLang === 'ar' ? 'السعر' : 'Price'}
              </Label>
              <Select value={filters.price} onValueChange={(value) => setFilters(f => ({...f, price: value}))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{currentLang === 'ar' ? 'كل الأسعار' : 'All Prices'}</SelectItem>
                  <SelectItem value="low">{currentLang === 'ar' ? 'أقل من 50 ريال' : 'Under 50 SAR'}</SelectItem>
                  <SelectItem value="mid">{currentLang === 'ar' ? '50 - 100 ريال' : '50 - 100 SAR'}</SelectItem>
                  <SelectItem value="high">{currentLang === 'ar' ? 'أكثر من 100 ريال' : 'Over 100 SAR'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className={`block text-sm font-semibold text-gray-800 mb-1.5 flex items-center ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                <Star className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 text-gray-500" />
                {currentLang === 'ar' ? 'التقييم' : 'Rating'}
              </Label>
              <Select value={filters.rating} onValueChange={(value) => setFilters(f => ({...f, rating: value}))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{currentLang === 'ar' ? 'كل التقييمات' : 'All Ratings'}</SelectItem>
                  <SelectItem value="4">{currentLang === 'ar' ? '4 نجوم فأكثر' : '4 Stars & up'}</SelectItem>
                  <SelectItem value="5">{currentLang === 'ar' ? '5 نجوم فقط' : '5 Stars only'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </aside>
        <main className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-200/50 flex flex-col group"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative cursor-pointer">
                      <img  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" alt={product.name} src={product.imageSrc} />
                      <div className="absolute top-0 left-0 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-br-lg">
                        {product.category}
                      </div>
                    </div>
                  </DialogTrigger>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className={`text-lg font-bold text-primary mb-1 flex-grow ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{product.name}</h3>
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xl font-semibold text-primary">{product.price} {currentLang === 'ar' ? 'ريال' : 'SAR'}</p>
                      <Button size="sm" onClick={(e) => { e.stopPropagation(); handleAddToCart(product, 'store'); }}>
                        <ShoppingCart className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <ProductDetails product={{...product, price: `${product.price} ${currentLang === 'ar' ? 'ريال' : 'SAR'}`}} t={t} currentLang={currentLang} handleAddToCart={handleAddToCart} />
                </Dialog>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </GenericPage>
  );
};

export default StorePage;
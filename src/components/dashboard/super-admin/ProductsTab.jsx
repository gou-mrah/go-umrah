import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit3, Trash2 } from 'lucide-react';

const ProductsTab = ({ products, newProduct, setNewProduct, handleCreateProduct, t, currentLang }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
            {currentLang === 'ar' ? 'إضافة منتج جديد' : 'Add New Product'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="productName">{currentLang === 'ar' ? 'اسم المنتج' : 'Product Name'}</Label>
              <Input
                id="productName"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="productCategory">{currentLang === 'ar' ? 'الفئة' : 'Category'}</Label>
              <Input
                id="productCategory"
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="productPrice">{currentLang === 'ar' ? 'السعر' : 'Price'}</Label>
              <Input
                id="productPrice"
                type="number"
                step="0.01"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="productStock">{currentLang === 'ar' ? 'الكمية' : 'Stock Quantity'}</Label>
              <Input
                id="productStock"
                type="number"
                value={newProduct.stock_quantity}
                onChange={(e) => setNewProduct({...newProduct, stock_quantity: e.target.value})}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="productDescription">{currentLang === 'ar' ? 'الوصف' : 'Description'}</Label>
              <Textarea
                id="productDescription"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                {currentLang === 'ar' ? 'إضافة المنتج' : 'Add Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
            {currentLang === 'ar' ? 'المنتجات الحالية' : 'Current Products'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products?.map((product) => (
              <div key={product.id} className="border rounded-lg p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.category}</p>
                <p className="text-lg font-bold text-primary">{product.price} {currentLang === 'ar' ? 'ريال' : 'SAR'}</p>
                <p className="text-sm">
                  {currentLang === 'ar' ? 'الكمية:' : 'Stock:'} {product.stock_quantity}
                </p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsTab;
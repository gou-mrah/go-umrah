import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const ProvidersTab = ({ providers, providersLoading, handleProviderStatusChange, t, currentLang }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
          {currentLang === 'ar' ? 'إدارة مقدمي الخدمات' : 'Service Providers Management'}
        </CardTitle>
        <CardDescription className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
          {currentLang === 'ar' ? 'مراجعة والموافقة على طلبات مقدمي الخدمات الجدد.' : 'Review and approve new service provider applications.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {providersLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">{currentLang === 'ar' ? 'الشركة' : 'Company'}</th>
                  <th scope="col" className="px-6 py-3">{currentLang === 'ar' ? 'المالك' : 'Owner'}</th>
                  <th scope="col" className="px-6 py-3">{currentLang === 'ar' ? 'الحالة' : 'Status'}</th>
                  <th scope="col" className="px-6 py-3 text-center">{currentLang === 'ar' ? 'إجراء' : 'Action'}</th>
                </tr>
              </thead>
              <tbody>
                {providers?.map(provider => (
                  <tr key={provider.id} className="bg-white border-b">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {provider.company_name}
                    </td>
                    <td className="px-6 py-4">
                      {provider.profiles?.full_name || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        provider.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {provider.is_approved ? (currentLang === 'ar' ? 'مقبول' : 'Approved') : (currentLang === 'ar' ? 'معلق' : 'Pending')}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2 justify-center">
                      {!provider.is_approved && (
                        <Button 
                          size="sm" 
                          onClick={() => handleProviderStatusChange(provider.id, true)}
                          className="text-green-600 border-green-600 hover:bg-green-50"
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleProviderStatusChange(provider.id, false)}
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProvidersTab;
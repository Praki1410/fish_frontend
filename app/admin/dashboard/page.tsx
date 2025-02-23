'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store/store';
import { deleteFish, getAllFishes } from '@/lib/store/slices/fishSlice';
import { getAllCategories } from '@/lib/store/slices/catrgorySlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Fish as FishIcon, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { deleteCategory } from '@/lib/store/slices/catrgorySlice';

export default function AdminDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { fishes, isLoading: fishLoading } = useSelector((state: RootState) => state.fish);
  const { categories, isLoading: categoryLoading } = useSelector(
    (state: RootState) => state.category
  );

  useEffect(() => {
    dispatch(getAllFishes());
    dispatch(getAllCategories());
  }, [dispatch]);

  if (fishLoading || categoryLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="space-x-4">
          <Button onClick={() => router.push('/admin/fish/add')}>
            <Plus className="mr-2 h-4 w-4" /> Add Fish
          </Button>
          <Button onClick={() => router.push('/admin/catogeries/add')} variant="outline">
            <Plus className="mr-2 h-4 w-4" /> Add Category
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fish</CardTitle>
            <FishIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fishes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <FishIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Manage Fish</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fishes.map((fish) => (
            <Card key={fish.id}>
              <CardHeader>
                <CardTitle>{fish.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{fish.description}</p>
                <p className="mt-2 font-semibold">Price: ${fish.price}</p>
                <div className="mt-4 space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/admin/fish/edit/${fish.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this fish?')) {
                        dispatch(deleteFish(fish.id));
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Manage Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mt-4 space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/admin/categories/edit/${category.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this category?')) {
                        dispatch(deleteCategory(category.id));
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
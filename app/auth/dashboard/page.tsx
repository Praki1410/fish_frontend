'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store/store';
import { getAllFishes } from '@/lib/store/slices/fishSlice';
import { getAllCategories } from '@/lib/store/slices/catrgorySlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Fish as FishIcon } from 'lucide-react';

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
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
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
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
        <h2 className="text-2xl font-semibold mb-4">Available Fish</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fishes.map((fish) => (
            <Card key={fish.id}>
              <CardHeader>
                <CardTitle>{fish.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{fish.description}</p>
                <p className="mt-2 font-semibold">Price: ${fish.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
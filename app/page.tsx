// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/lib/store/store';
// import { Button } from '@/components/ui/button';
// import { Fish } from 'lucide-react';

// export default function Home() {
//   const { user } = useSelector((state: RootState) => state.auth);
//   const router = useRouter();

//   useEffect(() => {
//     if (user) {
//       if (user.role === 'admin') {
//         router.push('/admin/dashboard');
//       } else {
//         router.push('/dashboard');
//       }
//     }
//   }, [user, router]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
//       <div className="container mx-auto px-4 py-16">
//         <div className="text-center">
//           <div className="flex justify-center mb-6">
//             <Fish className="h-16 w-16 text-blue-600" />
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             Welcome to FishMarket
//           </h1>
//           <p className="text-xl text-gray-600 mb-8">
//             Your one-stop destination for fresh and quality fish
//           </p>
//           <div className="space-x-4">
//             <Button
//               onClick={() => router.push('/auth/login')}
//               className="bg-blue-600 hover:bg-blue-700"
//             >
//               Login
//             </Button>
//             <Button
//               onClick={() => router.push('/auth/register')}
//               variant="outline"
//               className="border-blue-600 text-blue-600 hover:bg-blue-50"
//             >
//               Register
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Fish } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Fish className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome, Admin
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Manage your FishMarket platform efficiently.
          </p>
          <div className="space-x-4">
            <Button
              onClick={() => router.push('/admin/dashboard')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Go to Dashboard
            </Button>
            <Button
              onClick={() => router.push('/admin/settings')}
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// import {toast} from 'react-hot-toast';
// import { services } from '../data/services';
// import { useStore } from '../store/useStore';

// export default function POS() {
//   const addToCart = useStore((state) => state.addToCart);
  
//   // const addCart = () => {
//   //   //addToCart({quantity: 1});
//   //    toast.success('Item added to cart');
//   // }
//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold text-gray-900">Available Services</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {services.map((service) => (
//           <div
//             key={service.id}
//             className="bg-white rounded-lg shadow-md overflow-hidden"
//           >
//             <img
//               src={service.image}
//               alt={service.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4 space-y-2">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 {service.name}
//               </h3>
//               <p className="text-gray-600">{service.description}</p>
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-lg font-bold text-indigo-600">
//                     ${service.price}
//                   </p>
//                   <p className="text-sm text-gray-500">{service.duration}</p>
//                 </div>
//                 <button
//                   onClick={() =>
//                     addToCart({service, quantity: 1});
//                     toast.success('Item added to cart');              
//                   }
//                   className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { toast } from 'react-hot-toast';
import { services } from '../data/services';
import { useStore } from '../store/useStore';

export default function POS() {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Available Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {service.name}
              </h3>
              <p className="text-gray-600">{service.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold text-indigo-600">
                    ${service.price}
                  </p>
                  <p className="text-sm text-gray-500">{service.duration}</p>
                </div>
                <button
                  onClick={() => {
                    addToCart({ service, quantity: 1 });
                    toast.success('Item added to cart');
                  }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

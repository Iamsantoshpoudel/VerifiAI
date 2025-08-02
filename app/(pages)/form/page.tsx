// "use client"
// // import Form from "@/components/Form"
// import Image from "next/image";
// import { useState } from "react";
// import design from "@/assets/design/Untitled10.webp"
// import skelaton from "@/assets/design/skelaton.webp"
// import Navbar from "@/components/Navbar"
// import Footer from "@/components/Footer"

// const page = () => {
//   const [imageLoaded, setImageLoaded] = useState(false);

//   return (
//     <>
//       <Navbar />
//       <section className="flex justify-center items-center min-h-screen w-full md:justify-start md:items-start relative">
//         {/* Skeleton Image - shown while main image is loading */}
//         {!imageLoaded && (
//           <Image
//             src={skelaton}
//             alt="Loading skeleton"
//             width={900}
//             height={900}
//             className="w-full h-auto max-w-full max-h-screen object-contain md:w-auto md:h-auto md:max-w-none absolute inset-0"
//           />
//         )}
        
//         {/* Main Design Image */}
//         <Image
//           src={design}
//           alt="Design image"
//           width={900}
//           height={900}
//           className={`w-full h-auto max-w-full max-h-screen object-contain md:w-auto md:h-auto md:max-w-none transition-opacity duration-300 ${
//             imageLoaded ? 'opacity-100' : 'opacity-0'
//           }`}
//           onLoad={() => setImageLoaded(true)}
//         />
//       </section>
//       <Footer />
//     </>
//   )
// }

// export default page

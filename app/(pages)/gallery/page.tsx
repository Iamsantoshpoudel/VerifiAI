import fs from "fs";
import path from "path";
import Image from "next/image";

export default async function Gallery() {
  // Get images from public/admin directory
  const publicImagesDir = path.join(process.cwd(), "public", "admin");
  const publicImages = fs.existsSync(publicImagesDir)
    ? fs.readdirSync(publicImagesDir).filter((file) =>
        /\.(jpe?g|png|gif|webp|svg)$/i.test(file)
      )
    : [];

  // Get images from assets/images directory
  const assetsImagesDir = path.join(process.cwd(), "assets", "images");
  const assetsImages = fs.existsSync(assetsImagesDir)
    ? fs.readdirSync(assetsImagesDir).filter((file) =>
        /\.(jpe?g|png|gif|webp|svg)$/i.test(file)
      )
    : [];

  // Combine images with public/admin images first
  const allImageFiles = [...publicImages, ...assetsImages];

  // Map filenames to src URLs
  const images = allImageFiles.map((file, index) => ({
    src:
      index < publicImages.length
        ? `/admin/${file}`
        : `/api/serve-image?filename=${encodeURIComponent(file)}`,
    alt: file.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
  }));

  return (
    <main className="p-4 font-sans">
      <h1 className="text-3xl font-bold mb-6">Gallery</h1>

      <div
        className="
          columns-1
          sm:columns-2
          md:columns-3
          lg:columns-4
          xl:columns-5
          gap-4
        "
        style={{ columnWidth: "150px" }}
      >
        {images.map(({ src, alt }, i) => (
          <div key={i} className="mb-4 break-inside-avoid">
            <Image
              src={src}
              alt={alt}
              width={300}
              height={300}
              className={`w-full h-auto rounded-lg object-cover shadow-md`}
              priority={i < 10}
              loading={i < 10 ? "eager" : "lazy"}
              sizes="(max-width: 768px) 50vw, 150px"
            />
          </div>
        ))}
      </div>
    </main>
  );
}


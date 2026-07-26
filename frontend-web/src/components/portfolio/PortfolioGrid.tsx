import { readImageKitFolder, type ImageKitCachedFile } from "@/lib/imagekitCache";

function getTitle(img: ImageKitCachedFile): string {
  const title = img.customMetadata?.title_art;
  if (typeof title === "string" && title.trim().length > 0) return title.trim();
  return img.name || "Kunstwerk";
}

function getYear(img: ImageKitCachedFile): string | null {
  const year = img.customMetadata?.year_art;
  if (typeof year === "number") return String(year);
  if (typeof year === "string" && year.trim().length > 0) return year.trim();
  const m = (img.name || "").match(/^(\d{4})_/);
  return m ? m[1] : null;
}

const pattern = [
  "size-3x2",
  "size-2x1",
  "size-3x1",
  "size-2x2",

  "size-2x2",
  "size-3x2",
  "size-2x1",
  "size-3x1",

  "size-3x1",
  "size-2x2",
  "size-3x2",
  "size-2x1",
];

type Props = {
  folder: "portfolio" | "shop" | "blog";
  limit?: number;
};

export default async function PortfolioGrid({ folder, limit }: Props) {
  const data = await readImageKitFolder(folder);
  const items = [...data.items];

  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  const visible = typeof limit === "number" ? items.slice(0, limit) : items;

  return (
    <div className="portfolio-grid">
      {visible.map((img, idx) => {
        const title = getTitle(img);
        const year = getYear(img);
        const layoutClass = pattern[idx % pattern.length];
        const optimizedUrl = `${img.url}&tr=w-1200,c-at_max,q-60,f-avif`;

        return (
          <div key={img.fileId} className={`portfolio-item ${layoutClass}`}>
            <img src={optimizedUrl} alt={title} loading="lazy" />
            <div className="overlay">
              <span>
                {title}
                {year ? <>{" \u00B7 "}{year}</> : null}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

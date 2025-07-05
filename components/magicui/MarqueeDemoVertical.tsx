/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
const reviews = [
  {
    name: "Anisha",
    username: "@anisha_dev",
    body: "VerifiAI helped me instantly detect AI-generated images with stunning accuracy. A must-have for content creators!",
    img: "https://avatar.vercel.sh/anisha",
  },
  {
    name: "Ramesh",
    username: "@ramesh123",
    body: "The AI fact-checking is brilliant. I can finally verify content before sharing. Game changer for researchers.",
    img: "https://avatar.vercel.sh/ramesh",
  },
  {
    name: "Sophia",
    username: "@sophiaTech",
    body: "The unified dashboard is clean and super easy to use. Can't wait for the audio and video detection features!",
    img: "https://avatar.vercel.sh/sophia",
  },
  {
    name: "Dinesh",
    username: "@dineshAI",
    body: "I tested the image detector with several deepfakes — VerifiAI nailed it every time. Impressive results!",
    img: "https://avatar.vercel.sh/dinesh",
  },
  {
    name: "Meera",
    username: "@meera_writer",
    body: "As a writer, verifying the authenticity of articles is crucial. VerifiAI makes it effortless.",
    img: "https://avatar.vercel.sh/meera",
  },
  {
    name: "Liam",
    username: "@liamCode",
    body: "Finally, a tool that keeps up with the rise of AI-generated content. Excited to see future updates!",
    img: "https://avatar.vercel.sh/liam",
  },
  {
    name: "Rajeev",
    username: "@rajeev_data",
    body: "Used the fact-checker to verify a viral claim — it gave me clear and accurate context. Well done!",
    img: "https://avatar.vercel.sh/rajeev",
  },
  {
    name: "Olivia",
    username: "@oliviaUX",
    body: "I’m impressed by the speed and precision. It fits perfectly into my design workflow for content validation.",
    img: "https://avatar.vercel.sh/olivia",
  },
  {
    name: "Karan",
    username: "@karaneditz",
    body: "Waiting eagerly for the video and audio detection. Even now, VerifiAI is an essential tool for my team.",
    img: "https://avatar.vercel.sh/karan",
  },
  {
    name: "Emily",
    username: "@emily_review",
    body: "Simple, accurate, and built with purpose. VerifiAI is going to be huge in the AI era.",
    img: "https://avatar.vercel.sh/emily",
  },
  {
    name: "Sagar",
    username: "@sagarCyber",
    body: "Great tool for cybersecurity awareness. Helps people know what’s real and what’s AI-made. Love it.",
    img: "https://avatar.vercel.sh/sagar",
  },
  {
    name: "Tina",
    username: "@tinaChecks",
    body: "Highly recommended for journalists and educators. VerifiAI brings transparency to digital content.",
    img: "https://avatar.vercel.sh/tina",
  },
  
];

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 6));
const secondRow = reviews.slice(Math.ceil(reviews.length / 6), Math.ceil(reviews.length / 3));
const thirdRow = reviews.slice(Math.ceil(reviews.length / 3), Math.ceil(reviews.length / 2));
const fourthRow = reviews.slice(Math.ceil(reviews.length / 2), Math.ceil(reviews.length * 2 / 3));
const fifthRow = reviews.slice(Math.ceil(reviews.length * 2 / 3), Math.ceil(reviews.length * 5 / 6));
const sixthRow = reviews.slice(Math.ceil(reviews.length * 5 / 6));

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-fit sm:w-36 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemoVertical() {
  return (
    <div className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden gap-4">
      <Marquee pauseOnHover vertical className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="[--duration:18s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee pauseOnHover vertical className="[--duration:22s]">
        {thirdRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="[--duration:16s]">
        {fourthRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee pauseOnHover vertical className="[--duration:24s]">
        {fifthRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="[--duration:19s]">
        {sixthRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  );
}

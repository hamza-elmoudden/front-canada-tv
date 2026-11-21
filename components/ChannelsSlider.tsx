import Image from "next/image";
import { altText } from "@/lib/i18n";
import { getI18n } from "@/lib/locale";

// Logos in public/channel/. Filenames contain spaces and "+", so they are URL-encoded.
const CHANNELS: { file: string; name: string }[] = [
  { file: "Polsat.jpeg", name: "Polsat" },
  { file: "TVN.jpeg", name: "TVN" },
  { file: "Sky Sports.jpeg", name: "Sky Sports" },
  { file: "DAZN.jpeg", name: "DAZN" },
  { file: "bein.jpeg", name: "beIN Sports" },
  { file: "espn premiun.jpeg", name: "ESPN" },
  { file: "nextflex.jpeg", name: "Netflix" },
  { file: "hbo_max.jpeg", name: "HBO Max" },
  { file: "Disney+.jpeg", name: "Disney+" },
  { file: "primevideo.jpeg", name: "Prime Video" },
  { file: "paramount.jpeg", name: "Paramount+" },
  { file: "Ankiety TV.jpeg", name: "Ankiety TV" },
  { file: "tv.jpeg", name: "Live TV" },
];

export async function ChannelsSlider() {
  const { ui } = await getI18n();
  // The list is rendered twice so the -50% translate loops seamlessly.
  const loop = [...CHANNELS, ...CHANNELS];
  return (
    <div id="brands" aria-label={ui.channelsLabel} className="relative z-10 overflow-hidden border-y border-teal/20 bg-crimson/4 py-10">
      <div className="relative overflow-hidden before:pointer-events-none before:absolute before:inset-y-0 before:right-0 before:z-2 before:w-20 before:bg-linear-to-l before:from-bg before:to-transparent after:pointer-events-none after:absolute after:inset-y-0 after:left-0 after:z-2 after:w-20 after:bg-linear-to-r after:from-bg after:to-transparent">
        <div className="flex w-max animate-scroll-ltr gap-12 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {loop.map((c, i) => (
            <div className="group flex shrink-0 flex-col items-center gap-2 px-4 py-2 transition-transform duration-200 hover:scale-110" key={i} aria-hidden={i >= CHANNELS.length}>
              <div className="relative size-16 overflow-hidden rounded-[14px] border border-white/8 bg-white/5">
                <Image
                  src={`/channel/${encodeURIComponent(c.file)}`}
                  alt={i < CHANNELS.length ? altText(ui.alt.channel, c.name) : ""}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-semibold tracking-[0.03em] text-muted transition-colors duration-300 group-hover:text-teal">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

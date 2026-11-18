import { MoviesTrack } from "@/components/MoviesTrack";
import { getI18n } from "@/lib/locale";
import { sectionHeadCenter, sectionLabel, sectionSubCenter, sectionTitle } from "@/lib/ui";

// Posters in public/movies/. Filenames contain spaces and Polish characters, so they are URL-encoded.
const MOVIES: { file: string; title: string }[] = [
  { file: "game of thrones.jpeg", title: "Game of Thrones" },
  { file: "Boże Ciało.jpeg", title: "Boże Ciało" },
  { file: "iptv peaky balnders netflex free.jpeg", title: "Peaky Blinders" },
  { file: "the hobbit.jpeg", title: "The Hobbit" },
  { file: "Chlopi.jpeg", title: "Chłopi" },
  { file: "vikings.jpeg", title: "Vikings" },
  { file: "aquaman movies iptv.jpeg", title: "Aquaman" },
  { file: "Kawulski.jpeg", title: "Jak zostałem gangsterem" },
  { file: "iptv netflix dark.jpeg", title: "Dark" },
  { file: "titanic  movies free .jpeg", title: "Titanic" },
  { file: "Bogowie .jpeg", title: "Bogowie" },
  { file: "movies lucifer free.jpeg", title: "Lucifer" },
  { file: "troy movies.jpeg", title: "Troy" },
  { file: "movies 1899.jpeg", title: "1899" },
  { file: "unchart movies iptv.jpeg", title: "Uncharted" },
  { file: "juman fro free.jpeg", title: "Jumanji" },
];

export async function MoviesSlider() {
  const { ui } = await getI18n();

  return (
    <section id="movies" className="relative isolate overflow-x-clip py-24 max-[480px]:py-16" aria-labelledby="movies-title">
      <div className={`${sectionHeadCenter} px-8`}>
        <span className={sectionLabel}>{ui.movies.label}</span>
        <h2 id="movies-title" className={sectionTitle}>
          {ui.movies.title}
        </h2>
        <p className={sectionSubCenter}>{ui.movies.sub}</p>
      </div>

      <MoviesTrack movies={MOVIES} />
    </section>
  );
}

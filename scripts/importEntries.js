const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

function getStatus(status) {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'current':
      return 'Watching';
    case 'dropped':
      return 'Dropped';
    case 'planned':
      return 'Wanted';
    case 'on_hold':
      return 'OnHold';
    default:
      throw new Error(`Unknown status: ${status}`);
  }
}

(async function run() {
  const prisma = new PrismaClient();

  await prisma.entry.deleteMany({ where: { user_id: 1 } });

  let url =
    'https://kitsu.io/api/edge/library-entries?filter%5Bkind%5D=anime&filter%5Buser_id%5D=195795&include=anime&page%5Blimit%5D=10&page%5Boffset%5D=0';

  do {
    const response = await axios.get(url);

    const { data: entries, included: animes, links } = response.data;

    for (const [index, entry] of Object.entries(entries)) {
      const anime = await prisma.anime.findUnique({
        where: { kitsu_id: +animes[index].id },
      });

      await prisma.entry.create({
        data: {
          user_id: 1,
          anime_id: +anime.id,
          status: getStatus(entry.attributes.status),
          note: entry.attributes.notes,
          rating: +entry.attributes.ratingTwenty / 2,
          progress: +entry.attributes.progress,
          started_at: entry.attributes.startedAt,
          finish_at: entry.attributes.finishedAt,
        },
      });

      console.log('===========================================================');
      console.log('Anime.', anime);
      console.log('Entry', entry.attributes);
    }

    url = links.next;
  } while (url);
})()
  .then((result) => console.log('Success', result))
  .catch(console.error)
  .finally(() => process.exit());

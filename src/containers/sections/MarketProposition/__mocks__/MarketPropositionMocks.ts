export const mockedHighlights = [
    {
        headline: 'Football',
        info: `
      <ul>
        <li>Bundesliga: All Friday and Sunday matches + all highlights directly after the game</li>
        <li>UEFA Champions League: 121 games including conference – live &amp; exclusive only on DAZN</li>
        <li>Europe‘s top leagues: Serie A, LaLiga, Ligue 1, FA Cup, Carabao Cup and much more!</li>
      </ul>`,
    },
    {
        headline: 'US Sports',
        info: `
      <ul>
        <li>NFL: NFL RedZone + NFL ENDZN conference + all prime-time games + the entire playoffs</li>
        <li>NBA: More than 200 games including playoffs and the entire NBA Finals + 24/7 NBA TV</li>
        <li>Plus NCAA College Football &amp; College Basketball incl. March Madness and 24/7 MLB Network</li>
      </ul>`,
    },
    {
        headline: 'More Sports',
        info: `
      <ul>
        <li>UFC: All numbered events and Fight Nights, optional with original English commentary</li>
        <li>EHF Champions League, Darts incl. WC with Elmar Paulke, MotoGP, cycling and much more</li>
        <li>Linear sports channels such as Eurosport 1+2 &amp; Sportdigital TV as well as award-winning documentaries &amp; DAZN Originals</li>
      </ul>`,
    },
].map((highlight) => ({
    ...highlight,
    info: highlight.info.replace(/^\s+/gm, ''),
}));

import { OpenTags, stringifyMarkdown } from '@components/Markdown/Markdown';
import { ResourceStringsKeys } from '@config/ConfigsKeys';
import { useLocalisedStringKey } from '@hooks/resourceStrings/UseLocalisedStrings';

const cardInfo = (stringKey: string): string =>
    stringifyMarkdown({ markdown: stringKey, tag: OpenTags.Ul });

type UseHighlightKeys =
    | {
          headlineKey: ResourceStringsKeys.MarketPropositionCard1Heading;
          infoKey: ResourceStringsKeys.MarketPropositionCard1Content;
      }
    | {
          headlineKey: ResourceStringsKeys.MarketPropositionCard2Heading;
          infoKey: ResourceStringsKeys.MarketPropositionCard2Content;
      }
    | {
          headlineKey: ResourceStringsKeys.MarketPropositionCard3Heading;
          infoKey: ResourceStringsKeys.MarketPropositionCard3Content;
      };

interface UseHighlightReturn {
    info: string;
    headline: string;
}

const useHighlight = ({ headlineKey, infoKey }: UseHighlightKeys): UseHighlightReturn => ({
    headline: useLocalisedStringKey(headlineKey),
    info: cardInfo(useLocalisedStringKey(infoKey)),
});

export const useHighlights = (): UseHighlightReturn[] => [
    useHighlight({
        infoKey: ResourceStringsKeys.MarketPropositionCard1Content,
        headlineKey: ResourceStringsKeys.MarketPropositionCard1Heading,
    }),
    useHighlight({
        infoKey: ResourceStringsKeys.MarketPropositionCard2Content,
        headlineKey: ResourceStringsKeys.MarketPropositionCard2Heading,
    }),
    useHighlight({
        infoKey: ResourceStringsKeys.MarketPropositionCard3Content,
        headlineKey: ResourceStringsKeys.MarketPropositionCard3Heading,
    }),
];

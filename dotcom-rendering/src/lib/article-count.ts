import { storage } from "@guardian/libs";
import { getWeeklyArticleHistory, incrementWeeklyArticleCount } from "@guardian/support-dotcom-components";
import { hasOptedOutOfArticleCount } from "../web/lib/contributions";
import { incrementDailyArticleCount } from "../web/lib/dailyArticleCount";

// Log an article view using the Slot Machine client lib
// We should monitor this function call to ensure it only happens within an
// article pages when other pages are supported by DCR.
export const getArticleCount = async (pageId: string, keywordIds: string) => {
	const hasOptedOut = await hasOptedOutOfArticleCount();

	if (!window.guardian.articleCount) {
		if (!hasOptedOut) {
			incrementDailyArticleCount();
			incrementWeeklyArticleCount(
				storage.local,
				pageId,
				keywordIds.split(','),
			);
		}

		window.guardian.articleCount = getWeeklyArticleHistory(storage.local);
	}

	return window.guardian.articleCount;
}

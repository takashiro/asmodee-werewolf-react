export const languages = new Map<string, string>([
	['en-US', 'English (United States)'],
	['en-GB', 'English (United Kingdom)'],
	['zh-Hans', '中文（简）'],
	['zh-Hant', '中文（繁）'],
	['yue', '中文（粤）'],
	['ja', '日本語'],
]);

const languageMap = new Map<string, string>([
	['en', 'en-US'],
	['zh-HK', 'yue'],
	['zh-MO', 'yue'],
	['zh-TW', 'zh-Hant'],
	['zh', 'zh-Hans'],
]);

function matchSupported(language: string): string | undefined {
	if (languages.has(language)) {
		return language;
	}

	const mappedLang = languageMap.get(language);
	if (mappedLang) {
		return matchSupported(mappedLang);
	}

	const split = language.lastIndexOf('-');
	if (split < 0) {
		return undefined;
	}

	const general = language.substring(0, split);
	return matchSupported(general);
}

export function predictDefaultLanguage(): string {
	const params = new URLSearchParams(window.location.search);
	const lang = params.get('lang');
	if (lang) {
		const supported = matchSupported(lang);
		if (supported) {
			localStorage.setItem('lang', supported);
			return supported;
		}
	}

	const savedLang = localStorage.getItem('lang');
	if (savedLang) {
		return savedLang;
	}

	const languages = navigator.languages || [navigator.language];
	for (const language of languages) {
		const supported = matchSupported(language);
		if (supported) {
			return supported;
		}
	}
	return 'en-US';
}

export function setPreferredLanguage(language: string): void {
	localStorage.setItem('lang', language);
}

export default interface Locale {
	language: string;
	messages: Record<string, string>;
}

export async function createLocale(language: string): Promise<Locale> {
	const res = await window.fetch(`./message/${language}.json`);
	if (res.status === 200) {
		return {
			language,
			messages: await res.json(),
		};
	}

	return {
		language,
		messages: {},
	};
}

const supportedLanguages = new Set<string>([
	'en-US',
	'en-GB',
	'zh-Hans',
	'zh-Hant',
]);

const languageMap = new Map<string, string>([
	['en', 'en-US'],
	['zh-HK', 'zh-Hant'],
	['zh-MO', 'zh-Hant'],
	['zh-TW', 'zh-Hant'],
	['zh', 'zh-Hans'],
]);

function matchSupported(language: string): string | undefined {
	if (supportedLanguages.has(language)) {
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

function predictDefaultLanguage(): string {
	const languages = navigator.languages || [navigator.language];
	for (const language of languages) {
		const supported = matchSupported(language);
		if (supported) {
			return supported;
		}
	}
	return 'en-US';
}

export default class Locale {
	protected language = predictDefaultLanguage();

	getLanguage(): string {
		return this.language;
	}

	async loadMessage(): Promise<Record<string, string>> {
		const res = await window.fetch(`./message/${this.language}.json`);
		if (res.status === 200) {
			return res.json();
		}
		return {};
	}
}

export const locale = new Locale();

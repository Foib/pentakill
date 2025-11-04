const search = '/lol-game-data/assets';
const replace =
	'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default';

export default function getIconUrl(iconPath: string) {
	return iconPath.replace(search, replace).toLowerCase();
}

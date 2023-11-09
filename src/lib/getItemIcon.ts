const baseUrl = 'https://ddragon.leagueoflegends.com/cdn/13.22.1/img/item/';

export default function getItemIcon(itemId: number) {
	return baseUrl + itemId + '.png';
}

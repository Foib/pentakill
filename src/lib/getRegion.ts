export default function getRegion(region: string) {
	region = region.toLowerCase();
	switch (region) {
		case 'br':
			return 'br1';
		case 'eune':
			return 'eun1';
		case 'euw':
			return 'euw1';
		case 'jp':
			return 'jp1';
		case 'kr':
			return 'kr';
		case 'lan':
			return 'la1';
		case 'las':
			return 'la2';
		case 'na':
			return 'na1';
		case 'oce':
			return 'oc1';
		case 'ph':
			return 'ph2';
		case 'ru':
			return 'ru';
		case 'sg':
			return 'sg2';
		case 'th':
			return 'th2';
		case 'tr':
			return 'tr1';
		case 'tw':
			return 'tw2';
		case 'vn':
			return 'vn2';
		default:
			return '';
	}
}

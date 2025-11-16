export default function getRegion(region: string) {
	region = region.toLowerCase();
	switch (region) {
		case 'br':
			return ['br1', 'americas'];
		case 'eune':
			return ['eun1', 'europe'];
		case 'euw':
			return ['euw1', 'europe'];
		case 'jp':
			return ['jp1', 'asia'];
		case 'kr':
			return ['kr', 'asia'];
		case 'lan':
			return ['la1', 'americas'];
		case 'las':
			return ['la2', 'americas'];
		case 'na':
			return ['na1', 'americas'];
		case 'oce':
			return ['oc1', 'sea'];
		case 'ph':
			return ['ph2', 'sea'];
		case 'ru':
			return ['ru', 'europe'];
		case 'sg':
			return ['sg2', 'sea'];
		case 'th':
			return ['th2', 'sea'];
		case 'tr':
			return ['tr1', 'europe'];
		case 'tw':
			return ['tw2', 'sea'];
		case 'vn':
			return ['vn2', 'sea'];
		case 'me':
			return ['me1', 'europe'];
		default:
			return ['', ''];
	}
}

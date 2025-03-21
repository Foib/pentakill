async function getRiotAccount(name: string, tag: string, api_key: string | undefined) {
	const acountDataJson = await fetch(
		`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${api_key}`
	);
	return (await acountDataJson.json()) as AccountDto;
}

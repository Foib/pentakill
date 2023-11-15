export const load = async ({ params }) => {
    const slugArr = params.slug.split('&');

    let regions = [];

    for (let i = 0; i < slugArr.length; i++) {
        const regionUsername = slugArr[i].split('=', 2);
        regions.push({ region: regionUsername[0], usernames: regionUsername[1].split(',') });
    }

    return {
        regions
    };
}
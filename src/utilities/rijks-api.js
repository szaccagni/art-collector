
const token = process.env.REACT_APP_RIJKS_API_KEY
const BASE_URL = `https://www.rijksmuseum.nl/api/en/collection?key=${token}&imgonly=true`

export async function search(term, resultsPerPg, curPg) {
    let endpoint = `${BASE_URL}&q=${term}&ps=${resultsPerPg}&p=${curPg}`
    let response = await fetch(endpoint).then((res) => res.json());
    const curData = response.artObjects.map( art => {
        const formatData = {
            objectID: art.objectNumber,
            title: art.title,
            primaryImage: art.webImage.url,
            artistDisplayName: art.principalOrFirstMaker
        }
        return formatData
    }) 
    return {curData:curData, totalCount:response.count}
}
export const homeLoader = ({ request }) => {
    const url = new URL(request.url);

    const categories = url.searchParams
    .getAll("categories")
    .filter((categoryId)  => Boolean(categoryId))
    .map((categoryId) => Number(categoryId));

    const title = url.searchParams.get("title") ?? "";
    
    return { categories, title};
}
/**
 * Cover image convention: each item has cover_image.png in its folder.
 * Use this helper to resolve the URL from collection name and entry id.
 */
export function getCoverImageUrl(
	collection: 'papers' | 'labs' | 'notes',
	id: string
): string {
	return `/${collection}/${id}/cover_image.png`;
}

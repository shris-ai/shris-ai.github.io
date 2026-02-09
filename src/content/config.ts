import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

/**
 * Cover image convention (labs and notes only): place cover_image.png inside each item's folder.
 * Resolve in code as: /<collection>/<id>/cover_image.png
 * Paper dive-ins and paper breakdowns do NOT use cover images.
 */

/**
 * ResearchPaper: schema aligned with paper frontmatter.
 * Displayed: title, tags, publishedDate, sourceUrl, sourceLabel, reviewedDate (or dateOfReview).
 * type, description, plannedDateOfReview, status are optional and not displayed.
 */
const papersCollection = defineCollection({
	type: 'content',
	schema: z.object({
		type: z.literal('ResearchPaper').optional(),
		title: z.string(),
		description: z.string().optional(),
		tags: z.array(z.string()),
		publishedDate: z.string().optional(),
		sourceUrl: z.string().url().optional(),
		sourceLabel: z.string().optional(),
		reviewedDate: z.string().optional(),
		dateOfReview: z.string().optional(),
		plannedDateOfReview: z.string().optional(),
		status: z.string().optional(),
	}),
});

const labsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		createdDate: z.string().optional(),
		updatedDate: z.string().optional(),
	}),
});

const notesCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		publishedDate: z.string().optional(),
	}),
});

export const collections = {
	papers: papersCollection,
	labs: labsCollection,
	notes: notesCollection,
};

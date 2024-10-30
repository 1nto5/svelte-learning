import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

// export const load: PageServerLoad = async (event) => {
// 	if (!event.locals.user) {
// 		return redirect(302, '/demo/lucia/login');
// 	}
// 	return {};
// };

export const actions: Actions = {
	save: async (event) => {
		await new Promise((fulfil) => setTimeout(fulfil, 1000));
		const formData = await event.request.formData();
		const title = String(formData.get('title'));
		const content = String(formData.get('content'));
		const userId = event.locals.user?.id;

		if (!userId) {
			return fail(400, { message: 'User not authenticated' });
		}
		if (!title || !content) {
			return fail(400, { message: 'Title and content are required' });
		}

		const userRoles = await db
			.select({
				roleName: table.roles.name
			})
			.from(table.userRoles)
			.innerJoin(table.roles, eq(table.userRoles.roleId, table.roles.id))
			.where(eq(table.userRoles.userId, userId));

		const roleNames = userRoles.map((role) => role.roleName);

		if (!roleNames.includes('writer')) {
			return fail(400, { message: 'User is not writer' });
		}

		const post: Omit<table.Post, 'id'> = {
			userId,
			title,
			content,
			createdAt: new Date()
		};

		await db.insert(table.posts).values(post);
	}
};

import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const isLoggedIn = event.cookies.get('access_token');
	const isPrivateRoute = event.route.id?.startsWith('(private)');

	if (!isLoggedIn && isPrivateRoute) {
		throw redirect(302, '/auth/login');
	}

	const isAuthPage = event.route.id?.includes('/auth');

	if (isLoggedIn && isAuthPage) {
		throw redirect(302, '/moves');
	}

	return await resolve(event);
};

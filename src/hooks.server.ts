import { formatUser } from '$lib/formaters/user';
import { whoIAm, getBalance } from '$lib/services/bank/user';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const isLoggedIn = event.cookies.get('access_token');
	const isPrivateRoute = event.route.id?.startsWith('/(private)');

	if (isLoggedIn) {
		const { data: userData } = await whoIAm(isLoggedIn);
		const { data: balanceData } = await getBalance(isLoggedIn);

		event.locals.user = formatUser({
			...userData.data,
			access_token: isLoggedIn,
			balance: balanceData.data.balance
		});
	}

	if (!isLoggedIn && isPrivateRoute) {
		throw redirect(302, '/auth/login');
	}

	const isAuthPage = event.route.id?.includes('/auth');

	if (isLoggedIn && isAuthPage) {
		throw redirect(302, '/main');
	}

	return await resolve(event);
};

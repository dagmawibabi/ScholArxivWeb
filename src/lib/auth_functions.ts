import { signIn, signUp, authClient } from '$lib/auth_client';
import { goto } from '$app/navigation';

export const handleSignIn = async (email: string, password: string) => {
	await signIn.email(
		{
			email: email,
			password: password,
			callbackURL: '/homepage'
		},
		{
			onError(context) {
				alert(context.error.message);
			}
		}
	);
};

export const handleSignUp = async (
	firstName: string,
	lastName: string,
	email: string,
	password: string
) => {
	await signUp.email({
		email: email,
		password: password,
		name: `${firstName} ${lastName}`,
		callbackURL: '/homepage',
		fetchOptions: {
			onError(context) {
				alert(context.error.message);
			}
		}
	});
};

export const handleForgetPassword = async (email: string) => {
	await authClient.forgetPassword(
		{
			email: email,
			redirectTo: '/auth/reset_password'
		},
		{
			onSuccess() {
				alert('Password reset link sent to your email');
				window.location.href = '/';
			},
			onError(context) {
				alert(context.error.message);
			}
		}
	);
};

export const handleResetPassword = async (password: string) => {
	await authClient.resetPassword({
		newPassword: password,
		fetchOptions: {
			onSuccess() {
				window.location.href = '/auth/sign_in';
			},
			onError(context) {
				alert(context.error.message);
			}
		}
	});
};

export const handleLogout = async (id: string | undefined) => {
	authClient.user.revokeSession({ id: id! });
	goto('/');
};

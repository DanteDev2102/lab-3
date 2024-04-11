<script lang="ts">
	import Form from '$lib/components/form.svelte';
	import Logo from '$lib/components/logo.svelte';
	import Meta from '$lib/components/meta.svelte';

	const inputs = [
		{
			title: 'Correo Electronico',
			type: 'email',
			iconLeft: false,
			isRequired: true,
			icon: 'quill:mail',
			name: 'email'
		},
		{
			title: 'Clave',
			type: 'password',
			iconLeft: false,
			isRequired: true,
			icon: 'uil:lock-alt',
			name: 'password'
		}
	];

	export let form;

	let errors: string[] = [];

	$: {
		if (form?.errors) {
			errors = form.errors.map(({ error }: { error: string }) => error);
		}

		setTimeout(() => {
			errors = [];
		}, 2000);
	}
</script>

{#if errors.length > 0}
	<div class="toast toast-top toast-end">
		{#each errors as error}
			<div class="alert alert-error text-white">
				<span>{error}</span>
			</div>
		{/each}
	</div>
{/if}

<div class="bg-blue-100 bg-img h-screen">
	<Logo />

	<div class="flex items-center">
		<div class="ml-12 w-1/2 py-12 px-4 rounded-xl">
			<h2 class="text-4xl font-bold mb-8 text-left title">Banco Universitario</h2>
			<h1 class="text-7xl font-bold mb-8 text-left">¡Bienvenidos!</h1>
			<p class="text-left text-2xl mr-9">
				Ingresando con tu usuario y tu contraseña, podrás experimentas todas las herramientas que
				tenemos para ti, y mucho más!
			</p>
		</div>

		<div class="mr-7">
			<div class="flex items-center justify-center bg-white py-28 px-32 rounded-xl shadow-2xl">
				<div class="max-w-md w-full space-y-8">
					<h2 class="mt-6 text-left text-3xl font-extrabold title">Ingresar</h2>

					<Form {inputs} buttonTitle="Entrar" method="POST" action="login" />

					<div class="flex justify-center">
						<div class="title">
							<a href="/auth/register" class="font-medium hover:text-indigo-500">
								¿No estas registrado?
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<Meta title="inicio de sesion" />

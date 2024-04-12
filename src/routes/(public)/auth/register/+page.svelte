<script lang="ts">
	import Form from '$lib/components/form.svelte';
	import Logo from '$lib/components/logo.svelte';
	import Meta from '$lib/components/meta.svelte';

	const inputs = [
		{
			title: 'Nombre',
			type: 'text',
			iconLeft: false,
			isRequired: true,
			icon: 'uil:user',
			name: 'name'
		},
		{
			title: 'Apellido',
			type: 'text',
			iconLeft: false,
			isRequired: true,
			icon: 'uil:user',
			name: 'lastname'
		},
		{
			title: 'Cedula',
			type: 'text',
			iconLeft: false,
			isRequired: true,
			icon: 'uil:user',
			name: 'vat'
		},
		{
			title: 'Fecha de nacimiento',
			type: 'date',
			iconLeft: false,
			isRequired: true,
			name: 'birthdate'
		},
		{
			title: 'Telefono',
			type: 'text',
			iconLeft: false,
			isRequired: true,
			icon: 'quill:phone',
			name: 'phone'
		},
		{
			title: 'Correo electronico',
			type: 'text',
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
		},
		{
			title: 'Confirmar clave',
			type: 'password',
			iconLeft: false,
			isRequired: true,
			icon: 'uil:lock-alt',
			name: 'passwordConfirm'
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

<section class="grid grid-cols-2 gap-96 content-center h-screen px-10 bg-img">
	<section>
		<Logo />
		<div class="ml-12 w-3/4 py-12 px-4 rounded-xl mt-10">
			<h2 class="text-4xl font-bold mb-8 text-left title">Banco Universitario</h2>
			<h1 class="text-6xl font-bold mb-8 text-left">Dedicado para los estudiantes.</h1>
			<p class="text-left text-2xl mr-9">
				Banco universitario, es el único banco creado para y por los estudiantes, donde se les
				permitira utilizar diferentes herramientas, a la hora de hacer operaciones o consultar. A
				tiempo real.
			</p>
		</div>
	</section>
	<div
		class="h-full w-3/4 bg-white rounded-xl grid grid-cols-1 content-center justify-center shadow-2xl"
	>
		<h2 class="title text-3xl font-bold mt-3 mx-auto">Registrar</h2>
		<div class="h-2/3">
			<Form {inputs} buttonTitle="Registrar" method="POST" action="register" />
		</div>
		<p class="py-6 mx-auto">
			<a href="/auth/login" class="font-medium hover:text-indigo-500"
				>¿Ya tienes cuenta? inicia sesion</a
			>
		</p>
	</div>
</section>

<Meta title="Registro" />

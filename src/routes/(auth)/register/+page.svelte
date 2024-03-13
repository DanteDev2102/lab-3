<script>
	import Form from '$lib/components/form.svelte';

	const inputs = [
		{
			title: 'Nombre',
			type: 'text',
			iconLeft: false,
			isRequired: true,
			icon: 'uil:user'
		},
		{
			title: 'Apellido',
			type: 'text',
			iconLeft: false,
			isRequired: true,
			icon: 'uil:user'
		},
		{
			title: 'Cedula',
			type: 'text',
			iconLeft: false,
			isRequired: true,
			icon: 'uil:user'
		},
		{
			title: 'Fecha de nacimiento',
			type: 'text',
			iconLeft: false,
			isRequired: true,
			icon: 'quill:calendar-more'
		},
		{
			title: 'Telefono',
			type: 'text',
			iconLeft: false,
			isRequired: true,
			icon: 'quill:phone'
		},
		{
			title: 'Correo electronico',
			type: 'text',
			iconLeft: false,
			isRequired: true,
			icon: 'quill:mail'
		},
		{
			title: 'Clave',
			type: 'text',
			iconLeft: false,
			isRequired: true,
			icon: 'uil:lock-alt'
		}
	];
</script>

<section class="grid grid-cols-2 gap-96 content-center h-screen px-10 bg-img">
	<section>
		<figure>
			<img src="logo.svg" alt="logo" class="w-100 h-32" />
		</figure>
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
			<Form {inputs} buttonTitle="Registrar" />
		</div>
		<p class="py-6 mx-auto">
			<span>¿Ya tienes cuenta?</span>
			<a href="/login" class="font-medium hover:text-indigo-500">inicia sesion</a>
		</p>
	</div>
</section>

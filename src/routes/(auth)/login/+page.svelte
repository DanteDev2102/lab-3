<script>
	import Form from '$lib/components/form.svelte';

	const inputs = [
		{
			title: 'Correo Electronico',
			type: 'email',
			iconLeft: false,
			isRequired: true,
			icon: 'quill:mail'
		},
		{
			title: 'Clave',
			type: 'email',
			iconLeft: false,
			isRequired: true,
			icon: 'uil:lock-alt'
		}
	];
</script>

<div class="bg-blue-100 bg-img h-screen">
	<figure class="bg-White 300 text-Green text-left py-5">
		<img src="logo.svg" width="50%" height="50%" alt="logo" />
	</figure>

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
					<h2 class="mt-6 text-left text-3xl font-extrabold">Ingresar</h2>

					<Form {inputs} buttonTitle="Entrar" />

					<div class="flex gap-4">
						<div class="title">
							<a href="/" class="font-medium hover:text-indigo-500"> ¿Olvido su contraseña? </a>
						</div>
						<div class="title">
							<a href="/register" class="font-medium hover:text-indigo-500">
								¿No estas registrado?
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

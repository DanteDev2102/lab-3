<script>
	import Form from "$lib/components/form.svelte";

	const inputs = [
		{
			title: "Correo Electronico",
			type: "email",
			iconLeft: false,
			isRequired: true,
			icon: 'uil:user'
		}, {
			title: "Clave",
			type: "email",
			iconLeft: false,
			isRequired: true,
			icon: 'uil:lock-alt'
		}
	]
</script>

<div class="bg-blue-100 div">
	<figure class="bg-White 300 text-Green text-left py-5">
		<img src="logo.svg" width="50%" height="50%" alt="logo" />
	</figure>

	<div class="h-screen flex justify-between items-center">
		<div class="ml-12 relative w-1/2 py-12 px-4 sm:px-6 lg:px-8 border-black-300 rounded-xl">
			<h2 class="text-4xl font-bold mb-8 text-blue-800 text-left">Banco Universitario</h2>
			<h1 class="text-4xl font-bold mb-8 text-center text-gray-800">Bienvenidos!</h1>
			<p class="text-center">
				Banco universitario, es el único banco creado para y por los estudiantes, donde se les
				permitira utilizar diferentes herramientas, a la hora de hacer operaciones o consultar. A
				tiempo real.
			</p>
		</div>

		<div class="mr-12">
			<div
				class="flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 rounded-xl"
			>
				<div class="max-w-md w-full space-y-8">
					<div>
						<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
							Bienvenidos a Banco Universitario
						</h2>
						<p class="mt-2 text-center text-sm text-gray-600">
							Por favor ingrese su correo electronico, y su contraseña para ingresar.
						</p>
					</div>

					<Form inputs={inputs} buttonTitle="Ingresar"/>

					<!-- <form class="mt-8 space-y-6">
						<div class="rounded-md shadow-sm -space-y-px">
							<div>
								<label for="email" class="sr-only">Correo Electronico</label>
								<input
									id="email"
									name="email"
									type="text"
									autocomplete="email"
									class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="dante@example.com"
									required
								/>
							</div>
							<div>
								<label for="password" class="sr-only">Clave</label>
								<input
									id="password"
									name="password"
									type="password"
									autocomplete="current-password"
									required
									class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Clave"
								/>
							</div>
						</div>
						<div class="flex items-center justify-between">
							<div class="flex items-center">
								<input
									id="remember_me"
									name="remember_me"
									type="checkbox"
									class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
								/>
								<label for="remember_me" class="ml-2 block text-sm text-gray-900">
									Recuerdame
								</label>
							</div>
							<div class="text-sm">
								<a href="/" class="font-medium text-indigo-600 hover:text-indigo-500">
									Olvido su contraseña?
								</a>
							</div>
							<div class="text-sm">
								<a href="/" class="font-medium text-indigo-600 hover:text-indigo-500">
									¿No estas registrado?
								</a>
							</div>
						</div>
						<div>
							<button
								type="button"
								class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Ingresar
							</button>
						</div>
					</form> -->
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.div {
		background-image: url('bg.png');
		background-blend-mode: overlay;
		background-size: contain;
		background-color: #d4f3e7;
	}
</style>

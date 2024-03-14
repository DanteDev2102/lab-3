<main class="bg-default h-screen w-full">
	<header class="grid grid-cols-2">
		<figure>
			<img src="logo.svg" alt="logo" class="w-100 h-32" />
		</figure>
		<nav class="grid grid-cols-1 content-center mt-16 ml-96">
			<a class="btn w-64 text-white" href="/register">Empezemos</a>
		</nav>
	</header>

	<section class="flex justify-end mx-12 mt-7">
		<p class="text-7xl">La mejor experiencia al alcance de tus manos!</p>
	</section>

	<section class="grid grid-cols-2">
		<div class="ml-8 grid grid-cols-1 gap-10">
			<figure>
				<img src="people.png" alt="people" class="h-72 w-96 mt-5" />
			</figure>
			<p class="font-bold text-3xl">
				Puedes encontrarnos en nuestras redes <br /> sociales, como: @bancouniversitariove
			</p>

			<p class="grid grid-cols-1 gap-2">
				<span class="font-bold text-4xl">Puedes encontrarnos en:</span><br />
				<span class="text-4xl"
					>· Av. Universidad, Edificio Banco Universitario, piso 12, Caracas, Venezuela.</span
				>
			</p>
		</div>
		<div>
			<p class="text-3xl mt-10">
				Horarios de atención al cliente, de lunes a viernes <br /> a partir de las 7:30 am,
				teléfonos de contactos: <br /> +58 212-555-5555 , +58 212-555-5556
			</p>
			<div
				class="bg-city h-3/6 w-1/3 grid grid-cols-1 text-white justify-items-center content-evenly"
			>
				<h3 class="text-2xl font-bold">SUBSCRIBETE A NUESTRO NEWSLATER</h3>
				<div>
					<input type="text" class="input text-black" placeholder="ingresa tu correo" />
					<button class="btn">Subscribir</button>
				</div>
			</div>
		</div>
	</section>
</main>

<style>
	a {
		background-color: #33b786;
		font-size: large;
	}

	.bg-city {
		background-image: url('city.svg');
		background-size: cover;
		position: absolute;
		bottom: 0;
		right: 0;
	}
</style>

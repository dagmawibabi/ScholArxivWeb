<script lang="ts">
	import AuthCards from '../components/auth_cards.svelte';
	import LongButton from '../components/long_button.svelte';

	import { UserPlus, LogIn, Ghost } from 'lucide-svelte';

	let selectedCard: string = '';

	function selectCard(card: any) {
		selectedCard = card;
		console.log('clicked');
	}
</script>

<div class="h-screen">
	<div class="w-fit m-auto pt-96">
		<div class="px-2 flex flex-col">
			<span class="font-bold text-5xl pb-2"> ScholArxiv </span>
			<span class="font-semibold text-2xl pb-5">
				Explore academic papers from the arXiv repository.
			</span>
		</div>
		<div>
			<AuthCards
				icon={LogIn}
				label="Login"
				subTitle="If you already have an account, log in"
				isSelected={selectedCard === 'login'}
				on:click={() => selectCard('login')}
			/>
			<AuthCards
				icon={UserPlus}
				label="Sign Up"
				subTitle="Create an account and join ScholArxiv"
				isSelected={selectedCard === 'signup'}
				on:click={() => selectCard('signup')}
			/>
			<AuthCards
				icon={Ghost}
				label="Guest"
				subTitle="Explore without signing in"
				isSelected={selectedCard === 'guest'}
				on:click={() => selectCard('guest')}
			/>
			<div class="h-5"></div>
			<a href="/homepage">
				<LongButton label="Continue" />
			</a>
		</div>
	</div>
</div>

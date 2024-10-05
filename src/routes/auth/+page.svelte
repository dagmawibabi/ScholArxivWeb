<script lang="ts">
	import AuthCards from '../../components/auth_cards.svelte';

	import { UserPlus, LogIn, Ghost } from 'lucide-svelte';
	import LongButton from '../../components/long_button.svelte';
	import Title from '../../components/title.svelte';

	let selectedCard: string = '';

	function selectCard(card: any) {
		selectedCard = card;
	}
</script>

<div class="my-auto">
	<Title />
	<div>
		<div class="pt-5 pb-3">
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
				subTitle="Explore without signing up or logging in"
				isSelected={selectedCard === 'guest'}
				on:click={() => selectCard('guest')}
			/>
		</div>
		<a
			href={selectedCard === 'login'
				? '/auth/sign_in'
				: selectedCard === 'signup'
					? '/auth/sign_up'
					: '/homepage'}
		>
			<LongButton label="Continue" />
		</a>
	</div>
</div>

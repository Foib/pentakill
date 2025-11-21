<script lang="ts">
	import type { CustomMatchDto } from '$lib/riotTypes/Misc';
	import {
		Area,
		Axis,
		Layer,
		LinearGradient,
		LineChart,
		Highlight,
		Spline,
		Tooltip,
		RectClipPath
	} from 'layerchart';
	import { curveNatural } from 'd3-shape';
	import { scaleTime } from 'd3-scale';
	import { numberWithCommas } from '$lib/numberWithCommas';

	let { match, expanded }: { match: CustomMatchDto; expanded: boolean } = $props();

	const rawData = match.timeline.info.frames.map((frame, frameIndex) => {
		const team100Gold = Object.values(frame.participantFrames)
			.filter((_, participantIndex) => {
				return participantIndex < 5;
			})
			.reduce((sum, participantFrame) => sum + participantFrame.totalGold, 0);

		const team200Gold = Object.values(frame.participantFrames)
			.filter((_, participantIndex) => {
				return participantIndex >= 5;
			})
			.reduce((sum, participantFrame) => sum + participantFrame.totalGold, 0);

		//timestamp starting from start game
		const timestamp = frame.timestamp;
		const dateTime = new Date(timestamp);

		let goldDiff = team100Gold - team200Gold;
		if (match.currentSummoner.teamId === 200) {
			goldDiff = -goldDiff;
		}

		return {
			frame: frameIndex,
			timestamp: dateTime,
			team100Gold,
			team200Gold,
			goldDiff
		};
	});

	const data = rawData.flatMap((point) => [
		{
			time: point.timestamp,
			gold: point.goldDiff
		}
	]);
</script>

<div
	class="my-4 flex flex-col overflow-hidden rounded-lg border border-league-grey-cool p-2"
	style="width: 100%; height: calc(100% - 16px);"
>
	<div class="flex w-full grow items-center justify-center">
		<p class="font-beaufort text-xl text-league-grey-1">Team Gold Difference</p>
	</div>
	<div class="h-[360px] w-full shrink-0 pt-2 pr-2 pb-6 pl-6">
		<LineChart {data} x="time" y="gold" axis={false} yNice>
			{#snippet marks({ context })}
				<Layer type={'svg'}>
					<RectClipPath x={0} y={0} width={context.width} height={context.yScale(0)}>
						<Area
							line={{ class: 'stroke-2 stroke-[#0ad1ed]' }}
							class="fill-[#0ad1ed]/20"
							curve={curveNatural}
						/>
					</RectClipPath>
					<RectClipPath
						x={0}
						y={context.yScale(0)}
						width={context.width}
						height={context.height - context.yScale(0)}
					>
						<Area
							line={{ class: 'stroke-2 stroke-[#ff2346]' }}
							y0={(_) => 0}
							class="fill-[#ff2346]/20"
							curve={curveNatural}
						/>
					</RectClipPath>
					<Axis
						placement="bottom"
						rule
						format={(d: Date) => {
							return d.getMinutes() + 'm';
						}}
						ticks={(scale) => scaleTime(scale.domain(), scale.range()).ticks(scale.range()[1] / 80)}
					/>
					<Axis
						placement="left"
						rule
						format={(n: number) => {
							const sign = n > 0 ? '+' : '';

							if (Math.abs(n) < 1000) {
								return sign + n.toString();
							}
							return sign + Math.floor(n / 1000) + 'k';
						}}
					/>
				</Layer>
			{/snippet}

			{#snippet highlight({ context })}
				{#if context.tooltip.data}
					<Highlight
						lines
						points={{
							fill: context.y(context.tooltip.data) < 0 ? '#ff2346' : '#0ad1ed'
						}}
					/>
				{/if}
			{/snippet}

			{#snippet tooltip({ context })}
				<Tooltip.Root>
					{#snippet children({ data })}
						{@const timestamp: Date = context.x(data)}
						{@const goldDifference = context.y(data)}
						<Tooltip.Header>{'Minute ' + timestamp.getMinutes()}</Tooltip.Header>
						<Tooltip.List>
							<Tooltip.Item
								label="Gold Difference"
								value={(goldDifference > 0 ? '+' : '') + numberWithCommas(goldDifference)}
								color={goldDifference < 0 ? '#ff2346' : '#0ad1ed'}
							/>
						</Tooltip.List>
					{/snippet}
				</Tooltip.Root>
			{/snippet}
		</LineChart>
	</div>
</div>

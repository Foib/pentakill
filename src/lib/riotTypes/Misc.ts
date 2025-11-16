import type { MatchV5DTOs, MatchV5TimelineDTOs } from 'twisted/dist/models-dto';

export type RiotStatusCode = {
	status: {
		message: string;
		status_code: number;
	};
};

export const isRiotStatusCode = (x: any): x is RiotStatusCode => {
	return x.status !== undefined;
};

export type CustomMatchDto = MatchV5DTOs.MatchDto & {
	timeline: MatchV5TimelineDTOs.MatchTimelineDto;
} & { currentSummoner: MatchV5DTOs.ParticipantDto };

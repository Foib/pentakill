export type RiotStatusCode = {
	status: {
		message: string;
		status_code: number;
	};
};

export const isRiotStatusCode = (x: any): x is RiotStatusCode => {
	return x.status !== undefined;
};

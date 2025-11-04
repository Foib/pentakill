type RuneData = {
	id: number;
	name: string;
	majorChangePatchVersion: string;
	tooltip: string;
	shortDesc: string;
	longDesc: string;
	recommendationDescriptor: string;
	iconPath: string;
	endOfGameStatDescs: string[];
	recommendationDescriptorAttributes: RecommendationDescriptorAttributes;
};

type RecommendationDescriptorAttributes = {
	kUtility?: number;
	kBurstDamage?: number;
	kDamagePerSecond?: number;
	kMoveSpeed?: number;
	kHealing?: number;
	kDurability?: number;
	kGold?: number;
	kCooldown?: number;
	kMana?: number;
};

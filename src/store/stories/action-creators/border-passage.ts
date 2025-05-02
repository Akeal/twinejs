import {Passage, Story, UpdatePassageAction} from '../stories.types';
import {isValidTagName} from '../../../util/tag';

/**
 * Adds a tag to a passage.
 */
export function addPassageBorder(
	story: Story,
	passage: Passage,
	borderName: string
): UpdatePassageAction {
	if (passage.story !== story.id) {
		throw new Error('This passage does not belong to this story.');
	}

	if (!isValidTagName(borderName)) {
		throw new Error(`"${borderName}" is not a valid border name.`);
	}

	return {
		type: 'updatePassage',
		passageId: passage.id,
		storyId: story.id,
		props: {border: borderName}
	};
}

/**
 * Removes a tag from a passage.
 */
export function removePassageBorder(
	story: Story,
	passage: Passage,
	borderName: string
): UpdatePassageAction {
	if (passage.story !== story.id) {
		throw new Error('This passage does not belong to this story.');
	}

	if (!isValidTagName(borderName)) {
		throw new Error(`"${borderName}" is not a valid border name.`);
	}

	if (passage.border == null) {
		throw new Error(`This passage does not have a border.`);
	}

	return {
		type: 'updatePassage',
		passageId: passage.id,
		storyId: story.id,
		props: {border: null}
	};
}
